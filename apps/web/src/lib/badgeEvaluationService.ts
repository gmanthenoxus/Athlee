/**
 * BadgeEvaluationService
 * Evaluates badge conditions and determines if a user has earned a badge
 */

import { Badge, BadgeCriteria, BadgeEvent } from './badge-types';
import { BADGE_CATALOG } from './badgeCatalog';
import { statsAggregationService } from './statsAggregationService';
import { matchService } from './matchService';
import { statEntryService } from './statEntryService';
import { badgeAwardService } from './badgeAwardService';
import { SportType } from './location-types';

class BadgeEvaluationService {
  /**
   * Evaluate all badges for a user based on an event
   */
  public evaluateUserBadges(userId: string, event: BadgeEvent): void {
    try {
      // Get badges user hasn't earned yet
      const earnedBadgeIds = badgeAwardService.getUserEarnedBadgeIds(userId);
      const unearnedBadges = BADGE_CATALOG.filter((b) => !earnedBadgeIds.includes(b.id));

      // Evaluate each unearned badge
      unearnedBadges.forEach((badge) => {
        if (this.evaluateBadge(userId, badge, event)) {
          // Award the badge!
          badgeAwardService.awardBadge(userId, badge.id, {
            matchId: event.matchId,
            locationId: event.locationId,
          });
        }
      });
    } catch (err) {
      console.error('Failed to evaluate badges:', err);
    }
  }

  /**
   * Evaluate a single badge for a user
   */
  private evaluateBadge(userId: string, badge: Badge, event: BadgeEvent): boolean {
    const criteria = badge.criteria;

    switch (criteria.type) {
      case 'matchCount':
        return this.evaluateMatchCount(userId, criteria);
      case 'statTotal':
        return this.evaluateStatTotal(userId, criteria);
      case 'winStreak':
        return this.evaluateWinStreak(userId, criteria);
      case 'singleGameStat':
        return this.evaluateSingleGameStat(userId, criteria, event);
      case 'locationMatches':
        return this.evaluateLocationMatches(userId, criteria, event);
      case 'social':
        return this.evaluateSocial(userId, criteria);
      case 'referral':
        return this.evaluateReferral(userId, criteria);
      default:
        return false;
    }
  }

  /**
   * Evaluate match count criterion
   */
  private evaluateMatchCount(userId: string, criteria: BadgeCriteria): boolean {
    if (criteria.sport) {
      const stats = statsAggregationService.getUserStats(userId, criteria.sport as any);
      if (!stats) return false;
      return stats.totals.gamesPlayed >= criteria.threshold;
    }

    // Get all stats if no specific sport
    const aggregated = this.getAggregatedStats(userId);
    return aggregated.gamesPlayed >= criteria.threshold;
  }

  /**
   * Evaluate stat total criterion
   */
  private evaluateStatTotal(userId: string, criteria: BadgeCriteria): boolean {
    if (!criteria.statKey) return false;

    let stats;
    if (criteria.sport) {
      stats = statsAggregationService.getUserStats(userId, criteria.sport as any);
    } else {
      // Aggregate across all sports if no specific sport
      stats = this.getAggregatedStats(userId);
    }

    if (!stats) return false;

    // Handle both aggregated (flat) and regular (with totals) stat objects
    let statValue = 0;
    if ('totals' in stats) {
      // Regular stats object from getUserStats
      statValue = ((stats as any).totals?.[criteria.statKey] as number) || 0;
    } else {
      // Aggregated stats object (flat structure)
      statValue = (stats as any)[criteria.statKey] || 0;
    }

    const operator = criteria.operator || 'gte';

    if (operator === 'gte') return statValue >= criteria.threshold;
    if (operator === 'eq') return statValue === criteria.threshold;
    if (operator === 'lte') return statValue <= criteria.threshold;
    return false;
  }

  /**
   * Evaluate win streak criterion
   */
  private evaluateWinStreak(userId: string, criteria: BadgeCriteria): boolean {
    if (!criteria.sport) {
      // Aggregate wins across all sports if no specific sport
      const aggregated = this.getAggregatedStats(userId);
      return aggregated.wins >= criteria.threshold;
    }

    const stats = statsAggregationService.getUserStats(userId, criteria.sport as any);
    if (!stats) return false;

    // For "first_win", check if winRate > 0
    if (criteria.threshold === 1) {
      return stats.totals.wins >= 1;
    }

    // For higher streaks, check if wins >= threshold
    return stats.totals.wins >= criteria.threshold;
  }

