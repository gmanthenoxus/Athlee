import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MatchHistoryEntry } from '@/lib/leaderboard-types';

interface MatchHistoryCardProps {
  match: MatchHistoryEntry;
}

/**
 * Mobile match history card
 */
export function MatchHistoryCard({ match }: MatchHistoryCardProps) {
  const router = useRouter();

  const formattedDate = new Date(match.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const resultColor =
    match.result === 'win'
      ? { bg: '#dcfce7', text: '#166534' }
      : match.result === 'loss'
        ? { bg: '#fee2e2', text: '#991b1b' }
        : { bg: '#f3f4f6', text: '#4b5563' };

  const resultText = match.result === 'win' ? 'W' : match.result === 'loss' ? 'L' : 'D';

  const userTeamName = match.userTeam === 'A' ? match.teamAName : match.teamBName;
  const userTeamScore = match.userTeam === 'A' ? match.teamAScore : match.teamBScore;
  const opponentTeamName = match.userTeam === 'A' ? match.teamBName : match.teamAName;
  const opponentTeamScore = match.userTeam === 'A' ? match.teamBScore : match.teamAScore;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/matches/${match.matchId}`)}
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 8
      }}
    >
      {/* Header: Date and Sport */}
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 10, color: '#6b7280', fontWeight: '500', textTransform: 'uppercase' }}>
          {match.sport}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#111827', marginTop: 2 }}>
          {formattedDate}
        </Text>
      </View>

      {/* Score */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#111827', marginBottom: 2 }}>
            {userTeamName}
          </Text>
          <Text style={{ fontSize: 11, color: '#6b7280' }}>You</Text>
        </View>

        <View style={{ alignItems: 'center', paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>
            {userTeamScore}-{opponentTeamScore}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#111827', marginBottom: 2 }}>
            {opponentTeamName}
          </Text>
          <Text style={{ fontSize: 11, color: '#6b7280' }}>Opponent</Text>
        </View>
      </View>

      {/* Stats and Result */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {match.userPoints !== undefined && (
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#111827' }}>
              {match.userPoints}pts
            </Text>
          )}
          {match.userRebounds !== undefined && (
            <Text style={{ fontSize: 11, color: '#6b7280' }}>
              {match.userRebounds}reb
            </Text>
          )}
          {match.userAssists !== undefined && (
            <Text style={{ fontSize: 11, color: '#6b7280' }}>
              {match.userAssists}ast
            </Text>
          )}
        </View>

        <View style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          backgroundColor: resultColor.bg
        }}>
          <Text style={{ fontSize: 11, fontWeight: '600', color: resultColor.text }}>
            {resultText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
