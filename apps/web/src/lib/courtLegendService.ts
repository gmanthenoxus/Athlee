/**
 * Court Legends & Leaderboard System
 * 
 * Tracks and ranks top-performing players:
 * - Global leaderboards (by sport, overall)
 * - Court legends (top performers per location)
 * - Performance metrics (wins, XP, rating)
 * - Regular updates from match results
 */

import { userStatsService, UserStatsProfile } from './userStatsService';

/**
 * Leaderboard Entry
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  metric: number;
  metricName: string;
  sport?: string;
}

/**
 * Court Legend Entry (per location)
 */
export interface CourtLegend {
  rank: number;
  userId: string;
  username: string;
  location: string;
  sport: string;
  matches: number;
  wins: number;
  mvpCount: number;
  rating: number;
  lastActive: string;
}

/**
 * Court Legends Service
 */
class CourtLegendService {
  private readonly STORAGE_KEY_LEGENDS = 'athlee_court_legends';
  private readonly STORAGE_KEY_LEADERBOARDS = 'athlee_leaderboards';
  private readonly STORAGE_KEY_CACHE = 'athlee_legend_cache';

  /**
   * Generate global leaderboards
   */
  public generateGlobalLeaderboards(): Record<string, LeaderboardEntry[]> {
    const allStats = userStatsService.getAllUserStats();
    const leaderboards: Record<string, LeaderboardEntry[]> = {
      overall_xp: [],
      overall_wins: [],
      overall_mvp: [],
      overall_rating: [],
    };

    // Sort by different metrics
    const byXP = [...allStats].sort((a, b) => b.totalXP - a.totalXP);
    const byWins = [...allStats].sort((a, b) => b.totalWins - a.totalWins);
    const byMVP = [...allStats].sort((a, b) => b.mvpCount - a.mvpCount);
    const byRating = [...allStats].sort((a, b) => {
      const avgRatingA = this.calculateAverageRating(a);
      const avgRatingB = this.calculateAverageRating(b);
      return avgRatingB - avgRatingA;
    });

    // Build leaderboards
    leaderboards.overall_xp = byXP.map((user, idx) => ({
      rank: idx + 1,
      userId: user.userId,
      username: user.username,
      metric: user.totalXP,
      metricName: 'XP',
    }));

    leaderboards.overall_wins = byWins.map((user, idx) => ({
      rank: idx + 1,
      userId: user.userId,
      username: user.username,
      metric: user.totalWins,
      metricName: 'Wins',
    }));

    leaderboards.overall_mvp = byMVP.map((user, idx) => ({
      rank: idx + 1,
      userId: user.userId,
      username: user.username,
      metric: user.mvpCount,
      metricName: 'MVP Awards',
    }));

    leaderboards.overall_rating = byRating.map((user, idx) => ({
      rank: idx + 1,
      userId: user.userId,
      username: user.username,
      metric: this.calculateAverageRating(user),
      metricName: 'Rating',
    }));

    // Per-sport leaderboards
    const sports = new Set<string>();
    allStats.forEach(user => {
      Object.keys(user.sportStats).forEach(sport => sports.add(sport));
    });

    sports.forEach(sport => {
      const byWinRate = allStats.filter(u => u.sportStats[sport]).sort((a, b) => {
        const rateA = a.sportStats[sport].winPercentage;
        const rateB = b.sportStats[sport].winPercentage;
        return rateB - rateA;
      });

      leaderboards[`${sport.toLowerCase()}_winrate`] = byWinRate
        .slice(0, 50)
        .map((user, idx) => ({
          rank: idx + 1,
          userId: user.userId,
          username: user.username,
          metric: user.sportStats[sport].winPercentage,
          metricName: `${sport} Win Rate %`,
          sport,
        }));
    });

    // Cache leaderboards
    try {
      localStorage.setItem(this.STORAGE_KEY_LEADERBOARDS, JSON.stringify(leaderboards));
    } catch (error) {
      console.error('Failed to cache leaderboards:', error);
    }

    return leaderboards;
  }

  /**
   * Get global leaderboards
   */
  public getGlobalLeaderboards(): Record<string, LeaderboardEntry[]> {
    try {
      const cached = localStorage.getItem(this.STORAGE_KEY_LEADERBOARDS);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error('Failed to retrieve cached leaderboards:', error);
    }

    return this.generateGlobalLeaderboards();
  }

