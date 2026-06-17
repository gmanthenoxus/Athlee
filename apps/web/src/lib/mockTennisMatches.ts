/**
 * Mock Tennis Matches
 * 
 * Realistic tennis match examples for development and testing
 * Covers singles, doubles, and various scenarios
 */

import { Match, MatchStatus, MatchType, MatchMode, StatIntensity, TennisMatchRules } from './match-types';
import { SportType } from './location-types';
import { TENNIS_PRESETS } from './mockTennisRulePresets';

/**
 * Completed singles match: Federer vs Nadal (6-4, 7-5)
 * Advanced stat tracking, Standard ATP rules
 */
export const TENNIS_MATCH_001: Match = {
  id: 'tennis_match_001',
  sport: SportType.Tennis,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Advanced,
  status: MatchStatus.Completed,
  date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  locationId: 'loc_tennis_001',
  createdBy: 'user_001',
  teams: [
    {
      id: 'team_fed',
      name: 'Team Federer',
      players: [
        {
          id: 'player_fed',
          name: 'Roger Federer',
        },
      ],
    },
    {
      id: 'team_nad',
      name: 'Team Nadal',
      players: [
        {
          id: 'player_nad',
          name: 'Rafael Nadal',
        },
      ],
    },
  ],
  rules: TENNIS_PRESETS[0].rules as any as TennisMatchRules, // Standard ATP/WTA
  score: {
    teamAScore: 12, // 6 games in first set + 6 games in second = 12 total
    teamBScore: 9,  // 4 games in first set + 5 games in second = 9 total
    setScores: [
      [6, 4],
      [7, 5],
    ],
  },
  privacy: 'public',
  notes: 'Wimbledon classic matchup',
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * In-progress singles match: Djokovic vs Murray
 * Basic stat tracking, No-Ad format
 * Current score: 5-4 in first set
 */
export const TENNIS_MATCH_002: Match = {
  id: 'tennis_match_002',
  sport: SportType.Tennis,
  type: MatchType.Single,
  mode: MatchMode.Competitive,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Basic,
  status: MatchStatus.InProgress,
  date: new Date().toISOString(),
  locationId: 'loc_tennis_002',
  createdBy: 'user_002',
  teams: [
    {
      id: 'team_djok',
      name: 'Team Djokovic',
      players: [
        {
          id: 'player_djok',
          name: 'Novak Djokovic',
        },
      ],
    },
    {
      id: 'team_murr',
      name: 'Team Murray',
      players: [
        {
          id: 'player_murr',
          name: 'Andy Murray',
        },
      ],
    },
  ],
  rules: TENNIS_PRESETS[2].rules as any as TennisMatchRules, // No-Ad Scoring
  score: {
    teamAScore: 5,
    teamBScore: 4,
  },
  privacy: 'public',
  notes: 'Australian Open preparation match',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Scheduled doubles match: Williams Sisters vs Venus & Serena exhibition
 * Advanced stats, Standard ATP/WTA
 */
export const TENNIS_MATCH_003: Match = {
  id: 'tennis_match_003',
  sport: SportType.Tennis,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Doubles (2v2)', playersPerTeam: 2, substitutes: 0 },
  statIntensity: StatIntensity.Advanced,
  status: MatchStatus.Scheduled,
  date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
  locationId: 'loc_tennis_003',
  createdBy: 'user_003',
  teams: [
    {
      id: 'team_double_a',
      name: 'Team Venus & Serena',
      players: [
        {
          id: 'player_ven',
          name: 'Venus Williams',
        },
        {
          id: 'player_ser',
          name: 'Serena Williams',
        },
      ],
    },
    {
      id: 'team_double_b',
      name: 'Team Hingis & Clijsters',
      players: [
        {
          id: 'player_hing',
          name: 'Martina Hingis',
        },
        {
          id: 'player_clij',
          name: 'Kim Clijsters',
        },
      ],
    },
  ],
  rules: TENNIS_PRESETS[0].rules as any as TennisMatchRules,
  privacy: 'private',
  schedule: {
    type: 'scheduled',
    scheduledTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  notes: 'Exhibition doubles match - Charity event',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Draft match: Local pickup game
 * Singles, Basic stats, No-Ad Fast4 format
 */
export const TENNIS_MATCH_004: Match = {
  id: 'tennis_match_004',
  sport: SportType.Tennis,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Basic,
  status: MatchStatus.Draft,
  date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_tennis_004',
  createdBy: 'user_004',
  teams: [
    {
      id: 'team_local_a',
      name: 'Team A',
      players: [
        {
          id: 'player_local_a',
          name: 'Local Player A',
        },
      ],
    },
    {
      id: 'team_local_b',
      name: 'Team B',
      players: [
        {
          id: 'player_local_b',
          name: 'Local Player B',
        },
      ],
    },
  ],
  rules: TENNIS_PRESETS[3].rules as any as TennisMatchRules, // Fast4
  privacy: 'public',
  notes: 'Casual pickup match - looking for opponents',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * All mock tennis matches
 */
export const MOCK_TENNIS_MATCHES: Match[] = [
  TENNIS_MATCH_001,
  TENNIS_MATCH_002,
  TENNIS_MATCH_003,
  TENNIS_MATCH_004,
];

export default MOCK_TENNIS_MATCHES;
