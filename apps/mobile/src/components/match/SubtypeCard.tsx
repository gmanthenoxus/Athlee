/**
 * SubtypeCard (React Native)
 * Displays a match subtype option
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MatchSubtypeConfig } from '@/lib/match-types';

interface SubtypeCardProps {
  config: MatchSubtypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const SubtypeCard: React.FC<SubtypeCardProps> = ({
  config,
  isSelected,
  onSelect,
}) => {
  const handlePress = () => {
    if (config.enabled) {
      onSelect(config.id);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!config.enabled}
      style={[
        styles.card,
        isSelected && config.enabled && styles.cardSelected,
        !config.enabled && styles.cardDisabled,
      ]}
    >
      {config.icon && <Text style={styles.icon}>{config.icon}</Text>}
      <Text style={[styles.name, !config.enabled && styles.textDisabled]}>
        {config.name}
      </Text>
      <Text style={[styles.description, !config.enabled && styles.textDisabled]}>
        {config.description}
      </Text>
      {config.fixedTeamSize && (
        <Text style={styles.fixedSize}>{config.fixedTeamSize} (fixed)</Text>
      )}
      {!config.enabled && config.tooltip && (
        <Text style={styles.tooltip}>{config.tooltip}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginVertical: 8,
  },
  cardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#e0e7ff',
  },
  cardDisabled: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    opacity: 0.5,
  },
  icon: {
    fontSize: 24,
    marginBottom: 6,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 3,
  },
  fixedSize: {
    fontSize: 9,
    color: '#9ca3af',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 4,
  },
  textDisabled: {
    color: '#9ca3af',
  },
  tooltip: {
    fontSize: 9,
    color: '#9ca3af',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 4,
  },
});
