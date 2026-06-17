/**
 * Baseball Rule Presets
 * 
 * Standard baseball rule configurations for different match formats
 */

import { RulePreset, BaseballMatchRules } from './match-types';

/**
 * MLB: 9 innings, DH optional, standard rules
 * Major League Baseball format
 */
export const BASEBALL_PRESET_MLB: BaseballMatchRules = {
  presetName: 'MLB',
  innings: 9,
  designatedHitter: true,      // DH allowed
  mercyRule: undefined,        // No mercy rule in professional play
  extraInningsFormat: 'runnerOnSecond',  // Modern MLB extra innings rule
};

/**
 * Little League: 6 innings, modified rules for youth
 */
export const BASEBALL_PRESET_LITTLE_LEAGUE: BaseballMatchRules = {
  presetName: 'Little League',
  innings: 6,
  designatedHitter: false,     // Limited DH in Little League
  mercyRule: { runDifference: 10, afterInning: 5 },  // Run rule after 5 innings
  extraInningsFormat: 'standard',
};

/**
 * College: 9 innings, DH allowed
 */
export const BASEBALL_PRESET_COLLEGE: BaseballMatchRules = {
  presetName: 'College',
  innings: 9,
  designatedHitter: true,
  mercyRule: undefined,
  extraInningsFormat: 'standard',
};

/**
 * Softball: 7 innings (different from baseball)
 */
export const BASEBALL_PRESET_SOFTBALL: BaseballMatchRules = {
  presetName: 'Softball',
  innings: 7,
  designatedHitter: true,
  mercyRule: { runDifference: 8, afterInning: 5 },
  extraInningsFormat: 'standard',
};

/**
 * Custom format: Default editable template
 */
export const BASEBALL_PRESET_CUSTOM: BaseballMatchRules = {
  presetName: 'Custom',
  innings: 9,
  designatedHitter: true,
  mercyRule: undefined,
  extraInningsFormat: 'standard',
};

/**
 * All baseball rule presets as RulePreset array (for compatibility with existing service)
 */
export const BASEBALL_PRESETS: RulePreset[] = [
  {
    name: 'MLB',
    description: '9 innings, DH allowed, modern extra innings format',
    rules: BASEBALL_PRESET_MLB as any,
  },
  {
    name: 'Little League',
    description: '6 innings, mercy rule at 5 innings (10+ run difference)',
    rules: BASEBALL_PRESET_LITTLE_LEAGUE as any,
  },
  {
    name: 'College',
    description: '9 innings, DH allowed, standard extra innings',
    rules: BASEBALL_PRESET_COLLEGE as any,
  },
  {
    name: 'Softball',
    description: '7 innings, DH allowed, mercy rule (8+ runs after 5 innings)',
    rules: BASEBALL_PRESET_SOFTBALL as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: BASEBALL_PRESET_CUSTOM as any,
  },
];
