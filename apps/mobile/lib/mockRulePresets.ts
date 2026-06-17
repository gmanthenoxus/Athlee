import { MatchRules, RulePreset } from './match-types';
import { SportType } from './location-types';

/**
 * Comprehensive Rule Presets for Basketball
 * Each preset defines all rule aspects from Timing through Gameplay
 * Uses flat field structure with conditional visibility based on gameFormat
 */

// ===== BASKETBALL RULE PRESETS =====

const FIBA_RULES: MatchRules = {
  presetName: 'FIBA',
  gameFormat: 'timed',
  periodStructure: 'quarters',
  periodDuration: 10,
  overtimeFormat: '5min',
  shotClock: '24',
  pointsInside: 2,
  pointsOutside: 3,
  freeThrowValue: 1,
  personalFoulLimit: '5',
  teamFoulLimit: '4perQtr',
  bonusAfter: '5',
  technicalFoulValue: '1ftPos',
  flagrantFoulPenalty: '2ftPos',
  backcourt: '8',
  threeSecondViolation: 'both',
  goaltendingAllowed: true,
  travelingCalled: true,
  doubleDribbleCalled: true,
  timeoutStructure: 'fiba',
  substitutions: 'unlimited',
  shotClockResetAfter: 'made',
  jumpBallRule: 'alternating',
  houseRules: []
};


const NBA_RULES: MatchRules = {
  presetName: 'NBA',
  gameFormat: 'timed',
  periodStructure: 'quarters',
  periodDuration: 12,
  overtimeFormat: '5min',
  shotClock: '24',
  pointsInside: 2,
  pointsOutside: 3,
  freeThrowValue: 1,
  personalFoulLimit: '6',
  teamFoulLimit: '4perQtr',
  bonusAfter: '4',
  technicalFoulValue: '1ftPos',
  flagrantFoulPenalty: 'ejection2ft',
  backcourt: '8',
  threeSecondViolation: 'defensive3',
  goaltendingAllowed: true,
  travelingCalled: true,
  doubleDribbleCalled: true,
  timeoutStructure: 'nba',
  substitutions: 'unlimited',
  shotClockResetAfter: 'made',
  jumpBallRule: 'alternating',
  houseRules: []
};


const NCAA_RULES: MatchRules = {
  presetName: 'NCAA',
  gameFormat: 'timed',
  periodStructure: 'halves',
  periodDuration: 20,
  overtimeFormat: '5min',
  shotClock: '30',
  pointsInside: 2,
  pointsOutside: 3,
  freeThrowValue: 1,
  personalFoulLimit: '5',
  teamFoulLimit: '7perHalf',
  bonusAfter: '7',
  technicalFoulValue: '1ftPos',
  flagrantFoulPenalty: '2ftPos',
  backcourt: '10',
  threeSecondViolation: 'both',
  goaltendingAllowed: true,
  travelingCalled: true,
  doubleDribbleCalled: true,
  timeoutStructure: 'ncaa',
  substitutions: 'unlimited',
  shotClockResetAfter: 'made',
  jumpBallRule: 'alternating',
  houseRules: []
};


const STREETBALL_RULES: MatchRules = {
  presetName: 'Streetball',
  gameFormat: 'firstTo',
  winningScore: 21,
  winByTwo: true,
  overtimeLimit: 0,
  shotClock: 'none',
  pointsInside: 1,
  pointsOutside: 2,
  freeThrowValue: 1,
  personalFoulLimit: 'none',
  teamFoulLimit: 'none',
  bonusAfter: 'none',
  technicalFoulValue: 'none',
  flagrantFoulPenalty: 'none',
  backcourt: 'none',
  threeSecondViolation: 'none',
  goaltendingAllowed: false,
  travelingCalled: false,
  doubleDribbleCalled: false,
  timeoutStructure: 'none',
  substitutions: 'none',
  shotClockResetAfter: 'none',
  jumpBallRule: 'tipoff',
  houseRules: ['Winner stays on court', 'Losers\' ball']
};

const THREE_X_THREE_RULES: MatchRules = {
  presetName: '3x3 (FIBA)',
  gameFormat: 'firstTo',
  winningScore: 21,
  winByTwo: true,
  overtimeLimit: 0,
  shotClock: '12',
  pointsInside: 1,
  pointsOutside: 2,
  freeThrowValue: 1,
  personalFoulLimit: 'none',
  teamFoulLimit: 'none',
  bonusAfter: 'none',
  technicalFoulValue: 'none',
  flagrantFoulPenalty: 'none',
  backcourt: 'none',
  threeSecondViolation: 'none',
  goaltendingAllowed: true,
  travelingCalled: true,
  doubleDribbleCalled: true,
  timeoutStructure: 'custom',
  customTimeoutsPerHalf: 1,
  customTimeoutsPerOT: 1,
  customTimeoutsCanCarryOver: false,
  customTimeoutDuration: '30',
  substitutions: 'none',
  shotClockResetAfter: 'made',
  jumpBallRule: 'tipoff',
  houseRules: []
};

export const BASKETBALL_PRESETS: RulePreset[] = [
  {
    name: 'FIBA',
    description: 'International FIBA rules (10min quarters)',
    rules: FIBA_RULES
  },
  {
    name: 'NBA',
    description: 'National Basketball Association (12min quarters)',
    rules: NBA_RULES
  },
  {
    name: 'NCAA',
    description: 'College basketball (20min halves)',
    rules: NCAA_RULES
  },
  {
    name: 'Streetball',
    description: 'Pickup game rules (first to 21)',
    rules: STREETBALL_RULES
  },
  {
    name: '3x3',
    description: 'FIBA 3x3 official (first to 21, 12s shot clock)',
    rules: THREE_X_THREE_RULES
  }
];

/**
 * Get all available rule presets for a sport
 */
export function getRulePresetsBySport(sport: SportType): RulePreset[] {
  // For now, return basketball presets for all sports
  // This will be extended as more sports are added
  return BASKETBALL_PRESETS;
}

/**
 * Get default preset for a sport
 */
export function getDefaultPreset(sport: SportType): RulePreset {
  const presets = getRulePresetsBySport(sport);
  return presets[0]; // Return first preset (most common)
}
