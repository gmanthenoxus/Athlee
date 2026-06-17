/**
 * American Football Rule Presets
 * 
 * Standard American football rule configurations for different match formats
 */

import { RulePreset, AmericanFootballMatchRules } from './match-types';

/**
 * NFL: 4 quarters of 15 minutes, 3 timeouts per half, 2-point conversion allowed
 * National Football League format
 */
export const FOOTBALL_PRESET_NFL: AmericanFootballMatchRules = {
  presetName: 'NFL',
  quarterDuration: 15,         // 15-minute quarters
  quarters: 4,
  overtimeFormat: 'suddenDeath',  // Simplified playoff overtime
  twoPointConversion: true,
  timeoutsPerHalf: 3,
};

/**
 * College: 4 quarters of 15 minutes, college overtime rules
 */
export const FOOTBALL_PRESET_COLLEGE: AmericanFootballMatchRules = {
  presetName: 'College',
  quarterDuration: 15,
  quarters: 4,
  overtimeFormat: 'college',   // College overtime (teams get possession)
  twoPointConversion: true,
  timeoutsPerHalf: 3,
};

/**
 * High School: 4 quarters of 12 minutes (running clock)
 */
export const FOOTBALL_PRESET_HIGH_SCHOOL: AmericanFootballMatchRules = {
  presetName: 'High School',
  quarterDuration: 12,
  quarters: 4,
  overtimeFormat: 'suddenDeath',
  twoPointConversion: true,
  timeoutsPerHalf: 3,
};

/**
 * Flag Football: 7v7 or 8v8, simplified rules, no contact
 */
export const FOOTBALL_PRESET_FLAG: AmericanFootballMatchRules = {
  presetName: 'Flag Football',
  quarterDuration: 12,
  quarters: 4,
  overtimeFormat: 'none',      // Sudden victory only
  twoPointConversion: true,
  timeoutsPerHalf: 2,
};

/**
 * 7-on-7: Simplified passing league format
 */
export const FOOTBALL_PRESET_7V7: AmericanFootballMatchRules = {
  presetName: '7-on-7',
  quarterDuration: 12,
  quarters: 4,
  overtimeFormat: 'none',
  twoPointConversion: true,
  timeoutsPerHalf: 2,
};

/**
 * Custom format: Default editable template
 */
export const FOOTBALL_PRESET_CUSTOM: AmericanFootballMatchRules = {
  presetName: 'Custom',
  quarterDuration: 15,
  quarters: 4,
  overtimeFormat: 'suddenDeath',
  twoPointConversion: true,
  timeoutsPerHalf: 3,
};

/**
 * All American football rule presets as RulePreset array (for compatibility with existing service)
 */
export const FOOTBALL_PRESETS: RulePreset[] = [
  {
    name: 'NFL',
    description: '4 x 15 min quarters, NFL rules, sudden death overtime',
    rules: FOOTBALL_PRESET_NFL as any,
  },
  {
    name: 'College',
    description: '4 x 15 min quarters, college overtime rules',
    rules: FOOTBALL_PRESET_COLLEGE as any,
  },
  {
    name: 'High School',
    description: '4 x 12 min quarters, high school rules',
    rules: FOOTBALL_PRESET_HIGH_SCHOOL as any,
  },
  {
    name: 'Flag Football',
    description: 'Non-contact flag football, no tackles',
    rules: FOOTBALL_PRESET_FLAG as any,
  },
  {
    name: '7v7',
    description: 'Passing league format, 7 players per side',
    rules: FOOTBALL_PRESET_7V7 as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: FOOTBALL_PRESET_CUSTOM as any,
  },
];
