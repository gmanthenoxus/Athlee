/**
 * Mock Badminton Matches
 * 
 * Realistic badminton match examples for development and testing
 */

import { Match, MatchStatus, MatchType, MatchMode, StatIntensity, BadmintonMatchRules } from './match-types';
import { SportType } from './location-types';
import { BADMINTON_PRESETS } from './mockBadmintonRulePresets';

export const BADMINTON_MATCH_001: Match = {
  id: 'badminton_match_001',
  sport: SportType.Badminton,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Advanced,
  status: MatchStatus.Completed,
  date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_badminton_001',
  createdBy: 'user_001',
  teams: [
    {
      id: 'team_badm_a',
      name: 'Team Chen',
      players: [{ id: 'player_chen', name: 'Lin Chen' }],
    },
    {
      id: 'team_badm_b',
      name: 'Team Kumar',
      players: [{ id: 'player_kumar', name: 'Arun Kumar' }],
    },
  ],
  rules: BADMINTON_PRESETS[0].rules as any as BadmintonMatchRules,
  score: { teamAScore: 42, teamBScore: 30, setScores: [[21, 0], [21, 15]] },
  privacy: 'public',
  notes: 'Dominant performance, excellent smash game',
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export const BADMINTON_MATCH_002: Match = {
  id: 'badminton_match_002',
  sport: SportType.Badminton,
  type: MatchType.Single,
  mode: MatchMode.Competitive,
  teamSize: { label: 'Doubles (2v2)', playersPerTeam: 2, substitutes: 0 },
  statIntensity: StatIntensity.Basic,
  status: MatchStatus.InProgress,
  date: new Date().toISOString(),
  locationId: 'loc_badminton_002',
  createdBy: 'user_002',
  teams: [
    {
      id: 'team_badm_double_a',
      name: 'Team A',
      players: [
        { id: 'player_a1', name: 'Player A1' },
        { id: 'player_a2', name: 'Player A2' },
      ],
    },
    {
      id: 'team_badm_double_b',
      name: 'Team B',
      players: [
        { id: 'player_b1', name: 'Player B1' },
        { id: 'player_b2', name: 'Player B2' },
      ],
    },
  ],
  rules: BADMINTON_PRESETS[2].rules as any as BadmintonMatchRules,
  score: { teamAScore: 16, teamBScore: 17, setScores: [[11, 8], [5, 9]] },
  privacy: 'public',
  notes: 'Competitive doubles match, tight game',
  createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export const BADMINTON_MATCH_003: Match = {
  id: 'badminton_match_003',
  sport: SportType.Badminton,
  type: MatchType.Single,
  mode: MatchMode.Competitive,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Advanced,
  status: MatchStatus.Scheduled,
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_badminton_003',
  createdBy: 'user_003',
  teams: [
    {
      id: 'team_champ_a',
      name: 'Team Torres',
      players: [{ id: 'player_torres', name: 'Miguel Torres' }],
    },
    {
      id: 'team_champ_b',
      name: 'Team Singh',
      players: [{ id: 'player_singh', name: 'Priya Singh' }],
    },
  ],
  rules: BADMINTON_PRESETS[1].rules as any as BadmintonMatchRules,
  privacy: 'public',
  schedule: {
    type: 'scheduled',
    scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  notes: 'Championship tournament match',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const BADMINTON_MATCH_004: Match = {
  id: 'badminton_match_004',
  sport: SportType.Badminton,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Basic,
  status: MatchStatus.Draft,
  date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_badminton_004',
  createdBy: 'user_004',
  teams: [
    {
      id: 'team_casual_a',
      name: 'Team Casual A',
      players: [{ id: 'player_casual_a', name: 'Casual Player A' }],
    },
    {
      id: 'team_casual_b',
      name: 'Team Casual B',
      players: [{ id: 'player_casual_b', name: 'Casual Player B' }],
    },
  ],
  rules: BADMINTON_PRESETS[4].rules as any as BadmintonMatchRules,
  privacy: 'public',
  notes: 'Friendly pickup badminton - all levels welcome',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_BADMINTON_MATCHES: Match[] = [
  BADMINTON_MATCH_001,
  BADMINTON_MATCH_002,
  BADMINTON_MATCH_003,
  BADMINTON_MATCH_004,
];
