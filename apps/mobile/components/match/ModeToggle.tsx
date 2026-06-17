/**
 * ModeToggle (React Native)
 * Toggle between Casual and Competitive modes
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MatchMode } from '@/lib/match-types';

interface ModeToggleProps {
  selectedMode?: MatchMode;
  onSelectMode: (mode: MatchMode) => void;
  disabled?: boolean;
}

const modeInfo: Record<MatchMode, string> = {
  [MatchMode.Casual]: '👕 Relaxed rules, friends playing for fun',
  [MatchMode.Competitive]: '🏆 Strict rules, jersey numbers required',
};

export const ModeToggle: React.FC<ModeToggleProps> = ({
  selectedMode = MatchMode.Casual,
  onSelectMode,
  disabled = false,
}) => {
  const modes = [MatchMode.Casual, MatchMode.Competitive];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Match Mode</Text>
      <View style={styles.buttonsRow}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => onSelectMode(mode)}
            disabled={disabled}
            style={[
              styles.modeButton,
              selectedMode === mode && styles.modeButtonSelected,
              disabled && styles.modeButtonDisabled,
            ]}
          >
            <Text
              style={[
                styles.modeName,
                selectedMode === mode && styles.modeNameSelected,
              ]}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.infoText}>{modeInfo[selectedMode]}</Text>
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
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  modeButtonDisabled: {
    opacity: 0.5,
  },
  modeName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  modeNameSelected: {
    color: '#1e40af',
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 10,
    textAlign: 'center',
  },
});
