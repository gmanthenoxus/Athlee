/**
 * XPBar Component
 * Displays user's XP progress with level, rank, and numeric values
 */

'use client';

import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { xpService } from '@/lib/xpService';
import { XPHistoryModal } from './XPHistoryModal';

interface XPBarProps {
  userId: string;
  compact?: boolean; // For profile badges (smaller size)
  onClick?: () => void;
}

export const XPBar: React.FC<XPBarProps> = ({ userId, compact = false, onClick }) => {
  const xpProfile = xpService.getXPProfile(userId);
  const levelInfo = xpService.getLevelFromXP(xpProfile.totalXP);
  const [showHistory, setShowHistory] = useState(false);

  const progressPercent = levelInfo.percentToNextLevel;

  if (compact) {
    return (
      <div
        className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200 cursor-pointer hover:shadow-md transition-shadow"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-gray-900">{xpProfile.rankTitle}</span>
            <span className="text-xs text-gray-600">Level {xpProfile.level}</span>
          </div>
        </div>

        {/* Compact progress bar */}
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-400 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-gray-600 mt-2">
          {levelInfo.xpIntoCurrentLevel} / {levelInfo.totalForCurrentLevel} XP
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 shadow-sm">
        {/* Header with rank and level */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full p-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{xpProfile.rankTitle}</p>
              <p className="text-sm text-gray-600">Level {xpProfile.level}</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="text-sm px-3 py-1 bg-white border border-amber-200 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
          >
            History
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xs font-semibold text-gray-700">Progress to Level {xpProfile.level + 1}</span>
            <span className="text-xs font-semibold text-gray-600">
              {progressPercent}%
            </span>
          </div>
          <div className="bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 h-full rounded-full shadow-lg transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* XP numbers */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700 font-medium">
            {levelInfo.xpIntoCurrentLevel.toLocaleString()} / {levelInfo.totalForCurrentLevel.toLocaleString()} XP
          </span>
          <span className="text-gray-600">
            Total: {xpProfile.totalXP.toLocaleString()} XP
          </span>
        </div>

        {/* Next level info */}
        <div className="mt-3 p-2 bg-white/50 rounded-lg border border-amber-100">
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-amber-700">{levelInfo.xpIntoNextLevel.toLocaleString()} XP</span> until Level {xpProfile.level + 1}
          </p>
        </div>
      </div>

      {/* History modal */}
      {showHistory && (
        <XPHistoryModal
          userId={userId}
          onClose={() => setShowHistory(false)}
        />
      )}
    </>
  );
};
