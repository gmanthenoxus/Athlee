'use client';

import React from 'react';

interface StatInputProps {
  value: number;
  onChange: (value: number) => void;
  statAbbreviation: string;
  min?: number;
  max?: number;
}

/**
 * Numeric stat input with increment/decrement buttons
 */
export function StatInput({
  value,
  onChange,
  statAbbreviation,
  min = 0,
  max = 999
}: StatInputProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value, 10) || 0;
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
  };

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
      <button
        onClick={handleDecrement}
        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-12 text-center font-semibold text-gray-900 border-0 focus:outline-none"
        min={min}
        max={max}
      />
      <button
        onClick={handleIncrement}
        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
      >
        +
      </button>
    </div>
  );
}