  /**
   * Evaluate single-game stat criterion
   * Requires checking a specific match's stats, not aggregated
   */
  private evaluateSingleGameStat(userId: string, criteria: BadgeCriteria, event: BadgeEvent): boolean {
    if (event.type !== 'match' || !event.matchId) return false;

    // Get the match stats
    const matchStats = statEntryService.getMatchStats(event.matchId);
    if (!matchStats) return false;

    // Find user's stats in this match
    const userStats = matchStats.playerStats?.find((s) => s.playerId === userId);
    if (!userStats || !userStats.values) return false;

    if (criteria.achievementType === 'doubleDouble') {
      return this.checkDoubleDouble(userStats.values);
    }
    if (criteria.achievementType === 'tripleDouble') {
      return this.checkTripleDouble(userStats.values);
    }
    if (criteria.achievementType === '50PointGame') {
      return this.checkHighScoring(userStats.values, 50);
    }
    if (criteria.achievementType === 'firstThreePointer') {
      return (userStats.values['threePointers'] || userStats.values['3PM'] || 0) >= 1;
    }
    if (criteria.achievementType === 'perfectGame') {
      return this.checkPerfectGame(userStats.values);
    }

    return false;
  }

  /**
   * Check if stats qualify as double-double (10+ in 2 categories)
   */
  private checkDoubleDouble(stats: Record<string, number>): boolean {
    const doubleStats = [
      (stats.points || stats.PTS || 0) >= 10,
      (stats.rebounds || stats.REB || 0) >= 10,
      (stats.assists || stats.AST || 0) >= 10,
      (stats.steals || stats.STL || 0) >= 10,
      (stats.blocks || stats.BLK || 0) >= 10,
    ].filter(Boolean).length;
    return doubleStats >= 2;
  }

  /**
   * Check if stats qualify as triple-double (10+ in 3 categories)
   */
  private checkTripleDouble(stats: Record<string, number>): boolean {
    const doubleStats = [
      (stats.points || stats.PTS || 0) >= 10,
      (stats.rebounds || stats.REB || 0) >= 10,
      (stats.assists || stats.AST || 0) >= 10,
      (stats.steals || stats.STL || 0) >= 10,
      (stats.blocks || stats.BLK || 0) >= 10,
    ].filter(Boolean).length;
    return doubleStats >= 3;
  }

  /**
   * Check if player scored high threshold
   */
  private checkHighScoring(stats: Record<string, number>, threshold: number): boolean {
    return (stats.points || stats.PTS || 0) >= threshold;
  }

  /**
   * Check if game was perfect (no turnovers, no fouls)
   */
  private checkPerfectGame(stats: Record<string, number>): boolean {
    return (stats.turnovers || stats.TO || 0) === 0 && (stats.fouls || stats.PF || 0) === 0;
  }

  /**
   * Evaluate location matches criterion
   */
  private evaluateLocationMatches(userId: string, criteria: BadgeCriteria, event: BadgeEvent): boolean {
    if (!event.locationId) return false;

    // Count matches played at this location
    const allMatches = matchService.getAllMatches();
    const locationMatches = allMatches.filter((m) => {
      const userInMatch = [...(m.teams[0]?.players || []), ...(m.teams[1]?.players || [])].some(
        (p) => p.userId === userId
      );
      return userInMatch && m.locationId === event.locationId && m.status === 'Completed';
    });

    return locationMatches.length >= criteria.threshold;
  }

  /**
   * Evaluate social criterion
   * For now, stubbed - would need friend/follow data
   */
  private evaluateSocial(userId: string, criteria: BadgeCriteria): boolean {
    try {
      const followers = JSON.parse(localStorage.getItem(`followers_${userId}`) || '[]');
      const following = JSON.parse(localStorage.getItem(`following_${userId}`) || '[]');

      // Check follower/friend count
      const totalConnections = followers.length + following.length;
      return totalConnections >= criteria.threshold;
    } catch (err) {
      return false;
    }
  }

  /**
   * Evaluate referral criterion
   * Stubbed - would need referral tracking
   */
  private evaluateReferral(userId: string, criteria: BadgeCriteria): boolean {
    try {
      const referrals = JSON.parse(localStorage.getItem(`referrals_${userId}`) || '[]');
      return referrals.length >= criteria.threshold;
    } catch (err) {
      return false;
    }
  }

  /**
   * Get aggregated stats across all sports for a user
   */
  private getAggregatedStats(userId: string) {
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
}

export const badgeEvaluationService = new BadgeEvaluationService();
