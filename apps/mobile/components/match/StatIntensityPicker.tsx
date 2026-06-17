/**
 * StatIntensityPicker (React Native)
 * Selects stat tracking intensity
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatIntensity } from '@/lib/match-types';

interface StatIntensityPickerProps {
  options: StatIntensity[];
  selectedIntensity?: StatIntensity;
  onSelectIntensity: (intensity: StatIntensity) => void;
  disabled?: boolean;
}

const intensityDescriptions: Record<StatIntensity, string> = {
  [StatIntensity.Basic]: 'Points only',
  [StatIntensity.Advanced]: 'Points, Rebounds, Assists, Steals, Blocks',
  [StatIntensity.Professional]: 'Advanced + Shooting Splits',
  [StatIntensity.Custom]: 'Custom tracked stats',
};

export const StatIntensityPicker: React.FC<StatIntensityPickerProps> = ({
  options,
  selectedIntensity,
  onSelectIntensity,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Stat Tracking</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelectIntensity(option)}
            disabled={disabled}
            style={[
              styles.optionButton,
              selectedIntensity === option && styles.optionButtonSelected,
              disabled && styles.optionButtonDisabled,
            ]}
          >
            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionName,
                  selectedIntensity === option && styles.optionNameSelected,
                ]}
              >
                {option}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  selectedIntensity === option && styles.optionDescriptionSelected,
                ]}
              >
                {intensityDescriptions[option]}
              </Text>
            </View>
            {selectedIntensity === option && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionButtonSelected: {
    borderColor: '#a855f7',
    backgroundColor: '#faf5ff',
  },
  optionButtonDisabled: {
    opacity: 0.5,
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  optionNameSelected: {
    color: '#7e22ce',
  },
  optionDescription: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  optionDescriptionSelected: {
    color: '#7e22ce',
  },
  checkmark: {
    fontSize: 18,
    color: '#a855f7',
    marginLeft: 8,
  },
});
