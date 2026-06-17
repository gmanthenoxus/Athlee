'use client';

import React, { useState, useEffect } from 'react';
import { SearchX } from 'lucide-react';
import { matchHistoryService } from '@/lib/matchHistoryService';
import { MatchHistoryEntry, MatchHistoryFilter } from '@/lib/leaderboard-types';
import { useAuth } from '@/hooks/useAuth';
import { MatchHistoryCard } from './MatchHistoryCard';

/**
 * Match History Screen - displays user's match history with filtering
 */
export function MatchHistoryScreen() {
  const { user } = useAuth();
  const userId = user?.id;
  const [matches, setMatches] = useState<MatchHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MatchHistoryFilter>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadMatches();
  }, [userId]);

  const loadMatches = () => {
    if (!userId) return;
    try {
      setLoading(true);
      const userMatches = matchHistoryService.getUserMatches(userId, filters);
      setMatches(userMatches);
    } catch (err) {
      console.error('Failed to load match history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, [filters]);

  const handleFilterChange = (key: keyof MatchHistoryFilter, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const stats = matchHistoryService.getUserMatchStats(userId || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Match History</h1>
          <p className="text-gray-600 mt-2">Review your past performances</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total Matches</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalMatches}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Wins</p>
            <p className="text-2xl font-bold text-green-600">{stats.wins}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Losses</p>
            <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Win Rate</p>
            <p className="text-2xl font-bold text-blue-600">
              {(stats.winRate * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {Object.keys(filters).some((k) => filters[k as keyof MatchHistoryFilter]) && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Result Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
              <select
                value={filters.result || ''}
                onChange={(e) =>
                  handleFilterChange(
                    'result',
                    e.target.value ? (e.target.value as any) : undefined
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">All Results</option>
                <option value="win">Wins</option>
                <option value="loss">Losses</option>
                <option value="draw">Draws</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy || 'date'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="date">Date</option>
                <option value="score">Score</option>
                <option value="points">Points</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <select
                value={filters.sortOrder || 'desc'}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Match List */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
            <SearchX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No matches found</p>
            <p className="text-gray-500 text-sm mt-2">
              Complete a match and record stats to see your history
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <MatchHistoryCard key={match.matchId} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
