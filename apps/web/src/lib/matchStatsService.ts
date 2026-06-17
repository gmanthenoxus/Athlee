/**
 * Match Stats Service
 * 
 * Manages storage and retrieval of match statistics for all sports.
 * Stores player-level and team-level stats with support for flexible stat schemas.
 * 
 * Storage:
 * - matchStats_<matchId>: Stores MatchStats for a specific match
 * - allMatchStats: Index of all match stat IDs (for querying)
 */

import { MatchStats, PlayerMatchStat, TeamMatchStat } from './stat-types';

const MATCH_STATS_INDEX_KEY = 'athlee_match_stats_index';

/**
 * Match Stats Service - singleton for managing match statistics
 */
class MatchStatsService {
  /**
   * Record stats for a match
   */
  public recordMatchStats(matchStats: MatchStats): void {
    try {
      // Store the individual match stats
      const storageKey = `athlee_match_stats_${matchStats.matchId}`;
      localStorage.setItem(storageKey, JSON.stringify(matchStats));

      // Add to index
      this.addToIndex(matchStats.matchId);

      console.log(`✓ Match stats recorded for match ${matchStats.matchId}`);
    } catch (error) {
      console.error('Failed to record match stats:', error);
      throw error;
    }
  }

  /**
   * Get stats for a specific match
   */
  public getMatchStats(matchId: string): MatchStats | null {
    try {
      const storageKey = `athlee_match_stats_${matchId}`;
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error(`Failed to retrieve match stats for ${matchId}:`, error);
      return null;
    }
  }

  /**
   * Update existing match stats
   */
  public updateMatchStats(matchStats: MatchStats): void {
    try {
      this.recordMatchStats(matchStats);
    } catch (error) {
      console.error('Failed to update match stats:', error);
      throw error;
    }
  }

  /**
   * Delete stats for a match
   */
  public deleteMatchStats(matchId: string): void {
    try {
      const storageKey = `athlee_match_stats_${matchId}`;
      localStorage.removeItem(storageKey);
      this.removeFromIndex(matchId);
      console.log(`✓ Match stats deleted for match ${matchId}`);
    } catch (error) {
      console.error('Failed to delete match stats:', error);
    }
  }

  /**
   * Get all match stat IDs
   */
  public getAllMatchStatIds(): string[] {
    try {
      const stored = localStorage.getItem(MATCH_STATS_INDEX_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get all match stats
   */
  public getAllMatchStats(): MatchStats[] {
    const ids = this.getAllMatchStatIds();
    return ids
      .map((id) => this.getMatchStats(id))
      .filter((stats): stats is MatchStats => stats !== null);
  }

  /**
   * Get stats for a specific player across all matches
   */
  public getPlayerStatsAcrossMatches(playerId: string): {
    matchId: string;
    stats: PlayerMatchStat;
  }[] {
    const allStats = this.getAllMatchStats();
    const playerStats: { matchId: string; stats: PlayerMatchStat }[] = [];

    allStats.forEach((matchStats) => {
      const playerStat = matchStats.playerStats.find((ps) => ps.playerId === playerId);
      if (playerStat) {
        playerStats.push({
          matchId: matchStats.matchId,
          stats: playerStat,
        });
      }
    });

    return playerStats;
  }

  /**
   * Get aggregated stats for a player (across all matches)
   */
  public getPlayerAggregateStats(playerId: string): Record<string, number> {
    const playerMatches = this.getPlayerStatsAcrossMatches(playerId);
    const aggregated: Record<string, number> = {};

    playerMatches.forEach(({ stats }) => {
      Object.entries(stats.values).forEach(([statKey, value]) => {
        aggregated[statKey] = (aggregated[statKey] || 0) + value;
      });
    });

    return aggregated;
  }

  /**
   * Calculate final score from player stats (based on goals)
   * Assumes 'goals' statKey exists in the schema
   */
  public calculateTeamScore(teamStats: TeamMatchStat | null): number {
    if (!teamStats || !teamStats.values) return 0;
    return teamStats.values['goals'] || 0;
  }

  /**
   * Get player statistics summary for display
   */
  public getPlayerStatsSummary(
    matchId: string,
    playerId: string
  ): Record<string, number> | null {
    const matchStats = this.getMatchStats(matchId);
    if (!matchStats) return null;

    const playerStat = matchStats.playerStats.find((ps) => ps.playerId === playerId);
    return playerStat ? playerStat.values : null;
  }

  /**
   * Get team statistics summary for display
   */
  public getTeamStatsSummary(matchId: string, teamId: string): Record<string, number> | null {
    const matchStats = this.getMatchStats(matchId);
    if (!matchStats) return null;

    const teamStat = matchStats.teamStats.find((ts) => ts.teamId === teamId);
    return teamStat ? teamStat.values : null;
  }

  /**
   * Check if stats exist for a match
   */
  public statsExist(matchId: string): boolean {
    return this.getMatchStats(matchId) !== null;
  }

  /**
   * Export stats for a match (for download/sharing)
   */
  public exportMatchStats(matchId: string): string | null {
    const stats = this.getMatchStats(matchId);
    if (!stats) return null;

    try {
      return JSON.stringify(stats, null, 2);
    } catch (error) {
      console.error('Failed to export match stats:', error);
      return null;
    }
  }

  /**
   * Import stats for a match
   */
  public importMatchStats(json: string): MatchStats | null {
    try {
      const stats = JSON.parse(json) as MatchStats;
      this.recordMatchStats(stats);
      return stats;
    } catch (error) {
      console.error('Failed to import match stats:', error);
      return null;
    }
  }

  /**
   * Add match ID to the index
   */
  private addToIndex(matchId: string): void {
    const ids = this.getAllMatchStatIds();
    if (!ids.includes(matchId)) {
      ids.push(matchId);
      localStorage.setItem(MATCH_STATS_INDEX_KEY, JSON.stringify(ids));
    }
  }

  /**
   * Remove match ID from the index
   */
  private removeFromIndex(matchId: string): void {
    const ids = this.getAllMatchStatIds();
    const filtered = ids.filter((id) => id !== matchId);
    localStorage.setItem(MATCH_STATS_INDEX_KEY, JSON.stringify(filtered));
  }
}

// Export singleton instance
export const matchStatsService = new MatchStatsService();
