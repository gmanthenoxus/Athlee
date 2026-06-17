import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { playerSuggestionService } from '@/lib/playerSuggestionService';
import { tempPlayerService } from '@/lib/tempPlayerService';
import { MatchMode } from '@/lib/match-types';
import TeamColumn from './TeamColumn';
import PlayerSearchModal from './PlayerSearchModal';
import NewPlayerForm from './NewPlayerForm';

/**
 * TeamBuilder Component (Mobile - React Native)
 * Allows users to compose teams for a match by selecting players
 */
export default function TeamBuilder(): React.ReactElement {
  const { session, addTeamPlayer, removeTeamPlayer, updateTeamPlayer, updateTeamName } =
    useMatchSetupStore();

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(
    session.teams.length > 0 ? session.teams[0].id : null
  );
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false);

  // Get all currently added player IDs to exclude from suggestions
  const allTeamPlayerIds = useMemo(() => {
    return session.teams.flatMap((team) => team.players.map((p) => p.id));
  }, [session.teams]);

  // Get player suggestions for the selected team
  const suggestions = useMemo(() => {
    if (!selectedTeamId || !session.sport || !session.locationId) {
      return [];
    }

    return playerSuggestionService.getSuggestions({
      currentUserId: session.userId || 'current-user',
      locationId: session.locationId,
      sport: session.sport,
      excludePlayerIds: allTeamPlayerIds,
    });
  }, [selectedTeamId, session.sport, session.locationId, session.userId, allTeamPlayerIds]);

  // Handle adding a player to the selected team
  const handleAddPlayer = (player: any) => {
    if (!selectedTeamId) return;
    
    // Check if team can still accept players
    const team = session.teams.find((t) => t.id === selectedTeamId);
    if (!team) return;
    
    const totalSlots = maxPlayersPerTeam + maxSubstitutes;
    if (team.players.length >= totalSlots) {
      // Team is full, can't add
      return;
    }
    
    addTeamPlayer(selectedTeamId, player);
  };

  // Handle removing a player from a team
  const handleRemovePlayer = (teamId: string, playerId: string) => {
    removeTeamPlayer(teamId, playerId);
  };

  // Handle updating a player (e.g., jersey number, position)
  const handleUpdatePlayer = (teamId: string, playerId: string, updates: any) => {
    updateTeamPlayer(teamId, playerId, updates);
  };

  // Handle creating a new temporary player
  const handleCreatePlayer = (name: string, options?: any) => {
    const tempPlayer = tempPlayerService.createTempPlayer(name, options);
    handleAddPlayer(tempPlayer);
    setShowNewPlayerForm(false);
  };

  // Get max players allowed in a team
  const maxPlayersPerTeam = session.teamSize ? session.teamSize.playersPerTeam : 0;
  const maxSubstitutes = session.teamSize ? session.teamSize.substitutes || 0 : 0;

  // Check if a team can accept more players
  const canAddPlayer = (teamId: string): boolean => {
    const team = session.teams.find((t) => t.id === teamId);
    if (!team) return false;
    const totalSlots = maxPlayersPerTeam + maxSubstitutes;
    return team.players.length < totalSlots;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Build Your Teams</Text>
        <Text style={styles.subtitle}>
          {session.mode === MatchMode.Competitive
            ? `Each team needs at least ${maxPlayersPerTeam} player${maxPlayersPerTeam !== 1 ? 's' : ''}.`
            : 'Each team needs at least 1 player.'}
        </Text>
      </View>

      {/* Teams */}
      <View style={styles.teamsContainer}>
        {session.teams.map((team) => (
          <TeamColumn
            key={team.id}
            team={team}
            isSelected={selectedTeamId === team.id}
            onSelect={() => setSelectedTeamId(team.id)}
            onRemovePlayer={handleRemovePlayer}
            onUpdatePlayer={handleUpdatePlayer}
            onUpdateTeamName={updateTeamName}
            canAddPlayer={canAddPlayer(team.id)}
            onAddPlayerClick={() => setShowSearchModal(true)}
            maxPlayersPerTeam={maxPlayersPerTeam}
            maxSubstitutes={maxSubstitutes}
            competitiveMode={session.mode === MatchMode.Competitive}
          />
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            styles.primaryButton,
            (!selectedTeamId || !canAddPlayer(selectedTeamId || '')) && styles.disabledButton,
          ]}
          onPress={() => setShowSearchModal(true)}
          disabled={!selectedTeamId || !canAddPlayer(selectedTeamId || '')}
        >
          <Text style={styles.buttonText}>Add Existing Player</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.secondaryButton,
            (!selectedTeamId || !canAddPlayer(selectedTeamId || '')) && styles.disabledButton,
          ]}
          onPress={() => setShowNewPlayerForm(true)}
          disabled={!selectedTeamId || !canAddPlayer(selectedTeamId || '')}
        >
          <Text style={styles.secondaryButtonText}>Add New Player</Text>
        </Pressable>
      </View>

      {/* Modals */}
      {showSearchModal && (
        <PlayerSearchModal
          suggestions={suggestions}
          onSelectPlayer={handleAddPlayer}
          onClose={() => setShowSearchModal(false)}
        />
      )}

      {showNewPlayerForm && (
        <NewPlayerForm
          onCreatePlayer={handleCreatePlayer}
          onClose={() => setShowNewPlayerForm(false)}
          competitiveMode={session.mode === MatchMode.Competitive}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  teamsContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
