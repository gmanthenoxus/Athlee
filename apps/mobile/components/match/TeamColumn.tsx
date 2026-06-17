import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Team } from '@/lib/match-types';
import PlayerChip from './PlayerChip';

interface TeamColumnProps {
  team: Team;
  isSelected: boolean;
  onSelect: () => void;
  onRemovePlayer: (teamId: string, playerId: string) => void;
  onUpdatePlayer: (teamId: string, playerId: string, updates: any) => void;
  onUpdateTeamName: (teamId: string, name: string) => void;
  canAddPlayer: boolean;
  onAddPlayerClick: () => void;
  maxPlayersPerTeam: number;
  maxSubstitutes: number;
  competitiveMode: boolean;
}

/**
 * TeamColumn Component (Mobile - React Native)
 * Displays a single team with its players
 */
export default function TeamColumn(props: TeamColumnProps): React.ReactElement {
  const {
    team,
    isSelected,
    onSelect,
    onRemovePlayer,
    onUpdatePlayer,
    onUpdateTeamName,
    canAddPlayer,
    onAddPlayerClick,
    maxPlayersPerTeam,
    maxSubstitutes,
    competitiveMode,
  } = props;

  const [isEditingName, setIsEditingName] = useState(false);
  const [tmpName, setTmpName] = useState(team.name);

  const handleNameChange = (newName: string) => {
    if (newName.trim()) {
      onUpdateTeamName(team.id, newName.trim());
    }
    setIsEditingName(false);
  };

  // Separate players into main squad and substitutes
  const mainSquad = team.players.slice(0, maxPlayersPerTeam);
  const substitutes = team.players.slice(maxPlayersPerTeam);

  return (
    <Pressable
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : styles.unselectedContainer,
      ]}
      onPress={onSelect}
    >
      {/* Team Header */}
      <View style={styles.header}>
        {isEditingName ? (
          <TextInput
            style={styles.nameInput}
            value={tmpName}
            onChangeText={setTmpName}
            onBlur={() => handleNameChange(tmpName)}
            onSubmitEditing={() => handleNameChange(tmpName)}
            autoFocus
          />
        ) : (
          <Pressable onPress={() => setIsEditingName(true)}>
            <Text style={styles.teamName}>{team.name}</Text>
          </Pressable>
        )}
        <Text style={styles.playerCount}>
          {team.players.length}/{maxPlayersPerTeam + maxSubstitutes}
        </Text>
      </View>

      {/* Main Squad */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Squad ({mainSquad.length}/{maxPlayersPerTeam})
        </Text>
        <View
          style={[
            styles.playerList,
            mainSquad.length === 0 && styles.emptyPlayerList,
          ]}
        >
          {mainSquad.map((player) => (
            <PlayerChip
              key={player.id}
              player={player}
              onRemove={() => onRemovePlayer(team.id, player.id)}
              onUpdate={(updates) => onUpdatePlayer(team.id, player.id, updates)}
              competitiveMode={competitiveMode}
            />
          ))}
          {mainSquad.length === 0 && (
            <Text style={styles.emptyText}>No players yet</Text>
          )}
        </View>
      </View>

      {/* Substitutes */}
      {maxSubstitutes > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.substituteTitle]}>
            Substitutes ({substitutes.length}/{maxSubstitutes})
          </Text>
          <View
            style={[
              styles.playerList,
              styles.substituteList,
              substitutes.length === 0 && styles.emptyPlayerList,
            ]}
          >
            {substitutes.map((player) => (
              <PlayerChip
                key={player.id}
                player={player}
                onRemove={() => onRemovePlayer(team.id, player.id)}
                onUpdate={(updates) => onUpdatePlayer(team.id, player.id, updates)}
                isSubstitute
                competitiveMode={competitiveMode}
              />
            ))}
            {substitutes.length === 0 && (
              <Text style={styles.emptyText}>No substitutes</Text>
            )}
          </View>
        </View>
      )}

      {/* Add Player / Full Indicator */}
      {canAddPlayer ? (
        <Pressable
          style={styles.addButton}
          onPress={(e) => {
            e.preventDefault();
            onAddPlayerClick();
          }}
        >
          <Text style={styles.addButtonText}>+ Add Player</Text>
        </Pressable>
      ) : team.players.length > 0 ? (
        <View style={styles.fullBadge}>
          <Text style={styles.fullBadgeText}>Team is full</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  unselectedContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  nameInput: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    paddingVertical: 4,
    flex: 1,
  },
  playerCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 8,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  substituteTitle: {
    opacity: 0.75,
  },
  playerList: {
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    padding: 12,
    minHeight: 100,
  },
  substituteList: {
    opacity: 0.75,
  },
  emptyPlayerList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  addButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  fullBadge: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    alignItems: 'center',
  },
  fullBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
});
