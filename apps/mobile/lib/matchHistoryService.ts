/**
 * MatchHistoryService (Mobile)
 * Queries and filters user's match history
 */

import { MatchHistoryEntry, MatchHistoryFilter } from './leaderboard-types';
import { Match, MatchStatus } from './match-types';
import { matchService } from './matchService';
import { statEntryService } from './statEntryService';

class MatchHistoryService {
  /**
   * Get user's matches with optional filtering and sorting
   */
  public getUserMatches(userId: string, filters?: MatchHistoryFilter): MatchHistoryEntry[] {
    const allMatches = matchService.getAllMatches();

    // Filter only completed matches where user is a player
    let userMatches = allMatches.filter((match) => {
      if (match.status !== MatchStatus.Completed) return false;

      // Check if user is in either team
      const isInTeamA = match.teams[0]?.players.some((p) => p.userId === userId);
      const isInTeamB = match.teams[1]?.players.some((p) => p.userId === userId);

      return isInTeamA || isInTeamB;
    });

    // Apply filters
    if (filters?.sport) {
      userMatches = userMatches.filter((m) => m.sport === filters.sport);
    }

    if (filters?.locationId) {
      userMatches = userMatches.filter((m) => m.location?.id === filters.locationId);
    }

    if (filters?.dateFrom || filters?.dateTo) {
      userMatches = userMatches.filter((match) => {
        const matchDate = new Date(match.scheduledDate);
        if (filters.dateFrom) {
          const dateFrom = new Date(filters.dateFrom);
          if (matchDate < dateFrom) return false;
        }
        if (filters.dateTo) {
          const dateTo = new Date(filters.dateTo);
          if (matchDate > dateTo) return false;
        }
        return true;
      });
    }

    if (filters?.result) {
      userMatches = userMatches.filter((match) => {
        const entry = this.convertToMatchHistoryEntry(userId, match);
        return entry.result === filters.result;
      });
    }

    // Convert to history entries
    const historyEntries = userMatches.map((match) => this.convertToMatchHistoryEntry(userId, match));

    // Sort
    const sortBy = filters?.sortBy || 'date';
    const sortOrder = filters?.sortOrder || 'desc';
    const sorted = [...historyEntries].sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'date': {
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        }
        case 'score': {
          const aScore = a.teams[0]?.score || 0;
          const bScore = b.teams[0]?.score || 0;
          compareValue = aScore - bScore;
          break;
        }
        case 'points': {
          compareValue = (a.userStats?.points || 0) - (b.userStats?.points || 0);
          break;
        }
        default:
          compareValue = 0;
      }

      return sortOrder === 'desc' ? -compareValue : compareValue;
    });

    return sorted;
  }

  /**
   * Convert a Match to a MatchHistoryEntry
   */
  public convertToMatchHistoryEntry(userId: string, match: Match): MatchHistoryEntry {
    const stats = statEntryService.getMatchStats(match.id);

    // Find which team user is on
    const isTeamA = match.teams[0]?.players.some((p) => p.userId === userId);
    const userTeamIndex = isTeamA ? 0 : 1;
    const opponentTeamIndex = userTeamIndex === 0 ? 1 : 0;

    // Get user's player stats
    const userPlayerIndex = (match.teams[userTeamIndex]?.players || []).findIndex((p) => p.userId === userId);
    const userPlayerStats = stats?.playerStats[userTeamIndex * 5 + userPlayerIndex]; // Assuming max 5 players per team

    // Determine result based on final score
    let result: 'win' | 'loss' | 'draw' = 'draw';
    if (stats?.finalScore) {
      const userTeamScore = userTeamIndex === 0 ? stats.finalScore.teamA : stats.finalScore.teamB;
      const oppTeamScore = userTeamIndex === 0 ? stats.finalScore.teamB : stats.finalScore.teamA;

      if (userTeamScore > oppTeamScore) result = 'win';
      else if (userTeamScore < oppTeamScore) result = 'loss';
    }

    return {
      matchId: match.id,
      date: match.date,
      sport: match.sport,
      locationId: match.locationId,
      locationName: undefined, // TODO: fetch location name if needed
      teamAName: match.teams[0]?.name || 'Team A',
      teamBName: match.teams[1]?.name || 'Team B',
      teamAScore: stats?.finalScore?.teamA || 0,
      teamBScore: stats?.finalScore?.teamB || 0,
      userTeam: userTeamIndex === 0 ? 'A' : 'B',
      userPoints: userPlayerStats?.values['points'],
      userRebounds: userPlayerStats?.values['rebounds'],
      userAssists: userPlayerStats?.values['assists'],
      result
    };
  }

  /**
   * Get summary stats for a user (total games, wins, etc.)
   */
  public getUserMatchStats(userId: string): {
    totalMatches: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
  } {
    const matches = this.getUserMatches(userId);

    const stats = {
      totalMatches: matches.length,
      wins: 0,
      losses: 0,
      draws: 0,
      winRate: 0
    };

    matches.forEach((match) => {
      if (match.result === 'win') stats.wins++;
      else if (match.result === 'loss') stats.losses++;
      else stats.draws++;
    });

    stats.winRate = stats.totalMatches > 0 ? stats.wins / stats.totalMatches : 0;

    return stats;
  }
}

export const matchHistoryService = new MatchHistoryService();
