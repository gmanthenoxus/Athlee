/**
 * Live Match Service (Mobile)
 * TypeScript-only service for managing live match state
 * Platform-agnostic; works with both web and React Native via different UI components
 */

import {
  LiveMatchState,
  LiveMatchConfig,
  LiveMatchClock,
  ShotClockState,
  LiveMatchScores,
  LivePlayerStats,
  LiveMatchStatButtons,
  StatButton
} from './live-match-types';
import { Match } from './match-types';
import { statSchemaService } from './statSchemaService';
import { matchService } from './matchService';

class LiveMatchService {
  private readonly STORAGE_KEY_PREFIX = 'athlee_liveMatch_';

  /**
   * Initialize or resume a live match session
   */
  public initialize(match: Match): LiveMatchState {
    // Check if we have a persisted state for this match
    const persisted = this.loadState(match.id);
    if (persisted) {
      return persisted; // Resume in-progress match
    }

    // Create new live match state
    const { rules, teams, sport, statIntensity } = match;
    const schema = statSchemaService.getSchema(sport, statIntensity);
    const config = this.createConfig(match);

    // Initialize player stats with all stat keys set to 0
    const playerStats = teams.flatMap((team) =>
      team.players.map((player) => ({
        playerId: player.id,
        playerName: player.name,
        stats: Object.fromEntries(schema.statKeys.map((k) => [k.id, 0]))
      }))
    );

    const clock: LiveMatchClock = {
      currentPeriod: 1,
      currentTime: 0,
      timeRemaining: config.periodDuration,
      isRunning: false,
      periodType: config.periodType,
      totalPeriods: config.totalPeriods
    };

    const shotClock: ShotClockState | undefined = config.shotClockDuration
      ? {
          timeRemaining: config.shotClockDuration,
          isRunning: false,
          enabled: true,
          duration: config.shotClockDuration
        }
      : undefined;

    return {
      matchId: match.id,
      sport,
      statIntensity,
      clock,
      shotClock,
      scores: { teamA: 0, teamB: 0 },
      playerStats,
      isStarted: false
    };
  }

  /**
   * Create live match config from match rules
   */
  private createConfig(match: Match): LiveMatchConfig {
    const { rules } = match;

    // Determine period type and count
    let periodType: 'quarter' | 'half' = 'quarter';
    let totalPeriods = 4;

    if (rules.periodStructure === 'halves') {
      periodType = 'half';
      totalPeriods = 2;
    }
    // Default to quarters if not specified or if quarters

    // Normalize gameFormat for live match (only timed or firstTo supported)
    let gameFormat: 'timed' | 'firstTo' = 'timed';
    if (rules.gameFormat === 'firstTo') {
      gameFormat = 'firstTo';
    }

    return {
      sport: match.sport,
      statIntensity: match.statIntensity,
      gameFormat,
      periodDuration: (rules.periodDuration || 10) * 60, // convert to seconds
      totalPeriods,
      periodType,
      shotClockDuration:
        rules.shotClock !== 'none' ? parseInt(rules.shotClock) : undefined,
      pointsForTwoPointer: rules.pointsInside || 2,
      pointsForThreePointer: rules.pointsOutside || 3,
      pointsForFreeThrow: 1,
      teamNames: {
        teamA: match.teams[0]?.name || 'Team A',
        teamB: match.teams[1]?.name || 'Team B'
      },
      teams: match.teams.map((team) => ({
        id: team.id,
        name: team.name,
        players: team.players.map((p) => ({
          id: p.id,
          name: p.name,
          jerseyNo: p.jerseyNo
        }))
      }))
    };
  }

  /**
   * Start or resume the clock
   */
  public startClock(state: LiveMatchState): LiveMatchState {
    return {
      ...state,
      clock: { ...state.clock, isRunning: true },
      isStarted: true
    };
  }

  /**
   * Pause the clock
   */
  public pauseClock(state: LiveMatchState): LiveMatchState {
    return {
      ...state,
      clock: { ...state.clock, isRunning: false }
    };
  }

