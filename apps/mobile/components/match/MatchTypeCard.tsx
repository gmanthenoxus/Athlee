/**
 * MatchTypeCard (React Native)
 * Displays an individual match type option
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { MatchTypeConfig } from '@/lib/match-types';

interface MatchTypeCardProps {
  config: MatchTypeConfig;
  isSelected: boolean;
  onSelect: (config: MatchTypeConfig) => void;
  hasSubtypes: boolean;
}

export const MatchTypeCard: React.FC<MatchTypeCardProps> = ({
  config,
  isSelected,
  onSelect,
  hasSubtypes,
}) => {
  const handlePress = () => {
    if (config.enabled) {
      onSelect(config);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!config.enabled}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        !config.enabled && styles.cardDisabled,
      ]}
    >
      {isSelected && <Text style={styles.checkmark}>✓</Text>}
      <View style={styles.content}>
        {config.icon && <Text style={styles.icon}>{config.icon}</Text>}
        <View style={styles.titleSection}>
          <Text style={[styles.name, isSelected && styles.nameSelected]}>
            {config.name}
          </Text>
          {hasSubtypes && (
            <Text style={[styles.subtypeIndicator, isSelected && styles.subtypeIndicatorSelected]}>
              Subtypes
            </Text>
          )}
        </View>
        <Text
          style={[styles.description, isSelected && styles.descriptionSelected]}
          numberOfLines={2}
        >
          {config.description}
        </Text>
      </View>
      {!config.enabled && config.tooltip && (
        <Text style={styles.tooltip}>{config.tooltip}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  cardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  cardDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 24,
    marginRight: 4,
  },
  titleSection: {
    alignItems: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  nameSelected: {
    color: '#1e40af',
  },
  subtypeIndicator: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  subtypeIndicatorSelected: {
    color: '#3b82f6',
  },
  description: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  descriptionSelected: {
    color: '#3b82f6',
  },
  tooltip: {
    fontSize: 9,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 16,
    color: '#3b82f6',
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
