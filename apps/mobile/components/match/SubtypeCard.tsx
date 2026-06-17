/**
 * SubtypeCard (React Native)
 * Displays an individual match subtype option
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { MatchSubtypeConfig } from '@/lib/match-types';

interface SubtypeCardProps {
  config: MatchSubtypeConfig;
  isSelected: boolean;
  onSelect: (config: MatchSubtypeConfig) => void;
}

export const SubtypeCard: React.FC<SubtypeCardProps> = ({
  config,
  isSelected,
  onSelect,
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
          {config.fixedTeamSize && (
            <Text style={[styles.fixedSize, isSelected && styles.fixedSizeSelected]}>
              {config.fixedTeamSize}
            </Text>
          )}
        </View>
        <Text
          style={[styles.description, isSelected && styles.descriptionSelected]}
          numberOfLines={1}
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
    height: 140,
  },
  cardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f4ff',
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
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  icon: {
    fontSize: 20,
    marginRight: 4,
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  nameSelected: {
    color: '#4f46e5',
  },
  fixedSize: {
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2,
  },
  fixedSizeSelected: {
    color: '#6366f1',
  },
  description: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  descriptionSelected: {
    color: '#6366f1',
  },
  tooltip: {
    fontSize: 9,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
  checkmark: {
    fontSize: 14,
    color: '#6366f1',
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
