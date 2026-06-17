/**
 * Soccer Rule Presets for Match Setup
 * 
 * Defines standard rule configurations for different soccer formats:
 * - FIFA Standard: Formal soccer with international rules
 * - Youth: Adapted for younger players
 * - Indoor: Futsal-style rules
 * - Custom: User-editable template
 */

import { RulePreset } from './match-types';
import type { SoccerMatchRules } from './match-types';

/**
 * FIFA Standard Rules
 * 2 x 45 minute halves, offside on, limited subs, standard 3-1-0 points
 */
export const FIFA_STANDARD_RULES: SoccerMatchRules = {
  presetName: 'FIFA Standard',
  halfDuration: 45,
  halves: 2,
  extraTime: true,
  penalties: true,
  offside: true,
  substitutionRule: 'limited',
  maxSubstitutions: 3,
  pointsSystem: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  houseRules: [
    'Kick-off by designated team',
    'Throw-ins for out of bounds',
    'Corner kicks and goal kicks from designated areas',
  ],
  unwrittenRules: 'Standard FIFA rules apply. Referee\'s decision is final.',
};

/**
 * Youth Rules
 * Shorter halves (35 min), offside on, rolling subs, same points
 */
export const YOUTH_RULES: SoccerMatchRules = {
  presetName: 'Youth',
  halfDuration: 35,
  halves: 2,
  extraTime: false,
  penalties: false,
  offside: true,
  substitutionRule: 'rolling',
  maxSubstitutions: undefined,
  pointsSystem: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  houseRules: [
    'Lighter hand ball when called',
    'Encouragement of technical play over physical play',
    'No excessive contact',
  ],
  unwrittenRules:
    'Focus on player development. Coaches may make tactical substitutions during stoppages.',
};

/**
 * Indoor (Futsal) Rules
 * 2 x 20 minute halves, NO offside, unlimited subs, smaller court
 */
export const INDOOR_RULES: SoccerMatchRules = {
  presetName: 'Indoor',
  halfDuration: 20,
  halves: 2,
  extraTime: false,
  penalties: false,
  offside: false,
  substitutionRule: 'unlimited',
  maxSubstitutions: undefined,
  pointsSystem: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  houseRules: [
    'Ball must stay below head in play',
    'No sliding tackles',
    'Kick-ins instead of throw-ins',
    'Goal kicks from hand',
  ],
  unwrittenRules: 'Fast-paced game. Quick play encouraged. Referee keeps time.',
};

/**
 * Custom Rules (Template)
 * User can edit all fields
 */
export const CUSTOM_RULES: SoccerMatchRules = {
  presetName: 'Custom',
  halfDuration: 40,
  halves: 2,
  extraTime: false,
  penalties: false,
  offside: true,
  substitutionRule: 'limited',
  maxSubstitutions: 5,
  pointsSystem: {
    win: 3,
    draw: 1,
    loss: 0,
  },
  houseRules: [],
  unwrittenRules: 'Define your own rules here.',
};

/**
 * All soccer rule presets as RulePreset array (for compatibility with existing service)
 */
export const SOCCER_PRESETS: RulePreset[] = [
  {
    name: 'FIFA Standard',
    description: '2x45 min halves with offside, limited subs',
    rules: FIFA_STANDARD_RULES as any, // Cast to MatchRules for compatibility
  },
  {
    name: 'Youth',
    description: '2x35 min halves with rolling substitutions',
    rules: YOUTH_RULES as any,
  },
  {
    name: 'Indoor',
    description: '2x20 min halves, no offside, unlimited subs (futsal)',
    rules: INDOOR_RULES as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: CUSTOM_RULES as any,
  },
];
