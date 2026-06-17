/**
 * Leaderboards Management Tab
 * 
 * Comprehensive leaderboard display and analysis
 * - Global, sport, location, and time-based leaderboards
 * - Top players rankings
 * - Leaderboard statistics and insights
 */

import React, { useState, useMemo } from 'react';
import { leaderboardService } from '@/lib/leaderboardService';
import { LeaderboardType, TimeFrame, LeaderboardEntry } from '@/lib/leaderboard-types';
import { SportType } from '@/lib/location-types';

interface AdminLeaderboardsTabProps {
  users: any[];
  onUpdate?: () => void;
}

export const AdminLeaderboardsTab: React.FC<AdminLeaderboardsTabProps> = ({ 
  users, 
  onUpdate 
}) => {
  const [viewMode, setViewMode] = useState<'global' | 'by-sport' | 'insights'>('global');
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const [selectedStat, setSelectedStat] = useState<'points' | 'wins' | 'rebounds' | 'assists' | 'winRate'>('points');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('allTime');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  // Available sports
  const availableSports = useMemo(() => {
    return leaderboardService.getAvailableSports();
  }, []);

  // Global leaderboard
  const globalLeaderboard = useMemo(() => {
    try {
      if (selectedSport) {
        return leaderboardService.getLeaderboard(
          LeaderboardType.Global,
          selectedSport,
          undefined,
          selectedStat,
          timeFrame
        );
      }
      return [];
    } catch (error) {
      console.error('Failed to load global leaderboard:', error);
      return [];
    }
  }, [selectedSport, selectedStat, timeFrame]);

  // Leaderboard insights
  const leaderboardInsights = useMemo(() => {
    if (globalLeaderboard.length === 0) {
      return null;
    }

    const topEntry = globalLeaderboard[0];
    const avgValue = globalLeaderboard.reduce((sum, entry) => sum + entry.value, 0) / globalLeaderboard.length;
    const avgWinRate = globalLeaderboard.reduce((sum, entry) => sum + entry.winRate, 0) / globalLeaderboard.length;
    const usersWithHighStats = globalLeaderboard.filter(entry => entry.value > avgValue * 1.5).length;

    return {
      totalPlayers: globalLeaderboard.length,
      topEntry,
      avgValue: avgValue.toFixed(1),
      avgWinRate: (avgWinRate * 100).toFixed(1),
      percentile90Value: globalLeaderboard[Math.floor(globalLeaderboard.length * 0.1)]?.value || 0,
      elitePlayerCount: usersWithHighStats,
    };
  }, [globalLeaderboard]);

  // Stat options
  const statOptions: Array<{label: string; value: 'points' | 'wins' | 'rebounds' | 'assists' | 'winRate'}> = [
    { label: '🎯 Points', value: 'points' },
    { label: '🏆 Wins', value: 'wins' },
    { label: '📊 Rebounds', value: 'rebounds' },
    { label: '🤝 Assists', value: 'assists' },
    { label: '📈 Win Rate %', value: 'winRate' },
  ];

  // LeaderboardRow component
  const LeaderboardRow = ({ entry, index }: { entry: LeaderboardEntry; index: number }) => {
    const user = users.find(u => u.id === entry.userId);
    const isExpanded = expandedEntry === entry.userId;
    const medalEmojis = ['🥇', '🥈', '🥉'];
    const medal = entry.rank <= 3 ? medalEmojis[entry.rank - 1] : `#${entry.rank}`;

    return (
      <div key={entry.userId}>
        <div
          onClick={() => setExpandedEntry(isExpanded ? null : entry.userId)}
          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl font-bold w-8 text-center">{medal}</span>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.firstName || entry.username}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user?.email || entry.userId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{entry.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {selectedStat === 'winRate' ? '%' : selectedStat}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {(entry.winRate * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {entry.gamesPlayed} games
              </p>
            </div>
            <div className="text-xl">
              {isExpanded ? '▼' : '▶'}
            </div>
          </div>
        </div>

        {/* Expanded Stats */}
        {isExpanded && entry.stats && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 space-y-2 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(entry.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">{key}:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // StatBox component
  const StatBox = ({ label, value, icon, trend }: any) => (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{value}</p>
      {trend && <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">{trend}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setViewMode('global')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'global'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>🏆</span> Global Rankings
        </button>
        <button
          onClick={() => setViewMode('by-sport')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'by-sport'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>🎾</span> By Sport
        </button>
        <button
          onClick={() => setViewMode('insights')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'insights'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>📊</span> Insights
        </button>
      </div>

      {/* VIEW: Global Rankings */}
      {viewMode === 'global' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sport Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Select Sport:
              </label>
              <select
                value={selectedSport || ''}
                onChange={(e) => setSelectedSport((e.target.value as SportType) || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">-- All Sports --</option>
                {availableSports.map(sport => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            {/* Stat Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Rank By:
              </label>
              <select
                value={selectedStat}
                onChange={(e) => setSelectedStat(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {statOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Frame Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Time Frame:
              </label>
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="allTime">All Time</option>
                <option value="monthly">Last Month</option>
                <option value="weekly">Last Week</option>
              </select>
            </div>
          </div>

          {/* Leaderboard List */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🏆 Top Players
              {selectedSport && ` • ${selectedSport}`}
            </h3>
            {globalLeaderboard.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {globalLeaderboard.slice(0, 50).map((entry, idx) => (
                  <LeaderboardRow key={entry.userId} entry={entry} index={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedSport ? `No data available for ${selectedSport}` : 'Select a sport to view rankings'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW: By Sport */}
      {viewMode === 'by-sport' && (
        <div className="space-y-6">
          {availableSports.length > 0 ? (
            availableSports.map(sport => {
              const sportLeaderboard = leaderboardService.getLeaderboard(
                LeaderboardType.Sport,
                sport,
                undefined,
                'points',
                'allTime'
              );

              return (
                <div key={sport} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    🎾 {sport} Leaderboard
                    <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
                      ({sportLeaderboard.length} players)
                    </span>
                  </h3>
                  <div className="space-y-1">
                    {sportLeaderboard.slice(0, 10).map((entry, idx) => {
                      const user = users.find(u => u.id === entry.userId);
                      const medals = ['🥇', '🥈', '🥉'];
                      const medal = entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`;

                      return (
                        <div key={entry.userId} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-xl">{medal}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {user?.firstName || entry.username}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {entry.value} pts
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {(entry.winRate * 100).toFixed(0)}% WR
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">No sports data available</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW: Insights & Analytics */}
      {viewMode === 'insights' && (
        <div className="space-y-6">
          {/* Prerequisites */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Tip:</strong> Select a sport and stat filter on the Global Rankings tab to analyze specific leaderboard insights
            </p>
          </div>

          {leaderboardInsights && globalLeaderboard.length > 0 ? (
            <>
              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Current Leaderboard Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatBox
                    label="Total Players"
                    value={leaderboardInsights.totalPlayers}
                    icon="👥"
                    trend={`${selectedSport || 'All sports'}`}
                  />
                  <StatBox
                    label="Average Value"
                    value={leaderboardInsights.avgValue}
                    icon="📈"
                    trend={`Per ${selectedStat}`}
                  />
                  <StatBox
                    label="Top Player"
                    value={leaderboardInsights.topEntry.value}
                    icon="🏆"
                    trend={leaderboardInsights.topEntry.username}
                  />
                  <StatBox
                    label="Avg Win Rate"
                    value={`${leaderboardInsights.avgWinRate}%`}
                    icon="📊"
                    trend="Across all players"
                  />
                  <StatBox
                    label="90th Percentile"
                    value={leaderboardInsights.percentile90Value}
                    icon="🎯"
                    trend={`Top 10%`}
                  />
                  <StatBox
                    label="Elite Players"
                    value={leaderboardInsights.elitePlayerCount}
                    icon="⭐"
                    trend={`>150% of average`}
                  />
                </div>
              </div>

              {/* Top 10 Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🥇 Top 10 Players Analysis</h3>
                <div className="space-y-3">
                  {globalLeaderboard.slice(0, 10).map((entry, idx) => {
                    const user = users.find(u => u.id === entry.userId);
                    const isTopThree = idx < 3;
                    
                    return (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          isTopThree
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
                            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">#{entry.rank}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user?.firstName || entry.username}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {entry.gamesPlayed} games • {(entry.winRate * 100).toFixed(0)}% WR
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{entry.value}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{selectedStat}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Distribution Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Performance Distribution</h3>
                  <div className="space-y-3">
                    {(() => {
                      const top10Avg = globalLeaderboard.slice(0, 10).reduce((s, e) => s + e.value, 0) / 10;
                      const top25Avg = globalLeaderboard.slice(0, 25).reduce((s, e) => s + e.value, 0) / Math.min(25, globalLeaderboard.length);
                      const allAvg = Number(leaderboardInsights.avgValue);

                      return (
                        <>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Top 10 Avg</span>
                              <span className="font-bold text-gray-900 dark:text-white">{top10Avg.toFixed(1)}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Top 25 Avg</span>
                              <span className="font-bold text-gray-900 dark:text-white">{top25Avg.toFixed(1)}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(top25Avg / top10Avg) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Overall Avg</span>
                              <span className="font-bold text-gray-900 dark:text-white">{allAvg}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${(allAvg / top10Avg) * 100}%` }}
                              />
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Win Rate Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 Win Rate Ranges</h3>
                  <div className="space-y-2">
                    {(() => {
                      const ranges = [
                        { label: '80-100%', min: 0.8, max: 1.0, color: 'bg-green-500' },
                        { label: '60-80%', min: 0.6, max: 0.8, color: 'bg-blue-500' },
                        { label: '40-60%', min: 0.4, max: 0.6, color: 'bg-yellow-500' },
                        { label: '20-40%', min: 0.2, max: 0.4, color: 'bg-orange-500' },
                        { label: '0-20%', min: 0, max: 0.2, color: 'bg-red-500' },
                      ];

                      return ranges.map(range => {
                        const count = globalLeaderboard.filter(e => e.winRate >= range.min && e.winRate < range.max).length;
                        const percentage = (count / globalLeaderboard.length) * 100;

                        return (
                          <div key={range.label}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700 dark:text-gray-300">{range.label}</span>
                              <span className="font-bold text-gray-900 dark:text-white">{count} • {percentage.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className={`${range.color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                No leaderboard data available. Go to Global Rankings tab and select a sport to view insights.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
