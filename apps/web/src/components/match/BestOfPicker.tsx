'use client';

import React from 'react';

interface BestOfPickerProps {
  selectedBestOf: number | undefined;
  onSelectBestOf: (bestOf: number) => void;
  disabled?: boolean;
}

/**
 * BestOfPicker - Selects Best of 3 or Best of 5 for series matches
 */
export const BestOfPicker: React.FC<BestOfPickerProps> = ({
  selectedBestOf,
  onSelectBestOf,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">Number of Games</label>
      <div className="flex gap-2">
        {[3, 5].map((num) => (
          <button
            key={num}
            onClick={() => onSelectBestOf(num)}
            disabled={disabled}
            className={`
              flex-1 py-2 px-3 rounded-lg font-medium transition-all
              ${
                selectedBestOf === num
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <span className="block text-lg font-bold">{num}</span>
            <span className="text-xs">Best of {num}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-600">
        First to {selectedBestOf ? Math.ceil(selectedBestOf / 2) : '?'} wins
      </p>
    </div>
  );
};
