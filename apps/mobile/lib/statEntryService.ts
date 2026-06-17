import { MatchStats, PlayerMatchStat, SportStatSchema } from './stat-types';

/**
 * StatEntryService - Handles saving, retrieving, and validating match stats
 * Data is persisted in localStorage under "matchStats_${matchId}" keys
 */
class StatEntryService {
  private readonly STORAGE_PREFIX = 'athlee_matchStats_';

  /**
   * Save match stats to storage
   */
  public saveMatchStats(matchId: string, playerStats: PlayerMatchStat[]): MatchStats {
    if (typeof localStorage === 'undefined') {
      throw new Error('StatEntryService only works in browser environment');
    }

    const matchStats: MatchStats = {
      id: `stats_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      matchId: matchId,
      playerStats: playerStats,
      teamStats: [],  // Will be populated by stat aggregator
      recordedAt: new Date().toISOString(),
      recordedBy: 'current-user'
    };

    try {
      const key = this.getStorageKey(matchId);
      localStorage.setItem(key, JSON.stringify(matchStats));
      return matchStats;
    } catch (error) {
      console.error('Failed to save match stats:', error);
      throw error;
    }
  }

  /**
   * Get match stats from storage
   */
  public getMatchStats(matchId: string): MatchStats | null {
    if (typeof localStorage === 'undefined') return null;

    try {
      const key = this.getStorageKey(matchId);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to retrieve match stats:', error);
      return null;
    }
  }

  /**
   * Delete match stats from storage
   */
  public deleteMatchStats(matchId: string): void {
    if (typeof localStorage === 'undefined') return;

    try {
      const key = this.getStorageKey(matchId);
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to delete match stats:', error);
    }
  }

  /**
   * Validate match stats against schema
   */
  public validateMatchStats(matchStats: MatchStats, schema: SportStatSchema): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!matchStats.id) errors.push('Stats ID is required');
    if (!matchStats.matchId) errors.push('Match ID is required');
    if (!matchStats.playerStats || matchStats.playerStats.length === 0) {
      errors.push('At least one player\'s stats are required');
    }

    matchStats.playerStats.forEach((playerStat, index) => {
      if (!playerStat.playerId) errors.push(`Player ${index} missing ID`);
      if (!playerStat.values) {
        errors.push(`Player ${playerStat.playerId} has no values`);
        return;
      }

      // Check that all required stats are present (optional - could enforce this)
      // For now, allow partial stats
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate a single stat value
   */
  public validateStatValue(value: any): boolean {
    return (
      typeof value === 'number' &&
      value >= 0 &&
      Number.isInteger(value)
    );
  }

  /**
   * Initialize player stats with zeros
   */
  public initializePlayerStats(playerIds: Array<{ id: string; name: string }>, schema: SportStatSchema): PlayerMatchStat[] {
    return playerIds.map((player) => {
      const values: Record<string, number> = {};
      schema.statKeys.forEach((key) => {
        values[key.id] = 0;
      });

      return {
        playerId: player.id,
        playerName: player.name,
        values: values
      };
    });
  }

  /**
   * Get storage key for match stats
   */
  private getStorageKey(matchId: string): string {
    return `${this.STORAGE_PREFIX}${matchId}`;
  }
}

export const statEntryService = new StatEntryService();
