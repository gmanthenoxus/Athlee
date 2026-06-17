/**
 * Badge Types & Interfaces (Mobile)
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

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  icon: string;
  color: string;
  criteria: BadgeCriteria;
  hidden?: boolean;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface BadgeCriteria {
  type: BadgeCriteriaType;
  sport?: string;
  locationId?: string;
  statKey?: string;
  threshold: number;
  achievementType?: AchievementType;
  operator?: 'gte' | 'eq' | 'lte';
}

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

export interface BadgeProgress {
  badgeId: string;
  userId: string;
  earned: boolean;
  earnedAt?: Date;
  currentProgress: number;
  threshold: number;
  percentage: number;
}

export interface BadgeNotification {
  id: string;
  userId: string;
  badgeId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface PinnedBadge {
  userId: string;
  badgeIds: string[];
}

export interface BadgeEvent {
  type: 'match' | 'stat' | 'friend' | 'referral' | 'location';
  userId: string;
  matchId?: string;
  locationId?: string;
  sport?: string;
  data?: any;
}
