/**
 * Mobile Player Stat Card Component
 * Displays player stats with category-grouped stat buttons
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatButton } from './StatButton';
import { LivePlayerStats, LiveMatchStatButtons } from '../../lib/live-match-types';

interface PlayerStatCardProps {
  playerStats: LivePlayerStats;
  statButtons: LiveMatchStatButtons;
  onStatClick: (statKey: string, scoreValue?: number) => void;
  jerseyNo?: string;
}

export const PlayerStatCard: React.FC<PlayerStatCardProps> = ({
  playerStats,
  statButtons,
  onStatClick,
  jerseyNo
}) => {
  // Group buttons by category
  const groupedButtons = useMemo(() => {
    const groups: { [key: string]: Array<[string, any]> } = {};

    Object.entries(statButtons).forEach(([key, button]) => {
      const category = button.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push([key, button]);
    });

    return groups;
  }, [statButtons]);

  // Calculate total points
  const totalPoints = useMemo(() => {
    let points = 0;
    for (const [key, value] of Object.entries(playerStats.stats)) {
      const button = statButtons[key];
      if (button?.scoreValue) {
        points += value * button.scoreValue;
      }
    }
    return points;
  }, [playerStats.stats, statButtons]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.playerInfo}>
          {jerseyNo && <Text style={styles.jerseyNo}>#{jerseyNo}</Text>}
          <Text style={styles.playerName}>{playerStats.playerName}</Text>
        </View>

        {totalPoints > 0 && (
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{totalPoints} pts</Text>
          </View>
        )}
      </View>

      {/* Stat Buttons by Category */}
      {Object.entries(groupedButtons).map(([category, buttons]) => (
        <View key={category} style={styles.categoryGroup}>
          <Text style={styles.categoryLabel}>{category}</Text>
          <View style={styles.buttonGrid}>
            {buttons.map(([key, button]) => (
              <StatButton
                key={key}
                label={button.label}
                shortLabel={button.shortLabel}
                value={playerStats.stats[key] || 0}
                onClick={() => onStatClick(key, button.scoreValue)}
                color={button.color || '#6B7280'}
                size="sm"
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563'
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  jerseyNo: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600'
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  pointsBadge: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  pointsText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '600'
  },
  categoryGroup: {
    marginBottom: 12
  },
  categoryLabel: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  }
});
