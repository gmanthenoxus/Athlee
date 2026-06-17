/**
 * Court Regulars System
 * 
 * Assigns membership tiers to regular players at specific courts/locations:
 * - Newbie → Regular → VIP → Legend
 * - Based on matches played, wins, and rating at that specific location
 * - Integrates user data, location data, and location-specific performance
 * - Automatically updated from match results
 */

import { getAllComprehensiveMatches, getMatchesByLocation } from './mockMatchesComprehensive';
import { getAllPlayerUsers } from './mockUsersComprehensive';
import { getAllComprehensiveLocations } from './mockLocationsComprehensive';
import { userStatsService } from './userStatsService';

/**
 * Court Regular Tier Enum
 */
export enum CourtRegularTier {
  Newbie = 'Newbie',           // 0-2 matches
  Regular = 'Regular',         // 3-10 matches
  VIP = 'VIP',                 // 11-25 matches
  Legend = 'Legend'            // 26+ matches
}

/**
 * Court Regular Entry - User's membership at a specific court
 */
export interface CourtRegular {
  userId: string;
  username: string;
  locationId: string;
  locationName: string;
  tier: CourtRegularTier;
  matchesPlayed: number;
  matchesWon: number;
  winRate: number;              // 0-100
  avgRating: number;            // 1-5
  totalXPEarned: number;        // XP from this court
  lastPlayedAt: string;         // ISO timestamp
  joinedAt: string;             // ISO timestamp when first played
  rank?: number;                // Rank at this court among all regulars
}

/**
 * Court Stats - aggregate stats for a location
 */
export interface CourtStats {
  locationId: string;
  locationName: string;
  totalRegulars: number;
  legendCount: number;
  vipCount: number;
  regularCount: number;
  newbieCount: number;
  totalMatchesPlayed: number;
  avgWinRate: number;
  topRegular?: CourtRegular;
}

/**
 * Court Regulars Service
 */
class CourtRegularsService {
  private readonly STORAGE_KEY_REGULARS = 'athlee_court_regulars';
  private readonly STORAGE_KEY_COURT_STATS = 'athlee_court_stats';

  /**
   * Determine tier based on matches played
   */
  private determineTier(matchesPlayed: number): CourtRegularTier {
    if (matchesPlayed >= 26) return CourtRegularTier.Legend;
    if (matchesPlayed >= 11) return CourtRegularTier.VIP;
    if (matchesPlayed >= 3) return CourtRegularTier.Regular;
    return CourtRegularTier.Newbie;
  }

