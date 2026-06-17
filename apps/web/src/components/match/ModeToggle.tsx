'use client';

import React from 'react';
import { MatchMode } from '@/lib/match-types';

interface ModeToggleProps {
  selectedMode: MatchMode | undefined;
  onSelectMode: (mode: MatchMode) => void;
  disabled?: boolean;
}

/**
 * ModeToggle - Selects between Casual and Competitive match modes
 */
export const ModeToggle: React.FC<ModeToggleProps> = ({
  selectedMode,
  onSelectMode,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Match Mode</label>
      <div className="flex gap-2">
        {[MatchMode.Casual, MatchMode.Competitive].map((mode) => (
          <button
            key={mode}
            onClick={() => onSelectMode(mode)}
            disabled={disabled}
            className={`
              flex-1 py-2 px-3 rounded-lg font-medium transition-all
              ${
                selectedMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {mode === MatchMode.Casual ? '👕 Casual' : '🏆 Competitive'}
          </button>
        ))}
      </div>
      {selectedMode === MatchMode.Casual && (
        <p className="text-xs text-blue-600">
          ℹ️ Casual matches are simplified and welcoming to all skill levels.
        </p>
      )}
      {selectedMode === MatchMode.Competitive && (
        <p className="text-xs text-amber-600">
          ℹ️ Competitive matches require jersey numbers and stricter validation.
        </p>
      )}
    </div>
  );
};
