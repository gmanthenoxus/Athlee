/**
 * MatchTypeConfigurator (React Native)
 * Main Step 2 component: Match Type Configuration
 * Orchestrates: MatchTypeCard, SubtypeCard, ModeToggle, TeamSizePicker, StatIntensityPicker, BestOfPicker
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { MatchTypeCard } from './MatchTypeCard';
import { SubtypeCard } from './SubtypeCard';
import { ModeToggle } from './ModeToggle';
import { TeamSizePicker } from './TeamSizePicker';
import { StatIntensityPicker } from './StatIntensityPicker';
import { BestOfPicker } from './BestOfPicker';
import { SportType } from '@/lib/location-types';
import { sportConfigService } from '@/lib/sportConfigService';

interface MatchTypeConfiguratorProps {
  onNavigateNext: () => void;
  onNavigateBack: () => void;
}

export const MatchTypeConfigurator: React.FC<MatchTypeConfiguratorProps> = ({
  onNavigateNext,
  onNavigateBack,
}) => {
  const {
    session,
    getMatchTypes,
    getSubtypesForType,
    canProceedStep2,
    setMatchTypeId,
    setSubtypeId,
    setMode,
    setTeamSize,
    setStatIntensity,
    setBestOf,
  } = useMatchSetupStore();

  // Pre-select defaults on mount if sport is selected
  useEffect(() => {
    if (session.sport && !session.matchTypeId) {
      const matchTypes = getMatchTypes(session.sport);
      if (matchTypes.length > 0) {
        const defaultType = matchTypes[0];
        setMatchTypeId(defaultType.id);

        // If type has subtypes, select first one
        if (defaultType.subtypes && defaultType.subtypes.length > 0) {
          setSubtypeId(defaultType.subtypes[0].id);
        }
      }
    }
  }, [session.sport, session.matchTypeId]);

  // Verify sport is selected
  if (!session.sport) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No sport selected. Please go back.</Text>
      </View>
    );
  }

  const matchTypes = getMatchTypes(session.sport);
  const selectedType = matchTypes.find((t) => t.id === session.matchTypeId);
  const subtypes = selectedType ? getSubtypesForType(session.sport, selectedType.id) : [];
  const selectedSubtype = selectedType?.subtypes?.find((s) => s.id === session.subtypeId);

  const showSubtypes = selectedType?.subtypes && selectedType.subtypes.length > 0;
  const showTeamSize = selectedType?.requiresTeamSize || selectedSubtype?.requiresTeamSize;
  const showStatIntensity =
    selectedType?.requiresStatIntensity || selectedSubtype?.requiresStatIntensity;
  const showBestOf = selectedSubtype?.requiresBestOf;

  const canProceed = canProceedStep2();

  const handleNextPress = () => {
    if (!canProceed) {
      Alert.alert('Incomplete', 'Please configure all required options to proceed.');
      return;
    }
    onNavigateNext();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.stepNumber}>Step 2 of 7</Text>
        <Text style={styles.title}>Match Configuration</Text>
        <Text style={styles.subtitle}>Choose match type and settings</Text>
      </View>

      {/* Match Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Match Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.matchTypesScroll}
        >
          {matchTypes.map((item) => (
            <View key={item.id} style={styles.matchTypeCardContainer}>
              <MatchTypeCard
                config={item}
                isSelected={session.matchTypeId === item.id}
                onSelect={() => setMatchTypeId(item.id)}
                hasSubtypes={!!(item.subtypes && item.subtypes.length > 0)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Subtype Selection (if applicable) */}
      {showSubtypes && selectedType && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subtypesScroll}
          >
            {subtypes.map((item) => (
              <View key={item.id} style={styles.subtypeCardContainer}>
                <SubtypeCard
                  config={item}
                  isSelected={session.subtypeId === item.id}
                  onSelect={() => setSubtypeId(item.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Mode Selection (if match type selected) */}
      {selectedType && (
        <View style={styles.section}>
          <ModeToggle
            selectedMode={session.mode}
            onSelectMode={(mode) => setMode(mode)}
          />
        </View>
      )}

      {/* Team Size (if applicable) */}
      {showTeamSize && selectedType && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Size</Text>
          <TeamSizePicker
            options={selectedSubtype?.teamSizes || selectedType.teamSizes || []}
            selectedSize={session.teamSize}
            onSelectSize={(size) => setTeamSize(size)}
            fixedSize={selectedSubtype?.fixedTeamSize}
          />
        </View>
      )}

      {/* Stat Intensity (if applicable) */}
      {showStatIntensity && selectedType && (
        <View style={styles.section}>
          <StatIntensityPicker
            options={selectedSubtype?.statIntensities || selectedType.statIntensities || []}
            selectedIntensity={session.statIntensity}
            onSelectIntensity={(intensity) => setStatIntensity(intensity)}
          />
        </View>
      )}

      {/* Best Of Selection (if applicable) */}
      {showBestOf && selectedSubtype && (
        <View style={styles.section}>
          <BestOfPicker
            selectedBestOf={session.bestOf}
            onSelectBestOf={(num) => setBestOf(num)}
          />
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={onNavigateBack}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text style={styles.buttonTextSecondary}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPress}
          style={[styles.button, styles.buttonPrimary, !canProceed && styles.buttonDisabled]}
          disabled={!canProceed}
        >
          <Text style={styles.buttonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#7f1d1d',
    textAlign: 'center',
  },
  header: {
    marginBottom: 24,
  },
  stepNumber: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  separator: {
    height: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  matchTypesScroll: {
    paddingRight: 16,
    gap: 8,
  },
  matchTypeCardContainer: {
    minWidth: 160,
  },
  subtypesScroll: {
    paddingRight: 16,
    gap: 8,
  },
  subtypeCardContainer: {
    minWidth: 140,
  },
  button: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
  },
  buttonSecondary: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  buttonTextSecondary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
