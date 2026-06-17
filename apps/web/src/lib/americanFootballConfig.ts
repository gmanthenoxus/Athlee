/**
 * American Football Sport Configuration
 * 
 * Defines American football-specific match settings, team sizes, and rule presets
 */

import { SportType } from './location-types';
import {
  MatchType,
  StatIntensity,
  SportConfig,
  TeamSizeConfig,
  MatchTypeOption,
} from './match-types';
import { FOOTBALL_PRESETS } from './mockFootballRulePresets';

/**
 * American Football match type options
 */
export const AMERICAN_FOOTBALL_MATCH_TYPES: MatchTypeOption[] = [
  {
    type: MatchType.Single,
    label: 'Single Game',
    enabled: true,
    description: 'One-off match with final score',
  },
  {
    type: MatchType.SetBased,
    label: 'Series',
    enabled: true,
    description: 'Multiple games in series',
  },
  {
    type: MatchType.Tournament,
    label: 'Tournament',
    enabled: false,
    description: 'Tournament bracket (coming soon)',
  },
  {
    type: MatchType.Rotational,
    label: 'Rotational',
    enabled: false,
    description: 'Rotating players (coming soon)',
  },
];

/**
 * American Football team size options
 */
export const AMERICAN_FOOTBALL_TEAM_SIZES: TeamSizeConfig[] = [
  { label: '11v11 (Full)', playersPerTeam: 11, substitutes: 11 },
  { label: '7v7 (Flag)', playersPerTeam: 7, substitutes: 3 },
];

/**
 * American Football stat intensity options
 */
export const AMERICAN_FOOTBALL_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Professional American Football Sport Configuration
 */
export const AMERICAN_FOOTBALL_CONFIG: SportConfig = {
  sport: SportType.American_Football,
  enabled: true,
  icon: '🏈',
  displayName: 'American Football',
  description: 'American football and flag football with comprehensive stat tracking',
  matchTypes: AMERICAN_FOOTBALL_MATCH_TYPES,
  teamSizeOptions: AMERICAN_FOOTBALL_TEAM_SIZES,
  statIntensities: AMERICAN_FOOTBALL_STAT_INTENSITIES,
  rulePresets: FOOTBALL_PRESETS,
};
