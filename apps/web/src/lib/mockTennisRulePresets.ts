/**
 * Tennis Rule Presets
 * 
 * Standard tennis rule configurations for different match formats
 * Following ITF, ATP, and WTA standards
 */

import { RulePreset, TennisMatchRules } from './match-types';

/**
 * Standard ATP/WTA format: Best of 3 sets with tiebreak at 6-6, advantage scoring
 * Professional standard for most tournaments
 */
export const TENNIS_PRESET_STANDARD: TennisMatchRules = {
  presetName: 'Standard ATP/WTA',
  bestOfSets: 2,                    // Best of 3 sets (win 2 to win match)
  tiebreakAt: 6,                    // Tiebreak at 6-6 in games
  tiebreakFormat: 'to7',            // Tiebreak to 7 points
  advantageScoring: true,           // Standard deuce/advantage scoring
  letRule: 'playLet',               // Let serves are played
  finalSetTiebreak: 'super10',      // Super tiebreak (to 10) in final set
  winByTwo: true,
};

/**
 * Grand Slam (Best of 5) format: Best of 5 sets, advantage scoring
 * Used for men's singles at professional Grand Slams
 */
export const TENNIS_PRESET_BEST_OF_5: TennisMatchRules = {
  presetName: 'Grand Slam (Best of 5)',
  bestOfSets: 3,                    // Best of 5 sets (win 3 to win match)
  tiebreakAt: 6,                    // Tiebreak at 6-6 in games
  tiebreakFormat: 'to7',            // Standard tiebreak to 7
  advantageScoring: true,           // Advantage scoring
  letRule: 'playLet',
  finalSetTiebreak: 'super10',
  winByTwo: true,
};

/**
 * No-Ad Scoring format: Deciding point at deuce instead of advantage
 * Faster format, sometimes used in recreational or lower-level tournaments
 */
export const TENNIS_PRESET_NO_AD: TennisMatchRules = {
  presetName: 'No-Ad Scoring',
  bestOfSets: 2,                    // Best of 3 sets
  tiebreakAt: 6,                    // Tiebreak at 6-6
  tiebreakFormat: 'to7',
  advantageScoring: false,          // No-ad: deciding point at deuce
  letRule: 'playLet',
  finalSetTiebreak: 'super10',
  winByTwo: true,
};

/**
 * Fast4 format: Faster tennis with reduced games
 * First to 4 games per set, tiebreak at 3-3, no-ad scoring
 */
export const TENNIS_PRESET_FAST4: TennisMatchRules = {
  presetName: 'Fast4',
  bestOfSets: 2,                    // Best of 3 sets
  tiebreakAt: 3,                    // Tiebreak at 3-3 (early tiebreak)
  tiebreakFormat: 'to7',
  advantageScoring: false,          // No-ad scoring in Fast4
  letRule: 'playLet',
  finalSetTiebreak: 'super10',
  winByTwo: true,
};

/**
 * Recreational/Friendly format: Relaxed rules, no lets
 * Casual matches without strict match play rules
 */
export const TENNIS_PRESET_RECREATIONAL: TennisMatchRules = {
  presetName: 'Recreational',
  bestOfSets: 2,                    // Best of 3 sets (or 1 set only)
  tiebreakAt: 6,
  tiebreakFormat: 'to7',
  advantageScoring: true,
  letRule: 'noLet',                 // No lets - "play on" if net cord
  finalSetTiebreak: 'to7',          // Regular tiebreak in final set
  winByTwo: true,
};

/**
 * Custom format: Default editable template
 * Users can modify all rules as needed
 */
export const TENNIS_PRESET_CUSTOM: TennisMatchRules = {
  presetName: 'Custom',
  bestOfSets: 2,
  tiebreakAt: 6,
  tiebreakFormat: 'to7',
  advantageScoring: true,
  letRule: 'playLet',
  finalSetTiebreak: 'super10',
  winByTwo: true,
};

/**
 * All tennis rule presets as RulePreset array (for compatibility with existing service)
 */
export const TENNIS_PRESETS: RulePreset[] = [
  {
    name: 'Standard ATP/WTA',
    description: 'Best of 3 sets, advantage scoring, professional standard',
    rules: TENNIS_PRESET_STANDARD as any,
  },
  {
    name: 'Best of 5',
    description: 'Best of 5 sets, advantage scoring, Grand Slam format',
    rules: TENNIS_PRESET_BEST_OF_5 as any,
  },
  {
    name: 'No-Ad',
    description: 'No advantage, sudden-death at deuce (7-6)',
    rules: TENNIS_PRESET_NO_AD as any,
  },
  {
    name: 'Fast4',
    description: 'Fast format with short tiebreaks and no second serve',
    rules: TENNIS_PRESET_FAST4 as any,
  },
  {
    name: 'Recreational',
    description: 'Casual format with simplified rules',
    rules: TENNIS_PRESET_RECREATIONAL as any,
  },
  {
    name: 'Custom',
    description: 'Fully customizable rules',
    rules: TENNIS_PRESET_CUSTOM as any,
  },
];
