/**
 * Baseball Sport Configuration
 * 
 * Defines baseball-specific match settings, team sizes, and rule presets
 */

import { SportType } from './location-types';
import {
  MatchType,
  StatIntensity,
  SportConfig,
  TeamSizeConfig,
  MatchTypeOption,
} from './match-types';
import { BASEBALL_PRESETS } from './mockBaseballRulePresets';

/**
 * Baseball match type options
 */
export const BASEBALL_MATCH_TYPES: MatchTypeOption[] = [
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
 * Baseball team size options
 */
export const BASEBALL_TEAM_SIZES: TeamSizeConfig[] = [
  { label: '9v9 (Full)', playersPerTeam: 9, substitutes: 6 },
  { label: '7v7 (Small)', playersPerTeam: 7, substitutes: 3 },
];

/**
 * Baseball stat intensity options
 */
export const BASEBALL_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Professional Baseball Sport Configuration
 */
export const BASEBALL_CONFIG: SportConfig = {
  sport: SportType.Baseball,
  enabled: true,
  icon: '⚾',
  displayName: 'Baseball',
  description: 'Baseball and softball with comprehensive stat tracking',
  matchTypes: BASEBALL_MATCH_TYPES,
  teamSizeOptions: BASEBALL_TEAM_SIZES,
  statIntensities: BASEBALL_STAT_INTENSITIES,
  rulePresets: BASEBALL_PRESETS,
};
