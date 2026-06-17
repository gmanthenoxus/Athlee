/**
 * MatchConfigStep - Step 2 of Match Setup Wizard
 * 
 * Allows users to configure:
 * - Match Type (Single, Set-based, Tournament, Rotational)
 * - Mode (Casual or Competitive)
 * - Team Size (5v5, 3v3, 2v2, 1v1 for basketball)
 * - Stat Intensity (Basic, Advanced, Professional, Custom)
 */

'use client';

import React, { useEffect, useState } from 'react';
import { MatchTypePicker } from './MatchTypePicker';
import { TeamSizeStatsPicker } from './TeamSizeStatsPicker';
import { StepNavigation } from './StepNavigation';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { useAuth } from '@/hooks/useAuth';
import { SportType } from '@/lib/location-types';
import { MatchType, MatchMode } from '@/lib/match-types';
import { AccountType } from '@/lib/auth-types';
import { sportConfigService } from '@/lib/sportConfigService';

interface MatchConfigStepProps {
  selectedSport?: SportType;
  onNext?: () => void;
  onBack?: () => void;
}

export const MatchConfigStep: React.FC<MatchConfigStepProps> = ({
  selectedSport,
  onNext,
  onBack,
}) => {
  const { user } = useAuth();
  const {
    session,
    setMatchType,
    setTeamSize,
    setStatIntensity,
  } = useMatchSetupStore();

  const [localMatchType, setLocalMatchType] = useState<MatchType | undefined>(
    session.matchType
  );
  const [localMode, setLocalMode] = useState<MatchMode>(
    session.mode || MatchMode.Casual
  );
  const [localTeamSize, setLocalTeamSize] = useState(session.teamSize);
  const [localStatIntensity, setLocalStatIntensity] = useState(
    session.statIntensity
  );

  // Determine if user is a visitor
  const isVisitor = user?.accountType === AccountType.Visitor;

  // Force Casual mode for visitors
  const effectiveMode = isVisitor ? MatchMode.Casual : localMode;

  // Get sport config to validate available options
  const sportConfig = selectedSport
    ? sportConfigService.getConfig(selectedSport)
    : null;

  // Initialize defaults on mount if not already set
  useEffect(() => {
    if (!localMatchType && sportConfig?.matchTypes) {
      const firstEnabledType = sportConfig.matchTypes.find(
        (mt) => mt.enabled !== false
      )?.type;
      if (firstEnabledType) {
        setLocalMatchType(firstEnabledType);
      }
    }

    if (!localTeamSize && sportConfig?.teamSizeOptions.length) {
      setLocalTeamSize(sportConfig.teamSizeOptions[0]);
    }

    if (!localStatIntensity && sportConfig?.statIntensities?.length) {
      setLocalStatIntensity(sportConfig.statIntensities[0]);
    }
  }, [sportConfig, localMatchType, localTeamSize, localStatIntensity]);

  const handleSelectMatchType = (type: MatchType) => {
    setLocalMatchType(type);
  };

  const handleSelectMode = (mode: MatchMode) => {
    if (!isVisitor) {
      setLocalMode(mode);
    }
  };

  const handleSelectTeamSize = (size: any) => {
    setLocalTeamSize(size);
  };

  const handleSelectStatIntensity = (intensity: any) => {
    setLocalStatIntensity(intensity);
  };

  const handleNext = () => {
    if (localMatchType && localTeamSize && localStatIntensity) {
      // Update store
      setMatchType(localMatchType, effectiveMode);
      setTeamSize(localTeamSize);
      setStatIntensity(localStatIntensity);

      // Call parent callback
      onNext?.();
    }
  };

  const canProceed =
    !!localMatchType && !!localTeamSize && !!localStatIntensity;

  return (
    <div className="space-y-8">
      {!selectedSport && (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Please select a sport first
          </p>
        </div>
      )}

      {selectedSport && (
        <>
          {/* Match Type Section */}
          <MatchTypePicker
            sport={selectedSport}
            selectedType={localMatchType}
            selectedMode={effectiveMode}
            onSelectType={handleSelectMatchType}
            onSelectMode={handleSelectMode}
          />

          {/* Mode Restriction Notice for Visitors */}
          {isVisitor && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> As a visitor, you can only create casual
                matches. Sign up to access competitive match creation.
              </p>
            </div>
          )}

          {/* Team Size & Stat Intensity Section */}
          <TeamSizeStatsPicker
            sport={selectedSport}
            selectedTeamSize={localTeamSize}
            selectedStatIntensity={localStatIntensity}
            onSelectTeamSize={handleSelectTeamSize}
            onSelectStatIntensity={handleSelectStatIntensity}
          />

          {/* Navigation */}
          <StepNavigation
            onNext={handleNext}
            onBack={onBack || (() => {})}
            canProceed={canProceed}
            backLabel="Back"
            nextLabel="Next"
          />
        </>
      )}
    </div>
  );
};
