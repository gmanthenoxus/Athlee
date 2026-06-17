/**
 * User Stats Service
 * 
 * Tracks comprehensive player statistics across all matches:
 * - Per-sport stats (basketball, soccer, etc.)
 * - Career stats aggregation
 * - Match participation history
 * - Win-loss records
 * - MVP awards
 * - Streaks and achievements
 */

import { XPSource, getRankTitleForLevel } from './xp-types';

/**
 * Per-Sport Statistics
 */
export interface SportStats {
  sport: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  draws: number;
  
  // Sport-specific
  points: number;
  assists: number;
  rebounds: number;
  goals: number;
  aces: number;
  
  // Performance
  mvpAwards: number;
  avgPointsPerGame: number;
  avgAssistsPerGame: number;
  winPercentage: number;
  
  lastMatchDate?: string;
  rating: number; // 1-5 stars
}

/**
 * User Match Participation Record
 */
export interface UserMatchRecord {
  matchId: string;
  date: string;
  sport: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  points?: number;
  assists?: number;
  rebounds?: number;
  mvp: boolean;
  xpEarned: number;
}

/**
 * Complete User Stats Profile
 */
export interface UserStatsProfile {
  userId: string;
  username: string;
  
  // Overall stats
  totalXP: number;
  level: number;
  rankTitle: string;
  
  totalMatches: number;
  totalWins: number;
  totalLosses: number;
  careerWinPercentage: number;
  
  mvpCount: number;
  currentStreak: number;
  longestStreak: number;
  
  // Per-sport breakdown
  sportStats: Record<string, SportStats>;
  
  // Match history
  recentMatches: UserMatchRecord[];
  
  // Engagement
  followerCount: number;
  followingCount: number;
  
  // Metadata
  createdAt: string;
  lastActive: string;
}

/**
 * User Stats Service
 */
class UserStatsService {
  private readonly STORAGE_KEY_PREFIX = 'athlee_user_stats_';

