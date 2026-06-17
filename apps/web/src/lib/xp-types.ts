/**
 * XP and Progression Types
 * Defines types for the XP and progression system
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
  description: string; // e.g., "Completed competitive match", "Earned First Match badge"
  relatedId?: string; // e.g., matchId, badgeId for tracking
}

/**
 * XP profile container - user's complete progression info
 */
export interface XPProfile {
  userId: string;
  totalXP: number;
  level: number;
  rankTitle: RankTitle;
  history: XPEntry[]; // recent XP gains
  lastUpdated: string; // ISO datetime
}

/**
 * Level info - returned when calculating level from XP
 */
export interface LevelInfo {
  level: number;
  rankTitle: RankTitle;
  totalXPRequired: number; // total XP needed to reach this level
  nextLevelXP: number; // total XP needed to reach next level
  xpIntoCurrentLevel: number; // XP earned in current level out of xpIntoCurrentLevel / totalForThisLevel
  xpIntoNextLevel: number; // same as above (simpler naming)
  totalForCurrentLevel: number; // total XP needed for current level alone
  percentToNextLevel: number; // 0-100 percentage
}

/**
 * Level thresholds - XP required to reach each level
 */
export const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,      // Level 1: 0-99
  2: 100,    // Level 2: 100-249
  3: 250,    // Level 3: 250-499
  4: 500,    // Level 4: 500-999
  5: 1000,   // Level 5: 1000-1999
  6: 2000,   // Level 6: 2000-3999
  7: 4000,   // Level 7: 4000-7999
  8: 8000,   // Level 8: 8000-15999
  9: 16000,  // Level 9: 16000-31999
  10: 32000  // Level 10+: 32000+
};

/**
 * Rank title mapping by level
 */
export const RANK_BY_LEVEL: Record<number, RankTitle> = {
  1: RankTitle.Rookie,
  2: RankTitle.Rookie,
  3: RankTitle.Contender,
  4: RankTitle.Contender,
  5: RankTitle.AllStar,
  6: RankTitle.AllStar,
  7: RankTitle.Elite,
  8: RankTitle.Elite,
  9: RankTitle.Legend,
  10: RankTitle.Legend,
  // Any level >= 9 gets Legend
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

/**
 * MVP determination - player with most points on winning team
 */
export interface MVPCandidate {
  playerId: string;
  teamId: 'A' | 'B';
  points: number;
}
