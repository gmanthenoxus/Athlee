/**
 * MatchXPSummary Component
 * Shows XP earned from a completed match breakdown
 */

'use client';

import React from 'react';
import { Trophy, Zap, Award } from 'lucide-react';

export interface MatchXPBreakdown {
  matchXP: number;
  winXP: number;
  mvpXP: number;
  totalXP: number;
  leveledUp: boolean;
  newLevel?: number;
  newRank?: string;
}

interface MatchXPSummaryProps {
  breakdown: MatchXPBreakdown;
}

export const MatchXPSummary: React.FC<MatchXPSummaryProps> = ({ breakdown }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200 p-4 mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-amber-600" />
        <h3 className="font-semibold text-gray-900">Match XP Earned</h3>
      </div>

      {/* XP Breakdown */}
      <div className="space-y-2 text-sm mb-3">
        {breakdown.matchXP > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Match Completion</span>
            <span className="font-semibold text-amber-700">+{breakdown.matchXP} XP</span>
          </div>
        )}
        {breakdown.winXP > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-700 flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Match Win Bonus
            </span>
            <span className="font-semibold text-green-700">+{breakdown.winXP} XP</span>
          </div>
        )}
        {breakdown.mvpXP > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-700 flex items-center gap-1">
              <Award className="w-4 h-4" />
              MVP Award
            </span>
            <span className="font-semibold text-purple-700">+{breakdown.mvpXP} XP</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-amber-200 my-3" />

      {/* Total */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-900">Total Earned</span>
        <span className="text-xl font-bold text-amber-600">+{breakdown.totalXP} XP</span>
      </div>

      {/* Level up notification */}
      {breakdown.leveledUp && breakdown.newLevel && (
        <div className="bg-white/70 border border-amber-300 rounded p-2 text-center">
          <p className="text-sm font-semibold text-amber-700">
            🎉 Level Up! You reached Level {breakdown.newLevel} ({breakdown.newRank})
          </p>
        </div>
      )}
    </div>
  );
};