  /**
   * Calculate court regulars for a specific location
   */
  public calculateCourtRegulars(locationId: string): CourtRegular[] {
    try {
      const allMatches = getAllComprehensiveMatches();
      const location = getAllComprehensiveLocations().find(l => l.id === locationId);
      
      if (!location) {
        console.warn(`Location not found: ${locationId}`);
        return [];
      }

      // Get all matches at this location
      const courtMatches = allMatches.filter(m => m.locationId === locationId && m.status === 'Completed');

      if (courtMatches.length === 0) {
        return [];
      }

      // Track player performance at this court
      const playerStats = new Map<string, {
        username: string;
        matchesPlayed: number;
        matchesWon: number;
        ratings: number[];
        xpEarned: number;
        lastPlayed: Date;
        firstPlayed: Date;
      }>();

      const allPlayers = getAllPlayerUsers();
      const playerMap = new Map(allPlayers.map(p => [p.id, p]));

      // Process each completed match
      courtMatches.forEach(match => {
        match.teams.forEach(team => {
          team.players.forEach(player => {
            if (!playerStats.has(player.userId!)) {
              const userInfo = playerMap.get(player.userId!);
              playerStats.set(player.userId!, {
                username: userInfo?.username || player.name,
                matchesPlayed: 0,
                matchesWon: 0,
                ratings: [],
                xpEarned: 0,
                lastPlayed: new Date(match.date),
                firstPlayed: new Date(match.date),
              });
            }

            const stats = playerStats.get(player.userId!)!;
            stats.matchesPlayed++;

            // Check if this team won
            if (match.score) {
              const teamIndex = match.teams.indexOf(team);
              const teamScore = teamIndex === 0 ? match.score.teamAScore : match.score.teamBScore;
              const otherScore = teamIndex === 0 ? match.score.teamBScore : match.score.teamAScore;

              if (teamScore > otherScore) {
                stats.matchesWon++;
              }
            }

            // Get player's average rating from their stats
            const userStats = userStatsService.getUserStats(player.userId!);
            if (userStats && userStats.sportStats) {
              // Calculate average rating across all sports
              const ratings = Object.values(userStats.sportStats)
                .map(sport => sport.rating)
                .filter(r => r > 0);
              if (ratings.length > 0) {
                stats.ratings.push(ratings.reduce((a, b) => a + b, 0) / ratings.length);
              }
            }

            // Update activity dates
            const matchDate = new Date(match.date);
            if (matchDate > stats.lastPlayed) {
              stats.lastPlayed = matchDate;
            }
            if (matchDate < stats.firstPlayed) {
              stats.firstPlayed = matchDate;
            }
          });
        });
      });

      // Convert to CourtRegular entries
      const regulars: CourtRegular[] = Array.from(playerStats.entries()).map(
        ([userId, stats]) => {
          const tier = this.determineTier(stats.matchesPlayed);
          const winRate = stats.matchesPlayed > 0 ? (stats.matchesWon / stats.matchesPlayed) * 100 : 0;
          const avgRating = stats.ratings.length > 0 
            ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length 
            : 0;

          return {
            userId,
            username: stats.username,
            locationId,
            locationName: location.name,
            tier,
            matchesPlayed: stats.matchesPlayed,
            matchesWon: stats.matchesWon,
            winRate: Math.round(winRate * 10) / 10,
            avgRating: Math.round(avgRating * 10) / 10,
            totalXPEarned: stats.xpEarned,
            lastPlayedAt: stats.lastPlayed.toISOString(),
            joinedAt: stats.firstPlayed.toISOString(),
          };
        }
      );

      // Sort by tier (Legend → VIP → Regular → Newbie) then by matches played
      const tierOrder = { [CourtRegularTier.Legend]: 0, [CourtRegularTier.VIP]: 1, [CourtRegularTier.Regular]: 2, [CourtRegularTier.Newbie]: 3 };
      regulars.sort((a, b) => {
        const tierDiff = tierOrder[a.tier] - tierOrder[b.tier];
        if (tierDiff !== 0) return tierDiff;
        return b.matchesPlayed - a.matchesPlayed;
      });

      // Assign ranks within tier
      let currentRank = 1;
      let currentTier = regulars[0]?.tier;
      regulars.forEach((regular, idx) => {
        if (regular.tier !== currentTier) {
          currentRank = 1;
          currentTier = regular.tier;
        }
        regular.rank = currentRank++;
      });

      // Cache results
      this.cacheCourtRegulars(locationId, regulars);
      return regulars;
    } catch (error) {
      console.error(`Failed to calculate court regulars for ${locationId}:`, error);
      return [];
    }
  }

  /**
   * Get court regulars for a location (cached)
   */
  public getCourtRegulars(locationId: string): CourtRegular[] {
    try {
      const cached = localStorage.getItem(`${this.STORAGE_KEY_REGULARS}:${locationId}`);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error('Failed to retrieve cached court regulars:', error);
    }

    return this.calculateCourtRegulars(locationId);
  }

  /**
   * Get court regulars for a user (all courts they're regulars at)
   */
  public getUserCourtRegulars(userId: string): CourtRegular[] {
    try {
      const locations = getAllComprehensiveLocations();
      const userRegulars: CourtRegular[] = [];

      locations.forEach(location => {
        const regulars = this.getCourtRegulars(location.id);
        const userRegular = regulars.find(r => r.userId === userId);
        if (userRegular) {
          userRegulars.push(userRegular);
        }
      });

      // Sort by tier supremacy (Legend > VIP > Regular > Newbie) then matches played
      const tierOrder = { [CourtRegularTier.Legend]: 0, [CourtRegularTier.VIP]: 1, [CourtRegularTier.Regular]: 2, [CourtRegularTier.Newbie]: 3 };
      userRegulars.sort((a, b) => {
        const tierDiff = tierOrder[a.tier] - tierOrder[b.tier];
        if (tierDiff !== 0) return tierDiff;
        return b.matchesPlayed - a.matchesPlayed;
      });

      return userRegulars;
    } catch (error) {
      console.error(`Failed to get court regulars for user ${userId}:`, error);
      return [];
    }
  }

