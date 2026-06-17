/**
 * Pickleball Rule Presets
 * 
 * Standard pickleball rule configurations for different match formats
 * Following USAPA (USA Pickleball Association) standards
 */

import { RulePreset, PickleballMatchRules } from './match-types';

/**
 * USAPA Standard: Best of 3 games to 11, win by 2 with cap at 15
 * Standard format used in USAPA tournaments and most recreational play
 */
export const PICKLEBALL_PRESET_USAPA_STANDARD: PickleballMatchRules = {
  presetName: 'USAPA Standard (11)',
  gamesToWin: 2,                    // Best of 3 games (win 2 to win match)
  pointsPerGame: 11,                // Games to 11 points
  winByTwo: true,                   // Must win by 2 points
  pointsCap: 15,                    // Cap at 15 points maximum
  doubleBounceRule: true,           // Service bounce and return bounce rule
  serviceLaws: 'usapa',             // Official USAPA service laws
};

/**
 * 15-Point Tournament: Games to 15, win by 2 with cap at 17
 * Used in some tournaments and advanced/professional play
 */
export const PICKLEBALL_PRESET_15_POINT: PickleballMatchRules = {
  presetName: 'Tournament (15)',
  gamesToWin: 2,
  pointsPerGame: 15,
  winByTwo: true,
  pointsCap: 17,                    // Cap at 17
  doubleBounceRule: true,
  serviceLaws: 'usapa',
};

/**
 * 21-Point Extended: Games to 21, win by 2
 * Longer match format for leagues or extended play
 */
export const PICKLEBALL_PRESET_21_POINT: PickleballMatchRules = {
  presetName: 'Extended (21)',
  gamesToWin: 2,
  pointsPerGame: 21,
  winByTwo: true,
  pointsCap: 25,                    // Cap at 25
  doubleBounceRule: true,
  serviceLaws: 'usapa',
};

/**
 * Quick Play (9 Points): Fast format for casual/practice
 * Shorter games for time-limited play
 */
export const PICKLEBALL_PRESET_9_POINT: PickleballMatchRules = {
  presetName: 'Quick Play (9)',
  gamesToWin: 2,
  pointsPerGame: 9,
  winByTwo: true,
  pointsCap: 11,
  doubleBounceRule: true,
  serviceLaws: 'usapa',
};

/**
 * Recreational/Friendly: Best of 3 games to 11, no win-by-2
 * Relaxed format for casual pickup play
 */
export const PICKLEBALL_PRESET_RECREATIONAL: PickleballMatchRules = {
  presetName: 'Recreational',
  gamesToWin: 2,
  pointsPerGame: 11,
  winByTwo: false,                  // Simple first-to-11
  pointsCap: undefined,             // No cap on points
  doubleBounceRule: true,           // Still apply double bounce rule
  serviceLaws: 'custom',            // Flexible service rules
};

/**
 * No-Ad Format: Best of 3, first-to-11, no win-by-2
 * Even faster and simpler than standard
 */
export const PICKLEBALL_PRESET_NO_AD: PickleballMatchRules = {
  presetName: 'No-Ad (Fast)',
  gamesToWin: 2,
  pointsPerGame: 11,
  winByTwo: false,
  pointsCap: 11,                    // Hard cap at 11 (first to 11 wins)
  doubleBounceRule: true,
  serviceLaws: 'usapa',
};

/**
 * Custom format: Default editable template
 * Users can modify all rules as needed
 */
export const PICKLEBALL_PRESET_CUSTOM: PickleballMatchRules = {
  presetName: 'Custom',
  gamesToWin: 2,
  pointsPerGame: 11,
  winByTwo: true,
  pointsCap: 15,
  doubleBounceRule: true,
  serviceLaws: 'usapa',
};

/**
 * All pickleball rule presets as RulePreset array (for compatibility with existing service)
 */
export const PICKLEBALL_PRESETS: RulePreset[] = [
  {
    name: 'USAPA Standard (11)',
    description: 'Best of 3 games to 11, win by 2, USAPA standard',
    rules: PICKLEBALL_PRESET_USAPA_STANDARD as any,
  },
  {
    name: 'Tournament (15)',
    description: 'Best of 3 games to 15, tournament format',
    rules: PICKLEBALL_PRESET_15_POINT as any,
  },
  {
    name: 'Extended (21)',
    description: 'Best of 3 games to 21, extended competitive format',
    rules: PICKLEBALL_PRESET_21_POINT as any,
  },
  {
    name: 'Quick Play (9)',
    description: 'Best of 3 games to 9, quick casual format',
    rules: PICKLEBALL_PRESET_9_POINT as any,
  },
  {
    name: 'Recreational',
    description: 'Casual format with simplified rules',
    rules: PICKLEBALL_PRESET_RECREATIONAL as any,
  },
  {
    name: 'No-Ad (Fast)',
    description: 'No-ad scoring for faster games',
    rules: PICKLEBALL_PRESET_NO_AD as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: PICKLEBALL_PRESET_CUSTOM as any,
  },
];
