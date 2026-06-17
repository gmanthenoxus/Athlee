/**
 * Milestone Service
 * Tracks stat milestones and awards XP when first reaching thresholds
 */

import { xpService } from './xpService';
import { XPSource, XP_AWARDS } from './xp-types';
import { statsAggregationService } from './statsAggregationService';
import { SportType } from './location-types';

class MilestoneService {
  private readonly STORAGE_PREFIX = 'athlee_milestone_';

  // Stat milestones (all sports combined)
  private readonly STAT_MILESTONES = {
    points: [10, 50, 100, 250, 500, 1000],
    assists: [10, 50, 100],
    rebounds: [10, 50, 100],
    wins: [5, 20, 50]
  };

  /**
   * Check if user has reached any new stat milestones
   * Called after match completion
   */
  public checkAndAwardMilestones(userId: string): number {
    let totalMilestonesXPAwarded = 0;

    // Get current aggregated stats
    const allSports = Object.values(SportType);
    const aggregatedStats = {
      points: 0,
      assists: 0,
      rebounds: 0,
      wins: 0
    };

    allSports.forEach((sport: any) => {
      const stats = statsAggregationService.getUserStats(userId, sport);
      if (stats) {
        aggregatedStats.points += stats.totals.points;
        aggregatedStats.assists += stats.totals.assists;
        aggregatedStats.rebounds += stats.totals.rebounds;
        aggregatedStats.wins += stats.totals.wins;
      }
    });

    // Check each stat type for milestones
    Object.entries(this.STAT_MILESTONES).forEach(([statKey, thresholds]) => {
      const currentValue = (aggregatedStats as any)[statKey] || 0;

      thresholds.forEach((threshold) => {
        if (currentValue >= threshold && !this.hasMilestoneBeenReached(userId, statKey, threshold)) {
          // Award XP for this milestone
          const xpAmount = XP_AWARDS.MILESTONE_POINTS_10; // All milestones award same amount
          xpService.awardXP(
            userId,
            xpAmount,
            XPSource.Milestone,
            `Reached ${threshold} total ${statKey}!`
          );

          // Mark milestone as reached
          this.markMilestoneReached(userId, statKey, threshold);

          totalMilestonesXPAwarded += xpAmount;

          console.log(`🏆 Milestone: ${userId} reached ${threshold} ${statKey}!`);
        }
      });
    });

    return totalMilestonesXPAwarded;
  }

  /**
   * Check if a specific milestone has been reached
   */
  private hasMilestoneBeenReached(userId: string, statKey: string, threshold: number): boolean {
    try {
      const key = `${this.STORAGE_PREFIX}${userId}`;
      if (typeof localStorage === 'undefined') return false;

      const data = localStorage.getItem(key);
      if (!data) return false;

      const milestones = JSON.parse(data);
      return milestones[`${statKey}_${threshold}`] === true;
    } catch (error) {
      console.error('Failed to check milestone:', error);
      return false;
    }
  }

  /**
   * Mark a milestone as reached
   */
  private markMilestoneReached(userId: string, statKey: string, threshold: number): void {
    try {
      const key = `${this.STORAGE_PREFIX}${userId}`;
      if (typeof localStorage === 'undefined') return;

      const dataStr = localStorage.getItem(key) || '{}';
      const milestones = JSON.parse(dataStr);
      milestones[`${statKey}_${threshold}`] = true;
      milestones.lastUpdated = new Date().toISOString();

      localStorage.setItem(key, JSON.stringify(milestones));
    } catch (error) {
      console.error('Failed to mark milestone:', error);
    }
  }

  /**
   * Reset all milestones for a user (testing)
   */
  public resetMilestones(userId: string): void {
    try {
      const key = `${this.STORAGE_PREFIX}${userId}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Failed to reset milestones:', error);
    }
  }

  /**
   * Clear all milestones (testing)
   */
  public clearAllMilestones(): void {
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
      console.error('Failed to clear milestones:', error);
    }
  }
}

export const milestoneService = new MilestoneService();
