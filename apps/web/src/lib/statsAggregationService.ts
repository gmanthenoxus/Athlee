/**
 * StatsAggregationService
 * Aggregates player statistics across matches
 * Called when a match is completed to update UserStats
 */

import { UserStats } from './leaderboard-types';
import { Match, MatchStatus } from './match-types';
import { MatchStats } from './stat-types';
import { SportType } from './location-types';
import { matchService } from './matchService';
import { statEntryService } from './statEntryService';

class StatsAggregationService {
  private readonly STORAGE_PREFIX = 'athlee_userStats_';

  /**
   * Update user stats for all players in a completed match
   * Call this when a match's stats are finalized
   */
  public updateUserStatsFromMatch(matchId: string): void {
    try {
      const match = matchService.getMatch(matchId);
      if (!match || match.status !== MatchStatus.Completed) {
        console.warn(`Match ${matchId} is not completed or not found`);
        return;
      }

      const stats = statEntryService.getMatchStats(matchId);
      if (!stats) {
        console.warn(`No stats found for match ${matchId}`);
        return;
      }

      // Determine winning team based on final score
      let winningTeam: 'A' | 'B' | 'draw' = 'draw';
      if (stats.finalScore) {
        if (stats.finalScore.teamA > stats.finalScore.teamB) winningTeam = 'A';
        else if (stats.finalScore.teamB > stats.finalScore.teamA) winningTeam = 'B';
      }

      // Update stats for each player
      const teamAPlayers = match.teams[0]?.players || [];
      const teamBPlayers = match.teams[1]?.players || [];

      // Process Team A
      teamAPlayers.forEach((player, index) => {
        const playerStats = stats.playerStats[index];
        if (playerStats && player.userId) {
          this.updatePlayerStats(
            player.userId,
            match.sport,
            playerStats.values,
            winningTeam === 'A' ? 'win' : winningTeam === 'draw' ? 'draw' : 'loss'
          );
        }
      });

      // Process Team B
      teamBPlayers.forEach((player, index) => {
        const playerStatIndex = teamAPlayers.length + index;
        const playerStats = stats.playerStats[playerStatIndex];
        if (playerStats && player.userId) {
          this.updatePlayerStats(
            player.userId,
            match.sport,
            playerStats.values,
            winningTeam === 'B' ? 'win' : winningTeam === 'draw' ? 'draw' : 'loss'
          );
        }
      });
    } catch (error) {
      console.error('Error updating user stats from match:', error);
    }
  }

  /**
   * Update a single player's stats
   */
  private updatePlayerStats(
    userId: string,
    sport: SportType,
    playerValues: Record<string, number>,
    result: 'win' | 'loss' | 'draw'
  ): void {
    const currentStats = this.getUserStats(userId, sport);

    // Create new totals
    const newTotals = {
      ...currentStats.totals,
      gamesPlayed: currentStats.totals.gamesPlayed + 1,
      wins: currentStats.totals.wins + (result === 'win' ? 1 : 0),
      losses: currentStats.totals.losses + (result === 'loss' ? 1 : 0),
      draws: currentStats.totals.draws + (result === 'draw' ? 1 : 0),
      // Add stats from this game
      points: currentStats.totals.points + (playerValues['points'] || 0),
      fieldGoals: currentStats.totals.fieldGoals + (playerValues['fieldGoals'] || 0),
      fieldGoalAttempts: currentStats.totals.fieldGoalAttempts + (playerValues['fieldGoalAttempts'] || 0),
      threePointers: currentStats.totals.threePointers + (playerValues['fg3m'] || playerValues['threePointers'] || 0),
      threePointAttempts: currentStats.totals.threePointAttempts + (playerValues['threePointAttempts'] || 0),
      freeThrows: currentStats.totals.freeThrows + (playerValues['ftm'] || playerValues['freeThrows'] || 0),
      freeThrowAttempts: currentStats.totals.freeThrowAttempts + (playerValues['freeThrowAttempts'] || 0),
      rebounds: currentStats.totals.rebounds + (playerValues['rebounds'] || 0),
      offensiveRebounds: currentStats.totals.offensiveRebounds + (playerValues['offensiveRebounds'] || 0),
      defensiveRebounds: currentStats.totals.defensiveRebounds + (playerValues['defensiveRebounds'] || 0),
      assists: currentStats.totals.assists + (playerValues['assists'] || 0),
      turnovers: currentStats.totals.turnovers + (playerValues['turnovers'] || 0),
      steals: currentStats.totals.steals + (playerValues['steals'] || 0),
      blocks: currentStats.totals.blocks + (playerValues['blocks'] || 0),
      personalFouls: currentStats.totals.personalFouls + (playerValues['personalFouls'] || 0)
    };

    const winRate = newTotals.gamesPlayed > 0 ? newTotals.wins / newTotals.gamesPlayed : 0;

    const updatedStats: UserStats = {
      ...currentStats,
      userId,
      sport,
      totals: newTotals,
      winRate,
      lastUpdated: new Date().toISOString()
    };

    // Save to storage
    this.saveUserStats(userId, sport, updatedStats);
  }

  /**
   * Get user stats, or empty stats if not found
   */
  public getUserStats(userId: string, sport: SportType): UserStats {
    const saved = this.loadUserStats(userId, sport);
    if (saved) return saved;

    // Return empty stats template
    return {
      userId,
      sport,
      totals: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
        fieldGoals: 0,
        fieldGoalAttempts: 0,
        threePointers: 0,
        threePointAttempts: 0,
        freeThrows: 0,
        freeThrowAttempts: 0,
        rebounds: 0,
        offensiveRebounds: 0,
        defensiveRebounds: 0,
        assists: 0,
        turnovers: 0,
        steals: 0,
        blocks: 0,
        personalFouls: 0
      },
      winRate: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Save user stats to storage
   */
  private saveUserStats(userId: string, sport: SportType, stats: UserStats): void {
    try {
      const key = `${this.STORAGE_PREFIX}${sport}_${userId}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(stats));
      }
    } catch (error) {
      console.error('Failed to save user stats:', error);
    }
  }

  /**
   * Load user stats from storage
   */
  private loadUserStats(userId: string, sport: SportType): UserStats | null {
    try {
      const key = `${this.STORAGE_PREFIX}${sport}_${userId}`;
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      return null;
    } catch (error) {
      console.error('Failed to load user stats:', error);
      return null;
    }
  }

  /**
   * Get all user stats for a sport (for leaderboards)
   */
  public getAllUserStatsForSport(sport: SportType): UserStats[] {
    if (typeof localStorage === 'undefined') return [];

    const stats: UserStats[] = [];
    const prefix = `${this.STORAGE_PREFIX}${sport}_`;

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          const data = localStorage.getItem(key);
          if (data) {
            stats.push(JSON.parse(data));
          }
        }
      }
    } catch (error) {
      console.error('Failed to retrieve all user stats:', error);
    }

    return stats;
  }

  /**
   * Clear all stats for testing
   */
  public clearAllStats(): void {
    if (typeof localStorage === 'undefined') return;

    const keysToDelete: string[] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_PREFIX)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear stats:', error);
    }
  }
}

export const statsAggregationService = new StatsAggregationService();
