import { Match } from './match-types';
import { statSchemaService } from './statSchemaService';
import {
  LiveMatchState,
  LiveMatchConfig,
  LiveMatchClock,
  ShotClockState,
  LivePlayerStats,
  StatButton,
  LiveMatchStatButtons
} from './live-match-types';
import { SportType } from './location-types';

/**
 * LiveMatchService - Manages live match state, clock, and stat recording
 */
class LiveMatchService {
  private readonly STORAGE_KEY_PREFIX = 'athlee_liveMatch_';

  /**
   * Initialize live match from match object
   */
  public initialize(match: Match): LiveMatchState {
    // Load persisted state if exists
    const persisted = this.loadState(match.id);
    if (persisted) {
      return persisted;
    }

    // Create fresh state from match
    const schema = statSchemaService.getSchema(match.sport, match.statIntensity);
    if (!schema) {
      throw new Error(`No stat schema found for ${match.sport} / ${match.statIntensity}`);
    }

    const config = this.createConfig(match);

    // Initialize player stats
    const playerStats: LivePlayerStats[] = match.teams.flatMap((team) =>
      team.players.map((player) => ({
        playerId: player.id,
        playerName: player.name,
        stats: Object.fromEntries(schema.statKeys.map((k) => [k.id, 0]))
      }))
    );

    return {
      matchId: match.id,
      sport: match.sport,
      statIntensity: match.statIntensity,
      clock: {
        currentPeriod: 1,
        currentTime: 0,
        timeRemaining: config.periodDuration,
        isRunning: false,
        periodType: config.periodType,
        totalPeriods: config.totalPeriods
      },
      shotClock: config.shotClockDuration
        ? {
            timeRemaining: config.shotClockDuration,
            isRunning: false,
            enabled: true,
            duration: config.shotClockDuration
          }
        : undefined,
      scores: {
        teamA: 0,
        teamB: 0
      },
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

    if ('periodStructure' in rules && rules.periodStructure === 'halves') {
      periodType = 'half';
      totalPeriods = 2;
    }
    // Default to quarters if not specified or if quarters

    // Normalize gameFormat for live match (only timed or firstTo supported)
    let gameFormat: 'timed' | 'firstTo' = 'timed';
    if ('gameFormat' in rules && rules.gameFormat === 'firstTo') {
      gameFormat = 'firstTo';
    }

    return {
      sport: match.sport,
      statIntensity: match.statIntensity,
      gameFormat,
      periodDuration: (('periodDuration' in rules ? rules.periodDuration : 10) || 10) * 60, // convert to seconds
      totalPeriods,
      periodType,
      shotClockDuration: ('shotClock' in rules && rules.shotClock !== 'none') ? parseInt((rules as any).shotClock) : undefined,
      pointsForTwoPointer: ('pointsInside' in rules) ? (rules as any).pointsInside || 2 : 2,
      pointsForThreePointer: ('pointsOutside' in rules) ? (rules as any).pointsOutside || 3 : 3,
      pointsForFreeThrow: 1,
      teamAName: match.teams[0]?.name || 'Team A',
      teamBName: match.teams[1]?.name || 'Team B',
      teamAPlayers: match.teams[0]?.players || [],
      teamBPlayers: match.teams[1]?.players || []
    };
  }

  /**
   * Start the clock
   */
  public startClock(state: LiveMatchState): LiveMatchState {
    return {
      ...state,
      clock: {
        ...state.clock,
        isRunning: true
      },
      shotClock: state.shotClock
        ? {
            ...state.shotClock,
            isRunning: true
          }
        : undefined,
      startedAt: state.startedAt || new Date().toISOString(),
      isStarted: true
    };
  }

  /**
   * Pause the clock
   */
  public pauseClock(state: LiveMatchState): LiveMatchState {
    return {
      ...state,
      clock: {
        ...state.clock,
        isRunning: false
      },
      shotClock: state.shotClock
        ? {
            ...state.shotClock,
            isRunning: false
          }
        : undefined,
      pausedAt: new Date().toISOString()
    };
  }

  /**
   * Update clock (called by timer tick)
   */
  public tickClock(state: LiveMatchState): LiveMatchState {
    if (!state.clock.isRunning) return state;

    let timeRemaining = state.clock.timeRemaining - 1;
    let newState = { ...state };

    // Handle period end
    if (timeRemaining <= 0) {
      const isLastPeriod = state.clock.currentPeriod >= state.clock.totalPeriods;
      if (isLastPeriod) {
        // Match end
        newState.clock.isRunning = false;
      } else {
        // Next period
        newState = this.nextPeriod(newState);
      }
    } else {
      newState.clock = {
        ...state.clock,
        currentTime: state.clock.currentTime + 1,
        timeRemaining
      };
    }

    // Handle shot clock
    if (newState.shotClock?.isRunning) {
      let shotClockTime = newState.shotClock.timeRemaining - 1;
      if (shotClockTime <= 0) {
        // Reset shot clock at end of period or on turnover
        shotClockTime = newState.shotClock.duration;
      }
      newState.shotClock = {
        ...newState.shotClock,
        timeRemaining: shotClockTime
      };
    }

    return newState;
  }

  /**
   * Move to next period
   */
  public nextPeriod(state: LiveMatchState): LiveMatchState {
    return {
      ...state,
      clock: {
        ...state.clock,
        currentPeriod: state.clock.currentPeriod + 1,
        currentTime: 0,
        timeRemaining: state.clock.currentPeriod < state.clock.totalPeriods
          ? state.clock.timeRemaining + 60  // Placeholder: get from config
          : 0,
        isRunning: false
      },
      shotClock: state.shotClock
        ? {
            ...state.shotClock,
            timeRemaining: state.shotClock.duration,
            isRunning: false
          }
        : undefined
    };
  }

  /**
   * Reset clock for current period
   */
  public resetClock(state: LiveMatchState, periodDuration: number): LiveMatchState {
    return {
      ...state,
      clock: {
        ...state.clock,
        currentTime: 0,
        timeRemaining: periodDuration,
        isRunning: false
      },
      shotClock: state.shotClock
        ? {
            ...state.shotClock,
            timeRemaining: state.shotClock.duration,
            isRunning: false
          }
        : undefined
    };
  }

  /**
   * Record a stat for a player
   */
  public recordStat(
    state: LiveMatchState,
    playerId: string,
    statKey: string,
    scoreValue?: number
  ): LiveMatchState {
    const playerStatIndex = state.playerStats.findIndex((ps) => ps.playerId === playerId);
    if (playerStatIndex === -1) {
      console.warn(`Player ${playerId} not found`);
      return state;
    }

    // Determine which team the player belongs to
    const isTeamA = state.playerStats.slice(0, Math.ceil(state.playerStats.length / 2)).some(
      (ps) => ps.playerId === playerId
    );

    // Update player stat
    const updatedPlayerStats = [...state.playerStats];
    updatedPlayerStats[playerStatIndex] = {
      ...updatedPlayerStats[playerStatIndex],
      stats: {
        ...updatedPlayerStats[playerStatIndex].stats,
        [statKey]: (updatedPlayerStats[playerStatIndex].stats[statKey] || 0) + 1
      }
    };

    // Update team score if this stat contributes to score
    let newScores = { ...state.scores };
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
   * Get stat buttons for a stat intensity
   */
  public getStatButtons(sport: SportType, intensity: string): LiveMatchStatButtons {
    // For now, return basketball buttons
    if (sport === SportType.Basketball) {
      return this.getBasketballStatButtons(intensity);
    }

    // TODO: Add other sports
    return {};
  }

  /**
   * Get basketball-specific stat buttons
   */
  private getBasketballStatButtons(intensity: string): LiveMatchStatButtons {
    const basicButtons: LiveMatchStatButtons = {
      fg2m: {
        statKey: 'fg2m',
        label: '2 PT',
        shortLabel: '2P',
        category: 'Scoring',
        scoreValue: 2,
        color: 'bg-blue-500'
      },
      fg3m: {
        statKey: 'fg3m',
        label: '3 PT',
        shortLabel: '3P',
        category: 'Scoring',
        scoreValue: 3,
        color: 'bg-purple-500'
      },
      ftm: {
        statKey: 'ftm',
        label: 'FT',
        shortLabel: 'F',
        category: 'Scoring',
        scoreValue: 1,
        color: 'bg-yellow-500'
      },
      rebounds: {
        statKey: 'rebounds',
        label: 'REB',
        shortLabel: 'R',
        category: 'Rebounding'
      },
      assists: {
        statKey: 'assists',
        label: 'AST',
        shortLabel: 'A',
        category: 'Playmaking'
      }
    };

    if (intensity === 'Advanced') {
      return {
        ...basicButtons,
        steals: {
          statKey: 'steals',
          label: 'STL',
          shortLabel: 'S',
          category: 'Defense'
        },
        blocks: {
          statKey: 'blocks',
          label: 'BLK',
          shortLabel: 'B',
          category: 'Defense'
        },
        turnovers: {
          statKey: 'turnovers',
          label: 'TO',
          shortLabel: 'T',
          category: 'Turnovers'
        },
        personalFouls: {
          statKey: 'personalFouls',
          label: 'PF',
          shortLabel: 'P',
          category: 'Fouls'
        }
      };
    }

    return basicButtons;
  }

  /**
   * Save live match state to localStorage
   */
  public saveState(state: LiveMatchState): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${state.matchId}`;
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save live match state:', error);
    }
  }

  /**
   * Load live match state from localStorage
   */
  public loadState(matchId: string): LiveMatchState | null {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${matchId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load live match state:', error);
      return null;
    }
  }

  /**
   * Clear saved live match state
   */
  public clearState(matchId: string): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${matchId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to clear live match state:', error);
    }
  }

  /**
   * Convert live match state to player match stats for saving
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
