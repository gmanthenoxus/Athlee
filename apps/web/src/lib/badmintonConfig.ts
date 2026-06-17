/**
 * Badminton Sport Configuration
 * 
 * Comprehensive configuration for badminton matches including:
 * - Team size options (singles 1v1, doubles 2v2)
 * - Match type configurations (Single Game focus)
 * - Rule presets (BWF Standard, 15-point, 11-point, Single Game, Recreational, Custom)
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
import { BADMINTON_PRESETS } from './mockBadmintonRulePresets';

/**
 * Badminton match type options
 */
export const BADMINTON_MATCH_TYPES: MatchTypeOption[] = [
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
 * Badminton team size options (singles and doubles)
 * Badminton uses singles (1v1) or doubles (2v2)
 */
export const BADMINTON_TEAM_SIZES: TeamSizeConfig[] = [
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
 * Badminton stat intensity options
 */
export const BADMINTON_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Single Game Match Type Configuration
 * Primary match type for badminton
 */
export const BADMINTON_SINGLE_GAME_TYPE: MatchTypeConfig = {
  id: 'single',
  name: 'Single Match',
  description: 'A single badminton match (best of 3 games)',
  enabled: true,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  defaultTeamSize: 'Singles (1v1)',
  defaultStatIntensity: StatIntensity.Basic,
};

/**
 * Badminton sport configuration
 */
export const BADMINTON_CONFIG: SportConfig = {
  sport: SportType.Badminton,
  enabled: true,
  icon: '🏸',
  displayName: 'Badminton',
  description: 'Racket sport played on courts with singles and doubles formats, rally scoring',
  matchTypes: BADMINTON_MATCH_TYPES,
  matchTypeConfigs: [BADMINTON_SINGLE_GAME_TYPE],
  teamSizeOptions: BADMINTON_TEAM_SIZES,
  statIntensities: BADMINTON_STAT_INTENSITIES,
  rulePresets: BADMINTON_PRESETS,
};
