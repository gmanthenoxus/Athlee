/**
 * SportCard Component
 * 
 * Individual sport card for the sport picker.
 * Shows sport icon, name, and selection state.
 * Handles disabled state with "Coming Soon" overlay.
 */

import React from 'react';
import type { SportConfig } from '@/lib/match-types';

interface SportCardProps {
  sport: SportConfig;
  isSelected: boolean;
  onSelect: (sport: SportConfig) => void;
}

export const SportCard: React.FC<SportCardProps> = ({ sport, isSelected, onSelect }) => {
  const handleClick = () => {
    if (sport.enabled) {
      onSelect(sport);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!sport.enabled}
      className={`
        relative
        w-full
        aspect-square
        rounded-lg
        flex
        flex-col
        items-center
        justify-center
        gap-3
        p-4
        transition-all
        duration-200
        ${
          sport.enabled
            ? isSelected
              ? 'bg-blue-100 border-2 border-blue-600 shadow-md'
              : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-md'
            : 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed opacity-60'
        }
      `}
    >
      {/* Icon */}
      <div className="text-5xl">{sport.icon}</div>

      {/* Sport Name */}
      <h3 className="text-sm font-semibold text-gray-800 text-center truncate w-full">
        {sport.displayName}
      </h3>

      {/* Description */}
      {sport.description && (
        <p className="text-xs text-gray-600 text-center line-clamp-2">
          {sport.description}
        </p>
      )}

      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Coming Soon Overlay */}
      {!sport.enabled && (
        <div className="absolute inset-0 rounded-lg bg-black bg-opacity-30 flex items-center justify-center">
          <span className="text-xs font-bold text-white bg-black bg-opacity-60 px-2 py-1 rounded">
            COMING SOON
          </span>
        </div>
      )}
    </button>
  );
};
