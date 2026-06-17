/**
 * ModeToggle (React Native)
 * Selects between Casual and Competitive match modes
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MatchMode } from '@/lib/match-types';

interface ModeToggleProps {
  selectedMode?: MatchMode;
  onSelectMode: (mode: MatchMode) => void;
  disabled?: boolean;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  selectedMode,
  onSelectMode,
  disabled = false,
}) => {
  const modes = [
    { label: '👕 Casual', value: MatchMode.Casual },
    { label: '🏆 Competitive', value: MatchMode.Competitive },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Match Mode</Text>
      <View style={styles.toggleContainer}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.value}
            onPress={() => onSelectMode(mode.value)}
            disabled={disabled}
            style={[
              styles.button,
              selectedMode === mode.value && styles.buttonSelected,
              disabled && styles.buttonDisabled,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedMode === mode.value && styles.buttonTextSelected,
              ]}
            >
              {mode.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedMode === MatchMode.Casual && (
        <Text style={styles.info}>
          ℹ️ Casual matches are simplified and welcoming to all skill levels.
        </Text>
      )}
      {selectedMode === MatchMode.Competitive && (
        <Text style={styles.warningInfo}>
          ℹ️ Competitive matches require jersey numbers and stricter validation.
        </Text>
      )}
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
  toggleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#3b82f6',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  buttonTextSelected: {
    color: '#fff',
  },
  info: {
    fontSize: 11,
    color: '#2563eb',
    marginTop: 8,
  },
  warningInfo: {
    fontSize: 11,
    color: '#b45309',
    marginTop: 8,
  },
});
