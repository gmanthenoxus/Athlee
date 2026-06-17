/**
 * XPHistoryModal Component
 * Shows user's recent XP gains with sources and timestamps
 */

'use client';

import React, { useMemo } from 'react';
import { X, Zap, Trophy, Award, Target, Users } from 'lucide-react';
import { xpService } from '@/lib/xpService';
import { XPSource } from '@/lib/xp-types';

interface XPHistoryModalProps {
  userId: string;
  onClose: () => void;
}

const SOURCE_ICONS: Record<XPSource, React.FC<{ className?: string }>> = {
  [XPSource.MatchCompletion]: Zap,
  [XPSource.MatchWin]: Trophy,
  [XPSource.MVP]: Award,
  [XPSource.Badge]: Trophy,
  [XPSource.Milestone]: Target,
  [XPSource.Referral]: Users
};

const SOURCE_LABELS: Record<XPSource, string> = {
  [XPSource.MatchCompletion]: 'Match Completed',
  [XPSource.MatchWin]: 'Match Won',
  [XPSource.MVP]: 'MVP Award',
  [XPSource.Badge]: 'Badge Earned',
  [XPSource.Milestone]: 'Milestone',
  [XPSource.Referral]: 'Referral'
};

const SOURCE_COLORS: Record<XPSource, string> = {
  [XPSource.MatchCompletion]: 'bg-blue-100 text-blue-700',
  [XPSource.MatchWin]: 'bg-green-100 text-green-700',
  [XPSource.MVP]: 'bg-purple-100 text-purple-700',
  [XPSource.Badge]: 'bg-yellow-100 text-yellow-700',
  [XPSource.Milestone]: 'bg-orange-100 text-orange-700',
  [XPSource.Referral]: 'bg-pink-100 text-pink-700'
};

export const XPHistoryModal: React.FC<XPHistoryModalProps> = ({ userId, onClose }) => {
  const history = useMemo(() => xpService.getXPHistory(userId, 30), [userId]);

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">XP History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4">
          {history.length === 0 ? (
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">No XP history yet.</p>
              <p className="text-sm text-gray-500">Complete matches and earn badges to start gaining XP!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((entry) => {
                const IconComponent = SOURCE_ICONS[entry.source];
                const sourceLabel = SOURCE_LABELS[entry.source];
                const colorClass = SOURCE_COLORS[entry.source];

                return (
                  <div
                    key={entry.id}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`${colorClass} rounded-full p-2 flex-shrink-0 mt-0.5`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-gray-900 text-sm">{sourceLabel}</p>
                          <span className="text-lg font-bold text-amber-600 flex-shrink-0">
                            +{entry.amount}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">
                          {entry.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(entry.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
