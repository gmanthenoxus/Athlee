import React, { useState, useMemo } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { playerSuggestionService } from '@/lib/playerSuggestionService';
import { tempPlayerService } from '@/lib/tempPlayerService';
import { MatchMode } from '@/lib/match-types';
import { SportType } from '@/lib/location-types';
import TeamColumn from './TeamColumn';
import PlayerSearchModal from './PlayerSearchModal';
import NewPlayerForm from './NewPlayerForm';

/**
 * TeamBuilder Component (Web - Tailwind)
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Build Your Teams</h2>
        <p className="mt-1 text-sm text-gray-600">
          Add players to each team. {session.mode === MatchMode.Competitive
            ? `Each team needs at least ${maxPlayersPerTeam} player${maxPlayersPerTeam !== 1 ? 's' : ''}.`
            : 'Each team needs at least 1 player.'}
        </p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={() => setShowSearchModal(true)}
          disabled={!selectedTeamId || !canAddPlayer(selectedTeamId || '')}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Add Existing Player
        </button>
        <button
          onClick={() => setShowNewPlayerForm(true)}
          disabled={!selectedTeamId || !canAddPlayer(selectedTeamId || '')}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Add New Player
        </button>
      </div>

      {/* Player Search Modal */}
      {showSearchModal && (
        <PlayerSearchModal
          suggestions={suggestions}
          onSelectPlayer={handleAddPlayer}
          onClose={() => setShowSearchModal(false)}
        />
      )}

      {/* New Player Form Modal */}
      {showNewPlayerForm && (
        <NewPlayerForm
          onCreatePlayer={handleCreatePlayer}
          onClose={() => setShowNewPlayerForm(false)}
          competitiveMode={session.mode === MatchMode.Competitive}
        />
      )}
    </div>
  );
}
