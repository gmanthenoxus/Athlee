/**
 * Leaderboard and Match History Type Definitions (Mobile)
 */

import { SportType } from './location-types';

/**
 * Aggregated user statistics for a sport
 */
export interface UserStats {
  userId: string;
  username?: string;
  avatarUrl?: string;
  sport: SportType;
  totals: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    // Scoring
    points: number;
    fieldGoals: number;
    fieldGoalAttempts: number;
    threePointers: number;
    threePointAttempts: number;
    freeThrows: number;
    freeThrowAttempts: number;
    // Rebounding
    rebounds: number;
    offensiveRebounds: number;
    defensiveRebounds: number;
    // Playmaking
    assists: number;
    turnovers: number;
    // Defense
    steals: number;
    blocks: number;
    personalFouls: number;
  };
  averages?: {
    pointsPerGame: number;
    reboundsPerGame: number;
    assistsPerGame: number;
  };
  winRate: number; // wins / gamesPlayed
  lastUpdated: string; // ISO datetime
}

/**
 * A single entry in a leaderboard ranking
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  value: number; // primary stat value (e.g., total points)
  gamesPlayed: number;
  winRate: number;
  // Additional context stats
  stats?: {
    [key: string]: number;
  };
}

/**
 * Types of leaderboards
 */
export enum LeaderboardType {
  Global = 'global',
  Sport = 'sport',
  Location = 'location',
  Weekly = 'weekly',
  Monthly = 'monthly'
}

/**
 * Time frames for leaderboards
 */
export type TimeFrame = 'allTime' | 'weekly' | 'monthly';

/**
 * Filters for match history queries
 */
export interface MatchHistoryFilter {
  sport?: SportType;
  locationId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  result?: 'win' | 'loss' | 'draw';
  sortBy?: 'date' | 'score' | 'points';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Match history entry (simplified match for history list)
 */
export interface MatchHistoryEntry {
  matchId: string;
  date: string;
  sport: SportType;
  locationId?: string;
  locationName?: string;
  teamAName: string;
  teamBName: string;
  teamAScore: number;
  teamBScore: number;
  userTeam: 'A' | 'B';
  userPoints?: number;
  userRebounds?: number;
  userAssists?: number;
  result: 'win' | 'loss' | 'draw';
  matchType?: string;
  mode?: string;
}
