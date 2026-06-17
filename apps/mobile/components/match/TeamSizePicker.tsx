/**
 * TeamSizePicker (React Native)
 * Horizontal scroll picker for team sizes
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
  selectedSize?: TeamSizeConfig;
  onSelectSize: (size: TeamSizeConfig) => void;
  fixedSize?: string;
  disabled?: boolean;
}

export const TeamSizePicker: React.FC<TeamSizePickerProps> = ({
  options,
  selectedSize,
  onSelectSize,
  fixedSize,
  disabled = false,
}) => {
  // If fixed size, show as info display
  if (fixedSize && !options.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Team Size</Text>
        <View style={styles.fixedSizeContainer}>
          <Text style={styles.fixedSizeText}>{fixedSize}</Text>
          <Text style={styles.fixedSizeInfo}>(fixed for this challenge type)</Text>
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
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((size) => {
          const subsText = size.substitutes > 0 ? `+${size.substitutes} subs` : 'No subs';
          const isSelected =
            selectedSize?.label === size.label;

          return (
            <TouchableOpacity
              key={size.label}
              onPress={() => onSelectSize(size)}
              disabled={disabled}
              style={[
                styles.sizeButton,
                isSelected && styles.sizeButtonSelected,
                disabled && styles.sizeButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.sizeLabel,
                  isSelected && styles.sizeLabelSelected,
                ]}
              >
                {size.label}
              </Text>
              <Text
                style={[
                  styles.sizeInfo,
                  isSelected && styles.sizeInfoSelected,
                ]}
              >
                {subsText}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  scrollContent: {
    paddingRight: 16,
    gap: 10,
  },
  sizeButton: {
    minWidth: 70,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  sizeButtonDisabled: {
    opacity: 0.5,
  },
  sizeLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  sizeLabelSelected: {
    color: '#1e40af',
  },
  sizeInfo: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  sizeInfoSelected: {
    color: '#3b82f6',
  },
  fixedSizeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  fixedSizeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  fixedSizeInfo: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
});
