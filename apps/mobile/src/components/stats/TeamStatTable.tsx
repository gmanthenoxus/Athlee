import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { StatKey, PlayerMatchStat, SportStatSchema } from '@/lib/stat-types';
import { StatInput } from './StatInput';

interface TeamStatTableProps {
  teamName: string;
  players: PlayerMatchStat[];
  statKeys: StatKey[];
  onChange: (updatedPlayers: PlayerMatchStat[]) => void;
}

/**
 * Mobile team stat table (React Native)
 * Displays one team's players with stat input fields
 */
export function TeamStatTable({
  teamName,
  players,
  statKeys,
  onChange
}: TeamStatTableProps) {
  const handlePlayerStatChange = (playerIndex: number, statId: string, value: number) => {
    const updated = [...players];
    updated[playerIndex].values[statId] = value;
    onChange(updated);
  };

  return (
    <View style={{ marginBottom: 24 }}>
      {/* Team Header */}
      <View style={{
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
      }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
          {teamName}
        </Text>
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
          {players.length} {players.length === 1 ? 'player' : 'players'}
        </Text>
      </View>

      {/* Player Rows */}
      {players.map((player, playerIndex) => (
        <View
          key={player.playerId}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
            backgroundColor: playerIndex % 2 === 0 ? 'white' : '#fafafa'
          }}
        >
          {/* Player Name */}
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#111827', marginBottom: 12 }}>
            {player.playerName}
          </Text>

          {/* Stats Grid - Group by chunks of 3 for readability on narrow screens */}
          {Array.from({ length: Math.ceil(statKeys.length / 3) }).map((_, groupIdx) => {
            const startIdx = groupIdx * 3;
            const endIdx = Math.min(startIdx + 3, statKeys.length);
            const statGroup = statKeys.slice(startIdx, endIdx);

            return (
              <View
                key={`${player.playerId}-group-${groupIdx}`}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: groupIdx < Math.ceil(statKeys.length / 3) - 1 ? 12 : 0
                }}
              >
                {statGroup.map((stat) => (
                  <View key={stat.id} style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 6 }}>
                      {stat.abbreviation}
                    </Text>
                    <StatInput
                      value={player.values[stat.id] || 0}
                      onChange={(value) => handlePlayerStatChange(playerIndex, stat.id, value)}
                      statAbbreviation={stat.abbreviation}
                    />
                  </View>
                ))}
                {/* Fill empty space if group has fewer than 3 items */}
                {Array.from({ length: 3 - (endIdx - startIdx) }).map((_, i) => (
                  <View key={`empty-${i}`} style={{ width: '33%' }} />
                ))}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
