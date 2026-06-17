/**
 * TeamSizePicker (React Native)
 * Selects team size
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TeamSizeConfig } from '@/lib/match-types';

interface TeamSizePickerProps {
  options: TeamSizeConfig[];
  selectedTeamSize?: TeamSizeConfig;
  onSelectTeamSize: (teamSize: TeamSizeConfig) => void;
  disabled?: boolean;
  fixedSize?: string;
}

export const TeamSizePicker: React.FC<TeamSizePickerProps> = ({
  options,
  selectedTeamSize,
  onSelectTeamSize,
  disabled = false,
  fixedSize,
}) => {
  if (fixedSize) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Team Size</Text>
        <View style={styles.fixedContainer}>
          <Text style={styles.fixedText}>{fixedSize}</Text>
          <Text style={styles.fixedSubtext}>Fixed for this match type</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Team Size</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.label}
            onPress={() => onSelectTeamSize(option)}
            disabled={disabled}
            style={[
              styles.button,
              selectedTeamSize?.label === option.label && styles.buttonSelected,
              disabled && styles.buttonDisabled,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedTeamSize?.label === option.label &&
                  styles.buttonTextSelected,
              ]}
            >
              {option.label}
            </Text>
            <Text
              style={[
                styles.buttonSubtext,
                selectedTeamSize?.label === option.label &&
                  styles.buttonSubtextSelected,
              ]}
            >
              {option.substitutes > 0 ? `+${option.substitutes} subs` : 'No subs'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: 0,
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  buttonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  buttonTextSelected: {
    color: '#1e40af',
  },
  buttonSubtext: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  buttonSubtextSelected: {
    color: '#1e40af',
  },
  fixedContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#93c5fd',
    backgroundColor: '#eff6ff',
    alignItems: 'center',
  },
  fixedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  fixedSubtext: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
});
