'use client';

import { useState } from 'react';
import { Match } from '@/lib/match-types';
import { Location } from '@/lib/location-types';

interface MatchSummaryProps {
  match: Partial<Match>;
  location?: Location;
  onConfirm: (finalScore?: { teamAScore: number; teamBScore: number }) => void;
  onBack: () => void;
  isLive: boolean;
}

/**
 * MatchSummary - Review match details before confirmation
 */
export function MatchSummary({
  match,
  location,
  onConfirm,
  onBack,
  isLive
}: MatchSummaryProps) {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Match Summary</h2>

      <div className="space-y-6">
        {/* Match Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-600 font-bold">SPORT</p>
              <p className="text-lg font-bold text-gray-900">{match.sport}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-bold">TYPE</p>
              <p className="text-lg font-bold text-gray-900">{match.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-bold">MODE</p>
              <p className="text-lg font-bold text-gray-900">{match.mode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 font-bold">DATE</p>
              <p className="text-lg font-bold text-gray-900">
                {match.date ? new Date(match.date).toLocaleDateString() : 'Today'}
              </p>
            </div>
          </div>

          {/* Location */}
          {location && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-bold mb-2">LOCATION</p>
              <p className="font-bold text-gray-900">{location.name}</p>
              <p className="text-sm text-gray-600">📍 {location.address}</p>
            </div>
          )}
        </div>

        {/* Teams and Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {match.teams?.map((team) => (
            <div key={team.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{team.name}</h3>
              <div className="space-y-2">
                {team.players.map((player) => (
                  <div key={player.id} className="flex justify-between items-center">
                    <p className="text-sm text-gray-900">{player.name}</p>
                    {player.jerseyNo && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        #{player.jerseyNo}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-4">
                {team.players.length} player{team.players.length !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>

        {/* Rules */}
        {match.rules && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-bold text-gray-900 mb-2">RULES</p>
            <p className="text-sm text-gray-700">
              {match.rules.presetName}
              {'gameFormat' in match.rules && match.rules.gameFormat === 'timed' && ` • ${(match.rules as any).periodDuration} min`}
              {'halfDuration' in match.rules && ` • ${(match.rules as any).halves} x ${(match.rules as any).halfDuration} min halves`}
              {('shotClock' in match.rules && (match.rules as any).shotClock !== 'none') ? `, ${(match.rules as any).shotClock}s shot clock` : ''}
              {('winByTwo' in match.rules && (match.rules as any).winByTwo) ? ', win by 2' : ''}
            </p>
          </div>
        )}

        {/* Score Entry (if logging past match) */}
        {!isLive && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Final Score</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {match.teams?.[0]?.name || 'Team A'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamAScore}
                  onChange={(e) => setTeamAScore(parseInt(e.target.value))}
                  className="w-full px-4 py-3 text-2xl font-bold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {match.teams?.[1]?.name || 'Team B'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={teamBScore}
                  onChange={(e) => setTeamBScore(parseInt(e.target.value))}
                  className="w-full px-4 py-3 text-2xl font-bold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              if (isLive) {
                onConfirm();
              } else {
                onConfirm({ teamAScore, teamBScore });
              }
            }}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            {isLive ? '🔴 Start Live Match' : '✓ Log Match'}
          </button>
        </div>
      </div>
    </div>
  );
}
