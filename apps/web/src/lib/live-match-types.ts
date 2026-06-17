import { SportType } from './location-types';
import { StatIntensity } from './match-types';

/**
 * Live match clock state
 */
export interface LiveMatchClock {
  currentPeriod: number;
  currentTime: number; // elapsed time in seconds
  timeRemaining: number; // seconds remaining in period
  isRunning: boolean;
  periodType: 'quarter' | 'half' | 'period' | string;
  totalPeriods: number;
}

/**
 * Shot clock state (optional, for sports that have it)
 */
export interface ShotClockState {
  timeRemaining: number; // seconds
  isRunning: boolean;
  enabled: boolean;
  duration: number;
}

/**
 * Live match scores
 */
export interface LiveMatchScores {
  teamA: number;
  teamB: number;
}

/**
 * Player stats during live match
 */
export interface LivePlayerStats {
  playerId: string;
  playerName: string;
  stats: Record<string, number>; // statKey -> value
}

/**
 * Live match state
 */
export interface LiveMatchState {
  matchId: string;
  sport: SportType;
  statIntensity: StatIntensity;
  
  // Clock and timing
  clock: LiveMatchClock;
  shotClock?: ShotClockState;
  
  // Scores
  scores: LiveMatchScores;
  
  // Player stats (from both teams)
  playerStats: LivePlayerStats[];
  
  // Metadata
  startedAt?: string; // ISO timestamp
  pausedAt?: string;
  isStarted: boolean;
}

/**
 * Live match configuration (derived from match rules)
 */
export interface LiveMatchConfig {
  sport: SportType;
  statIntensity: StatIntensity;
  
  // Timing
  gameFormat: 'timed' | 'firstTo'; // from MatchRules.gameFormat
  periodDuration: number; // seconds
  totalPeriods: number;
  periodType: 'quarter' | 'half';
  
  // Shot clock (if applicable)
  shotClockDuration?: number; // seconds, 0 = disabled
  
  // Scoring (from MatchRules)
  pointsForTwoPointer: number;
  pointsForThreePointer: number;
  pointsForFreeThrow: number;
  
  // Teams
  teamAName: string;
  teamBName: string;
  teamAPlayers: Array<{ id: string; name: string; jerseyNo?: string }>;
  teamBPlayers: Array<{ id: string; name: string; jerseyNo?: string }>;
}

/**
 * Stat button configuration for a sport
 */
export interface StatButton {
  statKey: string;
  label: string; // e.g., "2pt", "3pt", "FT"
  shortLabel?: string; // for compact display
  category: string; // for grouping
  scoreValue?: number; // if this stat contributes to score (e.g., 2pt = 2 points)
  color?: string; // tailwind class for UI
}

/**
 * Live stat buttons config for each intensity
 */
export interface LiveMatchStatButtons {
  [statKey: string]: StatButton;
}
