/**
 * MatchTypeCard (React Native)
 * Displays a match type option
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MatchTypeConfig } from '@/lib/match-types';

interface MatchTypeCardProps {
  config: MatchTypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  hasSubtypes?: boolean;
}

export const MatchTypeCard: React.FC<MatchTypeCardProps> = ({
  config,
  isSelected,
  onSelect,
  hasSubtypes = false,
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
      {hasSubtypes && !isSelected && (
        <Text style={styles.subtypesHint}>→ Subtypes</Text>
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
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  cardDisabled: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    opacity: 0.5,
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  subtypesHint: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 4,
  },
  textDisabled: {
    color: '#9ca3af',
  },
  tooltip: {
    fontSize: 10,
    color: '#9ca3af',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 4,
  },
});
