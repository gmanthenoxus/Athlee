import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Match, MatchStatus } from '@/lib/match-types';
import { PlayerMatchStat, SportStatSchema } from '@/lib/stat-types';
import { statSchemaService } from '@/lib/statSchemaService';
import { statEntryService } from '@/lib/statEntryService';
import { statAggregator } from '@/lib/statAggregator';
import { statsAggregationService } from '@/lib/statsAggregationService';
import { matchService } from '@/lib/matchService';
import { playerClaimService } from '@/lib/playerClaimService';
import { StatInput } from './StatInput';

interface StatEntryFormProps {
  match: Match;
  onSave?: (matchStats: any) => void;
  onCancel?: () => void;
}

/**
 * Mobile stat entry form (React Native)
 */
export function StatEntryForm({
  match,
  onSave,
  onCancel
}: StatEntryFormProps) {
  const [schema, setSchema] = useState<SportStatSchema | null>(null);
  const [teamAStats, setTeamAStats] = useState<PlayerMatchStat[]>([]);
  const [teamBStats, setTeamBStats] = useState<PlayerMatchStat[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize schema and stats
  useEffect(() => {
    if (match.sport && match.statIntensity) {
      const loadedSchema = statSchemaService.getSchema(match.sport, match.statIntensity);
      if (loadedSchema) {
        setSchema(loadedSchema);

        const teamA = match.teams[0] || { id: 'team_a', name: 'Team A', players: [] };
        const teamB = match.teams[1] || { id: 'team_b', name: 'Team B', players: [] };

        setTeamAStats(
          statEntryService.initializePlayerStats(
            teamA.players.map((p) => ({ id: p.id, name: p.name })),
            loadedSchema
          )
        );
        setTeamBStats(
          statEntryService.initializePlayerStats(
            teamB.players.map((p) => ({ id: p.id, name: p.name })),
            loadedSchema
          )
        );
      }
    }
  }, [match]);

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!schema) throw new Error('Schema not loaded');

      const allStats = [...teamAStats, ...teamBStats];
      const validation = statEntryService.validateStats(allStats, schema);
      if (!validation.valid) {
        Alert.alert('Validation Error', validation.errors.join('\n'));
        setLoading(false);
        return;
      }

      const matchStats = statEntryService.saveMatchStats(match.id, allStats);

      // Mark match as completed
      matchService.updateMatch(match.id, { status: MatchStatus.Completed });

      // NEW: Aggregate player stats for leaderboards
      statsAggregationService.updateUserStatsFromMatch(match.id);

      // Generate claim tokens for unregistered players
      const unregisteredPlayers = [...(match.teams[0]?.players || []), ...(match.teams[1]?.players || [])].filter(
        (p) => !p.userId
      );

      if (unregisteredPlayers.length > 0) {
        let claimMessage = 'Share these registration links with unregistered players:\n\n';
        unregisteredPlayers.forEach((player) => {
          const token = playerClaimService.generateClaimToken(
            player.id,
            player.name,
            match.id,
            match.sport
          );
          const claimLink = playerClaimService.generateClaimLink(token);
          claimMessage += `${player.name}: ${claimLink}\n`;
        });
        Alert.alert('Stats Saved', claimMessage);
      } else {
        Alert.alert('Success', 'Stats saved successfully!');
      }

      onSave?.(matchStats);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save stats');
      setLoading(false);
    }
  };

  if (!schema) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#6b7280' }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const teamA = match.teams[0] || { id: 'team_a', name: 'Team A', players: [] };
  const teamB = match.teams[1] || { id: 'team_b', name: 'Team B', players: [] };

  const renderTeam = (teamName: string, players: PlayerMatchStat[], setPlayers: any) => (
    <View style={{ marginBottom: 24 }}>
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
          {players.length} players
        </Text>
      </View>

      {players.map((player, playerIndex) => (
        <View key={player.playerId} style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 12 }}>
            {player.playerName}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {schema!.statKeys.map((stat) => (
              <View key={stat.id} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', marginBottom: 4 }}>
                  {stat.abbreviation}
                </Text>
                <StatInput
                  value={player.values[stat.id] || 0}
                  onChange={(value) => {
                    const updated = [...players];
                    updated[playerIndex].values[stat.id] = value;
                    setPlayers(updated);
                  }}
                  statAbbreviation={stat.abbreviation}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
            Record Match Stats
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
            Enter stats for {match.sport} match
          </Text>
        </View>

        {renderTeam(teamA.name, teamAStats, setTeamAStats)}
        {renderTeam(teamB.name, teamBStats, setTeamBStats)}
      </ScrollView>

      {/* Bottom Button Bar */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 32,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        flexDirection: 'row',
        gap: 12
      }}>
        <TouchableOpacity
          onPress={onCancel}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#d1d5db',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSave}
          disabled={loading}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: loading ? '#9ca3af' : '#2563eb',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>
            {loading ? 'Saving...' : 'Save Stats'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
