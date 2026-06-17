'use client';

import React, { useState, useEffect } from 'react';
import { leaderboardService } from '@/lib/leaderboardService';
import { LeaderboardEntry, LeaderboardType } from '@/lib/leaderboard-types';
import { SportType } from '@/lib/location-types';
import { useAuth } from '@/hooks/useAuth';
import { LeaderboardTable } from './LeaderboardTable';

/**
 * Leaderboard Screen - displays ranked players with filtering options
 */
export function LeaderboardScreen() {
  const { user } = useAuth();
  const userId = user?.id;
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>(LeaderboardType.Global);
  const [selectedSport, setSelectedSport] = useState<SportType | undefined>();
  const [selectedStat, setSelectedStat] = useState('points');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableSports, setAvailableSports] = useState<SportType[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Load available sports on mount
  useEffect(() => {
    try {
      const sports = leaderboardService.getAvailableSports();
      setAvailableSports(sports);
      if (sports.length > 0 && !selectedSport) {
        setSelectedSport(sports[0]);
      }
    } catch (err) {
      console.error('Failed to load available sports:', err);
    }
  }, []);

  // Load leaderboard when filters change
  useEffect(() => {
    loadLeaderboard();
  }, [leaderboardType, selectedSport, selectedStat]);

  const loadLeaderboard = () => {
    if (!selectedSport) return;

    try {
      setLoading(true);
      const board = leaderboardService.getLeaderboard(
        leaderboardType,
        selectedSport,
        undefined,
        selectedStat,
        'allTime'
      );
      setLeaderboard(board);

      // Get current user's rank
      if (userId) {
        const entry = leaderboardService.getUserRank(userId, selectedSport, selectedStat);
        setUserRank(entry?.rank ?? null);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const statOptions = [
    { value: 'points', label: 'Points' },
    { value: 'rebounds', label: 'Rebounds' },
    { value: 'assists', label: 'Assists' },
    { value: 'steals', label: 'Steals' },
    { value: 'blocks', label: 'Blocks' },
    { value: 'gamesPlayed', label: 'Games Played' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboards</h1>
          <p className="text-gray-600 mt-2">Compare yourself with other players</p>
        </div>
      </div>

      {/* User's Rank Card */}
      {userId && userRank && (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">YOUR RANK</p>
            <p className="text-4xl font-bold text-blue-900 mt-2">#{userRank}</p>
            <p className="text-blue-700 mt-2">
              Out of {leaderboard.length} players in {selectedSport}
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
          {/* Leaderboard Type Tabs */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Type</p>
            <div className="flex gap-2 flex-wrap">
              {(Object.values(LeaderboardType) as LeaderboardType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setLeaderboardType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    leaderboardType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Selector */}
          {availableSports.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
              <select
                value={selectedSport || ''}
                onChange={(e) => setSelectedSport(e.target.value as SportType)}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {availableSports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Stat Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ranked By</label>
            <select
              value={selectedStat}
              onChange={(e) => setSelectedStat(e.target.value)}
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {statOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
            <p className="text-gray-600 text-lg">No leaderboard data available</p>
            <p className="text-gray-500 text-sm mt-2">
              Complete matches and record stats to populate leaderboards
            </p>
          </div>
        ) : (
          <LeaderboardTable
            entries={leaderboard}
            statKey={selectedStat}
            currentUserId={userId}
          />
        )}
      </div>
    </div>
  );
}
