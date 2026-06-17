import { SportType } from './location-types';
import { 
  MatchType, 
  StatIntensity, 
  RulePreset, 
  SportConfig, 
  TeamSizeConfig, 
  MatchRules, 
  MatchTypeOption,
  MatchTypeConfig,
  MatchSubtypeConfig
} from './match-types';
import { BASKETBALL_PRESETS } from './mockRulePresets';

/**
 * Basketball match type options
 */
export const BASKETBALL_MATCH_TYPES: MatchTypeOption[] = [
  { type: MatchType.Single, label: 'Single Game', enabled: true, description: 'One-off match with final score' },
  { type: MatchType.SetBased, label: 'Best of...', enabled: true, description: 'Multiple sets or rounds' },
  { type: MatchType.Tournament, label: 'Tournament', enabled: false, description: 'Tournament bracket' },
  { type: MatchType.Rotational, label: 'Rotational', enabled: false, description: 'Rotating players' },
];

/**
 * Basketball team size options
 */
export const BASKETBALL_TEAM_SIZES: TeamSizeConfig[] = [
  { label: '5v5', playersPerTeam: 5, substitutes: 7 },
  { label: '3v3', playersPerTeam: 3, substitutes: 2 },
  { label: '2v2', playersPerTeam: 2, substitutes: 1 },
  { label: '1v1', playersPerTeam: 1, substitutes: 0 },
];

/**
 * Basketball stat intensity options
 */
export const BASKETBALL_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Basketball player positions
 */
export const BASKETBALL_POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];

/**
 * FIBA Rule Preset - Imported from mockRulePresets
 */
export const FIBA_PRESET: RulePreset = BASKETBALL_PRESETS[0];

/**
 * NBA Rule Preset - Imported from mockRulePresets
 */
export const NBA_PRESET: RulePreset = BASKETBALL_PRESETS[1];

/**
 * NCAA Rule Preset - Imported from mockRulePresets
 */
export const NCAA_PRESET: RulePreset = BASKETBALL_PRESETS[2];

/**
 * Streetball Rule Preset - Imported from mockRulePresets
 */
export const STREETBALL_PRESET: RulePreset = BASKETBALL_PRESETS[3];

/**
 * All basketball rule presets
 */
export const BASKETBALL_RULE_PRESETS: RulePreset[] = [
  FIBA_PRESET,
  NBA_PRESET,
  NCAA_PRESET,
  STREETBALL_PRESET,
];

/**
 * ========================================
 * MATCH TYPE CONFIGURATIONS
 * ========================================
 */

/**
 * Single Game - Standard one-off pickup match
 */
export const SINGLE_GAME_TYPE: MatchTypeConfig = {
  id: 'single',
  name: 'Single Game',
  description: 'A standalone pickup game with final score',
  icon: '🏀',
  enabled: true,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  defaultTeamSize: '5v5',
  defaultStatIntensity: StatIntensity.Basic,
};

/**
 * Set-Based Challenges subtypes
 */
export const HORSE_SUBTYPE: MatchSubtypeConfig = {
  id: 'horse',
  name: 'H.O.R.S.E.',
  description: 'Players replicate trick shots - first to spell the word loses',
  icon: '🎯',
  enabled: true,
  requiresTeamSize: false,
  fixedTeamSize: '1v1',
  requiresStatIntensity: false,
};

export const BEST_OF_SUBTYPE: MatchSubtypeConfig = {
  id: 'best-of',
  name: 'Best of Series',
  description: 'Best of 3 or 5 games',
  icon: '🏆',
  enabled: true,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  defaultStatIntensity: StatIntensity.Basic,
  requiresBestOf: true,
  defaultBestOf: 3,
};

/**
 * Set-Based Challenges - Multiple mini-games or series
 */
export const SET_BASED_TYPE: MatchTypeConfig = {
  id: 'set-based',
  name: 'Set-Based Challenges',
  description: 'A series of mini-games or challenges',
  icon: '🎪',
  enabled: true,
  requiresTeamSize: false, // Depends on subtype
  requiresStatIntensity: false, // Depends on subtype
  subtypes: [HORSE_SUBTYPE, BEST_OF_SUBTYPE],
};

/**
 * Tournament - Bracket or league play (placeholder)
 */
export const TOURNAMENT_TYPE: MatchTypeConfig = {
  id: 'tournament',
  name: 'Tournament',
  description: 'Structured bracket or league play',
  icon: '🏆',
  enabled: false,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  tooltip: 'Coming soon',
  subtypes: [
    {
      id: 'single-elim',
      name: 'Single Elimination',
      description: 'Lose once and you\'re out',
      enabled: false,
      requiresTeamSize: true,
      requiresStatIntensity: true,
      tooltip: 'Coming soon',
    },
    {
      id: 'double-elim',
      name: 'Double Elimination',
      description: 'Lose twice and you\'re out',
      enabled: false,
      requiresTeamSize: true,
      requiresStatIntensity: true,
      tooltip: 'Coming soon',
    },
    {
      id: 'round-robin',
      name: 'Round Robin',
      description: 'Everyone plays everyone',
      enabled: false,
      requiresTeamSize: true,
      requiresStatIntensity: true,
      tooltip: 'Coming soon',
    },
  ],
};

/**
 * Rotational - Winner stays on or rotating players (placeholder)
 */
export const ROTATIONAL_TYPE: MatchTypeConfig = {
  id: 'rotational',
  name: 'Rotational',
  description: 'Winner stays on or rotating players',
  icon: '🔄',
  enabled: false,
  requiresTeamSize: true,
  requiresStatIntensity: false,
  tooltip: 'Coming soon',
  subtypes: [
    {
      id: 'king-court',
      name: 'King of the Court',
      description: 'Winning team stays on the court',
      enabled: false,
      requiresTeamSize: true,
      fixedTeamSize: '3v3',
      requiresStatIntensity: false,
      tooltip: 'Coming soon',
    },
    {
      id: 'chicago',
      name: 'Chicago',
      description: 'First to 21 with rotating team formation',
      enabled: false,
      requiresTeamSize: false,
      fixedTeamSize: '3v3',
      requiresStatIntensity: false,
      tooltip: 'Coming soon',
    },
    {
      id: 'timed',
      name: 'Timed Rotations',
      description: 'Rotate teams on a timer',
      enabled: false,
      requiresTeamSize: true,
      requiresStatIntensity: false,
      tooltip: 'Coming soon',
    },
  ],
};

/**
 * All basketball match types
 */
export const BASKETBALL_MATCH_TYPES_CONFIG: MatchTypeConfig[] = [
  SINGLE_GAME_TYPE,
  SET_BASED_TYPE,
  TOURNAMENT_TYPE,
  ROTATIONAL_TYPE,
];

/**
 * Basketball Sport Configuration
 */
export const BASKETBALL_CONFIG: SportConfig = {
  sport: SportType.Basketball,
  enabled: true,
  icon: '🏀',
  displayName: 'Basketball',
  description: '5v5, 3v3, 2v2, or 1v1 matches',
  matchTypes: BASKETBALL_MATCH_TYPES,
  teamSizeOptions: BASKETBALL_TEAM_SIZES,
  statIntensities: BASKETBALL_STAT_INTENSITIES,
  rulePresets: BASKETBALL_RULE_PRESETS,
  positions: BASKETBALL_POSITIONS,
  // New field for match type configuration (Step 2)
  matchTypeConfigs: BASKETBALL_MATCH_TYPES_CONFIG,
};
