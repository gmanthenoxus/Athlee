'use client';

import React from 'react';
import { TeamSizeConfig } from '@/lib/match-types';

interface TeamSizePickerProps {
  options: TeamSizeConfig[];
  selectedTeamSize: TeamSizeConfig | undefined;
  onSelectTeamSize: (teamSize: TeamSizeConfig) => void;
  disabled?: boolean;
  fixedSize?: string; // If specified, show as fixed label instead of picker
}

/**
 * TeamSizePicker - Selects team size (5v5, 3v3, 2v2, 1v1, etc.)
 */
export const TeamSizePicker: React.FC<TeamSizePickerProps> = ({
  options,
  selectedTeamSize,
  onSelectTeamSize,
  disabled = false,
  fixedSize,
}) => {
  if (fixedSize) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Team Size</label>
        <div className="py-2 px-3 rounded-lg bg-blue-50 border-2 border-blue-300">
          <p className="font-medium text-center">{fixedSize}</p>
          <p className="text-xs text-gray-600 text-center">
            Fixed for this match type
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Team Size</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.label}
            onClick={() => onSelectTeamSize(option)}
            disabled={disabled}
            className={`
              py-2 px-3 rounded-lg font-medium transition-all
              ${
                selectedTeamSize?.label === option.label
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {option.label}
            <span className="text-xs block text-gray-700 mt-1">
              {option.substitutes > 0 ? `+${option.substitutes} subs` : 'No subs'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