  /**
   * Get specific leaderboard
   */
  public getLeaderboard(boardName: string, limit: number = 50): LeaderboardEntry[] {
    const leaderboards = this.getGlobalLeaderboards();
    const board = leaderboards[boardName] || [];
    return board.slice(0, limit);
  }

  /**
   * Get user rank in leaderboard
   */
  public getUserRank(boardName: string, userId: string): number {
    const board = this.getLeaderboard(boardName, 1000);
    const entry = board.find(e => e.userId === userId);
    return entry?.rank || -1;
  }

  /**
   * Generate court legends (per location and sport)
   */
  public generateCourtLegends(location: string, sport: string): CourtLegend[] {
    // This would need location data, for now create mock legends
    const legends: CourtLegend[] = [];

    try {
      // In a real implementation, this would filter by location
      // For now, we'll generate based on player rankings
      const allStats = userStatsService.getAllUserStats();
      const filtered = allStats.filter(u => u.sportStats[sport]);

      const ranked = filtered
        .sort((a, b) => {
          const scoreB = (b.sportStats[sport].mvpAwards * 10) + b.sportStats[sport].matchesWon;
          const scoreA = (a.sportStats[sport].mvpAwards * 10) + a.sportStats[sport].matchesWon;
          return scoreB - scoreA;
        })
        .slice(0, 10);

      legends.push(
        ...ranked.map((user, idx) => ({
          rank: idx + 1,
          userId: user.userId,
          username: user.username,
          location,
          sport,
          matches: user.sportStats[sport].matchesPlayed,
          wins: user.sportStats[sport].matchesWon,
          mvpCount: user.sportStats[sport].mvpAwards,
          rating: user.sportStats[sport].rating,
          lastActive: user.lastActive,
        }))
      );

      // Cache
      const key = `${this.STORAGE_KEY_LEGENDS}:${location}:${sport}`;
      localStorage.setItem(key, JSON.stringify(legends));
    } catch (error) {
      console.error('Failed to generate court legends:', error);
    }

    return legends;
  }

  /**
   * Get court legends for location
   */
  public getCourtLegends(location: string, sport: string): CourtLegend[] {
    try {
      const key = `${this.STORAGE_KEY_LEGENDS}:${location}:${sport}`;
      const cached = localStorage.getItem(key);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error('Failed to retrieve court legends:', error);
    }

    return this.generateCourtLegends(location, sport);
  }

  /**
   * Get top performers for a location across all sports
   */
  public getLocationTopPerformers(location: string, limit: number = 20): CourtLegend[] {
    const allStats = userStatsService.getAllUserStats();
    const legends: CourtLegend[] = [];

    allStats.forEach(user => {
      Object.entries(user.sportStats).forEach(([sport, stats]) => {
        legends.push({
          rank: 0,
          userId: user.userId,
          username: user.username,
          location,
          sport,
          matches: stats.matchesPlayed,
          wins: stats.matchesWon,
          mvpCount: stats.mvpAwards,
          rating: stats.rating,
          lastActive: user.lastActive,
        });
      });
    });

    // Sort by combined score
    legends.sort((a, b) => {
      const scoreB = (b.mvpCount * 10) + b.wins;
      const scoreA = (a.mvpCount * 10) + a.wins;
      return scoreB - scoreA;
    });

    // Assign ranks
    legends.forEach((legend, idx) => {
      legend.rank = idx + 1;
    });

    return legends.slice(0, limit);
  }

  /**
   * Calculate average rating across all sports
   */
  private calculateAverageRating(user: UserStatsProfile): number {
    const sports = Object.values(user.sportStats);
    if (sports.length === 0) return 0;
    const sum = sports.reduce((acc, sport) => acc + sport.rating, 0);
    return sum / sports.length;
  }

  /**
   * Get player rank in sport
   */
  public getPlayerSportRank(userId: string, sport: string): number {
    const leaderboard = this.getLeaderboard(`${sport.toLowerCase()}_winrate`, 500);
    const entry = leaderboard.find(e => e.userId === userId);
    return entry?.rank || -1;
  }

  /**
   * Clear all legend caches
   */
  public clearCaches(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes(this.STORAGE_KEY_LEGENDS) ||
            key.includes(this.STORAGE_KEY_LEADERBOARDS) ||
            key.includes(this.STORAGE_KEY_CACHE)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }
}

export const courtLegendService = new CourtLegendService();
