/**
 * Badges Management Tab
 * 
 * Award badges to players, view badge progress, manage achievements
 */

import React, { useState, useMemo } from 'react';
import { BADGE_CATALOG } from '@/lib/badgeCatalog';
import { badgeAwardService } from '@/lib/badgeAwardService';
import { badgeProgressService } from '@/lib/badgeProgressService';

interface AdminBadgesTabProps {
  users: any[];
  onUpdate?: () => void;
}

type ViewMode = 'catalog' | 'player-progress' | 'award';

export const AdminBadgesTab: React.FC<AdminBadgesTabProps> = ({ users, onUpdate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('catalog');
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get players only
  const players = useMemo(() => users.filter((u) => u.accountType === 'Player'), [users]);

  // Filter badges by category and search
  const filteredBadges = useMemo(() => {
    return BADGE_CATALOG.filter((badge) => {
      const categoryMatch = filterCategory === 'All' || badge.category === filterCategory;
      const searchMatch =
        badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [filterCategory, searchTerm]);

  // Get badge categories
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(BADGE_CATALOG.map((b) => b.category)))],
    []
  );

  // Get unique badge counts per player
  const playerBadgeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    players.forEach((player) => {
      counts[player.id] = badgeAwardService.getUserEarnedBadgeIds(player.id).length;
    });
    return counts;
  }, [players]);

  const handleAwardBadge = (userId: string, badgeId: string) => {
    try {
      const success = badgeAwardService.awardBadge(userId, badgeId);
      if (success) {
        onUpdate?.();
        alert(`✅ Badge awarded!`);
      } else {
        alert('⚠️ Badge already earned or invalid');
      }
    } catch (error) {
      console.error('Failed to award badge:', error);
      alert('❌ Failed to award badge');
    }
  };

  const handleAwardBadgeToAll = (badgeId: string) => {
    try {
      let count = 0;
      players.forEach((player) => {
        if (badgeAwardService.awardBadge(player.id, badgeId)) {
          count++;
        }
      });
      onUpdate?.();
      alert(`✅ Awarded to ${count} player(s)`);
    } catch (error) {
      console.error('Failed to mass-award:', error);
    }
  };

  const selectedBadge = BADGE_CATALOG.find((b) => b.id === selectedBadgeId);
  const selectedPlayer = players.find((p) => p.id === selectedUserId);

  return (
    <div className="space-y-6">
      {/* View Mode Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setViewMode('catalog')}
          className={`px-4 py-2 font-medium transition-colors ${
            viewMode === 'catalog'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          Badge Catalog
        </button>
        <button
          onClick={() => setViewMode('player-progress')}
          className={`px-4 py-2 font-medium transition-colors ${
            viewMode === 'player-progress'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          Player Progress
        </button>
        <button
          onClick={() => setViewMode('award')}
          className={`px-4 py-2 font-medium transition-colors ${
            viewMode === 'award'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          Award Badges
        </button>
      </div>

      {/* CATALOG VIEW */}
      {viewMode === 'catalog' && (
        <div className="space-y-4">
          {/* Filter Controls */}
          <div className="flex gap-3 flex-wrap">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-64">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => {
              const totalEarned = players.filter((p) =>
                badgeAwardService.hasEarnedBadge(p.id, badge.id)
              ).length;

              return (
                <div
                  key={badge.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-gray-800"
                  onClick={() => {
                    setSelectedBadgeId(badge.id);
                    setViewMode('award');
                  }}
                >
                  {/* Badge Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{badge.icon}</div>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-semibold">
                      {badge.category}
                    </span>
                  </div>

                  {/* Badge Info */}
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{badge.description}</p>

                  {/* Earned Count */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500">
                      Earned by {totalEarned} player{totalEarned !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAwardBadgeToAll(badge.id);
                      }}
                      className="px-2 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded text-xs font-semibold transition-colors"
                    >
                      Award All
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No badges found matching your filters
            </div>
          )}
        </div>
      )}

      {/* PLAYER PROGRESS VIEW */}
      {viewMode === 'player-progress' && (
        <div className="space-y-4">
          {/* Player List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {players.map((player) => {
              const badgeIds = badgeAwardService.getUserEarnedBadgeIds(player.id);
              const earnedBadges = BADGE_CATALOG.filter((b) => badgeIds.includes(b.id));

              return (
                <div
                  key={player.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
                >
                  {/* Player Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {player.firstName} {player.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{player.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">{badgeIds.length}</p>
                      <p className="text-xs text-gray-500">badges earned</p>
                    </div>
                  </div>

                  {/* Earned Badges Display */}
                  {earnedBadges.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {earnedBadges.map((badge) => (
                        <div
                          key={badge.id}
                          title={badge.name}
                          className="text-2xl relative group"
                        >
                          {badge.icon}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {badge.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No badges earned yet</p>
                  )}

                  {/* Quick Award Button */}
                  <button
                    onClick={() => {
                      setSelectedUserId(player.id);
                      setViewMode('award');
                    }}
                    className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Award Badge →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AWARD BADGES VIEW */}
      {viewMode === 'award' && (
        <div className="space-y-4">
          {!selectedUserId && !selectedBadgeId ? (
            <div className="text-center py-12 text-gray-500">
              Select a player and badge to award. Click a player from "Player Progress" or a badge
              from "Badge Catalog"
            </div>
          ) : (
            <>
              {/* Selection Summary */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {selectedPlayer && (
                    <>
                      <strong>Player:</strong> {selectedPlayer.firstName} {selectedPlayer.lastName}
                      <br />
                    </>
                  )}
                  {selectedBadge && (
                    <>
                      <strong>Badge:</strong> {selectedBadge.icon} {selectedBadge.name}
                    </>
                  )}
                </p>
              </div>

              {/* Award to Specific Player */}
              {!selectedUserId && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Select Player
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                    {players.map((player) => (
                      <button
                        key={player.id}
                        onClick={() => setSelectedUserId(player.id)}
                        className="p-3 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <p className="font-medium text-gray-900 dark:text-white">
                          {player.firstName} {player.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{player.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {playerBadgeCounts[player.id] || 0} badges
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Award to Specific Badge */}
              {!selectedBadgeId && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Select Badge
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                    {BADGE_CATALOG.map((badge) => (
                      <button
                        key={badge.id}
                        onClick={() => setSelectedBadgeId(badge.id)}
                        className="p-3 text-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title={badge.name}
                      >
                        <div className="text-3xl mb-1">{badge.icon}</div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2">
                          {badge.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Award Button */}
              {selectedUserId && selectedBadgeId && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleAwardBadge(selectedUserId, selectedBadgeId);
                      setSelectedUserId(null);
                      setSelectedBadgeId(null);
                    }}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    ✅ Award Badge
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUserId(null);
                      setSelectedBadgeId(null);
                    }}
                    className="px-6 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Summary Stats */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Badges</p>
            <p className="text-2xl font-bold text-purple-600">{BADGE_CATALOG.length}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Players</p>
            <p className="text-2xl font-bold text-blue-600">{players.length}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">Avg Badges/Player</p>
            <p className="text-2xl font-bold text-green-600">
              {players.length > 0
                ? (
                    Object.values(playerBadgeCounts).reduce((a, b) => a + b, 0) /
                    players.length
                  ).toFixed(1)
                : '0'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
