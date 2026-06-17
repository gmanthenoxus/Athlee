import React from 'react';
import { StatButton } from './StatButton';
import type { LiveMatchStatButtons, LivePlayerStats } from '@/lib/live-match-types';

interface PlayerStatCardProps {
  player: LivePlayerStats;
  statButtons: LiveMatchStatButtons;
  onStatClick: (statKey: string) => void;
  jerseyNo?: string;
}

/**
 * Player card showing name, stats, and stat buttons
 */
export function PlayerStatCard({
  player,
  statButtons,
  onStatClick,
  jerseyNo
}: PlayerStatCardProps) {
  // Group buttons by category
  const categories = Array.from(
    new Set(Object.values(statButtons).map((b) => b.category))
  );

  // Get total points from fg2m, fg3m, ftm
  const totalPoints =
    (player.stats['fg2m'] || 0) * 2 +
    (player.stats['fg3m'] || 0) * 3 +
    (player.stats['ftm'] || 0) * 1;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Player Header */}
      <div className="flex items-start justify-between mb-4 pb-2 border-b border-gray-100">
        <div>
          <h4 className="font-semibold text-gray-900">{player.playerName}</h4>
          {jerseyNo && (
            <p className="text-xs text-gray-500">#{jerseyNo}</p>
          )}
        </div>
        {totalPoints > 0 && (
          <div className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-sm font-bold">
            {totalPoints} pts
          </div>
        )}
      </div>

      {/* Stat Buttons Grouped by Category */}
      <div className="space-y-3">
        {categories.map((category) => {
          const categoryButtons = Object.values(statButtons).filter(
            (b) => b.category === category
          );

          return (
            <div key={category}>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                {category}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categoryButtons.map((button) => (
                  <StatButton
                    key={button.statKey}
                    label={button.label}
                    shortLabel={button.shortLabel}
                    value={player.stats[button.statKey] || 0}
                    onClick={() => onStatClick(button.statKey)}
                    color={button.color || 'bg-blue-500'}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
