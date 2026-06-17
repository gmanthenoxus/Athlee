import React from 'react';
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
 * TeamColumn Component
 * Displays a single team with its players and option to add more
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

  const [isEditingName, setIsEditingName] = React.useState(false);
  const [tmpName, setTmpName] = React.useState(team.name);

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
    <div
      onClick={onSelect}
      className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Team Header */}
      <div className="flex items-center justify-between mb-4">
        {isEditingName ? (
          <input
            autoFocus
            type="text"
            value={tmpName}
            onChange={(e) => setTmpName(e.target.value)}
            onBlur={() => handleNameChange(tmpName)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNameChange(tmpName);
              if (e.key === 'Escape') setIsEditingName(false);
            }}
            className="flex-1 px-2 py-1 border border-gray-300 rounded font-bold text-lg"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h3
            onClick={() => setIsEditingName(true)}
            className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {team.name}
          </h3>
        )}
        <span className="text-sm font-medium text-gray-500">
          {team.players.length}/{maxPlayersPerTeam + maxSubstitutes}
        </span>
      </div>

      {/* Main Squad */}
      <div className="space-y-2 mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Squad ({mainSquad.length}/{maxPlayersPerTeam})
        </div>
        <div className="space-y-2 bg-gray-50 p-3 rounded min-h-[120px]">
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
            <p className="text-sm text-gray-400 italic">No players yet</p>
          )}
        </div>
      </div>

      {/* Substitutes (if applicable) */}
      {maxSubstitutes > 0 && (
        <div className="space-y-2 mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Substitutes ({substitutes.length}/{maxSubstitutes})
          </div>
          <div className="space-y-2 bg-gray-50 p-3 rounded min-h-[80px] opacity-75">
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
              <p className="text-sm text-gray-400 italic">No substitutes</p>
            )}
          </div>
        </div>
      )}

      {/* Add Player Button */}
      {canAddPlayer && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddPlayerClick();
          }}
          className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          + Add Player
        </button>
      )}

      {/* Full indicator */}
      {!canAddPlayer && team.players.length > 0 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800 text-center font-medium">
          Team is full
        </div>
      )}
    </div>
  );
}
