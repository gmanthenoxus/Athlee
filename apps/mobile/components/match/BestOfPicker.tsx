/**
 * BestOfPicker (React Native)
 * Selects best-of series count (3 or 5)
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface BestOfPickerProps {
  selectedBestOf?: number;
  onSelectBestOf: (count: number) => void;
  disabled?: boolean;
}

export const BestOfPicker: React.FC<BestOfPickerProps> = ({
  selectedBestOf = 3,
  onSelectBestOf,
  disabled = false,
}) => {
  const options = [3, 5];

  const getFirstToWins = (bestOf: number): number => {
    return Math.floor(bestOf / 2) + 1;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Series Format</Text>
      <View style={styles.buttonsRow}>
        {options.map((count) => {
          const firstToWins = getFirstToWins(count);
          return (
            <TouchableOpacity
              key={count}
              onPress={() => onSelectBestOf(count)}
              disabled={disabled}
              style={[
                styles.bestOfButton,
                selectedBestOf === count && styles.bestOfButtonSelected,
                disabled && styles.bestOfButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.bestOfLabel,
                  selectedBestOf === count && styles.bestOfLabelSelected,
                ]}
              >
                Best of {count}
              </Text>
              <Text
                style={[
                  styles.firstToWins,
                  selectedBestOf === count && styles.firstToWinsSelected,
                ]}
              >
                First to {firstToWins}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  bestOfButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestOfButtonSelected: {
    borderColor: '#f97316',
    backgroundColor: '#fff7ed',
  },
  bestOfButtonDisabled: {
    opacity: 0.5,
  },
  bestOfLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  bestOfLabelSelected: {
    color: '#ea580c',
  },
  firstToWins: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
  firstToWinsSelected: {
    color: '#f97316',
  },
});
