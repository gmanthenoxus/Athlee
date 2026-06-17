/**
 * Pickleball Sport Configuration
 * 
 * Comprehensive configuration for pickleball matches including:
 * - Team size options (singles 1v1, doubles 2v2)
 * - Match type configurations (Single Game focus)
 * - Rule presets (USAPA Standard, 15/21-point, Quick Play, Recreational, Custom)
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
import { PICKLEBALL_PRESETS } from './mockPickleballRulePresets';

/**
 * Pickleball match type options
 */
export const PICKLEBALL_MATCH_TYPES: MatchTypeOption[] = [
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
 * Pickleball team size options (singles and doubles)
 * Pickleball uses singles (1v1) or doubles (2v2)
 */
export const PICKLEBALL_TEAM_SIZES: TeamSizeConfig[] = [
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
 * Pickleball stat intensity options
 */
export const PICKLEBALL_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Single Game Match Type Configuration
 * Primary match type for pickleball
 */
export const PICKLEBALL_SINGLE_GAME_TYPE: MatchTypeConfig = {
  id: 'single',
  name: 'Single Match',
  description: 'A single pickleball match (best of 3 games)',
  enabled: true,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  defaultTeamSize: 'Singles (1v1)',
  defaultStatIntensity: StatIntensity.Basic,
};

/**
 * Pickleball sport configuration
 */
export const PICKLEBALL_CONFIG: SportConfig = {
  sport: SportType.Pickleball,
  enabled: true,
  icon: '🏓',
  displayName: 'Pickleball',
  description: 'Rapidly growing racket sport with rally scoring, played on small courts',
  matchTypes: PICKLEBALL_MATCH_TYPES,
  matchTypeConfigs: [PICKLEBALL_SINGLE_GAME_TYPE],
  teamSizeOptions: PICKLEBALL_TEAM_SIZES,
  statIntensities: PICKLEBALL_STAT_INTENSITIES,
  rulePresets: PICKLEBALL_PRESETS,
};