  /**
   * Tick clock by 1 second (call every second when running)
   */
  public tickClock(state: LiveMatchState): LiveMatchState {
    const newClock = { ...state.clock };

    if (!newClock.isRunning) {
      return state;
    }

    newClock.currentTime += 1;
    newClock.timeRemaining = Math.max(0, newClock.timeRemaining - 1);

    // Auto end period if time runs out
    if (newClock.timeRemaining === 0 && newClock.currentPeriod < newClock.totalPeriods) {
      // Period ended, prepare for next
      // Note: UI should handle period transition via handleNextPeriod
    }

    let newShotClock = state.shotClock;
    if (newShotClock?.isRunning) {
      newShotClock = {
        ...newShotClock,
        timeRemaining: Math.max(0, newShotClock.timeRemaining - 1)
      };
    }

    return {
      ...state,
      clock: newClock,
      shotClock: newShotClock
    };
  }

  /**
   * Reset clock to period start
   */
  public resetClock(state: LiveMatchState): LiveMatchState {
    const config = this.createConfigFromState(state);

    return {
      ...state,
      clock: {
        ...state.clock,
        currentTime: 0,
        timeRemaining: config.periodDuration,
        isRunning: false
      }
    };
  }

  /**
   * Move to next period
   */
  public nextPeriod(state: LiveMatchState): LiveMatchState {
    const { clock } = state;

    if (clock.currentPeriod >= clock.totalPeriods) {
      return state; // Already in last period
    }

    const config = this.createConfigFromState(state);

    const newClock: LiveMatchClock = {
      ...clock,
      currentPeriod: clock.currentPeriod + 1,
      currentTime: 0,
      timeRemaining: config.periodDuration,
      isRunning: false
    };

    let newShotClock = state.shotClock;
    if (newShotClock) {
      newShotClock = {
        ...newShotClock,
        timeRemaining: newShotClock.duration,
        isRunning: false
      };
    }

    return {
      ...state,
      clock: newClock,
      shotClock: newShotClock
    };
  }

  /**
   * Record a stat for a player and update team score if applicable
   */
  public recordStat(
    state: LiveMatchState,
    playerId: string,
    statKey: string,
    scoreValue?: number
  ): LiveMatchState {
    const playerStatIndex = state.playerStats.findIndex(
      (ps) => ps.playerId === playerId
    );

    if (playerStatIndex === -1) {
      console.warn(`Player ${playerId} not found in stats`);
      return state;
    }

    // Increment player stat
    const updatedPlayerStats = state.playerStats.map((ps, idx) => {
      if (idx === playerStatIndex) {
        return {
          ...ps,
          stats: {
            ...ps.stats,
            [statKey]: (ps.stats[statKey] || 0) + 1
          }
        };
      }
      return ps;
    });

    // Determine team (simple: first half of players = Team A, second half = Team B)
    const isTeamA = playerStatIndex < Math.ceil(state.playerStats.length / 2);

    // Update team score if scoreValue provided
    const newScores: LiveMatchScores = { ...state.scores };
    if (scoreValue) {
      if (isTeamA) {
        newScores.teamA += scoreValue;
      } else {
        newScores.teamB += scoreValue;
      }
    }

    return {
      ...state,
      playerStats: updatedPlayerStats,
      scores: newScores
    };
  }

  /**
   * Get stat buttons for a sport and intensity level
   */
  public getStatButtons(sport: string, intensity: string): LiveMatchStatButtons {
    // For now, return basketball buttons as example
    if (sport === 'Basketball') {
      return this.getBasketballStatButtons(intensity);
    }

    // Default empty buttons for other sports
    return {};
  }

