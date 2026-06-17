import { SportType } from './location-types';

export enum MatchType {
  Single = 'Single',
  SetBased = 'SetBased',
  Tournament = 'Tournament',
  Rotational = 'Rotational',
}

export enum MatchMode {
  Casual = 'Casual',
  Competitive = 'Competitive',
}

export enum MatchStatus {
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum ScoringSystem {
  Standard = 'Standard',
  Streetball = 'Streetball',
  PointBased = 'PointBased',
  SetBased = 'SetBased',
}

export interface MatchPlayer {
  id: string;
  name: string;
  userId?: string;
  jerseyNo?: string;
  claimed?: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: MatchPlayer[];
}

export interface MatchRules {
  scoringSystem: ScoringSystem;
  pointsToWin: number;
  winByTwo: boolean;
  maxSets?: number;
  maxDuration?: number;
  customRules?: string;
}

export interface MatchScore {
  teamAScore: number;
  teamBScore: number;
  setScores?: number[][];
  winner?: 'A' | 'B';
}

export interface Match {
  id: string;
  sport: SportType;
  type: MatchType;
  mode: MatchMode;
  status: MatchStatus;
  date: string;
  locationId?: string;
  createdBy: string;
  teams: Team[];
  rules: MatchRules;
  score?: MatchScore;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
