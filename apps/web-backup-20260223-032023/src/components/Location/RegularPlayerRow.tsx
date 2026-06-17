'use client';

import { LocationPlayerRecord } from '@athlehub/shared';
import Link from 'next/link';
import { FC } from 'react';

interface RegularPlayerRowProps {
  player: LocationPlayerRecord;
  index: number;
}

/**
 * RegularPlayerRow component
 * Displays a regular player at a location
 */
export const RegularPlayerRow: FC<RegularPlayerRowProps> = ({ player, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      {/* Rank and Player Info */}
      <div className="flex items-center gap-3 flex-1">
        <span className="text-sm font-bold text-gray-900 w-6 text-center">{index + 1}</span>
        <div>
          <p className="text-sm font-semibold text-gray-900">Player {player.playerId}</p>
          <p className="text-xs text-gray-600">First: {formatDate(player.firstSeen)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">{player.matchCount}</p>
        <p className="text-xs text-gray-600">matches</p>
      </div>
    </div>
  );
};
