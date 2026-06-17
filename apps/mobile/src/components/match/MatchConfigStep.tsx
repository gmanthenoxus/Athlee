/**
 * MatchConfigStep - Step 2 of Match Setup Wizard (React Native)
 * 
 * Allows users to configure:
 * - Match Type (Single, Set-based, Tournament, Rotational)
 * - Mode (Casual or Competitive)
 * - Team Size (5v5, 3v3, 2v2, 1v1 for basketball)
 * - Stat Intensity (Basic, Advanced, Professional, Custom)
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { useAuth } from '@/hooks/useAuth';
import { SportType } from '@/lib/location-types';
import { MatchType, MatchMode, AccountType } from '@/lib/match-types';
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

  const typeIcons: Record<MatchType, string> = {
    [MatchType.Single]: '🎯',
    [MatchType.SetBased]: '📊',
    [MatchType.Tournament]: '🏆',
    [MatchType.Rotational]: '🔄',
  };

  if (!selectedSport) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Please select a sport first
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const enabledMatchTypes = sportConfig?.matchTypes || [];
  const disabledTypes = enabledMatchTypes
    .filter(mt => mt.enabled === false)
    .map(mt => mt.type);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Match Type Section */}
        <Text style={styles.sectionTitle}>Match Type</Text>
        <View style={styles.grid}>
          {Object.values(MatchType).map((type) => {
            const isDisabled = disabledTypes.includes(type);
            const isSelected = localMatchType === type;

            return (
              <TouchableOpacity
                key={type}
                onPress={() => !isDisabled && handleSelectMatchType(type)}
                disabled={isDisabled}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                    borderColor: isSelected ? '#2563eb' : isDisabled ? '#d1d5db' : '#e5e7eb',
                    opacity: isDisabled ? 0.6 : 1,
                  },
                ]}
              >
                <Text style={styles.icon}>{typeIcons[type]}</Text>
                <Text style={styles.cardTitle}>{type}</Text>
                {isDisabled && (
                  <Text style={styles.comingSoon}>Coming Soon</Text>
                )}
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Mode Section */}
        <Text style={styles.sectionTitle}>Match Mode</Text>
        <View style={styles.modeContainer}>
          {Object.values(MatchMode).map((mode) => {
            const isSelected = effectiveMode === mode;

            return (
              <TouchableOpacity
                key={mode}
                onPress={() => handleSelectMode(mode)}
                disabled={isVisitor}
                style={[
                  styles.modeButton,
                  {
                    backgroundColor: isSelected ? '#dcfce7' : '#f3f4f6',
                    borderColor: isSelected ? '#16a34a' : '#d1d5db',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    { color: isSelected ? '#16a34a' : '#6b7280' },
                  ]}
                >
                  {mode === MatchMode.Casual ? '🎉' : '🏆'} {mode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Visitor Notice */}
        {isVisitor && (
          <View style={styles.visitorNotice}>
            <Text style={styles.visitorNoticeText}>
              <Text style={styles.visitorNoticeBold}>Note:</Text> As a visitor,
              you can only create casual matches. Sign up to access competitive
              match creation.
            </Text>
          </View>
        )}

        {/* Team Size Section */}
        <Text style={styles.sectionTitle}>Team Size</Text>
        <View style={styles.teamSizeContainer}>
          {sportConfig?.teamSizeOptions.map((size) => {
            const isSelected = localTeamSize?.label === size.label;

            return (
              <TouchableOpacity
                key={size.label}
                onPress={() => handleSelectTeamSize(size)}
                style={[
                  styles.teamSizeButton,
                  {
                    backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                    borderColor: isSelected ? '#2563eb' : '#e5e7eb',
                  },
                ]}
              >
                <Text style={styles.teamSizeLabel}>{size.label}</Text>
                <Text style={styles.teamSizeDetails}>
                  {size.playersPerTeam} players
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Stat Intensity Section */}
        <Text style={styles.sectionTitle}>Stat Intensity</Text>
        <View style={styles.statIntensityContainer}>
          {sportConfig?.statIntensities.map((intensity) => {
            const isSelected = localStatIntensity === intensity;

            return (
              <TouchableOpacity
                key={intensity}
                onPress={() => handleSelectStatIntensity(intensity)}
                style={[
                  styles.statIntensityButton,
                  {
                    backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                    borderColor: isSelected ? '#2563eb' : '#e5e7eb',
                  },
                ]}
              >
                <Text style={styles.statIntensityLabel}>{intensity}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !canProceed && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!canProceed}
          >
            <Text
              style={[
                styles.nextButtonText,
                !canProceed && styles.nextButtonTextDisabled,
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  warningBox: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#92400e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  comingSoon: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  visitorNotice: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  visitorNoticeText: {
    fontSize: 12,
    color: '#1e40af',
  },
  visitorNoticeBold: {
    fontWeight: '600',
  },
  teamSizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  teamSizeButton: {
    width: '48%',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  teamSizeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  teamSizeDetails: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  statIntensityContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statIntensityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  statIntensityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  nextButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  nextButtonTextDisabled: {
    color: '#9ca3af',
  },
});
