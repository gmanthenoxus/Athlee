/**
 * XP & Levels Management Tab
 * 
 * Manage player progression, XP adjustment, and level tracking
 */

import React, { useState, useMemo } from 'react';
import { userStatsService } from '@/lib/userStatsService';

interface AdminXPTabProps {
  users: any[];
  onUpdate?: () => void;
}

interface XPUser {
  id: string;
  name: string;
  email: string;
  totalXP: number;
  level: number;
  rankTitle: string;
  nextLevelXP: number;
  xpIntoCurrentLevel: number;
  progressPercent: number;
}

export const AdminXPTab: React.FC<AdminXPTabProps> = ({ users, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'level' | 'xp' | 'name'>('level');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [xpAdjustment, setXpAdjustment] = useState(0);

  // LEVEL THRESHOLDS FOR CALCULATION
  const LEVEL_THRESHOLDS: Record<number, number> = {
    1: 0, 2: 100, 3: 300, 4: 600, 5: 1000,
    6: 1500, 7: 2100, 8: 2800, 9: 3600, 10: 4500,
  };

  // Get player data with XP info - directly from userStatsService (same source as Health tab)
  const playerXPData = useMemo(() => {
    const players = users.filter((u) => u.accountType === 'Player');
    return players
      .map((player) => {
        const stats = userStatsService.getUserStats(player.id);
        const totalXP = stats?.totalXP || 0;
        const level = stats?.level || 1;

        // Calculate progress to next level
        const currentLevelXP = LEVEL_THRESHOLDS[level] || 0;
        const nextLevelXP = LEVEL_THRESHOLDS[Math.min(10, level + 1)] || LEVEL_THRESHOLDS[10];
        const xpIntoCurrentLevel = totalXP - currentLevelXP;
        const xpNeededForNext = nextLevelXP - currentLevelXP;
        const progressPercent = xpNeededForNext > 0 ? Math.min(100, (xpIntoCurrentLevel / xpNeededForNext) * 100) : 0;

        return {
          id: player.id,
          name: `${player.firstName || ''} ${player.lastName || ''}`.trim() || player.email,
          email: player.email,
          totalXP,
          level,
          rankTitle: stats?.rankTitle || 'Player',
          nextLevelXP,
          xpIntoCurrentLevel,
          progressPercent,
        };
      })
      .filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'level':
            return b.level - a.level;
          case 'xp':
            return b.totalXP - a.totalXP;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [users, searchTerm, sortBy]);

  const handleAdjustXP = (userId: string, amount: number) => {
    try {
      if (amount !== 0) {
        userStatsService.awardXP(userId, amount);
      }
      setEditingUserId(null);
      setXpAdjustment(0);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to adjust XP:', error);
    }
  };

  const handleSetLevel = (userId: string, delta: number) => {
    try {
      const currentStats = userStatsService.getUserStats(userId);
      const newLevel = Math.max(1, Math.min(10, currentStats.level + delta));
      userStatsService.setLevel(userId, newLevel);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to set level:', error);
    }
  };

  const handleResetXP = (userId: string) => {
    try {
      userStatsService.setLevel(userId, 1);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to reset XP:', error);
    }
  };

  const stats = useMemo(() => {
    if (playerXPData.length === 0) {
      return { avgLevel: 0, totalXP: 0, maxLevel: 0 };
    }

    const avgLevel = playerXPData.reduce((sum, p) => sum + p.level, 0) / playerXPData.length;
    const totalXP = playerXPData.reduce((sum, p) => sum + p.totalXP, 0);
    const maxLevel = Math.max(...playerXPData.map((p) => p.level));

    return { avgLevel, totalXP, maxLevel };
  }, [playerXPData]);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Average Level</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.avgLevel.toFixed(1)}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Total XP</p>
          <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{(stats.totalXP / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Max Level</p>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.maxLevel}</p>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'level' | 'xp' | 'name')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="level">Sort by: Level</option>
          <option value="xp">Sort by: XP</option>
          <option value="name">Sort by: Name</option>
        </select>
      </div>

      {/* Player List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {playerXPData.map((player) => (
          <div key={player.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            {editingUserId === player.id ? (
              // Edit Mode
              <div className="space-y-3">
                <p className="font-medium text-gray-900 dark:text-white">{player.name}</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={xpAdjustment}
                    onChange={(e) => setXpAdjustment(Number(e.target.value))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="XP amount"
                  />
                  <button
                    onClick={() => handleAdjustXP(player.id, xpAdjustment)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {player.name}
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-sm font-semibold">
                        Lv. {player.level}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">{player.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{player.rankTitle}</p>
                    <p className="text-sm text-gray-500">{player.totalXP} XP</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>{player.xpIntoCurrentLevel} XP into level</span>
                    <span>{player.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${player.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleSetLevel(player.id, 1)}
                    className="px-2 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded text-sm"
                  >
                    Level +
                  </button>
                  <button
                    onClick={() => handleSetLevel(player.id, -1)}
                    className="px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded text-sm"
                  >
                    Level -
                  </button>
                  <button
                    onClick={() => setEditingUserId(player.id)}
                    className="px-2 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded text-sm"
                  >
                    Adjust XP
                  </button>
                  <button
                    onClick={() => handleResetXP(player.id)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 rounded text-sm"
                    title="Reset player to level 1"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
