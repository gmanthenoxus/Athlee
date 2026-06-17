'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, TrendingUp } from 'lucide-react';
import { LeaderboardEntry } from '@/lib/leaderboard-types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  statKey: string;
  currentUserId?: string;
}

/**
 * Leaderboard Table - displays ranked players
 */
export function LeaderboardTable({
  entries,
  statKey,
  currentUserId
}: LeaderboardTableProps) {
  const router = useRouter();

  const statLabel = {
    points: 'Points',
    rebounds: 'Rebounds',
    assists: 'Assists',
    steals: 'Steals',
    blocks: 'Blocks',
    gamesPlayed: 'Games'
  }[statKey] || statKey;

  const getMedalColor = (rank: number): string => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-700';
  };

  const getMedalEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '•';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-1 text-sm font-semibold text-gray-700">Rank</div>
          <div className="col-span-6 text-sm font-semibold text-gray-700">Player</div>
          <div className="col-span-2 text-right text-sm font-semibold text-gray-700">
            {statLabel}
          </div>
          <div className="col-span-2 text-right text-sm font-semibold text-gray-700">
            Win Rate
          </div>
          <div className="col-span-1" />
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {entries.map((entry) => {
          const isCurrentUser = entry.userId === currentUserId;
          const bgColor = isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50';

          return (
            <button
              key={entry.userId}
              onClick={() => router.push(`/profile/${entry.userId}`)}
              className={`w-full px-6 py-4 text-left transition-colors ${bgColor}`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Rank */}
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${getMedalColor(entry.rank)}`}>
                      {getMedalEmoji(entry.rank)}
                    </span>
                    {entry.rank <= 3 && (
                      <Trophy className={`w-4 h-4 ${getMedalColor(entry.rank)}`} />
                    )}
                    {entry.rank > 3 && (
                      <span className="text-sm font-semibold text-gray-700">#{entry.rank}</span>
                    )}
                  </div>
                </div>

                {/* Player Name */}
                <div className="col-span-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {entry.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                        {entry.username}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs bg-blue-200 text-blue-900 px-2 py-1 rounded">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-600">{entry.gamesPlayed} games</p>
                    </div>
                  </div>
                </div>

                {/* Stat Value */}
                <div className="col-span-2 text-right">
                  <p className="text-lg font-bold text-gray-900">{Math.round(entry.value)}</p>
                  {entry.gamesPlayed > 0 && (
                    <p className="text-xs text-gray-600">
                      {(entry.value / entry.gamesPlayed).toFixed(1)} avg
                    </p>
                  )}
                </div>

                {/* Win Rate */}
                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-gray-900">
                      {(entry.winRate * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Chevron */}
                <div className="col-span-1 text-right">
                  <div className="w-5 h-5 text-gray-400">→</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer - Legend */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          🥇 Rank #1 • 🥈 Rank #2 • 🥉 Rank #3 • Avg = {statLabel} per game • Win Rate = Wins / Total Matches
        </p>
      </div>
    </div>
  );
}
