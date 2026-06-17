import { MatchRules } from './match-types';

/**
 * Rule Service - Handles validation and utilities for match rules
 * Updated for flat conditional rule structure
 */
class RuleService {
  /**
   * Validate a MatchRules object
   */
  public validateRules(rules: MatchRules): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate game format
    if (!['timed', 'firstTo', 'untimed'].includes(rules.gameFormat || '')) {
      errors.push('Invalid game format');
    }

    // Format-specific validation
    if (rules.gameFormat === 'timed') {
      if (!rules.periodDuration || rules.periodDuration < 1) {
        errors.push('Period duration must be at least 1 minute');
      }
      if (!rules.periodStructure) {
        errors.push('Period structure is required for timed games');
      }
    }

    if (rules.gameFormat === 'firstTo') {
      if (!rules.winningScore || rules.winningScore < 1) {
        errors.push('Winning score must be at least 1');
      }
      if (
        rules.winByTwo &&
        rules.overtimeLimit !== undefined &&
        rules.winningScore &&
        rules.overtimeLimit < rules.winningScore
      ) {
        errors.push('Overtime limit must be >= winning score');
      }
    }

    // Validate scoring
    if (rules.pointsInside && rules.pointsInside < 1) {
      errors.push('Inside points must be positive');
    }
    if (rules.pointsOutside && rules.pointsOutside < 1) {
      errors.push('Outside points must be positive');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Format a MatchRules object for display
   */
  public formatRulesForDisplay(rules: MatchRules): string {
    const parts: string[] = [];

    parts.push(`Preset: ${rules.presetName}`);

    if (rules.gameFormat === 'timed') {
      parts.push(
        `Game: ${rules.periodDuration}min (${rules.periodStructure})`
      );
    } else if (rules.gameFormat === 'firstTo') {
      parts.push(`First to: ${rules.winningScore}`);
      if (rules.winByTwo) parts.push('win by 2');
    }

    if (rules.shotClock !== 'none') {
      parts.push(`Shot Clock: ${rules.shotClock}s`);
    }

    parts.push(`Scoring: ${rules.pointsInside}pt/${rules.pointsOutside}pt`);

    return parts.join(' • ');
  }

  /**
   * Check if all required fields are set
   */
  public canProceedStep5(rules?: MatchRules): boolean {
    // Rules can always be defaulted, so we always return true for MVP
    return !!rules;
  }

  /**
   * Clone a MatchRules object (deep copy)
   */
  public cloneRules(rules: MatchRules): MatchRules {
    return JSON.parse(JSON.stringify(rules));
  }
}

export const ruleService = new RuleService();
