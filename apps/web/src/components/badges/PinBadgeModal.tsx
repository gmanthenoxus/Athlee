'use client';

import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { BADGE_CATALOG } from '@/lib/badgeCatalog';
import { badgeAwardService } from '@/lib/badgeAwardService';
import { badgeProgressService } from '@/lib/badgeProgressService';
import { BadgeCard } from './BadgeCard';

interface PinBadgeModalProps {
  userId: string;
  onClose?: () => void;
}

export function PinBadgeModal({ userId, onClose }: PinBadgeModalProps) {
  const [selectedBadgeIds, setSelectedBadgeIds] = useState<string[]>(
    () => badgeAwardService.getPinnedBadges(userId)
  );

  // Get earned badges
  const earnedBadges = useMemo(() => {
    const earnedIds = badgeAwardService.getUserEarnedBadgeIds(userId);
    return BADGE_CATALOG.filter((b) => earnedIds.includes(b.id));
  }, [userId]);

  // Get progress for all badges
  const allProgress = useMemo(
    () => badgeProgressService.getAllProgress(userId),
    [userId]
  );

  const progressMap = useMemo(
    () => new Map(allProgress.map((p) => [p.badgeId, p])),
    [allProgress]
  );

  const handleToggle = (badgeId: string) => {
    if (selectedBadgeIds.includes(badgeId)) {
      setSelectedBadgeIds((prev) => prev.filter((id) => id !== badgeId));
    } else if (selectedBadgeIds.length < 3) {
      setSelectedBadgeIds((prev) => [...prev, badgeId]);
    }
  };

  const handleSave = () => {
    badgeAwardService.pinBadges(userId, selectedBadgeIds);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pin Badges</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Select up to 3 badges to display prominently on your profile. Selected:{' '}
              <span className="font-semibold">{selectedBadgeIds.length}/3</span>
            </p>
          </div>

          {/* Earned Badges Grid */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Earned Badges</h3>
            {earnedBadges.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                You haven't earned any badges yet. Complete challenges to earn badges!
              </p>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {earnedBadges.map((badge) => (
                  <button
                    key={badge.id}
                    onClick={() => handleToggle(badge.id)}
                    className="cursor-pointer"
                  >
                    <BadgeCard
                      badge={badge}
                      progress={progressMap.get(badge.id)}
                      selected={selectedBadgeIds.includes(badge.id)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selection Summary */}
          {selectedBadgeIds.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">Pinned Badges:</h4>
              <div className="space-y-2">
                {selectedBadgeIds.map((badgeId) => {
                  const badge = BADGE_CATALOG.find((b) => b.id === badgeId);
                  return badge ? (
                    <div key={badgeId} className="flex items-center gap-2 text-sm">
                      <span className="text-lg">{badge.icon}</span>
                      <span className="text-blue-900 font-medium">{badge.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
