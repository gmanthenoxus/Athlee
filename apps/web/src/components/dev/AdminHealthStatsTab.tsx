/**
 * Health & Stats Tab
 * 
 * Player health monitoring and comprehensive statistics
 * - Player health status (availability, fitness, activity)
 * - Performance trends and analytics
 * - System health diagnostics
 * - Data integrity checks
 */

import React, { useState, useMemo } from 'react';
import { userStatsService } from '@/lib/userStatsService';
import { followerService } from '@/lib/followerService';

interface AdminHealthStatsTabProps {
  users: any[];
  onUpdate?: () => void;
}

interface PlayerHealthStatus {
  id: string;
  name: string;
  email: string;
  accountType: string;
  healthStatus: 'Active' | 'Inactive' | 'AtRisk' | 'Suspended';
  lastActive: Date;
  daysSinceActive: number;
  totalMatches: number;
  winRate: number;
  level: number;
  totalXP: number;
  followers: number;
  totalStats: number;
}

export const AdminHealthStatsTab: React.FC<AdminHealthStatsTabProps> = ({ 
  users, 
  onUpdate 
}) => {
  const [viewMode, setViewMode] = useState<'player-health' | 'system-health' | 'performance'>('player-health');
  const [sortBy, setSortBy] = useState<'lastActive' | 'winRate' | 'matches' | 'followers'>('lastActive');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive' | 'AtRisk'>('all');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  // Get player health data
  const playerHealthData = useMemo(() => {
    return users
      .filter(u => u.accountType === 'Player')
      .map(user => {
        const stats = userStatsService.getUserStats(user.id);
        const lastActive = stats?.lastActive ? new Date(stats.lastActive) : new Date();
        const now = new Date();
        const daysSinceActive = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

        // Determine health status
        let healthStatus: 'Active' | 'Inactive' | 'AtRisk' | 'Suspended' = 'Active';
        if (daysSinceActive > 30) {
          healthStatus = 'Suspended';
        } else if (daysSinceActive > 14) {
          healthStatus = 'Inactive';
        } else if (daysSinceActive > 7 || (stats?.careerWinPercentage || 0) < 0.3) {
          healthStatus = 'AtRisk';
        }

        return {
          id: user.id,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
          email: user.email,
          accountType: user.accountType,
          healthStatus,
          lastActive,
          daysSinceActive,
          totalMatches: stats?.totalMatches || 0,
          winRate: stats?.careerWinPercentage || 0,
          level: stats?.level || 1,
          totalXP: stats?.totalXP || 0,
          followers: followerService.getFollowerCount(user.id),
          totalStats: Object.keys(stats?.sportStats || {}).length,
        } as PlayerHealthStatus;
      })
      .filter(p => filterStatus === 'all' || p.healthStatus === filterStatus)
      .sort((a, b) => {
        switch (sortBy) {
          case 'lastActive':
            return a.daysSinceActive - b.daysSinceActive;
          case 'winRate':
            return b.winRate - a.winRate;
          case 'matches':
            return b.totalMatches - a.totalMatches;
          case 'followers':
            return b.followers - a.followers;
          default:
            return 0;
        }
      });
  }, [users, sortBy, filterStatus]);

  // System health diagnostics
  const systemHealth = useMemo(() => {
    const allStats = userStatsService.getAllUserStats();
    const totalUsers = users.length;
    const activeUsers = playerHealthData.filter(p => p.healthStatus === 'Active').length;
    const inactiveUsers = playerHealthData.filter(p => p.healthStatus === 'Inactive').length;
    const atRiskUsers = playerHealthData.filter(p => p.healthStatus === 'AtRisk').length;

    // Check for orphaned stats
    const usersWithStats = allStats.length;
    const orphanedStats = usersWithStats - users.filter(u => u.accountType === 'Player').length;

    // Check follower data
    const totalFollows = playerHealthData.reduce((sum, p) => sum + p.followers, 0);
    const avgFollowers = playerHealthData.length > 0 ? (totalFollows / playerHealthData.length).toFixed(1) : 0;

    // Data completeness
    const completeProfiles = playerHealthData.filter(p => p.totalStats > 0).length;
    const profileCompleteness = playerHealthData.length > 0 
      ? ((completeProfiles / playerHealthData.length) * 100).toFixed(1) 
      : 0;

    // Calculate storage usage (rough estimate)
    const statsSize = usersWithStats * 2; // ~2KB per player stats
    const followsSize = Math.ceil(totalFollows * 0.1); // ~0.1KB per follow
    const totalSize = statsSize + followsSize;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      atRiskUsers,
      suspendedUsers: playerHealthData.filter(p => p.healthStatus === 'Suspended').length,
      usersWithStats,
      orphanedStats,
      totalFollows,
      avgFollowers,
      profileCompleteness,
      estimatedStorageKB: totalSize,
      healthScore: ((activeUsers / totalUsers) * 100).toFixed(1),
    };
  }, [playerHealthData, users]);

  // Performance trends
  const performanceTrends = useMemo(() => {
    const allStats = userStatsService.getAllUserStats();

    // Rankings by different metrics
    const topByWinRate = [...playerHealthData]
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, 5);

    const topByMatches = [...playerHealthData]
      .sort((a, b) => b.totalMatches - a.totalMatches)
      .slice(0, 5);

    const topByFollowers = [...playerHealthData]
      .sort((a, b) => b.followers - a.followers)
      .slice(0, 5);

    // Win rate distribution
    const winRateRanges = [
      { label: '80-100%', min: 0.8, max: 1.0, count: 0 },
      { label: '60-80%', min: 0.6, max: 0.8, count: 0 },
      { label: '40-60%', min: 0.4, max: 0.6, count: 0 },
      { label: '20-40%', min: 0.2, max: 0.4, count: 0 },
      { label: '0-20%', min: 0, max: 0.2, count: 0 },
    ];

    playerHealthData.forEach(player => {
      const range = winRateRanges.find(r => player.winRate >= r.min && player.winRate < r.max);
      if (range) range.count++;
    });

    return {
      topByWinRate,
      topByMatches,
      topByFollowers,
      winRateRanges,
      avgMatchesPerPlayer: playerHealthData.length > 0 
        ? (playerHealthData.reduce((sum, p) => sum + p.totalMatches, 0) / playerHealthData.length).toFixed(1)
        : 0,
      avgWinRate: playerHealthData.length > 0 
        ? ((playerHealthData.reduce((sum, p) => sum + p.winRate, 0) / playerHealthData.length) * 100).toFixed(1)
        : 0,
    };
  }, [playerHealthData]);

  // StatusBadge component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      'Active': 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 border border-green-200 dark:border-green-700',
      'Inactive': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-700',
      'AtRisk': 'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 border border-orange-200 dark:border-orange-700',
      'Suspended': 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-700',
    };
    const icons = {
      'Active': '✅',
      'Inactive': '⏸️',
      'AtRisk': '⚠️',
      'Suspended': '🚫',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${colors[status as keyof typeof colors]}`}>
        <span>{icons[status as keyof typeof icons]}</span>
        {status}
      </span>
    );
  };

  // StatBox component
  const StatBox = ({ label, value, icon, trend, color }: any) => (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-4 border`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {trend && <p className="text-xs mt-1">{trend}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setViewMode('player-health')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'player-health'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>❤️</span> Player Health
        </button>
        <button
          onClick={() => setViewMode('system-health')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'system-health'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>🔧</span> System Health
        </button>
        <button
          onClick={() => setViewMode('performance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'performance'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>📊</span> Performance
        </button>
      </div>

      {/* VIEW: Player Health */}
      {viewMode === 'player-health' && (
        <div className="space-y-6">
          {/* Filters and Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Filter by Status:
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Players</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
                <option value="AtRisk">At Risk Only</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="lastActive">Last Active</option>
                <option value="winRate">Win Rate</option>
                <option value="matches">Total Matches</option>
                <option value="followers">Most Followers</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox
              label="Active Players"
              value={systemHealth.activeUsers}
              icon="✅"
              color="from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700"
            />
            <StatBox
              label="At Risk"
              value={systemHealth.atRiskUsers}
              icon="⚠️"
              color="from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700"
            />
            <StatBox
              label="Inactive"
              value={systemHealth.inactiveUsers}
              icon="⏸️"
              color="from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700"
            />
            <StatBox
              label="Suspended"
              value={systemHealth.suspendedUsers}
              icon="🚫"
              color="from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700"
            />
          </div>

          {/* Player List */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">📋 Player Health Status</h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {playerHealthData.map(player => {
                const isExpanded = expandedUserId === player.id;
                const riskLevel = 
                  player.healthStatus === 'Suspended' ? 'high' :
                  player.healthStatus === 'Inactive' ? 'medium' :
                  player.healthStatus === 'AtRisk' ? 'elevated' :
                  'low';

                return (
                  <div key={player.id}>
                    <div
                      onClick={() => setExpandedUserId(isExpanded ? null : player.id)}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{player.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{player.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusBadge status={player.healthStatus} />
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {player.daysSinceActive}d ago
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Last active</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {(player.winRate * 100).toFixed(0)}%
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Win rate</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Lvl {player.level}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{player.totalXP} XP</p>
                          </div>
                          <div className="text-xl">
                            {isExpanded ? '▼' : '▶'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 space-y-3 text-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Total Matches</p>
                            <p className="font-bold text-gray-900 dark:text-white">{player.totalMatches}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Followers</p>
                            <p className="font-bold text-gray-900 dark:text-white">{player.followers}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Sports Tracked</p>
                            <p className="font-bold text-gray-900 dark:text-white">{player.totalStats}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Account Type</p>
                            <p className="font-bold text-gray-900 dark:text-white">{player.accountType}</p>
                          </div>
                        </div>
                        {player.healthStatus === 'AtRisk' && (
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded">
                            <p className="text-xs font-medium text-orange-900 dark:text-orange-100">
                              ⚠️ This player shows signs of low engagement. Low win rate or inactive for 7+ days.
                            </p>
                          </div>
                        )}
                        {player.healthStatus === 'Inactive' && (
                          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded">
                            <p className="text-xs font-medium text-yellow-900 dark:text-yellow-100">
                              No activity for 14+ days. Consider engagement campaigns.
                            </p>
                          </div>
                        )}
                        {player.healthStatus === 'Suspended' && (
                          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded">
                            <p className="text-xs font-medium text-red-900 dark:text-red-100">
                              Inactive for 30+ days. May need re-engagement or account review.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: System Health */}
      {viewMode === 'system-health' && (
        <div className="space-y-6">
          {/* Health Score */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🏥 System Health Score</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Health</span>
                <span className="font-bold text-gray-900 dark:text-white">{systemHealth.healthScore}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    Number(systemHealth.healthScore) >= 75 ? 'bg-green-500' :
                    Number(systemHealth.healthScore) >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${systemHealth.healthScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {Number(systemHealth.healthScore) >= 75 ? '✅ Healthy' : 
                 Number(systemHealth.healthScore) >= 50 ? '⚠️ Needs attention' : 
                 '🚨 Critical'}
              </p>
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatBox
              label="Total Players"
              value={systemHealth.totalUsers}
              icon="👥"
              color="from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700"
            />
            <StatBox
              label="Players with Stats"
              value={systemHealth.usersWithStats}
              icon="📊"
              color="from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700"
            />
            <StatBox
              label="Profile Completeness"
              value={`${systemHealth.profileCompleteness}%`}
              icon="✅"
              color="from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700"
            />
            <StatBox
              label="Total Follows"
              value={systemHealth.totalFollows}
              icon="🔗"
              color="from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-700"
            />
            <StatBox
              label="Avg Followers"
              value={systemHealth.avgFollowers}
              icon="⭐"
              color="from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700"
            />
            <StatBox
              label="Est. Storage"
              value={`${systemHealth.estimatedStorageKB} KB`}
              icon="💾"
              color="from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Data Integrity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔍 Data Integrity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">Orphaned Stats Records</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {systemHealth.orphanedStats}
                  {systemHealth.orphanedStats === 0 && <span className="text-green-500 ml-2">✓</span>}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">Average Followers per Player</span>
                <span className="font-bold text-gray-900 dark:text-white">{systemHealth.avgFollowers}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300">Players with Complete Profiles</span>
                <span className="font-bold text-gray-900 dark:text-white">{systemHealth.profileCompleteness}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Performance Trends */}
      {viewMode === 'performance' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatBox
              label="Avg Matches per Player"
              value={performanceTrends.avgMatchesPerPlayer}
              icon="🏆"
              trend="Career total"
              color="from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700"
            />
            <StatBox
              label="Avg Win Rate"
              value={`${performanceTrends.avgWinRate}%`}
              icon="🎯"
              trend="System average"
              color="from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700"
            />
          </div>

          {/* Win Rate Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Win Rate Distribution</h3>
            <div className="space-y-2">
              {performanceTrends.winRateRanges.map(range => {
                const percentage = playerHealthData.length > 0 ? (range.count / playerHealthData.length) * 100 : 0;
                return (
                  <div key={range.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{range.label}</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {range.count} • {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          range.min >= 0.6 ? 'bg-green-500' :
                          range.min >= 0.4 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Rankings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top by Win Rate */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔥 Top Players (Win Rate)</h3>
              <div className="space-y-2">
                {performanceTrends.topByWinRate.map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        #{idx + 1} {player.name.split(' ')[0]}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {(player.winRate * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Active */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ Most Active</h3>
              <div className="space-y-2">
                {performanceTrends.topByMatches.map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        #{idx + 1} {player.name.split(' ')[0]}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {player.totalMatches}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Followed */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">⭐ Top Influencers</h3>
              <div className="space-y-2">
                {performanceTrends.topByFollowers.map((player, idx) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        #{idx + 1} {player.name.split(' ')[0]}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {player.followers}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
