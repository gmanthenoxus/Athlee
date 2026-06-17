/**
 * Badge Catalog (Mobile)
 */

import { Badge } from './badge-types';

export const BADGE_CATALOG: Badge[] = [
  // ============= GENERAL BADGES =============
  {
    id: 'first_match',
    name: 'First Match',
    description: 'Played your first match',
    category: 'General',
    icon: '🎮',
    color: 'from-blue-400 to-blue-600',
    criteria: { type: 'matchCount', threshold: 1 },
  },
  {
    id: '10_matches',
    name: 'Newcomer',
    description: 'Played 10 matches',
    category: 'General',
    icon: '🌱',
    color: 'from-green-400 to-green-600',
    criteria: { type: 'matchCount', threshold: 10 },
  },
  {
    id: '50_matches',
    name: 'Veteran',
    description: 'Played 50 matches',
    category: 'General',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-600',
    criteria: { type: 'matchCount', threshold: 50 },
  },
  {
    id: '100_matches',
    name: 'Legend',
    description: 'Played 100 matches',
    category: 'General',
    icon: '👑',
    color: 'from-purple-400 to-purple-600',
    criteria: { type: 'matchCount', threshold: 100 },
  },
  {
    id: 'first_win',
    name: 'First Blood',
    description: 'Won your first match',
    category: 'General',
    icon: '🏆',
    color: 'from-amber-400 to-amber-600',
    criteria: { type: 'winStreak', threshold: 1 },
  },
  {
    id: '10_wins',
    name: 'Victorious',
    description: 'Won 10 matches',
    category: 'General',
    icon: '🥇',
    color: 'from-amber-300 to-yellow-600',
    criteria: { type: 'winStreak', threshold: 10 },
  },
  {
    id: '50_wins',
    name: 'Champion',
    description: 'Won 50 matches',
    category: 'General',
    icon: '🥇',
    color: 'from-amber-200 to-amber-600',
    criteria: { type: 'winStreak', threshold: 50 },
  },
  {
    id: 'streak_3',
    name: 'On Fire',
    description: 'Won 3 matches in a row',
    category: 'General',
    icon: '🔥',
    color: 'from-red-400 to-red-600',
    criteria: { type: 'winStreak', threshold: 3 },
  },
  {
    id: 'streak_7',
    name: 'Unstoppable',
    description: 'Won 7 matches in a row',
    category: 'General',
    icon: '⚡',
    color: 'from-red-500 to-pink-600',
    criteria: { type: 'winStreak', threshold: 7 },
  },

  // ============= SPORT-SPECIFIC BADGES =============
  {
    id: 'first_3pointer',
    name: 'Long Range',
    description: 'Attempted your first 3-pointer',
    category: 'Sport',
    icon: '🎯',
    color: 'from-blue-500 to-indigo-600',
    criteria: { type: 'singleGameStat', sport: 'Basketball', statKey: 'threePointers', threshold: 1 },
  },
  {
    id: '100_points',
    name: 'Scorer',
    description: 'Scored 100 total points',
    category: 'Sport',
    icon: '🔢',
    color: 'from-orange-400 to-red-600',
    criteria: { type: 'statTotal', sport: 'Basketball', statKey: 'points', threshold: 100 },
  },
  {
    id: '250_points',
    name: 'Bucket Machine',
    description: 'Scored 250 total points',
    category: 'Sport',
    icon: '🏀',
    color: 'from-orange-500 to-red-700',
    criteria: { type: 'statTotal', sport: 'Basketball', statKey: 'points', threshold: 250 },
  },
  {
    id: 'double_double',
    name: 'Double Trouble',
    description: 'Recorded a double-double in a single game',
    category: 'Sport',
    icon: '2️⃣',
    color: 'from-pink-400 to-purple-600',
    criteria: {
      type: 'singleGameStat',
      sport: 'Basketball',
      achievementType: 'doubleDouble',
      threshold: 1,
    },
  },
  {
    id: 'triple_double',
    name: 'Triple Threat',
    description: 'Recorded a triple-double in a single game',
    category: 'Sport',
    icon: '3️⃣',
    color: 'from-pink-500 to-rose-600',
    criteria: {
      type: 'singleGameStat',
      sport: 'Basketball',
      achievementType: 'tripleDouble',
      threshold: 1,
    },
  },
  {
    id: '50_point_game',
    name: 'Vintage Performance',
    description: 'Scored 50+ points in a single game',
    category: 'Sport',
    icon: '🚀',
    color: 'from-rose-400 to-red-600',
    criteria: {
      type: 'singleGameStat',
      sport: 'Basketball',
      achievementType: '50PointGame',
      threshold: 1,
    },
  },
  {
    id: '100_rebounds',
    name: 'Rebounder',
    description: 'Recorded 100 total rebounds',
    category: 'Sport',
    icon: '📦',
    color: 'from-green-400 to-emerald-600',
    criteria: { type: 'statTotal', sport: 'Basketball', statKey: 'rebounds', threshold: 100 },
  },
  {
    id: '100_assists',
    name: 'Playmaker',
    description: 'Recorded 100 total assists',
    category: 'Sport',
    icon: '🎪',
    color: 'from-cyan-400 to-blue-600',
    criteria: { type: 'statTotal', sport: 'Basketball', statKey: 'assists', threshold: 100 },
  },

  // ============= LOCATION-BASED BADGES =============
  {
    id: 'first_location_visit',
    name: 'Explorer',
    description: 'Played at a new location for the first time',
    category: 'Location',
    icon: '🗺️',
    color: 'from-teal-400 to-cyan-600',
    criteria: { type: 'locationMatches', threshold: 1 },
  },
  {
    id: 'location_regular_5',
    name: 'Court Regular',
    description: 'Played 5 matches at the same location',
    category: 'Location',
    icon: '🏀',
    color: 'from-teal-500 to-cyan-700',
    criteria: { type: 'locationMatches', threshold: 5 },
  },
  {
    id: 'location_regular_15',
    name: 'Local Hero',
    description: 'Played 15 matches at the same location',
    category: 'Location',
    icon: '🦸',
    color: 'from-indigo-400 to-purple-600',
    criteria: { type: 'locationMatches', threshold: 15 },
  },
  {
    id: 'location_regular_50',
    name: 'Court Legend',
    description: 'Played 50 matches at the same location',
    category: 'Location',
    icon: '👑',
    color: 'from-indigo-500 to-purple-700',
    criteria: { type: 'locationMatches', threshold: 50 },
  },

  // ============= SOCIAL BADGES =============
  {
    id: 'friend_maker',
    name: 'Friendly',
    description: 'Added 5 friends',
    category: 'Social',
    icon: '👋',
    color: 'from-pink-400 to-rose-600',
    criteria: { type: 'social', threshold: 5 },
  },
  {
    id: 'superfan',
    name: 'SuperFan',
    description: 'Following 5 players',
    category: 'Social',
    icon: '⭐',
    color: 'from-pink-500 to-rose-700',
    criteria: { type: 'social', threshold: 5 },
  },
  {
    id: 'networker',
    name: 'Networker',
    description: 'Added 20 friends',
    category: 'Social',
    icon: '🤝',
    color: 'from-pink-600 to-rose-800',
    criteria: { type: 'social', threshold: 20 },
  },

  // ============= REFERRAL BADGES =============
  {
    id: 'referral_starter',
    name: 'Recruiter',
    description: 'Referred 10 players',
    category: 'Referral',
    icon: '📣',
    color: 'from-violet-400 to-purple-600',
    criteria: { type: 'referral', threshold: 10 },
  },
  {
    id: 'referral_leader',
    name: 'Referral Leader',
    description: 'Referred 50 players',
    category: 'Referral',
    icon: '📢',
    color: 'from-violet-500 to-purple-700',
    criteria: { type: 'referral', threshold: 50 },
  },

  // ============= HIDDEN BADGES =============
  {
    id: 'perfect_game',
    name: 'Perfection',
    description: 'Played a perfect game (no turnovers, no fouls)',
    category: 'Sport',
    icon: '✨',
    color: 'from-yellow-300 to-yellow-600',
    criteria: {
      type: 'singleGameStat',
      sport: 'Basketball',
      achievementType: 'perfectGame',
      threshold: 1,
    },
    hidden: true,
  },
];

export function getBadgeById(badgeId: string): Badge | undefined {
  return BADGE_CATALOG.find((b) => b.id === badgeId);
}

export function getBadgesByCategory(category: string): Badge[] {
  return BADGE_CATALOG.filter((b) => b.category === category);
}

export function getVisibleBadges(): Badge[] {
  return BADGE_CATALOG.filter((b) => !b.hidden);
}
