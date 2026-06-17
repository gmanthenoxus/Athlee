'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trophy, Calendar, MapPin, Users, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { matchService } from '@/lib/matchService';
import { statEntryService } from '@/lib/statEntryService';
import type { Match } from '@/lib/match-types';
import type { MatchStats } from '@/lib/stat-types';
import { StatsTable } from '@/components/stats/StatsTable';

type Params = Promise<{ id: string }>;

interface MatchDetailPageProps {
  params: Params;
}

export default function MatchDetailPage({ params }: MatchDetailPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [match, setMatch] = useState<Match | null>(null);
  const [stats, setStats] = useState<MatchStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatch();
  }, []);

  const loadMatch = () => {
    try {
      setLoading(true);
      const m = matchService.getMatch(resolvedParams.id);
      if (!m) {
        router.push('/matches');
        return;
      }
      setMatch(m);

      // Load stats if match is completed
      if (m.status === 'Completed') {
        const matchStats = statEntryService.getMatchStats(m.id);
        setStats(matchStats);
      }
    } catch (err) {
      console.error('Failed to load match:', err);
      router.push('/matches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">Loading match...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <p className="text-gray-600">Match not found</p>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'in-progress':
        return 'bg-green-100 text-green-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            Match Details
          </h1>
          <button
            onClick={() => {
              navigator.share?.({
                title: `${match.sport} Match`,
                text: `Join my ${match.sport} match!`,
              });
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Card */}
        <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {match.sport.charAt(0).toUpperCase() + match.sport.slice(1)} Match
            </h2>
            <span
              className={`px-3 py-1 text-sm font-medium rounded ${getStatusColor(
                match.status
              )}`}
            >
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </span>
          </div>

          {/* Date & Location */}
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              {formatDate(match.date)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              {match.locationId || 'Not specified'}
            </div>
          </div>

          {/* Score (if completed) */}
          {match.status === 'Completed' && match.score && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Final Score</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {match.score.teamAScore}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {match.teams[0].name || 'Team A'}
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-gray-400">vs</p>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {match.score.teamBScore}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {match.teams[1].name || 'Team B'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {match.teams.map((team) => (
            <div key={team.id} className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {team.name || (match.teams.indexOf(team) === 0 ? 'Team A' : 'Team B')}
              </h3>
              <div className="space-y-2">
                {team.players.length > 0 ? (
                  team.players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div
                          onClick={() => {
                            if (player.userId) {
                              router.push(`/profile/${player.userId}`);
                            }
                          }}
                          className={player.userId ? 'cursor-pointer' : ''}
                        >
                          <p
                            className={`text-sm font-medium ${
                              player.userId
                                ? 'text-blue-600 hover:text-blue-800 underline'
                                : 'text-gray-900'
                            }`}
                          >
                            {player.name}
                          </p>
                          {!player.userId && (
                            <p className="text-xs text-gray-500">Unregistered</p>
                          )}
                        </div>
                      </div>
                      {player.jerseyNo && (
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {player.jerseyNo}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No players yet</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        {match.rules && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Rules</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Preset:</span>
              <span className="font-medium text-gray-900">
                {match.rules.presetName}
              </span>
            </div>
            {'gameFormat' in match.rules && match.rules.gameFormat === 'timed' && (
              <>
                <div className="flex justify-between">
                  <span>Period Duration:</span>
                  <span className="font-medium text-gray-900">
                    {(match.rules as any).periodDuration} min ({(match.rules as any).periodStructure})
                  </span>
                </div>
                {(match.rules as any).overtimeFormat !== 'none' && (
                  <div className="flex justify-between">
                    <span>Overtime:</span>
                    <span className="font-medium text-gray-900">
                      {(match.rules as any).overtimeFormat}
                    </span>
                  </div>
                )}
              </>
            )}
            {'gameFormat' in match.rules && match.rules.gameFormat === 'firstTo' && (
              <>
                <div className="flex justify-between">
                  <span>Winning Score:</span>
                  <span className="font-medium text-gray-900">
                    {(match.rules as any).winningScore}
                  </span>
                </div>
                {(match.rules as any).winByTwo && (
                  <div className="flex justify-between">
                    <span>Win by 2:</span>
                    <span className="font-medium text-gray-900">Enabled</span>
                  </div>
                )}
              </>
            )}
            {'shotClock' in match.rules && (match.rules as any).shotClock !== 'none' && (
              <div className="flex justify-between">
                <span>Shot Clock:</span>
                <span className="font-medium text-gray-900">
                  {(match.rules as any).shotClock}s
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Scoring:</span>
              <span className="font-medium text-gray-900">
                {'pointsInside' in match.rules ? `${match.rules.pointsInside}pt / ${match.rules.pointsOutside}pt` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
        )}

        {/* Match Details */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Match Information
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium text-gray-900">{match.type}</span>
            </div>
            <div className="flex justify-between">
              <span>Mode:</span>
              <span className="font-medium text-gray-900">{match.mode}</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium text-gray-900">
                {match.locationId || 'Not specified'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {match.status === 'Completed' && (
          <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Match Statistics</h3>
              {!stats && (
                <button
                  onClick={() => router.push(`/matches/${match.id}/stats/enter`)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Record Stats
                </button>
              )}
            </div>

            {stats ? (
              <StatsTable
                matchStats={stats}
                sport={match.sport}
                statIntensity={match.statIntensity}
                teamAName={match.teams[0]?.name || 'Team A'}
                teamBName={match.teams[1]?.name || 'Team B'}
              />
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No stats recorded yet</p>
                <button
                  onClick={() => router.push(`/matches/${match.id}/stats/enter`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Record Match Stats
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {match.status === 'Scheduled' && (
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => router.push(`/matches/${match.id}/live`)}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Start Match
            </button>
          </div>
        )}

        {match.status === 'InProgress' && (
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => router.push(`/matches/${match.id}/live`)}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              Live Match
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
