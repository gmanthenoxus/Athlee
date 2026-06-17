/**
 * Match Rules Type Guards and Utilities
 * 
 * Helper functions to safely work with MatchRules | SoccerMatchRules union type
 */

import type { MatchRules, SoccerMatchRules } from './match-types';
import { SportType } from './location-types';

/**
 * Check if rules are basketball-style MatchRules (having gameFormat field)
 */
export function isBasketballRules(
  rules: MatchRules | SoccerMatchRules
): rules is MatchRules {
  return 'gameFormat' in rules && rules.gameFormat !== undefined;
}

/**
 * Check if rules are soccer-style SoccerMatchRules (having halfDuration field)
 */
export function isSoccerRules(
  rules: MatchRules | SoccerMatchRules
): rules is SoccerMatchRules {
  return 'halfDuration' in rules && rules.halfDuration !== undefined;
}

/**
 * Safely get the game format for display
 */
export function getRuleFormatDescription(rules: MatchRules | SoccerMatchRules): string {
  if (isBasketballRules(rules)) {
    if (rules.gameFormat === 'timed') {
      return `${rules.periodDuration} min ${rules.periodStructure || 'periods'}`;
    } else if (rules.gameFormat === 'firstTo') {
      return `First to ${rules.winningScore}`;
    }
    return 'Untimed';
  } else if (isSoccerRules(rules)) {
    return `${rules.halves} x ${rules.halfDuration} min halves`;
  }
  return 'Standard rules';
}

/**
 * Get preset name from rules
 */
export function getPresetName(rules: MatchRules | SoccerMatchRules): string {
  return rules.presetName || 'Custom';
}

/**
 * Validate rules based on sport type
 */
export function validateRules(
  sport: SportType,
  rules: MatchRules | SoccerMatchRules
): boolean {
  if (sport === SportType.Soccer) {
    return isSoccerRules(rules);
  } else if (sport === SportType.Basketball) {
    return isBasketballRules(rules);
  }
  // For other sports, be permissive
  return true;
}
