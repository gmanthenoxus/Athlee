/**
 * Badge Types & Interfaces
 * Defines the structure for the Badges & Achievements system
 */

export type BadgeCategory =
  | 'General'
  | 'Sport'
  | 'Location'
  | 'Social'
  | 'Account'
  | 'Referral';

export type BadgeCriteriaType =
  | 'matchCount'
  | 'statTotal'
  | 'winStreak'
  | 'singleGameStat'
  | 'social'
  | 'referral'
  | 'locationMatches';

export type AchievementType =
  | 'tripleDouble'
  | 'doubleDouble'
  | 'perfectGame'
  | '50PointGame'
  | 'firstThreePointer'
  | 'none';

/**
 * Badge Definition - static config for a badge
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string; // emoji or icon identifier
  color: string; // tailwind color class
  criteria: BadgeCriteria;
  hidden?: boolean; // secret badge
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic'; // for future use
}

/**
 * Badge Criteria - conditions to earn a badge
 */
export interface BadgeCriteria {
  type: BadgeCriteriaType;
  sport?: string;
  locationId?: string;
  statKey?: string;
  threshold: number;
  achievementType?: AchievementType;
  operator?: 'gte' | 'eq' | 'lte'; // >= or =
}

/**
 * Earned Badge - instance of a badge earned by a user
 */
export interface EarnedBadge {
  badgeId: string;
  userId: string;
  earnedAt: Date;
  context?: {
    matchId?: string;
    locationId?: string;
    statValue?: number;
  };
}

/**
 * User Badge Progress - tracking progress toward earning a badge
 */
export interface BadgeProgress {
  badgeId: string;
  userId: string;
  earned: boolean;
  earnedAt?: Date;
  currentProgress: number;
  threshold: number;
  percentage: number; // 0-100
}

/**
 * Badge Notification - triggered when badge earned
 */
export interface BadgeNotification {
  id: string;
  userId: string;
  badgeId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

/**
 * Pinned Badge - user can pin up to 3 earned badges to profile
 */
export interface PinnedBadge {
  userId: string;
  badgeIds: string[]; // max 3
}

/**
 * Badge Event - triggers badge evaluation
 */
export interface BadgeEvent {
  type: 'match' | 'stat' | 'friend' | 'referral' | 'location';
  userId: string;
  matchId?: string;
  locationId?: string;
  sport?: string;
  data?: any;
}