  /**
   * Initialize stats for a new user
   */
  public initializeUserStats(userId: string, username: string): UserStatsProfile {
    const profile: UserStatsProfile = {
      userId,
      username,
      totalXP: 0,
      level: 1,
      rankTitle: 'Rookie',
      totalMatches: 0,
      totalWins: 0,
      totalLosses: 0,
      careerWinPercentage: 0,
      mvpCount: 0,
      currentStreak: 0,
      longestStreak: 0,
      sportStats: {},
      recentMatches: [],
      followerCount: 0,
      followingCount: 0,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    this.saveUserStats(userId, profile);
    return profile;
  }

  /**
   * Get user stats profile
   */
  public getUserStats(userId: string): UserStatsProfile {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${userId}`;
      const stored = localStorage.getItem(key);
      
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Return empty profile if not found
      return this.initializeUserStats(userId, 'Unknown');
    } catch (error) {
      console.error('Failed to get user stats:', error);
      return this.initializeUserStats(userId, 'Unknown');
    }
  }

  /**
   * Record a match result for user
   */
  public recordMatchResult(
    userId: string,
    matchId: string,
    sport: string,
    result: 'win' | 'loss' | 'draw',
    stats: {
      points?: number;
      assists?: number;
      rebounds?: number;
      goals?: number;
      aces?: number;
      isMvp?: boolean;
      opponentName?: string;
    },
    xpEarned: number = 0
  ): UserStatsProfile {
    const profile = this.getUserStats(userId);

    // Initialize sport stats if needed
    if (!profile.sportStats[sport]) {
      profile.sportStats[sport] = {
        sport,
        matchesPlayed: 0,
        matchesWon: 0,
        matchesLost: 0,
        draws: 0,
        points: 0,
        assists: 0,
        rebounds: 0,
        goals: 0,
        aces: 0,
        mvpAwards: 0,
        avgPointsPerGame: 0,
        avgAssistsPerGame: 0,
        winPercentage: 0,
        rating: 3,
      };
    }

    const sportStat = profile.sportStats[sport];
    
    // Update match counts
    profile.totalMatches++;
    sportStat.matchesPlayed++;

    // Update results
    if (result === 'win') {
      profile.totalWins++;
      sportStat.matchesWon++;
      profile.currentStreak++;
    } else if (result === 'loss') {
      profile.totalLosses++;
      sportStat.matchesLost++;
      profile.currentStreak = 0;
    } else {
      sportStat.draws++;
      profile.currentStreak = 0;
    }

    // Update longest streak
    if (profile.currentStreak > profile.longestStreak) {
      profile.longestStreak = profile.currentStreak;
    }

    // Update stats
    if (stats.points) {
      profile.sportStats[sport].points += stats.points;
      sportStat.avgPointsPerGame = sportStat.points / sportStat.matchesPlayed;
    }
    if (stats.assists) {
      profile.sportStats[sport].assists += stats.assists;
      sportStat.avgAssistsPerGame = sportStat.assists / sportStat.matchesPlayed;
    }
    if (stats.rebounds) {
      profile.sportStats[sport].rebounds += stats.rebounds;
    }
    if (stats.goals) {
      profile.sportStats[sport].goals += stats.goals;
    }
    if (stats.aces) {
      profile.sportStats[sport].aces += stats.aces;
    }

    // Update MVP count
    if (stats.isMvp) {
      profile.mvpCount++;
      sportStat.mvpAwards++;
    }

    // Update win percentage
    profile.careerWinPercentage = profile.totalMatches > 0 
      ? (profile.totalWins / profile.totalMatches) * 100 
      : 0;
    
    sportStat.winPercentage = sportStat.matchesPlayed > 0
      ? (sportStat.matchesWon / sportStat.matchesPlayed) * 100
      : 0;

    // Update rating based on performance
    const avgPoints = stats.points || 0;
    const isMvp = stats.isMvp || false;
    if (result === 'win' && isMvp && avgPoints > 20) {
      sportStat.rating = Math.min(5, sportStat.rating + 0.1);
    } else if (result === 'loss') {
      sportStat.rating = Math.max(2, sportStat.rating - 0.05);
    } else {
      sportStat.rating = Math.min(5, sportStat.rating + 0.05);
    }

    // Update XP
    profile.totalXP += xpEarned;

    // Add to recent matches
    const matchRecord: UserMatchRecord = {
      matchId,
      date: new Date().toISOString(),
      sport,
      opponent: stats.opponentName || 'Unknown',
      result,
      points: stats.points,
      assists: stats.assists,
      rebounds: stats.rebounds,
      mvp: stats.isMvp || false,
      xpEarned,
    };

    profile.recentMatches.unshift(matchRecord);
    profile.recentMatches = profile.recentMatches.slice(0, 50); // Keep recent 50

    // Update level based on XP
    profile.level = this.calculateLevel(profile.totalXP);
    profile.rankTitle = this.getRankTitle(profile.level);

    // Update last active
    profile.lastActive = new Date().toISOString();

    this.saveUserStats(userId, profile);
    return profile;
  }

  /**
   * Calculate level from XP (matches XPService logic)
   */
  private calculateLevel(totalXP: number): number {
    const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (totalXP >= thresholds[i]) {
        return i + 1;
      }
    }
    return 1;
  }

  /**
   * Get rank title from level
   */
  private getRankTitle(level: number): string {
    if (level <= 2) return 'Rookie';
    if (level <= 4) return 'Contender';
    if (level <= 6) return 'All-Star';
    if (level <= 8) return 'Elite';
    return 'Legend';
  }

  /**
   * Get sport stats for user
   */
  public getSportStats(userId: string, sport: string): SportStats | null {
    const profile = this.getUserStats(userId);
    return profile.sportStats[sport] || null;
  }

  /**
   * Get match history for user
   */
  public getMatchHistory(userId: string, limit: number = 20): UserMatchRecord[] {
    const profile = this.getUserStats(userId);
    return profile.recentMatches.slice(0, limit);
  }

  /**
   * Update follower counts
   */
  public updateFollows(userId: string, followerCount: number, followingCount: number): void {
    const profile = this.getUserStats(userId);
    profile.followerCount = followerCount;
    profile.followingCount = followingCount;
    this.saveUserStats(userId, profile);
  }

  /**
   * Award XP to a user and auto-calculate level
   */
  public awardXP(userId: string, amount: number, reason: string = 'Admin adjustment'): UserStatsProfile {
    const stats = this.getUserStats(userId);
    stats.totalXP = Math.max(0, stats.totalXP + amount);
    
    // Recalculate level based on XP
    const levelThresholds: Record<number, number> = {
      1: 0, 2: 100, 3: 300, 4: 600, 5: 1000,
      6: 1500, 7: 2100, 8: 2800, 9: 3600, 10: 4500,
    };

    let newLevel = 1;
    for (let level = 10; level >= 1; level--) {
      if (stats.totalXP >= levelThresholds[level]) {
        newLevel = level;
        break;
      }
    }

    stats.level = newLevel;
    stats.rankTitle = getRankTitleForLevel(newLevel);

    this.saveUserStats(userId, stats);
    return stats;
  }

  /**
   * Set user to a specific level (auto-calculates XP)
   */
  public setLevel(userId: string, targetLevel: number): UserStatsProfile {
    const levelThresholds: Record<number, number> = {
      1: 0, 2: 100, 3: 300, 4: 600, 5: 1000,
      6: 1500, 7: 2100, 8: 2800, 9: 3600, 10: 4500,
    };

    const targetXP = levelThresholds[Math.max(1, Math.min(10, targetLevel))] || 0;
    return this.awardXP(userId, targetXP - this.getUserStats(userId).totalXP, `Level set to ${targetLevel}`);
  }

  /**
   * Save user stats
   */
  private saveUserStats(userId: string, profile: UserStatsProfile): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${userId}`;
      localStorage.setItem(key, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save user stats:', error);
    }
  }

  /**
   * Get stats for all users (for leaderboard)
   */
  public getAllUserStats(): UserStatsProfile[] {
    try {
      const keys = Object.keys(localStorage);
      const statsKeys = keys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX));
      return statsKeys.map(key => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
      }).filter((s): s is UserStatsProfile => s !== null);
    } catch (error) {
      console.error('Failed to get all user stats:', error);
      return [];
    }
  }

  /**
   * Clear all stats
   */
  public clearAllStats(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.filter(k => k.startsWith(this.STORAGE_KEY_PREFIX)).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear stats:', error);
    }
  }
}

export const userStatsService = new UserStatsService();
