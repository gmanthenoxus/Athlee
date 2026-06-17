'use client';

import { Team } from '@/lib/match-types';

interface TeamSummaryProps {
  teams: Team[];
  collapsible?: boolean;
}

/**
 * Component for displaying team composition with player lists
 */
export function TeamSummary({ teams, collapsible = false }: TeamSummaryProps) {
  return (
    <div className="space-y-3">
      {teams.map((team, index) => (
        <div key={team.id} className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-gray-900">
              {team.name}
            </p>
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {team.players.length} player{team.players.length !== 1 ? 's' : ''}
            </span>
          </div>
          <ul className="text-sm text-gray-700 space-y-1">
            {team.players.slice(0, collapsible ? 3 : undefined).map((player, idx) => (
              <li key={player.id || idx} className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                <span>{player.name}</span>
                {player.jerseyNo && (
                  <span className="text-xs text-gray-500">#{player.jerseyNo}</span>
                )}
              </li>
            ))}
            {collapsible && team.players.length > 3 && (
              <li className="text-xs text-gray-500 italic">
                +{team.players.length - 3} more
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