  /**
   * Get basketball-specific stat buttons
   */
  private getBasketballStatButtons(intensity: string): LiveMatchStatButtons {
    const basicButtons: LiveMatchStatButtons = {
      fg2m: {
        statKey: 'fg2m',
        label: '2 Pointer',
        shortLabel: '2PT',
        category: 'Scoring',
        scoreValue: 2,
        color: '#3B82F6'
      },
      fg3m: {
        statKey: 'fg3m',
        label: '3 Pointer',
        shortLabel: '3PT',
        category: 'Scoring',
        scoreValue: 3,
        color: '#A855F7'
      },
      ftm: {
        statKey: 'ftm',
        label: 'Free Throw',
        shortLabel: 'FT',
        category: 'Scoring',
        scoreValue: 1,
        color: '#EAB308'
      },
      rebounds: {
        statKey: 'rebounds',
        label: 'Rebound',
        shortLabel: 'REB',
        category: 'Rebounding',
        color: '#EC4899'
      },
      assists: {
        statKey: 'assists',
        label: 'Assist',
        shortLabel: 'AST',
        category: 'Playmaking',
        color: '#14B8A6'
      }
    };

    if (intensity === 'Advanced') {
      return {
        ...basicButtons,
        steals: {
          statKey: 'steals',
          label: 'Steal',
          shortLabel: 'STL',
          category: 'Defense',
          color: '#06B6D4'
        },
        blocks: {
          statKey: 'blocks',
          label: 'Block',
          shortLabel: 'BLK',
          category: 'Defense',
          color: '#8B5CF6'
        },
        turnovers: {
          statKey: 'turnovers',
          label: 'Turnover',
          shortLabel: 'TO',
          category: 'Mistakes',
          color: '#F87171'
        },
        personalFouls: {
          statKey: 'personalFouls',
          label: 'Foul',
          shortLabel: 'PF',
          category: 'Mistakes',
          color: '#FB923C'
        }
      };
    }

    return basicButtons;
  }

  /**
   * Save live match state to localStorage for persistence
   */
  public saveState(state: LiveMatchState): void {
    try {
      const key = this.STORAGE_KEY_PREFIX + state.matchId;
      // Note: In React Native, use @react-native-async-storage/async-storage
      // This is the web implementation for reference
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error('Failed to save live match state:', error);
    }
  }

  /**
   * Load live match state from localStorage
   */
  public loadState(matchId: string): LiveMatchState | null {
    try {
      const key = this.STORAGE_KEY_PREFIX + matchId;
      // Note: In React Native, use @react-native-async-storage/async-storage
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
      return null;
    } catch (error) {
      console.error('Failed to load live match state:', error);
      return null;
    }
  }

  /**
   * Clear live match state from localStorage
   */
  public clearState(matchId: string): void {
    try {
      const key = this.STORAGE_KEY_PREFIX + matchId;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Failed to clear live match state:', error);
    }
  }

  /**
   * Create LiveMatchConfig from existing LiveMatchState
   * Used when config wasn't stored in state
   */
  private createConfigFromState(state: LiveMatchState): LiveMatchConfig {
    // This is a fallback; in practice, store config during initialize
    const match = matchService.getMatch(state.matchId);
    if (!match) {
      throw new Error(`Match ${state.matchId} not found`);
    }
    return this.createConfig(match);
  }

  /**
   * Convert live match state to final format for saving
   * Output: PlayerMatchStat[] for statEntryService
   */
  public convertToMatchStats(state: LiveMatchState) {
    return {
      playerStats: state.playerStats.map((ps) => {
        // Calculate total points from scoring stats
        const fg2m = ps.stats['fg2m'] || 0;
        const fg3m = ps.stats['fg3m'] || 0;
        const ftm = ps.stats['ftm'] || 0;
        const totalPoints = (fg2m * 2) + (fg3m * 3) + (ftm * 1);

        return {
          playerId: ps.playerId,
          playerName: ps.playerName,
          values: {
            ...ps.stats,
            points: totalPoints
          }
        };
      }),
      finalScore: {
        teamA: state.scores.teamA,
        teamB: state.scores.teamB
      },
      recordedAt: new Date().toISOString()
    };
  }
}

export const liveMatchService = new LiveMatchService();
