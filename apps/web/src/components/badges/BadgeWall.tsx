'use client';

import React, { useState, useMemo } from 'react';
import { Badge, BadgeCategory, BadgeProgress } from '@/lib/badge-types';
import { BADGE_CATALOG, getVisibleBadges, getBadgesByCategory } from '@/lib/badgeCatalog';
import { badgeProgressService } from '@/lib/badgeProgressService';
import { BadgeCard } from './BadgeCard';
import { BadgeDetail } from './BadgeDetail';
import { PinBadgeModal } from './PinBadgeModal';
import { Filter, Grid3x3 } from 'lucide-react';

interface BadgeWallProps {
  userId: string;
  compact?: boolean; // Show only pinned badges on profile
}

export function BadgeWall({ userId, compact = false }: BadgeWallProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<BadgeCategory | 'all'>('all');

  // Get all badge progress for user
  const allProgress = useMemo(
    () => badgeProgressService.getAllProgress(userId),
    [userId]
  );

  // Get progress map for quick lookup
  const progressMap = useMemo(
    () => new Map(allProgress.map((p) => [p.badgeId, p])),
    [allProgress]
  );

  // Filter badges
  const filteredBadges = useMemo(() => {
    let badges = getVisibleBadges();
    if (filterCategory !== 'all') {
      badges = badges.filter((b) => b.category === filterCategory);
    }
    return badges;
  }, [filterCategory]);

  // Stats
  const stats = useMemo(() => {
    const total = BADGE_CATALOG.length;
    const earned = allProgress.filter((p) => p.earned).length;
    const inProgress = allProgress.filter((p) => !p.earned && p.percentage > 0).length;
    const locked = allProgress.filter((p) => !p.earned && p.percentage === 0).length;
    return { total, earned, inProgress, locked };
  }, [allProgress]);

  const categories: (BadgeCategory | 'all')[] = [
    'all',
    'General',
    'Sport',
    'Location',
    'Social',
    'Account',
    'Referral',
  ];

  if (compact) {
    // Show only pinned badges
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Featured Badges</h3>
          <button
            onClick={() => setShowPinModal(true)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Manage
          </button>
        </div>

        {/* Pinned badges grid (3 columns on desktop) */}
        <div className="grid grid-cols-3 gap-3">
          {allProgress
            .filter((p) => p.earned)
            .slice(0, 3)
            .map((progress) => {
              const badge = BADGE_CATALOG.find((b) => b.id === progress.badgeId);
              if (!badge) return null;
              return (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  progress={progress}
                  onClick={() => {
                    setSelectedBadge(badge);
                    setShowDetail(true);
                  }}
                />
              );
            })}
        </div>

        {/* Pin Modal */}
        {showPinModal && <PinBadgeModal userId={userId} onClose={() => setShowPinModal(false)} />}

        {/* Detail Modal */}
        {showDetail && selectedBadge && (
          <BadgeDetail
            badge={selectedBadge}
            progress={progressMap.get(selectedBadge.id)}
            onClose={() => setShowDetail(false)}
          />
        )}
      </div>
    );
  }

  // Full Badge Wall
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-2xl font-bold text-blue-900">{stats.earned}</p>
          <p className="text-sm text-blue-700 mt-1">Earned</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <p className="text-2xl font-bold text-purple-900">{stats.inProgress}</p>
          <p className="text-sm text-purple-700 mt-1">In Progress</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{stats.locked}</p>
          <p className="text-sm text-gray-700 mt-1">Locked</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
          <p className="text-2xl font-bold text-amber-900">{stats.total}</p>
          <p className="text-sm text-amber-700 mt-1">Total</p>
        </div>
      </div>

      {/* Filter & Manage */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowPinModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Grid3x3 className="w-4 h-4" />
          Manage Pinned Badges
        </button>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            progress={progressMap.get(badge.id)}
            onClick={() => {
              setSelectedBadge(badge);
              setShowDetail(true);
            }}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedBadge && (
        <BadgeDetail
          badge={selectedBadge}
          progress={progressMap.get(selectedBadge.id)}
          onClose={() => setShowDetail(false)}
        />
      )}

      {/* Pin Modal */}
      {showPinModal && <PinBadgeModal userId={userId} onClose={() => setShowPinModal(false)} />}
    </div>
  );
}
