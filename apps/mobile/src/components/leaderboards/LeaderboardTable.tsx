import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LeaderboardEntry } from '@/lib/leaderboard-types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  statKey: string;
  currentUserId?: string;
}

/**
 * Mobile Leaderboard Table
 */
export function LeaderboardTable({
  entries,
  statKey,
  currentUserId
}: LeaderboardTableProps) {
  const router = useRouter();

  const statLabel = {
    points: 'Pts',
    rebounds: 'Reb',
    assists: 'Ast',
    steals: 'Stl',
    blocks: 'Blk',
    gamesPlayed: 'Games'
  }[statKey] || statKey;

  const getMedalEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const renderRow = ({ item }: { item: LeaderboardEntry }) => {
    const isCurrentUser = item.userId === currentUserId;
    const bgColor = isCurrentUser ? '#eff6ff' : '#fff';

    return (
      <TouchableOpacity
        onPress={() => router.push(`/profile/${item.userId}`)}
        style={{
          backgroundColor: bgColor,
          borderBottomWidth: 1,
          borderBottomColor: '#f3f4f6',
          paddingVertical: 12,
          paddingHorizontal: 12
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {/* Rank and Medal */}
          <View style={{ width: 32, alignItems: 'center' }}>
            {item.rank <= 3 ? (
              <Text style={{ fontSize: 18 }}>{getMedalEmoji(item.rank)}</Text>
            ) : (
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#374151' }}>
                #{item.rank}
              </Text>
            )}
          </View>

          {/* Player Info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: '#3b82f6',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>
                  {item.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: isCurrentUser ? '#1e40af' : '#111827'
                }}>
                  {item.username}
                </Text>
                {isCurrentUser && (
                  <Text style={{ fontSize: 10, color: '#3b82f6', fontWeight: '500' }}>
                    You
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Stat Value */}
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827' }}>
              {Math.round(item.value)}
            </Text>
            <Text style={{ fontSize: 10, color: '#6b7280' }}>
              {statLabel}
            </Text>
          </View>

          {/* Win Rate */}
          <View style={{ width: 40, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#111827' }}>
              {(item.winRate * 100).toFixed(0)}%
            </Text>
            <Text style={{ fontSize: 9, color: '#6b7280' }}>WR</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' }}>
      {/* Header */}
      <View style={{
        backgroundColor: '#f3f4f6',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      }}>
        <Text style={{ width: 32, fontSize: 10, fontWeight: '600', color: '#6b7280' }}>Rank</Text>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: '600', color: '#6b7280' }}>Player</Text>
        <Text style={{ width: 40, textAlign: 'right', fontSize: 10, fontWeight: '600', color: '#6b7280' }}>
          {statLabel}
        </Text>
        <Text style={{ width: 40, textAlign: 'right', fontSize: 10, fontWeight: '600', color: '#6b7280' }}>
          WR
        </Text>
      </View>

      {/* Rows */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.userId}
        renderItem={renderRow}
        scrollEnabled={false}
      />

      {/* Footer */}
      <View style={{
        backgroundColor: '#f9fafb',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingHorizontal: 12,
        paddingVertical: 8
      }}>
        <Text style={{ fontSize: 9, color: '#6b7280', textAlign: 'center' }}>
          WR = Win Rate • Games Played shown below player name
        </Text>
      </View>
    </View>
  );
}
