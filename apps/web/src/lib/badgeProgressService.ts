/**
 * BadgeProgressService
 * Calculates progress toward earning badges
 */

import { Badge, BadgeProgress } from './badge-types';
import { BADGE_CATALOG } from './badgeCatalog';
import { badgeAwardService } from './badgeAwardService';
import { statsAggregationService } from './statsAggregationService';
import { matchService } from './matchService';
import { SportType } from './location-types';

class BadgeProgressService {
  /**
   * Get progress toward a specific badge
   */
  public getProgress(userId: string, badgeId: string): BadgeProgress | null {
    const badge = BADGE_CATALOG.find((b) => b.id === badgeId);
    if (!badge) return null;

    const earned = badgeAwardService.hasEarnedBadge(userId, badgeId);

    if (earned) {
      return {
        badgeId,
        userId,
        earned: true,
        currentProgress: badge.criteria.threshold,
        threshold: badge.criteria.threshold,
        percentage: 100,
      };
    }

    const currentProgress = this.calculateProgress(userId, badge);
    const percentage = Math.min(
      100,
      Math.round((currentProgress / badge.criteria.threshold) * 100)
    );

    return {
      badgeId,
      userId,
      earned: false,
      currentProgress,
      threshold: badge.criteria.threshold,
      percentage,
    };
  }

  /**
   * Get progress for all badges
   */
  public getAllProgress(userId: string): BadgeProgress[] {
    return BADGE_CATALOG.map((badge) => {
      const progress = this.getProgress(userId, badge.id);
      return progress || {
        badgeId: badge.id,
        userId,
        earned: false,
        currentProgress: 0,
        threshold: badge.criteria.threshold,
        percentage: 0,
      };
    });
  }

  /**
   * Calculate current progress for a badge
   */
  private calculateProgress(userId: string, badge: Badge): number {
    const criteria = badge.criteria;

    switch (criteria.type) {
      case 'matchCount':
        return this.getMatchCount(userId, criteria.sport);
      case 'statTotal':
        return this.getStatTotal(userId, criteria.sport, criteria.statKey);
      case 'winStreak':
        return this.getWinCount(userId, criteria.sport);
      case 'locationMatches':
        return 0; // Can't calculate without specific location
      case 'social':
        return this.getSocialConnections(userId);
      case 'referral':
        return this.getReferralCount(userId);
      case 'singleGameStat':
        return 0; // Single game achievements aren't progressive
      default:
        return 0;
    }
  }

  /**
   * Get match count for a sport
   */
  private getMatchCount(userId: string, sport?: string): number {
    const stats = sport
      ? statsAggregationService.getUserStats(userId, sport as SportType)
      : this.getAggregatedStatsForUser(userId);

    if (!stats) return 0;

    if ('totals' in stats) {
      return stats.totals.gamesPlayed || 0;
    }

    return (stats as any).gamesPlayed || 0;
  }

  /**
   * Get stat total for a user
   */
  private getStatTotal(userId: string, sport?: string, statKey?: string): number {
    if (!statKey) return 0;

    const stats = sport
      ? statsAggregationService.getUserStats(userId, sport as SportType)
      : this.getAggregatedStatsForUser(userId);

    if (!stats) return 0;

    if ('totals' in stats) {
      const key = statKey as keyof typeof stats.totals;
      return (stats.totals[key] as number) || 0;
    }

    return (stats as any)[statKey] || 0;
  }

  /**
   * Get win count for a sport
   */
  private getWinCount(userId: string, sport?: string): number {
    const stats = sport
      ? statsAggregationService.getUserStats(userId, sport as SportType)
      : this.getAggregatedStatsForUser(userId);

    if (!stats) return 0;

    if ('totals' in stats) {
      return stats.totals.wins;
    }

    return (stats as any).wins || 0;
  }

  /**
   * Aggregate stats across all sports for a user
   */
  private getAggregatedStatsForUser(userId: string) {
    const allSports = Object.values(SportType);
    const aggregated = {
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
      personalFouls: 0,
    };

    allSports.forEach((sport: any) => {
      const stats = statsAggregationService.getUserStats(userId, sport);
      if (stats) {
        aggregated.gamesPlayed += stats.totals.gamesPlayed;
        aggregated.wins += stats.totals.wins;
        aggregated.losses += stats.totals.losses;
        aggregated.draws += stats.totals.draws;
        aggregated.points += stats.totals.points;
        aggregated.fieldGoals += stats.totals.fieldGoals;
        aggregated.fieldGoalAttempts += stats.totals.fieldGoalAttempts;
        aggregated.threePointers += stats.totals.threePointers;
        aggregated.threePointAttempts += stats.totals.threePointAttempts;
        aggregated.freeThrows += stats.totals.freeThrows;
        aggregated.freeThrowAttempts += stats.totals.freeThrowAttempts;
        aggregated.rebounds += stats.totals.rebounds;
        aggregated.offensiveRebounds += stats.totals.offensiveRebounds;
        aggregated.defensiveRebounds += stats.totals.defensiveRebounds;
        aggregated.assists += stats.totals.assists;
        aggregated.turnovers += stats.totals.turnovers;
        aggregated.steals += stats.totals.steals;
        aggregated.blocks += stats.totals.blocks;
        aggregated.personalFouls += stats.totals.personalFouls;
      }
    });

    return aggregated;
  }

  /**
   * Get social connections (followers + following)
   */
  private getSocialConnections(userId: string): number {
    try {
      const followers = JSON.parse(localStorage.getItem(`followers_${userId}`) || '[]');
      const following = JSON.parse(localStorage.getItem(`following_${userId}`) || '[]');
      return followers.length + following.length;
    } catch (err) {
      return 0;
    }
  }

  /**
   * Get referral count
   */
  private getReferralCount(userId: string): number {
    try {
      const referrals = JSON.parse(localStorage.getItem(`referrals_${userId}`) || '[]');
      return referrals.length;
    } catch (err) {
      return 0;
    }
  }

  /**
   * Get badges by progress status
   */
  public getBadgesByStatus(
    userId: string,
    status: 'earned' | 'inProgress' | 'locked'
  ): Badge[] {
    const progress = this.getAllProgress(userId);

    return BADGE_CATALOG.filter((badge) => {
      const badgeProgress = progress.find((p) => p.badgeId === badge.id);
      if (!badgeProgress) return false;

      if (status === 'earned') return badgeProgress.earned;
      if (status === 'inProgress') return !badgeProgress.earned && badgeProgress.percentage > 0;
      if (status === 'locked') return !badgeProgress.earned && badgeProgress.percentage === 0;

      return false;
    });
  }
}

export const badgeProgressService = new BadgeProgressService();
