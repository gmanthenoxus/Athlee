'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Trophy, Zap } from 'lucide-react';
import { MatchHistoryEntry } from '@/lib/leaderboard-types';

interface MatchHistoryCardProps {
  match: MatchHistoryEntry;
}

/**
 * Individual match card for history list
 */
export function MatchHistoryCard({ match }: MatchHistoryCardProps) {
  const router = useRouter();

  const formattedDate = new Date(match.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const resultColor =
    match.result === 'win'
      ? 'text-green-600 bg-green-50'
      : match.result === 'loss'
        ? 'text-red-600 bg-red-50'
        : 'text-gray-600 bg-gray-50';

  const resultText = match.result === 'win' ? 'Win' : match.result === 'loss' ? 'Loss' : 'Draw';

  const userTeamName = match.userTeam === 'A' ? match.teamAName : match.teamBName;
  const userTeamScore = match.userTeam === 'A' ? match.teamAScore : match.teamBScore;
  const opponentTeamName = match.userTeam === 'A' ? match.teamBName : match.teamAName;
  const opponentTeamScore = match.userTeam === 'A' ? match.teamBScore : match.teamAScore;

  return (
    <button
      onClick={() => router.push(`/matches/${match.matchId}`)}
      className="w-full bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Date and Sport */}
        <div className="min-w-0 flex-shrink-0">
          <p className="text-xs text-gray-500 uppercase tracking-wide">{match.sport}</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{formattedDate}</p>
          {match.locationName && (
            <p className="text-xs text-gray-600 mt-1">{match.locationName}</p>
          )}
        </div>

        {/* Middle: Teams and Score */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userTeamName}</p>
              <p className="text-xs text-gray-600">You</p>
            </div>
            <div className="text-center px-3">
              <p className="text-lg font-bold text-gray-900">
                {userTeamScore} - {opponentTeamScore}
              </p>
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-sm font-medium text-gray-900 truncate">{opponentTeamName}</p>
              <p className="text-xs text-gray-600">Opponent</p>
            </div>
          </div>
        </div>

        {/* Right: Stats and Result */}
        <div className="flex-shrink-0 text-right">
          {/* Player Stats */}
          <div className="flex items-center gap-3 mb-2 justify-end">
            {match.userPoints !== undefined && (
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-900">{match.userPoints}</span>
              </div>
            )}
            {match.userRebounds !== undefined && (
              <div className="text-xs text-gray-600">
                {match.userRebounds} reb
              </div>
            )}
            {match.userAssists !== undefined && (
              <div className="text-xs text-gray-600">
                {match.userAssists} ast
              </div>
            )}
          </div>

          {/* Result Badge */}
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${resultColor}`}>
            {match.result === 'win' && <Trophy className="w-4 h-4" />}
            {resultText}
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    </button>
  );
}
