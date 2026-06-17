'use client';

import React from 'react';
import { StatIntensity } from '@/lib/match-types';

interface StatIntensityPickerProps {
  options: StatIntensity[];
  selectedIntensity: StatIntensity | undefined;
  onSelectIntensity: (intensity: StatIntensity) => void;
  disabled?: boolean;
}

const intensityDescriptions: Record<StatIntensity, string> = {
  [StatIntensity.Basic]: 'Points only',
  [StatIntensity.Advanced]: 'Points, Rebounds, Assists, Steals, Blocks',
  [StatIntensity.Professional]: 'Advanced + Shooting Splits',
  [StatIntensity.Custom]: 'Custom tracked stats',
};

/**
 * StatIntensityPicker - Selects stat tracking intensity level
 */
export const StatIntensityPicker: React.FC<StatIntensityPickerProps> = ({
  options,
  selectedIntensity,
  onSelectIntensity,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Stat Tracking</label>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectIntensity(option)}
            disabled={disabled}
            className={`
              flex items-start gap-3 p-3 rounded-lg border-2 transition-all text-left
              ${
                selectedIntensity === option
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex-1">
              <p className="font-medium text-sm">{option}</p>
              <p className="text-xs text-gray-600">
                {intensityDescriptions[option]}
              </p>
            </div>
            {selectedIntensity === option && (
              <span className="text-purple-500 text-lg">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
