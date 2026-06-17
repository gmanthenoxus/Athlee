import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { MatchStats, SportStatSchema } from '@/lib/stat-types';
import { statSchemaService } from '@/lib/statSchemaService';
import { SportType } from '@/lib/location-types';

interface StatsTableProps {
  matchStats: MatchStats;
  sport: SportType;
  statIntensity: string;
  teamNames: [string, string];
}

/**
 * Mobile read-only stats display (React Native)
 */
export function StatsTable({
  matchStats,
  sport,
  statIntensity,
  teamNames
}: StatsTableProps) {
  const schema = statSchemaService.getSchema(sport, statIntensity);

  if (!schema) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#6b7280' }}>Stats schema not found</Text>
      </SafeAreaView>
    );
  }

  const recordedDate = new Date(matchStats.recordedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView>
        {/* Final Score Card */}
        <View style={{
          backgroundColor: '#dcfce7',
          borderLeftWidth: 4,
          borderLeftColor: '#22c55e',
          margin: 16,
          padding: 16,
          borderRadius: 8
        }}>
          <Text style={{ fontSize: 12, color: '#15803d', marginBottom: 8 }}>
            Final Score
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#15803d' }}>
                {matchStats.finalScore?.teamA || 0}
              </Text>
              <Text style={{ fontSize: 12, color: '#15803d', marginTop: 4 }}>
                {teamNames[0]}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#15803d' }}>vs</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#15803d' }}>
                {matchStats.finalScore?.teamB || 0}
              </Text>
              <Text style={{ fontSize: 12, color: '#15803d', marginTop: 4 }}>
                {teamNames[1]}
              </Text>
            </View>
          </View>
        </View>

        {/* Team Stats Sections */}
        {matchStats.teamStats.map((teamStat, teamIndex) => {
          const teamName = teamIndex === 0 ? teamNames[0] : teamNames[1];
          const teamPlayers = matchStats.playerStats.filter(p => {
            const playerTeamIndex = matchStats.playerStats.indexOf(p) < matchStats.playerStats.length / 2 ? 0 : 1;
            return playerTeamIndex === teamIndex;
          });

          return (
            <View key={teamStat.teamId} style={{ marginBottom: 16 }}>
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
                  {teamPlayers.length} players • {teamIndex === 0 ? matchStats.finalScore?.teamA || 0 : matchStats.finalScore?.teamB || 0} points
                </Text>
              </View>

              {/* Player Rows */}
              {teamPlayers.map((player, idx) => (
                <View
                  key={player.playerId}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f3f4f6',
                    backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white'
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '500', color: '#111827', marginBottom: 8 }}>
                    {player.playerName}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                    {schema.statKeys.map((stat) => {
                      const value = player.values[stat.id] || 0;
                      return (
                        <View key={stat.id} style={{ alignItems: 'center' }}>
                          <Text style={{ fontSize: 11, fontWeight: '600', color: '#9ca3af' }}>
                            {stat.abbreviation}
                          </Text>
                          <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827', marginTop: 2 }}>
                            {value}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          );
        })}

        {/* Recorded Info */}
        <View style={{
          backgroundColor: '#f3f4f6',
          marginHorizontal: 16,
          marginBottom: 24,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 6,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 11, color: '#6b7280' }}>
            Recorded on {recordedDate}
          </Text>
          {matchStats.recordedBy && (
            <Text style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>
              by {matchStats.recordedBy}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
