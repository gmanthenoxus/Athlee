/**
 * LeaderboardService (Mobile)
 * Builds and queries leaderboards from aggregated user stats
 */

import { LeaderboardEntry, LeaderboardType, UserStats } from './leaderboard-types';
import { SportType } from './location-types';
import { statsAggregationService } from './statsAggregationService';
import { matchService } from './matchService';
import { MatchStatus } from './match-types';

class LeaderboardService {
  /**
   * Get a leaderboard of players ranked by a stat
   */
  public getLeaderboard(
    type: LeaderboardType = LeaderboardType.Global,
    sport?: SportType,
    locationId?: string,
    statKey: string = 'points',
    timeFrame: 'allTime' | 'weekly' | 'monthly' = 'allTime'
  ): LeaderboardEntry[] {
    let stats: UserStats[] = [];
    let activeSport: SportType | undefined = sport;

    // Get base user stats for sport
    if (activeSport) {
      stats = statsAggregationService.getAllUserStatsForSport(activeSport);
    } else {
      // If no sport specified, use first available sport
      const sports = this.getAvailableSports();
      if (sports.length > 0) {
        activeSport = sports[0];
        stats = statsAggregationService.getAllUserStatsForSport(activeSport);
      }
    }

    // Apply filters based on leaderboard type
    if (type === LeaderboardType.Location && locationId && activeSport) {
      stats = stats.map((s) => this.filterStatsByLocation(s, locationId, activeSport));
    } else if ((type === LeaderboardType.Weekly || type === LeaderboardType.Monthly) && activeSport) {
      stats = stats.map((s) => this.filterStatsByTimeFrame(s, timeFrame, activeSport));
    }

    // Convert to leaderboard entries
    const entries = stats
      .map((userStats) => ({
        userId: userStats.userId,
        username: `Player ${userStats.userId.slice(0, 8)}`, // Placeholder; TODO: fetch user profile
        value: this.getStatValue(userStats, statKey),
        gamesPlayed: userStats.totals.gamesPlayed,
        winRate: userStats.winRate
      }))
      .filter((e) => e.gamesPlayed > 0) // Only include players with games
      .sort((a, b) => b.value - a.value); // Sort descending by stat value

    // Assign ranks
    const entries_with_ranks: LeaderboardEntry[] = entries.map((entry, index) => ({
      rank: index + 1,
      ...entry
    }));

    return entries_with_ranks;
  }

  /**
   * Get a specific stat value from UserStats
   */
  private getStatValue(stats: UserStats, statKey: string): number {
    const key = statKey as keyof typeof stats.totals;
    return stats.totals[key] || 0;
  }

  /**
   * Filter stats by location (MVP: returns base stats)
   * TODO: Enhance to track per-location stats
   */
  private filterStatsByLocation(stats: UserStats, locationId: string, sport: string): UserStats {
    // MVP version: return all stats for this sport
    // Future: track location with each match and aggregate per-location
    return stats;
  }

  /**
   * Filter stats by time frame (MVP: returns base stats)
   * TODO: Enhance to track weekly/monthly stats
   */
  private filterStatsByTimeFrame(
    stats: UserStats,
    timeFrame: 'allTime' | 'weekly' | 'monthly',
    sport: SportType
  ): UserStats {
    // MVP version: return all stats
    // Future: track match date and aggregate by week or month
    return stats;
  }

  /**
   * Get a user's rank in a leaderboard
   */
  public getUserRank(userId: string, sport: SportType, statKey: string = 'points'): number | null {
    const leaderboard = this.getLeaderboard(LeaderboardType.Global, sport, undefined, statKey);
    const entry = leaderboard.find((e) => e.userId === userId);
    return entry?.rank || null;
  }

  /**
   * Get list of sports with completed matches
   */
  public getAvailableSports(): SportType[] {
    const matches = matchService.getAllMatches();
    const completedMatches = matches.filter((m) => m.status === MatchStatus.Completed);

    if (completedMatches.length === 0) return [];

    const sports = Array.from(new Set(completedMatches.map((m) => m.sport)));
    return sports;
  }

  /**
   * Get list of locations with completed matches
   */
  public getAvailableLocations(): string[] {
    const matches = matchService.getAllMatches();
    const completedMatches = matches.filter((m) => m.status === MatchStatus.Completed);

    if (completedMatches.length === 0) return [];

    const locations = Array.from(new Set(completedMatches.map((m) => m.locationId).filter(Boolean) as string[]));
    return locations;
  }
}

export const leaderboardService = new LeaderboardService();
