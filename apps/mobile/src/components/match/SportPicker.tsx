/**
 * SportPicker Component (React Native)
 * 
 * Step 1 of the Match Setup Wizard: Sport Selection (Mobile)
 * 
 * Features:
 * - Display all available sports in a responsive grid
 * - Pre-select user's primary sport if available
 * - Enable selection only for enabled sports
 * - Save selection to match setup session
 * - Validate that sport is selected before allowing proceed
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
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

  useEffect(() => {
    const availableSports = sportConfigService.getSportsForPicker();
    setSports(availableSports);
  }, []);

  const handleSelectSport = (sport: SportConfig) => {
    if (sport.enabled) {
      onSelect(sport.sport);
    }
  };

  return (
    <FlatList
      data={sports}
      renderItem={({ item, index }) => (
        <SportCard
          key={`sport-${item.sport}-${index}`}
          sport={item}
          isSelected={selected === item.sport}
          onSelect={() => handleSelectSport(item)}
        />
      )}
      keyExtractor={(item, index) => `sport-${item.sport}-${index}`}
      numColumns={2}
      columnWrapperStyle={styles.grid}
      scrollEnabled={true}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});
