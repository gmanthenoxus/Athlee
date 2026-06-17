import {
  MatchTypeConfig,
  MatchSubtypeConfig,
  TeamSizeConfig,
  StatIntensity
} from './match-types';
import { SportType } from './location-types';

/**
 * Team size configurations for basketball
 */
const teamSizes: TeamSizeConfig[] = [
  { label: '5v5', playersPerTeam: 5, substitutes: 3 },
  { label: '3v3', playersPerTeam: 3, substitutes: 1 },
  { label: '2v2', playersPerTeam: 2, substitutes: 0 },
  { label: '1v1', playersPerTeam: 1, substitutes: 0 },
];

/**
 * Stat intensity options for basketball
 */
const statIntensities: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * H.O.R.S.E. subtype: 1v1 challenge game with letter penalties
 */
const HORSE_SUBTYPE: MatchSubtypeConfig = {
  id: 'horse',
  name: 'H.O.R.S.E.',
  description: 'One-on-one challenge. Miss a shot you attempted, opponent gets a letter.',
  enabled: true,
  requiresTeamSize: false,
  fixedTeamSize: '1v1',
  requiresStatIntensity: false,
  requiresBestOf: false,
  icon: '🐴',
};

/**
 * Best of Series subtype: Play multiple games in a series
 */
const BEST_OF_SUBTYPE: MatchSubtypeConfig = {
  id: 'best-of',
  name: 'Best of Series',
  description: 'Play multiple games. First to win majority wins the series.',
  enabled: true,
  requiresTeamSize: true,
  teamSizes: teamSizes,
  requiresStatIntensity: true,
  statIntensities: statIntensities,
  defaultStatIntensity: StatIntensity.Basic,
  requiresBestOf: true,
  defaultBestOf: 3,
  icon: '🏆',
};

/**
 * Single Game type: Traditional one-off match
 */
const SINGLE_GAME_TYPE: MatchTypeConfig = {
  id: 'single',
  name: 'Single Game',
  description: 'Traditional one-off game to 21 (or custom points)',
  icon: '🏀',
  enabled: true,
  requiresTeamSize: true,
  teamSizes: teamSizes,
  defaultTeamSize: '5v5',
  requiresStatIntensity: true,
  statIntensities: statIntensities,
  defaultStatIntensity: StatIntensity.Basic,
};

/**
 * Set-Based Challenges: Multiple challenge formats
 */
const SET_BASED_TYPE: MatchTypeConfig = {
  id: 'set-based',
  name: 'Challenge Match',
  description: 'Special challenge formats like H.O.R.S.E. or series',
  icon: '⚡',
  enabled: true,
  subtypes: [HORSE_SUBTYPE, BEST_OF_SUBTYPE],
  requiresTeamSize: false,
  requiresStatIntensity: false,
};

/**
 * Tournament type: Multi-team bracket (placeholder)
 */
const TOURNAMENT_TYPE: MatchTypeConfig = {
  id: 'tournament',
  name: 'Tournament',
  description: 'Multi-team tournament bracket',
  icon: '🥇',
  enabled: false,
  requiresTeamSize: false,
  requiresStatIntensity: false,
  tooltip: 'Coming soon',
};

/**
 * Rotational type: Rotating substitutes (placeholder)
 */
const ROTATIONAL_TYPE: MatchTypeConfig = {
  id: 'rotational',
  name: 'Rotational',
  description: 'Players rotate in and out on a timer',
  icon: '🔄',
  enabled: false,
  requiresTeamSize: false,
  requiresStatIntensity: false,
  tooltip: 'Coming soon',
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
 * Basketball sport configuration
 */
export const BASKETBALL_CONFIG = {
  id: 'basketball',
  name: 'Basketball',
  emoji: '🏀',
  enabled: true,
  teamSizes,
  statIntensities,
  matchTypeConfigs: BASKETBALL_MATCH_TYPES_CONFIG,
};
