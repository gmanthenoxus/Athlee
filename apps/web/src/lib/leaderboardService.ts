/**
 * LeaderboardService
 * Queries and sorts leaderboards from aggregated user stats
 */

import {
  LeaderboardEntry,
  LeaderboardType,
  TimeFrame,
  UserStats
} from './leaderboard-types';
import { SportType } from './location-types';
import { statsAggregationService } from './statsAggregationService';
import { matchService } from './matchService';

class LeaderboardService {
  /**
   * Get a leaderboard with optional filters
   */
  public getLeaderboard(
    type: LeaderboardType,
    sport?: SportType,
    locationId?: string,
    statKey: string = 'points',
    timeFrame: TimeFrame = 'allTime'
  ): LeaderboardEntry[] {
    let userStats: UserStats[] = [];

    // Get base stats for the sport
    if (sport) {
      userStats = statsAggregationService.getAllUserStatsForSport(sport);
    }

    // Apply location filter if needed
    if (type === LeaderboardType.Location && locationId) {
      userStats = this.filterStatsByLocation(userStats, locationId, sport);
    }

    // Apply time filter if needed
    if (type === LeaderboardType.Weekly || timeFrame === 'weekly') {
      userStats = this.filterStatsByTimeFrame(userStats, 'weekly', sport);
    } else if (type === LeaderboardType.Monthly || timeFrame === 'monthly') {
      userStats = this.filterStatsByTimeFrame(userStats, 'monthly', sport);
    }

    // Convert to leaderboard entries and sort
    const entries = userStats.map((stats, index) => {
      const value = this.getStatValue(stats, statKey);
      return {
        rank: index + 1, // Will be reassigned after sorting
        userId: stats.userId,
        username: stats.username || `Player_${stats.userId}`,
        avatarUrl: stats.avatarUrl,
        value,
        gamesPlayed: stats.totals.gamesPlayed,
        winRate: stats.winRate,
        stats: {
          points: stats.totals.points,
          rebounds: stats.totals.rebounds,
          assists: stats.totals.assists,
          steals: stats.totals.steals,
          blocks: stats.totals.blocks
        }
      } as LeaderboardEntry;
    });

    // Sort by stat value descending
    entries.sort((a, b) => b.value - a.value);

    // Reassign ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries;
  }

  /**
   * Get a single stat value from user stats
   */
  private getStatValue(stats: UserStats, statKey: string): number {
    const key = statKey as keyof typeof stats.totals;
    return stats.totals[key] as number || 0;
  }

  /**
   * Filter user stats by location (stats from matches at that location)
   */
  private filterStatsByLocation(
    userStats: UserStats[],
    locationId: string,
    sport?: SportType
  ): UserStats[] {
    // Get all matches at this location that are completed
    const allMatches = matchService.getAllMatches();
    const locationMatches = allMatches.filter(
      (m) => m.locationId === locationId && m.status === 'Completed'
    );

    if (locationMatches.length === 0) return [];

    // Aggregate stats only from these matches for each user
    const aggregated: { [userId: string]: UserStats } = {};

    locationMatches.forEach((match) => {
      // This is simplified; for production, we'd need to track per-location stats
      // For now, we'll just return the overall stats (not location-filtered)
      // because we don't have location-specific stat records
    });

    // For MVP, return the base stats
    // TODO: Implement location-specific stat tracking
    return userStats;
  }

  /**
   * Filter user stats by time frame
   */
  private filterStatsByTimeFrame(
    userStats: UserStats[],
    timeFrame: 'weekly' | 'monthly',
    sport?: SportType
  ): UserStats[] {
    const allMatches = matchService.getAllMatches();
    const now = new Date();
    let startDate = new Date();

    if (timeFrame === 'weekly') {
      startDate.setDate(now.getDate() - 7);
    } else if (timeFrame === 'monthly') {
      startDate.setMonth(now.getMonth() - 1);
    }

    const recentMatches = allMatches.filter((m) => {
      const matchDate = new Date(m.date);
      return matchDate >= startDate && m.status === 'Completed';
    });

    if (recentMatches.length === 0) return [];

    // TODO: Implement time-based stat aggregation
    // For now, return overall stats
    return userStats;
  }

  /**
   * Get the current user's leaderboard position
   */
  public getUserRank(
    userId: string,
    sport: SportType,
    statKey: string = 'points'
  ): LeaderboardEntry | null {
    const leaderboard = this.getLeaderboard(
      LeaderboardType.Global,
      sport,
      undefined,
      statKey
    );
    return leaderboard.find((entry) => entry.userId === userId) || null;
  }

  /**
   * Get sports available for leaderboards
   */
  public getAvailableSports(): SportType[] {
    const sports = new Set<SportType>();
    const allMatches = matchService.getAllMatches();
    allMatches.forEach((match) => {
      if (match.status === 'Completed') {
        sports.add(match.sport);
      }
    });
    return Array.from(sports).sort();
  }

  /**
   * Get locations available for leaderboards
   */
  public getAvailableLocations(): Array<{ id: string; name: string }> {
    const locations = new Map<string, string>();
    const allMatches = matchService.getAllMatches();
    allMatches.forEach((match) => {
      if (match.status === 'Completed' && match.locationId) {
        // TODO: Get location name from location service
        locations.set(match.locationId, match.locationId);
      }
    });
    return Array.from(locations.entries()).map(([id, name]) => ({
      id,
      name
    }));
  }
}

export const leaderboardService = new LeaderboardService();
