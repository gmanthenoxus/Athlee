/**
 * SportPicker Component
 * 
 * Display all available sports in a responsive grid.
 * Simple reusable component - navigation handled by parent.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { SportCard } from './SportCard';
import { sportConfigService } from '@/lib/sportConfigService';
import { type SportType } from '@/lib/location-types';
import type { SportConfig } from '@/lib/match-types';

interface SportPickerProps {
  selected?: SportType;
  onSelect: (sport: SportType) => void;
}

export const SportPicker: React.FC<SportPickerProps> = ({
  selected,
  onSelect,
}) => {
  const [sports, setSports] = useState<SportConfig[]>([]);

  // Load available sports on mount
  useEffect(() => {
    const availableSports = sportConfigService.getSportsForPicker();
    setSports(availableSports);
  }, []);

  const handleSelectSport = (sport: SportConfig) => {
    onSelect(sport.sport);
  };

  return (
    <div className="w-full">
      {/* Sport Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map((sport, index) => (
          <SportCard
            key={`sport-${sport.sport}-${index}`}
            sport={sport}
            isSelected={selected === sport.sport}
            onSelect={handleSelectSport}
          />
        ))}
      </div>

      {/* Empty state */}
      {sports.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">No sports available</p>
        </div>
      )}
    </div>
  );
};
