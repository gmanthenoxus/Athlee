'use client';

import { useState, useMemo } from 'react';
import { Team, MatchPlayer, MatchMode } from '@/lib/match-types';
import { generateMockPlayerSuggestions } from '@/lib/mockMatches';

interface TeamEntryProps {
  teams: Team[];
  onTeamsChange: (teams: Team[]) => void;
  mode: MatchMode;
  locationId?: string;
}

/**
 * TeamEntry - Manage teams and add players to each team
 */
export function TeamEntry({ teams, onTeamsChange, mode, locationId }: TeamEntryProps) {
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>({});

  // Get player suggestions from location
  const suggestions = useMemo(() => {
    if (!locationId) return [];
    return generateMockPlayerSuggestions(locationId);
  }, [locationId]);

  const handleAddPlayer = (teamId: string, player: Partial<MatchPlayer>) => {
    const updated = teams.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          players: [
            ...team.players,
            {
              id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: player.name || 'Player',
              userId: player.userId,
              jerseyNo: player.jerseyNo
            }
          ]
        };
      }
      return team;
    });
    onTeamsChange(updated);
  };

  const handleRemovePlayer = (teamId: string, playerId: string) => {
    const updated = teams.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          players: team.players.filter((p) => p.id !== playerId)
        };
      }
      return team;
    });
    onTeamsChange(updated);
  };

  const handleUpdatePlayer = (teamId: string, playerId: string, updates: Partial<MatchPlayer>) => {
    const updated = teams.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          players: team.players.map((p) =>
            p.id === playerId ? { ...p, ...updates } : p
          )
        };
      }
      return team;
    });
    onTeamsChange(updated);
  };

  const handleAddManual = (teamId: string, name: string) => {
    if (name.trim()) {
      handleAddPlayer(teamId, { name });
      setSearchInputs({ ...searchInputs, [teamId]: '' });
    }
  };

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Teams not initialized. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Teams & Players</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="border border-gray-200 rounded-lg p-6 bg-white">
            {/* Team Name */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">{team.name}</h3>

            {/* Player List */}
            <div className="space-y-3 mb-6">
              {team.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{player.name}</div>
                    {player.userId && (
                      <div className="text-xs text-gray-500">Registered player</div>
                    )}
                  </div>

                  {/* Jersey Number (for competitive) */}
                  {mode === MatchMode.Competitive && (
                    <input
                      type="text"
                      placeholder="#"
                      value={player.jerseyNo || ''}
                      onChange={(e) =>
                        handleUpdatePlayer(team.id, player.id, { jerseyNo: e.target.value })
                      }
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemovePlayer(team.id, player.id)}
                    className="text-red-600 hover:text-red-800 font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add Player Section */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              {/* Manual Entry */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add player name..."
                  value={searchInputs[team.id] || ''}
                  onChange={(e) =>
                    setSearchInputs({ ...searchInputs, [team.id]: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddManual(team.id, searchInputs[team.id] || '');
                    }
                  }}
                  className="flex-1 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAddManual(team.id, searchInputs[team.id] || '')}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="pt-3">
                  <p className="text-xs text-gray-600 mb-2">Popular players at this location:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.slice(0, 3).map((player) => (
                      <button
                        key={player.id}
                        onClick={() => handleAddPlayer(team.id, player)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200"
                      >
                        + {player.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Empty State */}
            {team.players.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No players added yet
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
