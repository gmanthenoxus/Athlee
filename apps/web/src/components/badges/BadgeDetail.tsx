'use client';

import React, { useState } from 'react';
import { Badge, BadgeProgress } from '@/lib/badge-types';
import { X } from 'lucide-react';

interface BadgeDetailProps {
  badge: Badge;
  progress?: BadgeProgress;
  onClose?: () => void;
}

export function BadgeDetail({ badge, progress, onClose }: BadgeDetailProps) {
  const earned = progress?.earned || false;

  const getEarnCondition = (): string => {
    const criteria = badge.criteria;

    switch (criteria.type) {
      case 'matchCount':
        return `Play ${criteria.threshold} ${criteria.sport || 'total'} match${criteria.threshold > 1 ? 'es' : ''}`;
      case 'statTotal':
        return `Record ${criteria.threshold} total ${criteria.statKey}`;
      case 'winStreak':
        if (criteria.threshold === 1) return 'Win your first match';
        return `Win ${criteria.threshold} match${criteria.threshold > 1 ? 'es' : ''}`;
      case 'singleGameStat':
        if (criteria.achievementType === 'doubleDouble') return 'Achieve a double-double (10+ in 2 stats)';
        if (criteria.achievementType === 'tripleDouble') return 'Achieve a triple-double (10+ in 3 stats)';
        if (criteria.achievementType === '50PointGame') return 'Score 50+ points in a single game';
        if (criteria.achievementType === 'firstThreePointer')
          return 'Attempt your first 3-pointer';
        if (criteria.achievementType === 'perfectGame') return 'Play a perfect game (0 turnovers, 0 fouls)';
        return 'Complete a special achievement';
      case 'locationMatches':
        return `Play ${criteria.threshold} match${criteria.threshold > 1 ? 'es' : ''} at the same location`;
      case 'social':
        return `Connect with ${criteria.threshold} other players`;
      case 'referral':
        return `Refer ${criteria.threshold} player${criteria.threshold > 1 ? 's' : ''}`;
      default:
        return 'Complete a challenge';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Badge Details</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Icon & Title */}
          <div className="text-center">
            <div className="text-6xl mb-4">{badge.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{badge.name}</h3>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {badge.category}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{badge.description}</p>
          </div>

          {/* How to Earn */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">How to Earn</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{getEarnCondition()}</p>
          </div>

          {/* Progress or Earned Info */}
          {earned && progress?.earnedAt ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-900 mb-1">🏆 You earned this badge!</p>
              <p className="text-xs text-green-700">
                Earned on {new Date(progress.earnedAt).toLocaleDateString()}
              </p>
            </div>
          ) : progress ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-blue-900">Progress</p>
                <span className="text-sm font-bold text-blue-600">{progress.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <p className="text-xs text-blue-700 mt-2">
                {progress.currentProgress} / {progress.threshold}
              </p>
            </div>
          ) : null}

          {/* Rarity (if applicable) */}
          {badge.rarity && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700">Rarity</p>
              <p className="text-sm text-gray-600 capitalize mt-1">{badge.rarity}</p>
            </div>
          )}

          {/* Secret Badge Warning */}
          {badge.hidden && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-yellow-900">🤫 Secret Badge</p>
              <p className="text-xs text-yellow-700 mt-1">This badge will be revealed when earned!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          {onClose && (
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
