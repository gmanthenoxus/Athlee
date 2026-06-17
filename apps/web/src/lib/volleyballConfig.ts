/**
 * Volleyball Sport Configuration
 * 
 * Defines volleyball-specific match settings, team sizes, and rule presets
 */

import { SportType } from './location-types';
import {
  MatchType,
  StatIntensity,
  SportConfig,
  TeamSizeConfig,
  MatchTypeOption,
} from './match-types';
import { VOLLEYBALL_PRESETS } from './mockVolleyballRulePresets';

/**
 * Volleyball match type options
 */
export const VOLLEYBALL_MATCH_TYPES: MatchTypeOption[] = [
  {
    type: MatchType.Single,
    label: 'Single Match',
    enabled: true,
    description: 'One-off match with final score',
  },
  {
    type: MatchType.SetBased,
    label: 'Best of Series',
    enabled: true,
    description: 'Multiple matches in series',
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
 * Volleyball team size options
 */
export const VOLLEYBALL_TEAM_SIZES: TeamSizeConfig[] = [
  { label: '6v6 (Indoor)', playersPerTeam: 6, substitutes: 6 },
  { label: '2v2 (Beach)', playersPerTeam: 2, substitutes: 2 },
];

/**
 * Volleyball stat intensity options
 */
export const VOLLEYBALL_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Professional Volleyball Sport Configuration
 */
export const VOLLEYBALL_CONFIG: SportConfig = {
  sport: SportType.Volleyball,
  enabled: true,
  icon: '🏐',
  displayName: 'Volleyball',
  description: 'Indoor and beach volleyball with comprehensive stat tracking',
  matchTypes: VOLLEYBALL_MATCH_TYPES,
  teamSizeOptions: VOLLEYBALL_TEAM_SIZES,
  statIntensities: VOLLEYBALL_STAT_INTENSITIES,
  rulePresets: VOLLEYBALL_PRESETS,
};
