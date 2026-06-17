/**
 * Mobile Scoreboard Component
 * Displays team scores and period information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreboardProps {
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  period: number;
  periodType: 'quarter' | 'half';
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  period,
  periodType
}) => {
  const periodLabel =
    periodType === 'quarter'
      ? `Q${period}`
      : periodType === 'half'
        ? `H${period}`
        : `P${period}`;

  return (
    <View style={styles.container}>
      {/* Period Label */}
      <View style={styles.periodContainer}>
        <Text style={styles.periodLabel}>{periodLabel}</Text>
        <Text style={styles.liveIndicator}>● LIVE</Text>
      </View>

      {/* Scores */}
      <View style={styles.scoreRow}>
        {/* Team A */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>{teamAName}</Text>
          <Text style={styles.score}>{teamAScore}</Text>
        </View>

        {/* VS */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>vs</Text>
        </View>

        {/* Team B */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>{teamBName}</Text>
          <Text style={styles.score}>{teamBScore}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    marginBottom: 16
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8
  },
  periodLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  liveIndicator: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: 'bold'
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center'
  },
  teamName: {
    color: '#D1D5DB',
    fontSize: 12,
    marginBottom: 4
  },
  score: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold'
  },
  vsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  vsText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600'
  }
});
