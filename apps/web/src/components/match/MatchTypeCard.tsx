'use client';

import React from 'react';
import { MatchTypeConfig } from '@/lib/match-types';

interface MatchTypeCardProps {
  config: MatchTypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
  hasSubtypes?: boolean;
}

/**
 * MatchTypeCard - Displays a match type option (Single Game, Set-Based, Tournament, Rotational)
 */
export const MatchTypeCard: React.FC<MatchTypeCardProps> = ({
  config,
  isSelected,
  onSelect,
  hasSubtypes = false,
}) => {
  const handleClick = () => {
    if (config.enabled) {
      onSelect(config.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!config.enabled}
      title={config.tooltip}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50'
            : config.enabled
              ? 'border-gray-300 bg-white hover:border-gray-400'
              : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
        }
      `}
    >
      {config.icon && <span className="text-3xl">{config.icon}</span>}
      <div className="text-center">
        <h3 className="font-semibold text-sm">{config.name}</h3>
        <p className="text-xs text-gray-600">{config.description}</p>
        {hasSubtypes && !isSelected && (
          <span className="text-xs text-gray-500 mt-1">→ Subtypes</span>
        )}
      </div>
      {!config.enabled && config.tooltip && (
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1">
          {config.tooltip}
        </span>
      )}
    </button>
  );
};
