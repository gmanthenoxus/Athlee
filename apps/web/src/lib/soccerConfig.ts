/**
 * Soccer (Football) Sport Configuration
 * 
 * Comprehensive configuration for soccer matches including:
 * - Team size options (11v11, 7v7, 5v5, 3v3)
 * - Match type configurations (Single Game focus, with placeholders for Tournament)
 * - Rule presets (FIFA Standard, Youth, Indoor, Custom)
 * - Player positions (GK, DEF, MID, FWD)
 * - Stat tracking intensities (Basic, Advanced)
 */

import { SportType } from './location-types';
import {
  MatchType,
  StatIntensity,
  RulePreset,
  SportConfig,
  TeamSizeConfig,
  MatchTypeOption,
  MatchTypeConfig,
} from './match-types';
import { SOCCER_PRESETS } from './mockSoccerRulePresets';

/**
 * Soccer match type options
 */
export const SOCCER_MATCH_TYPES: MatchTypeOption[] = [
  {
    type: MatchType.Single,
    label: 'Single Game',
    enabled: true,
    description: 'One-off match with final score',
  },
  {
    type: MatchType.SetBased,
    label: 'Best of...',
    enabled: false,
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
 * Soccer team size options with substitutes
 * Follows standard soccer formats
 */
export const SOCCER_TEAM_SIZES: TeamSizeConfig[] = [
  {
    label: '11v11',
    playersPerTeam: 11,
    substitutes: 7,
  },
  {
    label: '7v7',
    playersPerTeam: 7,
    substitutes: 5,
  },
  {
    label: '5v5',
    playersPerTeam: 5,
    substitutes: 3,
  },
  {
    label: '3v3',
    playersPerTeam: 3,
    substitutes: 2,
  },
];

/**
 * Soccer stat intensity options
 */
export const SOCCER_STAT_INTENSITIES: StatIntensity[] = [
  StatIntensity.Basic,
  StatIntensity.Advanced,
];

/**
 * Soccer player positions
 */
export const SOCCER_POSITIONS = ['GK', 'DEF', 'MID', 'FWD'];

/**
 * Single Game Match Type Configuration
 * Primary match type for soccer
 */
export const SOCCER_SINGLE_GAME_TYPE: MatchTypeConfig = {
  id: 'single',
  name: 'Single Game',
  description: 'A standalone pickup soccer match with final score',
  icon: '⚽',
  enabled: true,
  requiresTeamSize: true,
  requiresStatIntensity: true,
  defaultTeamSize: '5v5',
  defaultStatIntensity: StatIntensity.Basic,
};

/**
 * Tournament Match Type Configuration (Placeholder)
 */
export const SOCCER_TOURNAMENT_TYPE: MatchTypeConfig = {
  id: 'tournament',
  name: 'Tournament',
  description: 'Structured tournament bracket play',
  icon: '🏆',
  enabled: false,
  tooltip: 'Coming soon',
  requiresTeamSize: true,
  requiresStatIntensity: true,
};

/**
 * All soccer match type configurations
 */
export const SOCCER_MATCH_TYPES_CONFIG: MatchTypeConfig[] = [
  SOCCER_SINGLE_GAME_TYPE,
  SOCCER_TOURNAMENT_TYPE,
];

/**
 * Professional Soccer Sport Configuration
 * 
 * This is the complete configuration for soccer feature.
 * Once enabled, allows users to:
 * - Create soccer matches with flexible team sizes
 * - Configure FIFA Standard, Youth, Indoor, or Custom rules
 * - Track Basic or Advanced stats (goals, assists, tackles, passes, etc.)
 * - Manage player positions and team rosters
 */
export const SOCCER_CONFIG: SportConfig = {
  sport: SportType.Soccer,
  enabled: true, // Enable soccer feature
  icon: '⚽',
  displayName: 'Soccer',
  description: '11v11, 7v7, 5v5, or 3v3 matches with comprehensive stat tracking',
  matchTypes: SOCCER_MATCH_TYPES,
  matchTypeConfigs: SOCCER_MATCH_TYPES_CONFIG,
  teamSizeOptions: SOCCER_TEAM_SIZES,
  statIntensities: SOCCER_STAT_INTENSITIES,
  rulePresets: SOCCER_PRESETS,
  positions: SOCCER_POSITIONS,
};
