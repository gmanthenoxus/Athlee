'use client';

import React from 'react';
import { MatchStats, StatKey } from '@/lib/stat-types';
import { statSchemaService } from '@/lib/statSchemaService';
import { SportType } from '@/lib/location-types';
import { StatIntensity } from '@/lib/match-types';

interface StatsTableProps {
  matchStats: MatchStats;
  sport: SportType;
  statIntensity: StatIntensity;
  teamAName: string;
  teamBName: string;
}

/**
 * Display table showing recorded match stats
 */
export function StatsTable({
  matchStats,
  sport,
  statIntensity,
  teamAName,
  teamBName
}: StatsTableProps) {
  const schema = statSchemaService.getSchema(sport, statIntensity);
  if (!schema) return null;

  const statKeyMap = new Map(schema.statKeys.map((key) => [key.id, key]));
  const teamAStats = matchStats.playerStats.filter((ps) =>
    matchStats.playerStats.indexOf(ps) < matchStats.playerStats.length / 2
  );
  const teamBStats = matchStats.playerStats.filter((ps) =>
    matchStats.playerStats.indexOf(ps) >= matchStats.playerStats.length / 2
  );

  const renderTeamTable = (teamName: string, players: typeof matchStats.playerStats) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-gray-900">{teamName}</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-2 text-left font-semibold text-gray-900">Player</th>
              {schema.statKeys.map((stat) => (
                <th
                  key={stat.id}
                  className="px-3 py-2 text-center font-semibold text-gray-900 whitespace-nowrap"
                  title={stat.name}
                >
                  {stat.abbreviation}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.playerId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{player.playerName}</td>
                {schema.statKeys.map((stat) => (
                  <td
                    key={`${player.playerId}_${stat.id}`}
                    className="px-3 py-2 text-center text-gray-700"
                  >
                    {player.values[stat.id] || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Final Score */}
      {matchStats.finalScore && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-green-700 font-medium">{teamAName}</p>
              <p className="text-4xl font-bold text-green-900 mt-2">{matchStats.finalScore.teamA}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-green-700 font-medium">{teamBName}</p>
              <p className="text-4xl font-bold text-green-900 mt-2">{matchStats.finalScore.teamB}</p>
            </div>
          </div>
        </div>
      )}

      {/* Team A Stats */}
      {renderTeamTable(teamAName, teamAStats)}

      {/* Team B Stats */}
      {renderTeamTable(teamBName, teamBStats)}

      {/* Recorded Info */}
      <div className="text-xs text-gray-500 text-center">
        Stats recorded on {new Date(matchStats.recordedAt).toLocaleDateString()}
        {matchStats.recordedBy && ` by ${matchStats.recordedBy}`}
      </div>
    </div>
  );
}
