import {
  Match,
  MatchType,
  MatchMode,
  MatchStatus,
  Team,
  MatchPlayer,
  MatchRules,
  ScoringSystem,
  MatchScore,
  MatchFilters,
  PlayerSuggestion
} from './match-types';
import { SportType } from './location-types';
import { generateMockMatches, generateMockPlayerSuggestions } from './mockMatches';
import { initializeMockStats } from './mockStatData';

/**
 * MatchService - Handles all match-related operations
 * Data is persisted in localStorage under the "athlee_matches" key
 */
class MatchService {
  private readonly STORAGE_KEY = 'athlee_matches';
  private initialized = false;

  /**
   * Initialize mock data if storage is empty
   */
  public initializeMockData(): void {
    if (this.initialized || typeof window === 'undefined') return;

    try {
      const matches = this.getAllMatches();

      // Only initialize if empty
      if (matches.length === 0) {
        const mockMatches = generateMockMatches();
        this.saveMatches(mockMatches);
      }

      // Initialize mock stats for completed matches
      const allMatches = this.getAllMatches();
      const completedMatches = allMatches.filter((m) => m.status === MatchStatus.Completed);
      initializeMockStats(completedMatches);

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize mock match data:', error);
    }
  }

  /**
   * Get all matches from storage
   */
  public getAllMatches(): Match[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save matches to storage
   */
  private saveMatches(matches: Match[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(matches));
    } catch (error) {
      console.error('Failed to save matches:', error);
    }
  }

  /**
   * Create a new match
   */
  public createMatch(matchData: Partial<Match>): Match {
    const matches = this.getAllMatches();

    const newMatch: Match = {
      id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sport: matchData.sport || SportType.Basketball,
      type: matchData.type || MatchType.Single,
      mode: matchData.mode || MatchMode.Casual,
      status: matchData.status || MatchStatus.Scheduled,
      date: matchData.date || new Date().toISOString(),
      locationId: matchData.locationId,
      privacy: matchData.privacy || 'public',
      createdBy: matchData.createdBy || 'unknown',
      teams: matchData.teams || [],
      rules: matchData.rules || this.getDefaultRules(),
      schedule: matchData.schedule,
      score: matchData.score,
      notes: matchData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    matches.push(newMatch);
    this.saveMatches(matches);

    return newMatch;
  }

  /**
   * Update an existing match
   */
  public updateMatch(matchId: string, updates: Partial<Match>): Match | null {
    const matches = this.getAllMatches();
    const index = matches.findIndex((m) => m.id === matchId);

    if (index === -1) return null;

    const updated: Match = {
      ...matches[index],
      ...updates,
      id: matchId,
      updatedAt: new Date().toISOString()
    };

    matches[index] = updated;
    this.saveMatches(matches);

    return updated;
  }

  /**
   * Get a single match by ID
   */
  public getMatch(matchId: string): Match | null {
    const matches = this.getAllMatches();
    return matches.find((m) => m.id === matchId) || null;
  }

  /**
   * Get matches with optional filters
   */
  public getMatches(filters?: MatchFilters): Match[] {
    let matches = this.getAllMatches();

    if (!filters) return matches;

    // Filter by user participation
    if (filters.userId) {
      matches = matches.filter(
        (m) =>
          m.createdBy === filters.userId ||
          m.teams.some((t) =>
            t.players.some((p) => p.userId === filters.userId)
          )
      );
    }

    // Filter by creator
    if (filters.createdBy) {
      matches = matches.filter((m) => m.createdBy === filters.createdBy);
    }

    // Filter by sport
    if (filters.sport) {
      matches = matches.filter((m) => m.sport === filters.sport);
    }

    // Filter by status
    if (filters.status) {
      matches = matches.filter((m) => m.status === filters.status);
    }

    // Filter by location
    if (filters.locationId) {
      matches = matches.filter((m) => m.locationId === filters.locationId);
    }

    // Filter by date range
    if (filters.from) {
      matches = matches.filter((m) => new Date(m.date) >= new Date(filters.from!));
    }

    if (filters.to) {
      matches = matches.filter((m) => new Date(m.date) <= new Date(filters.to!));
    }

    return matches;
  }

  /**
   * Delete a match (creator only - not enforced here)
   */
  public deleteMatch(matchId: string): boolean {
    const matches = this.getAllMatches();
    const filtered = matches.filter((m) => m.id !== matchId);

    if (filtered.length === matches.length) return false;

    this.saveMatches(filtered);
    return true;
  }

  /**
   * Log match result (complete a match with score)
   */
  public logMatchResult(matchId: string, score: MatchScore): Match | null {
    const match = this.getMatch(matchId);
    if (!match) return null;

    // Determine winner
    let winner: 'A' | 'B' | undefined;
    if (score.teamAScore > score.teamBScore) {
      winner = 'A';
    } else if (score.teamBScore > score.teamAScore) {
      winner = 'B';
    }

    return this.updateMatch(matchId, {
      status: MatchStatus.Completed,
      score: {
        ...score,
        winner
      }
    });
  }

  /**
   * Start a live match
   */
  public startLiveMatch(matchId: string): Match | null {
    return this.updateMatch(matchId, {
      status: MatchStatus.InProgress,
      date: new Date().toISOString()
    });
  }

  /**
   * Get default rules for a sport/type combination
   */
  public getDefaultRules(sport?: SportType, type?: MatchType): MatchRules {
    // Customize defaults by sport
    let pointsToWin = 21;
    let scoringSystem = ScoringSystem.Standard;

    if (sport === SportType.Tennis) {
      pointsToWin = 6;
      scoringSystem = ScoringSystem.SetBased;
    } else if (sport === SportType.Volleyball) {
      pointsToWin = 25;
      scoringSystem = ScoringSystem.PointBased;
    } else if (sport === SportType.Badminton) {
      pointsToWin = 21;
      scoringSystem = ScoringSystem.PointBased;
    }

    return {
      scoringSystem,
      pointsToWin,
      winByTwo: true,
      maxDuration: 120
    };
  }

  /**
   * Validate match data before creation
   */
  public validateMatch(matchData: Partial<Match>): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!matchData.sport) {
      errors.sport = 'Sport is required';
    }

    if (!matchData.type) {
      errors.type = 'Match type is required';
    }

    if (!matchData.teams || matchData.teams.length < 2) {
      errors.teams = 'At least 2 teams are required';
    }

    // Validate each team has players
    if (matchData.teams) {
      matchData.teams.forEach((team, index) => {
        if (!team.players || team.players.length === 0) {
          errors[`team_${index}`] = `Team ${team.name || index + 1} must have at least one player`;
        }

        // For competitive, check jersey numbers
        if (matchData.mode === MatchMode.Competitive) {
          team.players.forEach((player, pIndex) => {
            if (!player.jerseyNo) {
              errors[`jersey_${index}_${pIndex}`] = `Jersey number required for ${player.name}`;
            }
          });
        }
      });
    }

    return errors;
  }
}

export const matchService = new MatchService();
