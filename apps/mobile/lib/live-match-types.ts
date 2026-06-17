/**
 * Live Match Type Definitions (Mobile)
 * Shared types with web implementation for consistency
 */

import { SportType } from './match-types';

export enum PeriodType {
  Quarter = 'quarter',
  Half = 'half'
}

export interface LiveMatchClock {
  currentPeriod: number;
  currentTime: number;
  timeRemaining: number; // seconds
  isRunning: boolean;
  periodType: 'quarter' | 'half';
  totalPeriods: number;
}

export interface ShotClockState {
  timeRemaining: number; // seconds
  isRunning: boolean;
  enabled: boolean;
  duration: number; // seconds
}

export interface LiveMatchScores {
  teamA: number;
  teamB: number;
}

export interface LivePlayerStats {
  playerId: string;
  playerName: string;
  stats: Record<string, number>;
}

export interface LiveMatchState {
  matchId: string;
  sport: SportType;
  statIntensity: string;
  clock: LiveMatchClock;
  shotClock?: ShotClockState;
  scores: LiveMatchScores;
  playerStats: LivePlayerStats[];
  startedAt?: string;
  isStarted: boolean;
}

export interface LiveMatchConfig {
  sport: SportType;
  gameFormat: 'timed' | 'firstTo';
  periodDuration: number; // seconds
  totalPeriods: number;
  periodType: 'quarter' | 'half';
  shotClockDuration?: number; // seconds
  pointsForTwoPointer: number;
  pointsForThreePointer: number;
  pointsForFreeThrow: number;
  teamNames: {
    teamA: string;
    teamB: string;
  };
  teams: Array<{
    id: string;
    name: string;
    players: Array<{
      id: string;
      name: string;
      jerseyNo?: string;
    }>;
  }>;
}

export interface StatButton {
  statKey: string;
  label: string;
  shortLabel: string;
  category: string;
  scoreValue?: number; // points value if this button increments score
  color?: string; // Tailwind color class for web, or color value for mobile
}

export interface LiveMatchStatButtons {
  [key: string]: StatButton;
}
