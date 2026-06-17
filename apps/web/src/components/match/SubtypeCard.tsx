'use client';

import React from 'react';
import { MatchSubtypeConfig } from '@/lib/match-types';

interface SubtypeCardProps {
  config: MatchSubtypeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * SubtypeCard - Displays a match subtype option (HORSE, Best of, King of Court, etc.)
 */
export const SubtypeCard: React.FC<SubtypeCardProps> = ({
  config,
  isSelected,
  onSelect,
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
        flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
        ${
          isSelected
            ? 'border-green-500 bg-green-50'
            : config.enabled
              ? 'border-gray-300 bg-white hover:border-gray-400'
              : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
        }
      `}
    >
      {config.icon && <span className="text-2xl">{config.icon}</span>}
      <div className="text-center">
        <h4 className="font-medium text-sm">{config.name}</h4>
        <p className="text-xs text-gray-600">{config.description}</p>
        {config.fixedTeamSize && !isSelected && (
          <span className="text-xs text-blue-600 mt-1 font-medium">
            {config.fixedTeamSize}
          </span>
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
