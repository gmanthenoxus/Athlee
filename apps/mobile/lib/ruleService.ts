import { MatchRules } from './match-types';

/**
 * Rule Service - Handles validation and utilities for match rules
 */
class RuleService {
  /**
   * Validate a MatchRules object
   */
  public validateRules(rules: MatchRules): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (rules.timing) {
      if (rules.timing.gameDuration < 0) errors.push('Game duration must be non-negative');
      if (rules.timing.shotClock < 0) errors.push('Shot clock must be non-negative');
      if (rules.timing.periods < 1) errors.push('Periods must be at least 1');
    }

    if (rules.scoring) {
      if (rules.scoring.pointsPerBasket < 0) errors.push('Points per basket must be non-negative');
      if (rules.scoring.pointsOutside < 0) errors.push('Points outside must be non-negative');
      if (rules.scoring.freeThrow < 0) errors.push('Free throw points must be non-negative');
      if (rules.scoring.cap && rules.scoring.cap < 1) errors.push('Point cap must be at least 1');
    }

    if (rules.fouls) {
      if (rules.fouls.personalFoulLimit < 0) errors.push('Personal foul limit must be non-negative');
      if (rules.fouls.bonusAfter < 0) errors.push('Bonus threshold must be non-negative');
    }

    if (rules.violations) {
      if (rules.violations.backcourt < 0) errors.push('Backcourt time must be non-negative');
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
    parts.push(`Game: ${rules.timing.gameDuration}min (${rules.timing.periods} periods)`);
    
    if (rules.timing.shotClock > 0) {
      parts.push(`Shot Clock: ${rules.timing.shotClock}s`);
    }

    parts.push(`Scoring: ${rules.scoring.pointsPerBasket}pt/${rules.scoring.pointsOutside}pt`);
    
    if (rules.scoring.cap) {
      parts.push(`Win Cap: ${rules.scoring.cap}`);
    }

    if (rules.scoring.winByTwo) {
      parts.push('Win by 2');
    }

    return parts.join(' • ');
  }

  /**
   * Check if all required competitive fields are set
   */
  public canProceedStep5(rules?: MatchRules): boolean {
    return !!rules;
  }

  /**
   * Clone a MatchRules object (deep copy)
   */
  public cloneRules(rules: MatchRules): MatchRules {
    return JSON.parse(JSON.stringify(rules));
  }

  /**
   * Merge user edits into a rule preset
   */
  public mergeRuleEdits(baseRules: MatchRules, edits: Partial<MatchRules>): MatchRules {
    const merged = this.cloneRules(baseRules);

    if (edits.presetName) merged.presetName = edits.presetName;
    if (edits.unwrittenRules !== undefined) merged.unwrittenRules = edits.unwrittenRules;

    if (edits.timing) merged.timing = { ...merged.timing, ...edits.timing };
    if (edits.scoring) merged.scoring = { ...merged.scoring, ...edits.scoring };
    if (edits.fouls) merged.fouls = { ...merged.fouls, ...edits.fouls };
    if (edits.violations) merged.violations = { ...merged.violations, ...edits.violations };
    if (edits.gameplay) merged.gameplay = { ...merged.gameplay, ...edits.gameplay };

    return merged;
  }
}

export const ruleService = new RuleService();
