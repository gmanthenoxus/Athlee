/**
 * Tennis Sport Configuration
 * 
 * Comprehensive configuration for tennis matches including:
 * - Team size options (singles 1v1, doubles 2v2)
 * - Match type configurations (Single Game focus)
 * - Rule presets (Standard, No-Ad, Fast4, Best of 5, Recreational, Custom)
 * - Stat tracking intensities (Basic, Advanced)
 */

import { SportType } from './location-types';
import {
  MatchType,
  StatIntensity,
  SportConfig,
  TeamSizeConfig,
  MatchTypeOption,
  MatchTypeConfig,
} from './match-types';
import { TENNIS_PRESETS } from './mockTennisRulePresets';

/**
 * Tennis match type options
 */
export const TENNIS_MATCH_TYPES: MatchTypeOption[] = [
  {
    type: MatchType.Single,
    label: 'Single Match',
    enabled: true,
    description: 'One-off match with final score',
  },
  {
    type: MatchType.SetBased,
    label: 'Set-Based',
    enabled: false,
    description: 'Multiple matches in series (coming soon)',
  },
  {
    type: MatchType.Tournament,
    label: 'Tournament',
    enabled: false,
    description: 'Tournament bracket (coming soon)',
  },
];

/**
 * Tennis team size options (singles and doubles)
 * Tennis traditionally uses singles (1v1) or doubles (2v2)
 */
export const TENNIS_TEAM_SIZES: TeamSizeConfig[] = [
  {
    label: 'Singles (1v1)',
    playersPerTeam: 1,
    substitutes: 0,
  },
  {
    label: 'Doubles (2v2)',
    playersPerTeam: 2,
    substitutes: 0,
  },
];

/**
 * Tennis stat intensity options
 */
export const TENNIS_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Single Game Match Type Configuration
 * Primary match type for tennis
 */
export const TENNIS_SINGLE_GAME_TYPE: MatchTypeConfig = {
  id: 'single',
  name: 'Single Match',
  description: 'A single tennis match (best of 3 or 5 sets)',
  enabled: true,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  defaultTeamSize: 'Singles (1v1)',
  defaultStatIntensity: StatIntensity.Basic,
};

/**
 * Tennis sport configuration
 */
export const TENNIS_CONFIG: SportConfig = {
  sport: SportType.Tennis,
  enabled: true,
  icon: '🎾',
  displayName: 'Tennis',
  description: 'Racket sport played on courts with singles and doubles formats',
  matchTypes: TENNIS_MATCH_TYPES,
  matchTypeConfigs: [TENNIS_SINGLE_GAME_TYPE],
  teamSizeOptions: TENNIS_TEAM_SIZES,
  statIntensities: TENNIS_STAT_INTENSITIES,
  rulePresets: TENNIS_PRESETS,
};
