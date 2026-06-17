/**
 * MatchHistoryService
 * Queries user's match history with filters and sorting
 */

import {
  MatchHistoryEntry,
  MatchHistoryFilter
} from './leaderboard-types';
import { matchService } from './matchService';
import { statEntryService } from './statEntryService';
import { Match, MatchStatus } from './match-types';

class MatchHistoryService {
  /**
   * Get all matches for a user (as participant or creator)
   */
  public getUserMatches(userId: string, filters?: MatchHistoryFilter): MatchHistoryEntry[] {
    const allMatches = matchService.getAllMatches();

    // Filter for matches where user participated
    const userMatches = allMatches.filter((match) => {
      // Check if user is a player in the match
      const isPlayer = match.teams.some((team) =>
        team.players.some((player) => player.userId === userId)
      );

      // Check if user is the creator
      const isCreator = match.createdBy === userId;

      return isPlayer || isCreator;
    });

    // Apply additional filters
    let filtered = userMatches;

    if (filters?.sport) {
      filtered = filtered.filter((m) => m.sport === filters.sport);
    }

    if (filters?.locationId) {
      filtered = filtered.filter((m) => m.locationId === filters.locationId);
    }

    if (filters?.dateFrom) {
      const dateFrom = new Date(filters.dateFrom);
      filtered = filtered.filter((m) => new Date(m.date) >= dateFrom);
    }

    if (filters?.dateTo) {
      const dateTo = new Date(filters.dateTo);
      filtered = filtered.filter((m) => new Date(m.date) <= dateTo);
    }

    // Convert to match history entries
    const entries = filtered.map((match) =>
      this.convertToMatchHistoryEntry(userId, match)
    );

    // Sort
    if (filters?.sortBy === 'date') {
      entries.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return filters.sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      });
    } else if (filters?.sortBy === 'score') {
      entries.sort((a, b) => {
        const aDiff = Math.abs(a.teamAScore - a.teamBScore);
        const bDiff = Math.abs(b.teamAScore - b.teamBScore);
        return filters.sortOrder === 'asc' ? aDiff - bDiff : bDiff - aDiff;
      });
    } else if (filters?.sortBy === 'points') {
      entries.sort((a, b) => {
        const aPoints = a.userPoints || 0;
        const bPoints = b.userPoints || 0;
        return filters.sortOrder === 'asc' ? aPoints - bPoints : bPoints - aPoints;
      });
    } else {
      // Default: sort by date, newest first
      entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Apply result filter at the end
    if (filters?.result) {
      return entries.filter((entry) => entry.result === filters.result);
    }

    return entries;
  }

  /**
   * Convert a match to a match history entry
   */
  private convertToMatchHistoryEntry(userId: string, match: Match): MatchHistoryEntry {
    // Find which team the user is on
    let userTeam: 'A' | 'B' = 'A';
    for (let i = 0; i < match.teams.length; i++) {
      if (match.teams[i].players.some((p) => p.userId === userId)) {
        userTeam = i === 0 ? 'A' : 'B';
        break;
      }
    }

    // Get stats
    const stats = statEntryService.getMatchStats(match.id);
    const userPlayer = userTeam === 'A'
      ? match.teams[0]?.players.find((p) => p.userId === userId)
      : match.teams[1]?.players.find((p) => p.userId === userId);

    let userPoints = 0;
    let userRebounds = 0;
    let userAssists = 0;

    if (stats && userPlayer) {
      const userStatIndex = userTeam === 'A'
        ? match.teams[0].players.indexOf(userPlayer)
        : match.teams[0].players.length + match.teams[1].players.indexOf(userPlayer);

      const playerStats = stats.playerStats[userStatIndex];
      if (playerStats) {
        userPoints = playerStats.values['points'] || 0;
        userRebounds = playerStats.values['rebounds'] || 0;
        userAssists = playerStats.values['assists'] || 0;
      }
    }

    // Determine result
    let result: 'win' | 'loss' | 'draw' = 'draw';
    if (stats?.finalScore) {
      if (userTeam === 'A') {
        if (stats.finalScore.teamA > stats.finalScore.teamB) result = 'win';
        else if (stats.finalScore.teamA < stats.finalScore.teamB) result = 'loss';
      } else {
        if (stats.finalScore.teamB > stats.finalScore.teamA) result = 'win';
        else if (stats.finalScore.teamB < stats.finalScore.teamA) result = 'loss';
      }
    }

    return {
      matchId: match.id,
      date: match.date,
      sport: match.sport,
      locationId: match.locationId,
      locationName: match.locationId, // TODO: Get from location service
      teamAName: match.teams[0]?.name || 'Team A',
      teamBName: match.teams[1]?.name || 'Team B',
      teamAScore: stats?.finalScore?.teamA || 0,
      teamBScore: stats?.finalScore?.teamB || 0,
      userTeam,
      userPoints,
      userRebounds,
      userAssists,
      result,
      matchType: match.type,
      mode: match.mode
    };
  }

  /**
   * Get match history summary stats for a user
   */
  public getUserMatchStats(userId: string): {
    totalMatches: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
  } {
    const matches = this.getUserMatches(userId);
    const wins = matches.filter((m) => m.result === 'win').length;
    const losses = matches.filter((m) => m.result === 'loss').length;
    const draws = matches.filter((m) => m.result === 'draw').length;

    return {
      totalMatches: matches.length,
      wins,
      losses,
      draws,
      winRate: matches.length > 0 ? wins / matches.length : 0
    };
  }
}

export const matchHistoryService = new MatchHistoryService();