  /**
   * Get user's tier at a specific court
   */
  public getUserTierAtCourt(userId: string, locationId: string): CourtRegularTier | null {
    const regulars = this.getCourtRegulars(locationId);
    const userRegular = regulars.find(r => r.userId === userId);
    return userRegular?.tier || null;
  }

  /**
   * Get stats for a court (aggregate)
   */
  public getCourtStats(locationId: string): CourtStats {
    try {
      const location = getAllComprehensiveLocations().find(l => l.id === locationId);
      const regulars = this.getCourtRegulars(locationId);

      if (!regulars.length || !location) {
        return {
          locationId,
          locationName: location?.name || 'Unknown',
          totalRegulars: 0,
          legendCount: 0,
          vipCount: 0,
          regularCount: 0,
          newbieCount: 0,
          totalMatchesPlayed: 0,
          avgWinRate: 0,
        };
      }

      const stats: CourtStats = {
        locationId,
        locationName: location.name,
        totalRegulars: regulars.length,
        legendCount: regulars.filter(r => r.tier === CourtRegularTier.Legend).length,
        vipCount: regulars.filter(r => r.tier === CourtRegularTier.VIP).length,
        regularCount: regulars.filter(r => r.tier === CourtRegularTier.Regular).length,
        newbieCount: regulars.filter(r => r.tier === CourtRegularTier.Newbie).length,
        totalMatchesPlayed: regulars.reduce((sum, r) => sum + r.matchesPlayed, 0),
        avgWinRate: regulars.length > 0
          ? regulars.reduce((sum, r) => sum + r.winRate, 0) / regulars.length
          : 0,
        topRegular: regulars[0],
      };

      stats.avgWinRate = Math.round(stats.avgWinRate * 10) / 10;

      // Cache court stats
      try {
        localStorage.setItem(`${this.STORAGE_KEY_COURT_STATS}:${locationId}`, JSON.stringify(stats));
      } catch (error) {
        console.error('Failed to cache court stats:', error);
      }

      return stats;
    } catch (error) {
      console.error(`Failed to get court stats for ${locationId}:`, error);
      return {
        locationId,
        locationName: 'Unknown',
        totalRegulars: 0,
        legendCount: 0,
        vipCount: 0,
        regularCount: 0,
        newbieCount: 0,
        totalMatchesPlayed: 0,
        avgWinRate: 0,
      };
    }
  }

  /**
   * Get all courts' stats
   */
  public getAllCourtStats(): CourtStats[] {
    const locations = getAllComprehensiveLocations();
    return locations
      .map(loc => this.getCourtStats(loc.id))
      .sort((a, b) => (b.totalRegulars || 0) - (a.totalRegulars || 0));
  }

  /**
   * Cache court regulars to localStorage
   */
  private cacheCourtRegulars(locationId: string, regulars: CourtRegular[]): void {
    try {
      localStorage.setItem(`${this.STORAGE_KEY_REGULARS}:${locationId}`, JSON.stringify(regulars));
    } catch (error) {
      console.error('Failed to cache court regulars:', error);
    }
  }

  /**
   * Refresh all court regulars (recalculate for all locations)
   */
  public refreshAllCourtRegulars(): void {
    try {
      const locations = getAllComprehensiveLocations();
      console.log(`Refreshing court regulars for ${locations.length} locations...`);
      
      locations.forEach(location => {
        this.calculateCourtRegulars(location.id);
      });
      
      console.log('✅ Court regulars refreshed');
    } catch (error) {
      console.error('Failed to refresh court regulars:', error);
    }
  }

  /**
   * Clear all court regulars caches
   */
  public clearCaches(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes(this.STORAGE_KEY_REGULARS) || key.includes(this.STORAGE_KEY_COURT_STATS)) {
          localStorage.removeItem(key);
        }
      });
      console.log('✅ Court regulars caches cleared');
    } catch (error) {
      console.error('Failed to clear court regulars caches:', error);
    }
  }
}

export const courtRegularsService = new CourtRegularsService();
