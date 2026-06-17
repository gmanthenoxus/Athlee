'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { matchService } from '@/lib/matchService';
import { locationService } from '@/lib/locationService';
import type { Match, MatchRules } from '@/lib/match-types';
import { ScoringSystem, MatchStatus, MatchMode, MatchType } from '@/lib/match-types';
import { SportPicker } from '@/components/match/SportPicker';
import { MatchTypeConfigurator } from '@/components/match/MatchTypeConfigurator';
import { LocationConfigurator } from '@/components/match/LocationConfigurator';
import TeamBuilder from '@/components/match/TeamBuilder';
import RulesConfigurator from '@/components/match/RulesConfigurator';
import { OfficialsStep } from '@/components/match/OfficialsStep';
import { FinalizationStep } from '@/components/match/FinalizationStep';

const STEPS = ['Sport', 'Config', 'Location', 'Teams', 'Rules', 'Officials', 'Finalize'];

export default function MatchCreatePage() {
  const router = useRouter();
  const {
    session,
    setStep,
    resetSession,
    setSport,
    setLocation,
    setTeams,
    setRules,
    setOfficials,
    setSchedule,
    setPrivacy,
    initializeSession,
    canProceedStep2,
    canProceedStep4,
  } = useMatchSetupStore();

  // Initialize session on page load
  React.useEffect(() => {
    initializeSession('current-user', false);
  }, [initializeSession]);

  const currentStep = session.step;
  const selectedSport = session.sport;
  const selectedMode = session.mode;
  const selectedTeamSize = session.teamSize;
  const selectedStatIntensity = session.statIntensity;
  const selectedLocation = session.locationId;
  const teams = session.teams;
  const rules = session.rules;
  const officials = session.officials;
  const schedule = session.schedule;
  const privacy = session.privacy;
  
  // For backward compatibility with old MatchType field (derives from matchTypeId)
  // This is used in match creation below
  const selectedMatchType = (() => {
    const typeMap: Record<string, MatchType> = {
      'single': MatchType.Single,
      'set-based': MatchType.SetBased,
      'tournament': MatchType.Tournament,
      'rotational': MatchType.Rotational,
    };
    return session.matchTypeId ? typeMap[session.matchTypeId] : undefined;
  })();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // All 7 steps are always present (Officials only shown if Competitive mode)
  // Step visibility handled via conditional rendering, not via step count
  const visibleSteps = STEPS;

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Sport
        return !!selectedSport;
      case 1: // Config
        return canProceedStep2();
      case 2: // Location
        return !!selectedLocation;
      case 3: // Teams
        return canProceedStep4();
      case 4: // Rules
        return !!rules;
      case 5: // Officials (only in competitive mode)
        return selectedMode === MatchMode.Casual || (!!officials && officials.referees.length > 0);
      case 6: // Finalize
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    
    let nextStep = currentStep + 1;
    
    // Skip Step 5 (Officials) for Casual mode
    if (currentStep === 4 && selectedMode === MatchMode.Casual) {
      nextStep = 6; // Jump to Finalize
    }
    
    if (nextStep <= visibleSteps.length - 1) {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    
    let prevStep = currentStep - 1;
    
    // Skip Step 5 (Officials) for Casual mode when going back
    if (currentStep === 6 && selectedMode === MatchMode.Casual) {
      prevStep = 4; // Jump back to Rules
    }
    
    if (prevStep >= 0) {
      setStep(prevStep);
    }
  };

  const handleCreateMatch = async () => {
    if (!canProceed()) {
      setError('Please complete all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const matchData: Partial<Match> = {
        sport: selectedSport,
        type: selectedMatchType,
        mode: selectedMode,
        teamSize: selectedTeamSize,
        statIntensity: selectedStatIntensity,
        locationId: selectedLocation,
        teams: teams,
        rules: (rules || {
          scoringSystem: ScoringSystem.Standard,
          pointsToWin: 21,
          winByTwo: true,
        }) as MatchRules,
        officials: selectedMode === MatchMode.Competitive ? officials : undefined,
        status: schedule === null ? MatchStatus.InProgress : MatchStatus.Scheduled,
        date: schedule?.toISOString() || new Date().toISOString(),
        privacy: privacy || 'public',
        createdBy: 'current-user'
      };

      const match = matchService.createMatch(matchData);
      resetSession();
      router.push(`/matches/${match.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create match. Please try again.'
      );
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetSession();
    router.back();
  };

  const handleEditStep = (stepNum: number) => {
    setStep(stepNum);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <SportPicker 
              selected={selectedSport}
              onSelect={setSport}
            />
          </div>
        );

      case 1:
        return (
          <MatchTypeConfigurator />
        );

      case 2:
        return (
          <LocationConfigurator
            selectedSport={selectedSport}
            selectedLocationId={selectedLocation}
            onSelectLocation={setLocation}
          />
        );

      case 3:
        return (
          <TeamBuilder />
        );

      case 4:
        return (
          <RulesConfigurator 
            sport={selectedSport}
          />
        );

      case 5:
        // Officials - only show in competitive mode
        if (selectedMode !== MatchMode.Competitive) {
          return null;
        }
        return (
          <OfficialsStep
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleNext}  // Skip still goes to next step
          />
        );

      case 6:
        return (
          <div className="space-y-4">
            <FinalizationStep 
              match={{
                sport: selectedSport,
                type: selectedMatchType,
                mode: selectedMode,
                teamSize: selectedTeamSize,
                teams: teams
              }}
              location={selectedLocation ? locationService.getLocationById(selectedLocation) || undefined : undefined}
              rules={rules}
              officials={officials}
              schedule={schedule}
              privacy={privacy}
              mode={selectedMode}
              onScheduleChange={setSchedule}
              onPrivacyChange={setPrivacy}
              onEditStep={handleEditStep}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            Create Match
          </h1>
          <div className="w-6" />
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="flex justify-between items-center gap-2">
            {visibleSteps.map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Step {currentStep + 1} of {visibleSteps.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {renderStep()}

        {/* Navigation Buttons */}
        <div className="mt-12 flex gap-3 justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep === visibleSteps.length - 1 ? (
            <button
              onClick={handleCreateMatch}
              disabled={loading || !canProceed()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              {loading ? 'Creating...' : 'Create Match'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Step Indicators */}
        <div className="mt-8 grid gap-2" style={{ gridTemplateColumns: `repeat(${visibleSteps.length}, 1fr)` }}>
          {visibleSteps.map((step, index) => (
            <div
              key={step}
              className={`text-xs py-2 px-2 rounded text-center font-medium transition-colors ${
                index === currentStep
                  ? 'bg-blue-100 text-blue-700'
                  : index < currentStep
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
