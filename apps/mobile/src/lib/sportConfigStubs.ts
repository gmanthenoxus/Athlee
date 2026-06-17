/**
 * Stub sport configurations for disabled sports (Mobile)
 * 
 * These are placeholders for sports that will be implemented in the future.
 * They define minimal configurations to mark the sport as disabled.
 */

import { SportType } from './location-types';
import type { SportConfig, MatchTypeOption, MatchTypeConfig } from './match-types';
import { StatIntensity } from './match-types';

// Common match types for sports
const DEFAULT_MATCH_TYPES: MatchTypeOption[] = [
  { type: 'Single' as any, enabled: true },
  { type: 'SetBased' as any, enabled: false },
  { type: 'Tournament' as any, enabled: false },
  { type: 'Rotational' as any, enabled: false },
];

// Default match type configurations for disabled sports (minimal placeholder)
const DEFAULT_MATCH_TYPE_CONFIGS: MatchTypeConfig[] = [
  {
    id: 'single',
    name: 'Single Game',
    description: 'A standalone pickup game',
    enabled: true,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    defaultTeamSize: 'Standard',
    defaultStatIntensity: StatIntensity.Basic,
  },
  {
    id: 'set-based',
    name: 'Set-Based',
    description: 'Multiple sets or rounds',
    enabled: false,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    tooltip: 'Coming soon',
  },
  {
    id: 'tournament',
    name: 'Tournament',
    description: 'Tournament bracket',
    enabled: false,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    tooltip: 'Coming soon',
  },
  {
    id: 'rotational',
    name: 'Rotational',
    description: 'Rotating players',
    enabled: false,
    requiresTeamSize: true,
    requiresStatIntensity: true,
    tooltip: 'Coming soon',
  },
];

/**
 * Soccer Sport Configuration (disabled - coming soon)
 */
export const SOCCER_CONFIG: SportConfig = {
  sport: SportType.Soccer,
  enabled: false,
  icon: '⚽',
  displayName: 'Soccer',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};

/**
 * Tennis Sport Configuration (disabled - coming soon)
 */
export const TENNIS_CONFIG: SportConfig = {
  sport: SportType.Tennis,
  enabled: false,
  icon: '🎾',
  displayName: 'Tennis',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};

/**
 * Badminton Sport Configuration (disabled - coming soon)
 */
export const BADMINTON_CONFIG: SportConfig = {
  sport: SportType.Badminton,
  enabled: false,
  icon: '🏸',
  displayName: 'Badminton',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};

/**
 * Volleyball Sport Configuration (disabled - coming soon)
 */
export const VOLLEYBALL_CONFIG: SportConfig = {
  sport: SportType.Volleyball,
  enabled: false,
  icon: '🏐',
  displayName: 'Volleyball',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};

/**
 * Baseball Sport Configuration (disabled - coming soon)
 */
export const BASEBALL_CONFIG: SportConfig = {
  sport: SportType.Baseball,
  enabled: false,
  icon: '⚾',
  displayName: 'Baseball',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};

/**
 * Pickleball Sport Configuration (disabled - coming soon)
 */
export const PICKLEBALL_CONFIG: SportConfig = {
  sport: SportType.Pickleball,
  enabled: false,
  icon: '🏓',
  displayName: 'Pickleball',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};

/**
 * American Football Sport Configuration (disabled - coming soon)
 */
export const AMERICAN_FOOTBALL_CONFIG: SportConfig = {
  sport: SportType.American_Football,
  enabled: false,
  icon: '🏈',
  displayName: 'American Football',
  description: 'Coming soon',
  matchTypes: DEFAULT_MATCH_TYPES,
  matchTypeConfigs: DEFAULT_MATCH_TYPE_CONFIGS,
  teamSizeOptions: [],
  statIntensities: [],
  rulePresets: [],
};
