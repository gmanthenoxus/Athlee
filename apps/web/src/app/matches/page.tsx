'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trophy, Calendar, MapPin, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { matchService } from '@/lib/matchService';
import { MatchStatus } from '@/lib/match-types';
import type { Match } from '@/lib/match-types';

type FilterStatus = 'all' | 'upcoming' | 'completed' | 'in-progress';

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = () => {
    try {
      setLoading(true);
      const allMatches = matchService.getMatches();
      // Sort by start time
      const sorted = [...allMatches].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setMatches(sorted);
      applyFilter(sorted, filter);
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (matchList: Match[], filterType: FilterStatus) => {
    if (filterType === 'all') {
      setFilteredMatches(matchList);
    } else {
      setFilteredMatches(
        matchList.filter((m) => {
          if (filterType === 'upcoming')
            return m.status === MatchStatus.Scheduled && new Date(m.date) > new Date();
          if (filterType === 'completed') return m.status === MatchStatus.Completed;
          if (filterType === 'in-progress') return m.status === MatchStatus.InProgress;
          return true;
        })
      );
    }
  };

  const handleFilterChange = (newFilter: FilterStatus) => {
    setFilter(newFilter);
    applyFilter(matches, newFilter);
  };

  const getStatusBadge = (status: MatchStatus, date: string) => {
    if (status === MatchStatus.Completed) {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          Completed
        </span>
      );
    }
    if (status === MatchStatus.InProgress) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
          Live
        </span>
      );
    }
    if (new Date(date) < new Date()) {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          Finished
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
        Upcoming
      </span>
    );
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTeamDisplayName = (teamName: string) => {
    return teamName || 'Team A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-600" />
            Matches
          </h1>
          <button
            onClick={() => router.push('/matches/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Match
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-4xl mx-auto px-4 border-t border-gray-200">
          <div className="flex gap-1 overflow-x-auto">
            {['all', 'upcoming', 'in-progress', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f as FilterStatus)}
                className={`px-4 py-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                  filter === f
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              No {filter !== 'all' ? filter : 'matches'} matches yet
            </p>
            <button
              onClick={() => router.push('/matches/create')}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Your First Match
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => router.push(`/matches/${match.id}`)}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Match Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {match.sport.charAt(0).toUpperCase() +
                          match.sport.slice(1)}{' '}
                        Match
                      </h3>
                    {getStatusBadge(match.status, match.date)}
                    </div>

                    {/* Teams */}
                    <div className="text-sm text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {match.teams.map((t) => (
                          <span key={t.id}>
                            {getTeamDisplayName(t.name)} ({t.players.length})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(match.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.locationId || 'Not specified'}
                      </div>
                    </div>

                    {/* Mode & Type */}
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {match.mode}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {match.type}
                      </span>
                    </div>
                  </div>

                  {/* Score (if completed) */}
                  {match.status === MatchStatus.Completed && match.score && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {match.score.teamAScore}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">vs</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {match.score.teamBScore}
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
