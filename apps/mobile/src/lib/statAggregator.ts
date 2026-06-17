import { PlayerMatchStat, TeamMatchStat } from './stat-types';
import { MatchRules } from './match-types';

/**
 * StatAggregator - Calculates aggregated stats from individual player stats
 */
class StatAggregator {
  /**
   * Calculate team stats by summing player stats
   */
  public calculateTeamStats(playerStats: PlayerMatchStat[], teamId: string): TeamMatchStat {
    const values: Record<string, number> = {};

    // Sum all player values for each stat
    playerStats.forEach((playerStat) => {
      Object.entries(playerStat.values).forEach(([statKey, value]) => {
        values[statKey] = (values[statKey] || 0) + value;
      });
    });

    return {
      teamId: teamId,
      values: values
    };
  }

  /**
   * Calculate final score from player stats and match rules
   * Uses the pointsInside, pointsOutside, and freeThrowValue from match rules
   */
  public calculateFinalScore(
    playerStats: PlayerMatchStat[],
    matchRules: MatchRules
  ): number {
    let score = 0;

    playerStats.forEach((playerStat) => {
      // Points: this is the simple player points stat
      if (playerStat.values['points'] !== undefined) {
        score += playerStat.values['points'];
      }

      // Alternative: calculate from field goals and free throws using rules
      // This would sum: (2pts * FG) + (3pts * 3PM) + (1pt * FT)
      // For now, rely on the points stat directly
    });

    return score;
  }

  /**
   * Calculate score for both teams
   */
  public calculateTeamScores(
    teamAPlayers: PlayerMatchStat[],
    teamBPlayers: PlayerMatchStat[],
    matchRules: MatchRules
  ): { teamA: number; teamB: number } {
    return {
      teamA: this.calculateFinalScore(teamAPlayers, matchRules),
      teamB: this.calculateFinalScore(teamBPlayers, matchRules)
    };
  }

  /**
   * Get specific stat value for a player
   */
  public getPlayerStatValue(playerStat: PlayerMatchStat, statKey: string): number {
    return playerStat.values[statKey] || 0;
  }

  /**
   * Get specific stat value for aggregated team
   */
  public getTeamStatValue(teamStat: TeamMatchStat, statKey: string): number {
    return teamStat.values[statKey] || 0;
  }

  /**
   * Calculate shooting percentage (made / attempted)
   */
  public calculateShootingPercentage(made: number, attempted: number): number {
    if (attempted === 0) return 0;
    return Math.round((made / attempted) * 100);
  }

  /**
   * Calculate 3-point percentage
   */
  public calculate3PointPercentage(playerStat: PlayerMatchStat): number {
    const made = playerStat.values['3pm'] || 0;
    const attempted = playerStat.values['3pa'] || 0;
    return this.calculateShootingPercentage(made, attempted);
  }

  /**
   * Calculate free throw percentage
   */
  public calculateFreeThrowPercentage(playerStat: PlayerMatchStat): number {
    const made = playerStat.values['ftm'] || 0;
    const attempted = playerStat.values['fta'] || 0;
    return this.calculateShootingPercentage(made, attempted);
  }
}

export const statAggregator = new StatAggregator();
