import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { matchService } from '@/lib/matchService';
import { locationService } from '@/lib/locationService';
import type { Match, MatchMode, MatchType } from '@/lib/match-types';
import { MatchStatus } from '@/lib/match-types';
import { SportType } from '@/lib/location-types';
import { FinalizationStep } from '@/components/match/FinalizationStep';

const STEPS = ['Sport', 'Config', 'Location', 'Teams', 'Rules', 'Officials', 'Finalize'];

export default function MatchCreateScreen() {
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

  useEffect(() => {
    initializeSession('current-user', false);
  }, [initializeSession]);

  const currentStep = session.step;
  const selectedSport = session.sport;
  const selectedMode = session.mode;
  const selectedTeamSize = session.teamSize;
  const selectedLocation = session.locationId;
  const teams = session.teams;
  const rules = session.rules;
  const officials = session.officials;
  const schedule = session.schedule;
  const privacy = session.privacy;

  const selectedMatchType = (() => {
    const typeMap: Record<string, MatchType> = {
      'single': 'Single' as MatchType,
      'set-based': 'SetBased' as MatchType,
      'tournament': 'Tournament' as MatchType,
      'rotational': 'Rotational' as MatchType,
    };
    return session.matchTypeId ? typeMap[session.matchTypeId] : undefined;
  })();

  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    if (currentStep === 0) {
      resetSession();
      router.back();
    } else {
      let prevStep = currentStep - 1;
      if (currentStep === 6 && selectedMode === MatchMode.Casual) {
        prevStep = 4;
      }
      if (prevStep >= 0) {
        setStep(prevStep);
      }
    }
  };

  const handleNext = () => {
    let nextStep = currentStep + 1;
    if (currentStep === 4 && selectedMode === MatchMode.Casual) {
      nextStep = 6;
    }
    if (nextStep <= STEPS.length - 1) {
      setStep(nextStep);
    }
  };

  const handleEditStep = (stepNum: number) => {
    setStep(stepNum);
  };

  const handleCreateMatch = async () => {
    try {
      setLoading(true);

      if (!selectedSport || !teams || teams.length === 0) {
        Alert.alert('Incomplete', 'Please complete all required fields');
        setLoading(false);
        return;
      }

      const matchData: Partial<Match> = {
        sport: selectedSport,
        type: selectedMatchType || 'Single' as MatchType,
        mode: selectedMode || 'Casual' as MatchMode,
        teamSize: selectedTeamSize,
        status: schedule === null ? MatchStatus.InProgress : MatchStatus.Scheduled,
        date: schedule?.toISOString() || new Date().toISOString(),
        locationId: selectedLocation,
        teams: teams,
        rules: rules,
        officials: officials,
        privacy: privacy || 'public',
        createdBy: 'current-user'
      };

      const match = matchService.createMatch(matchData);
      resetSession();
      router.push(`/matches/${match.id}`);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create match');
      setLoading(false);
    }
  };

  const isFinalizationStep = currentStep === STEPS.length - 1;

  if (isFinalizationStep) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleBack}
              style={{ padding: 8 }}
            >
              <ChevronLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
              Step {currentStep + 1} of {STEPS.length}
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
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
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          paddingBottom: 24,
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          backgroundColor: 'white',
          flexDirection: 'row',
          gap: 12
        }}>
          <TouchableOpacity
            onPress={handleBack}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#d1d5db',
              backgroundColor: 'white'
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', textAlign: 'center' }}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCreateMatch}
            disabled={loading}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Plus size={18} color="white" />
                <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>
                  Create Match
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // For other steps, show a placeholder message
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', paddingHorizontal: 16 }}>
        Match creation wizard - Step {currentStep + 1} not yet implemented for mobile
      </Text>
      <TouchableOpacity
        onPress={() => handleNext()}
        style={{
          marginTop: 20,
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: '#2563eb',
          borderRadius: 8
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Next Step</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
