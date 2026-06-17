'use client';

import React from 'react';
import { PlayerMatchStat, StatKey } from '@/lib/stat-types';
import { StatInput } from './StatInput';

interface TeamStatTableProps {
  teamName: string;
  players: PlayerMatchStat[];
  statKeys: StatKey[];
  onChange: (updatedPlayers: PlayerMatchStat[]) => void;
}

/**
 * Table for entering stats for one team's players
 */
export function TeamStatTable({
  teamName,
  players,
  statKeys,
  onChange
}: TeamStatTableProps) {
  const handleStatChange = (playerIndex: number, statKeyId: string, newValue: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].values[statKeyId] = newValue;
    onChange(updatedPlayers);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-gray-900">{teamName}</h3>
        <p className="text-sm text-gray-600">{players.length} players</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50">
                Player
              </th>
              {statKeys.map((stat) => (
                <th
                  key={stat.id}
                  className="px-3 py-3 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                  title={stat.name}
                >
                  {stat.abbreviation}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, playerIndex) => (
              <tr key={player.playerId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white hover:bg-gray-50">
                  {player.playerName}
                </td>
                {statKeys.map((stat) => (
                  <td key={`${player.playerId}_${stat.id}`} className="px-3 py-3 text-center">
                    <StatInput
                      value={player.values[stat.id] || 0}
                      onChange={(value) => handleStatChange(playerIndex, stat.id, value)}
                      statAbbreviation={stat.abbreviation}
                      min={0}
                      max={999}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
