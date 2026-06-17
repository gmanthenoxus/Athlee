/**
 * Badminton Rule Presets
 * 
 * Standard badminton rule configurations for different match formats
 * Following BWF (Badminton World Federation) standards
 */

import { RulePreset, BadmintonMatchRules } from './match-types';

/**
 * BWF Standard: Best of 3 games to 21, rally scoring, win by 2 with cap at 30
 * International standard used in professional and most recreational play
 */
export const BADMINTON_PRESET_BWF_STANDARD: BadmintonMatchRules = {
  presetName: 'BWF Standard',
  gamesToWin: 2,                    // Best of 3 games (win 2 to win match)
  pointsPerGame: 21,                // Games to 21 points
  winByTwo: true,                   // Must win by 2 points
  pointsCap: 30,                    // Cap at 30 points maximum
  serviceLaws: 'bwf',               // Official BWF service laws
};

/**
 * 15-Point Games: Games to 15, best of 3
 * Common in some tournaments and recreational play
 */
export const BADMINTON_PRESET_15_POINT: BadmintonMatchRules = {
  presetName: '15-Point Games',
  gamesToWin: 2,
  pointsPerGame: 15,
  winByTwo: true,
  pointsCap: 20,                    // Cap at 20 with shorter format
  serviceLaws: 'bwf',
};

/**
 * 11-Point Games: Games to 11, best of 3
 * Faster format, sometimes used for casual play or training
 */
export const BADMINTON_PRESET_11_POINT: BadmintonMatchRules = {
  presetName: '11-Point Games',
  gamesToWin: 2,
  pointsPerGame: 11,
  winByTwo: true,
  pointsCap: 15,                    // Cap at 15
  serviceLaws: 'bwf',
};

/**
 * Single Game Format: Win one game to 21
 * Quick casual format for time-limited slots
 */
export const BADMINTON_PRESET_SINGLE_GAME: BadmintonMatchRules = {
  presetName: 'Single Game (21)',
  gamesToWin: 1,                    // Just one game to win match
  pointsPerGame: 21,
  winByTwo: true,
  pointsCap: 30,
  serviceLaws: 'bwf',
};

/**
 * Recreational/Friendly: Best of 3 games to 21, no strict win-by-2
 * Relaxed format for casual pickup play
 */
export const BADMINTON_PRESET_RECREATIONAL: BadmintonMatchRules = {
  presetName: 'Recreational',
  gamesToWin: 2,
  pointsPerGame: 21,
  winByTwo: false,                  // Simple first-to-21, no win-by-2
  pointsCap: undefined,             // No cap on points
  serviceLaws: 'custom',            // Flexible service rules
};

/**
 * Custom format: Default editable template
 * Users can modify all rules as needed
 */
export const BADMINTON_PRESET_CUSTOM: BadmintonMatchRules = {
  presetName: 'Custom',
  gamesToWin: 2,
  pointsPerGame: 21,
  winByTwo: true,
  pointsCap: 30,
  serviceLaws: 'bwf',
};

/**
 * All badminton rule presets as RulePreset array (for compatibility with existing service)
 */
export const BADMINTON_PRESETS: RulePreset[] = [
  {
    name: 'BWF Standard',
    description: 'Best of 3 games to 21, rally scoring, international standard',
    rules: BADMINTON_PRESET_BWF_STANDARD as any,
  },
  {
    name: '15-Point Games',
    description: 'Best of 3 games to 15, modified for shorter matches',
    rules: BADMINTON_PRESET_15_POINT as any,
  },
  {
    name: '11-Point Games',
    description: 'Best of 3 games to 11, simplified format',
    rules: BADMINTON_PRESET_11_POINT as any,
  },
  {
    name: 'Single Game (21)',
    description: 'Single game to 21 points, quick format',
    rules: BADMINTON_PRESET_SINGLE_GAME as any,
  },
  {
    name: 'Recreational',
    description: 'Casual recreation format with simplified rules',
    rules: BADMINTON_PRESET_RECREATIONAL as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: BADMINTON_PRESET_CUSTOM as any,
  },
];
