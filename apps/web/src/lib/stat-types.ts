import { SportType } from './location-types';
import { StatIntensity } from './match-types';

/**
 * Stat key definition - describes a single stat tracked
 */
export interface StatKey {
  id: string;              // e.g., "points", "assists", "3pm"
  name: string;            // e.g., "Points", "Assists"
  abbreviation: string;    // e.g., "PTS", "AST"
  description?: string;    // e.g., "Total points scored"
  category: string;        // e.g., "Scoring", "Rebounding", "Defense"
  type: 'counting';        // For now, only counting stats
}

/**
 * Sport stat schema - defines what stats are tracked for a sport + intensity
 */
export interface SportStatSchema {
  sport: SportType;
  intensity: StatIntensity;  // Basic, Advanced, etc.
  statKeys: StatKey[];
}

/**
 * Player match stat - single player's stats for a match
 */
export interface PlayerMatchStat {
  playerId: string;        // temp ID or userId
  playerName: string;      // For display
  values: Record<string, number>;  // statKey id -> value
}

/**
 * Team match stat - aggregated stats for a team
 */
export interface TeamMatchStat {
  teamId: string;
  values: Record<string, number>;  // statKey id -> aggregated value
}

/**
 * Match stats container - all stats for a match
 */
export interface MatchStats {
  id: string;                      // Unique stat record ID
  matchId: string;
  playerStats: PlayerMatchStat[];  // Per-player stats
  teamStats: TeamMatchStat[];      // Aggregated team stats
  finalScore?: {
    teamA: number;
    teamB: number;
  };
  recordedAt: string;              // ISO datetime
  recordedBy?: string;             // User ID who recorded stats
}

/**
 * Summary of stats for a player (used in display)
 */
export interface PlayerStatSummary {
  playerId: string;
  playerName: string;
  stats: Record<string, number>;   // statKey -> value (for display)
}

/**
 * Summary of team stats (used in display)
 */
export interface TeamStatSummary {
  teamId: string;
  teamName: string;
  players: PlayerStatSummary[];
  teamTotals: Record<string, number>;
  score?: number;
}
