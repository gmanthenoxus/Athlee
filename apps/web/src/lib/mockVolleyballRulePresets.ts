/**
 * Volleyball Rule Presets
 * 
 * Standard volleyball rule configurations for different match formats
 */

import { RulePreset, VolleyballMatchRules } from './match-types';

/**
 * FIVB Indoor: Best of 5 sets to 25, win by 2 with cap at 27, libero allowed
 * International professional standard
 */
export const VOLLEYBALL_PRESET_FIVB: VolleyballMatchRules = {
  presetName: 'FIVB Indoor',
  setsToWin: 3,                // Best of 5 sets (win 3 to win match)
  pointsPerSet: 25,            // Play to 25 points
  winByTwo: true,              // Must win by 2
  pointsCap: 27,               // Cap at 27 points
  rallyScoring: true,          // Rally scoring (always true)
  liberoAllowed: true,         // Libero allowed
};

/**
 * High School: Best of 3 sets to 25, win by 2 with cap at 27, simplified libero rules
 */
export const VOLLEYBALL_PRESET_HIGH_SCHOOL: VolleyballMatchRules = {
  presetName: 'High School',
  setsToWin: 2,                // Best of 3 sets
  pointsPerSet: 25,
  winByTwo: true,
  pointsCap: 27,
  rallyScoring: true,
  liberoAllowed: true,         // Libero allowed but may have restrictions
};

/**
 * Beach Volleyball: Best of 3 sets (21, 21, 15), win by 2
 */
export const VOLLEYBALL_PRESET_BEACH: VolleyballMatchRules = {
  presetName: 'Beach',
  setsToWin: 2,                // Best of 3 sets
  pointsPerSet: 21,            // First two sets to 21
  winByTwo: true,
  pointsCap: undefined,        // No cap, just win by 2
  rallyScoring: true,
  liberoAllowed: false,        // No libero in beach
};

/**
 * Recreational: Best of 3 sets to 25, no win-by-2, no libero (simplified)
 */
export const VOLLEYBALL_PRESET_RECREATIONAL: VolleyballMatchRules = {
  presetName: 'Recreational',
  setsToWin: 2,
  pointsPerSet: 25,
  winByTwo: false,             // Simple first-to-25
  pointsCap: undefined,        // No cap
  rallyScoring: true,
  liberoAllowed: false,        // Simplified without libero
};

/**
 * Custom format: Default editable template
 */
export const VOLLEYBALL_PRESET_CUSTOM: VolleyballMatchRules = {
  presetName: 'Custom',
  setsToWin: 2,
  pointsPerSet: 25,
  winByTwo: true,
  pointsCap: 27,
  rallyScoring: true,
  liberoAllowed: true,
};

/**
 * All volleyball rule presets as RulePreset array (for compatibility with existing service)
 */
export const VOLLEYBALL_PRESETS: RulePreset[] = [
  {
    name: 'FIVB Indoor',
    description: 'Best of 5 sets to 25 with win-by-2, international standard',
    rules: VOLLEYBALL_PRESET_FIVB as any,
  },
  {
    name: 'High School',
    description: 'Best of 3 sets to 25 with win-by-2',
    rules: VOLLEYBALL_PRESET_HIGH_SCHOOL as any,
  },
  {
    name: 'Beach',
    description: 'Best of 3 sets (21, 21, 15), no libero, win by 2',
    rules: VOLLEYBALL_PRESET_BEACH as any,
  },
  {
    name: 'Recreational',
    description: 'Best of 3 sets to 25, simplified rules',
    rules: VOLLEYBALL_PRESET_RECREATIONAL as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: VOLLEYBALL_PRESET_CUSTOM as any,
  },
];
