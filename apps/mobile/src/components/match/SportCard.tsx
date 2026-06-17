/**
 * SportCard Component (React Native)
 * 
 * Individual sport card for the sport picker.
 * Shows sport icon, name, and selection state.
 * Handles disabled state with "Coming Soon" overlay.
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type { SportConfig } from '@/lib/match-types';

interface SportCardProps {
  sport: SportConfig;
  isSelected: boolean;
  onSelect: () => void;
}

export const SportCard: React.FC<SportCardProps> = ({
  sport,
  isSelected,
  onSelect,
}) => {
  const handlePress = () => {
    if (sport.enabled) {
      onSelect();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!sport.enabled}
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
          borderColor: isSelected ? '#2563eb' : '#e5e7eb',
          opacity: sport.enabled ? 1 : 0.6,
        },
      ]}
    >
      {/* Icon */}
      <Text style={styles.icon}>{sport.icon}</Text>

      {/* Sport Name */}
      <Text style={styles.sportName} numberOfLines={1}>
        {sport.displayName}
      </Text>

      {/* Description */}
      {sport.description && (
        <Text style={styles.description} numberOfLines={2}>
          {sport.description}
        </Text>
      )}

      {/* Selected Checkmark */}
      {isSelected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}

      {/* Coming Soon Overlay */}
      {!sport.enabled && (
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>COMING SOON</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  sportName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  comingSoonBadge: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
