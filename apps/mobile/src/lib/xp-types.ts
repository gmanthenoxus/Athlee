/**
 * XP and Progression Types (Mobile)
 * Identical to web version - shared types for both platforms
 */

export enum RankTitle {
  Rookie = 'Rookie',
  Contender = 'Contender',
  AllStar = 'All-Star',
  Elite = 'Elite',
  Legend = 'Legend'
}

export enum XPSource {
  MatchCompletion = 'match_completion',
  MatchWin = 'match_win',
  MVP = 'mvp',
  Badge = 'badge',
  Milestone = 'milestone',
  Referral = 'referral'
}

/**
 * Single XP entry in user's history
 */
export interface XPEntry {
  id: string;
  userId: string;
  source: XPSource;
  amount: number;
  timestamp: string; // ISO datetime
  description: string;
  relatedId?: string;
}

/**
 * XP profile container - user's complete progression info
 */
export interface XPProfile {
  userId: string;
  totalXP: number;
  level: number;
  rankTitle: RankTitle;
  history: XPEntry[];
  lastUpdated: string;
}

/**
 * Level info
 */
export interface LevelInfo {
  level: number;
  rankTitle: RankTitle;
  totalXPRequired: number;
  nextLevelXP: number;
  xpIntoCurrentLevel: number;
  xpIntoNextLevel: number;
  totalForCurrentLevel: number;
  percentToNextLevel: number;
}

/**
 * Level thresholds - XP required to reach each level
 */
export const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 4000,
  8: 8000,
  9: 16000,
  10: 32000
};

/**
 * Get rank title for a given level
 */
export function getRankTitleForLevel(level: number): RankTitle {
  if (level >= 9) return RankTitle.Legend;
  if (level >= 7) return RankTitle.Elite;
  if (level >= 5) return RankTitle.AllStar;
  if (level >= 3) return RankTitle.Contender;
  return RankTitle.Rookie;
}

/**
 * XP awards configuration
 */
export const XP_AWARDS = {
  CASUAL_MATCH: 10,
  COMPETITIVE_MATCH: 15,
  MATCH_WIN: 5,
  MVP: 20,
  BADGE_EARNED: 25,
  MILESTONE_POINTS_10: 10,
  MILESTONE_POINTS_50: 10,
  MILESTONE_POINTS_100: 10,
  REFERRAL_FIRST_MATCH: 25
};
