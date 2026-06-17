'use client';

import { SportType } from '@athlehub/shared';
import { FC } from 'react';

interface SportIconsProps {
  sports: SportType[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
}

/**
 * SportIcons component
 * Displays sport badges/icons
 */
export const SportIcons: FC<SportIconsProps> = ({ sports, size = 'md', maxDisplay = 4 }) => {
  const displaySports = sports.slice(0, maxDisplay);
  const remaining = Math.max(0, sports.length - maxDisplay);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div className="flex flex-wrap gap-2">
      {displaySports.map((sport) => (
        <span key={sport} className={`${sizeClasses[size]} bg-purple-100 text-purple-800 rounded font-medium`}>
          {sport}
        </span>
      ))}
      {remaining > 0 && (
        <span className={`${sizeClasses[size]} bg-purple-100 text-purple-800 rounded font-medium`}>
          +{remaining} more
        </span>
      )}
    </div>
  );
};
