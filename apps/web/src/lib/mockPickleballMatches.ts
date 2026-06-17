/**
 * Mock Pickleball Matches
 * 
 * Realistic pickleball match examples for development and testing
 */

import { Match, MatchStatus, MatchType, MatchMode, StatIntensity, PickleballMatchRules } from './match-types';
import { SportType } from './location-types';
import { PICKLEBALL_PRESETS } from './mockPickleballRulePresets';

export const PICKLEBALL_MATCH_001: Match = {
  id: 'pickleball_match_001',
  sport: SportType.Pickleball,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Doubles (2v2)', playersPerTeam: 2, substitutes: 0 },
  statIntensity: StatIntensity.Advanced,
  status: MatchStatus.Completed,
  date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_pickleball_001',
  createdBy: 'user_001',
  teams: [
    {
      id: 'team_pk_champs',
      name: 'Team Champions',
      players: [
        { id: 'player_pk_1', name: 'Alex Park' },
        { id: 'player_pk_2', name: 'Jordan Lee' },
      ],
    },
    {
      id: 'team_pk_rivals',
      name: 'Team Rivals',
      players: [
        { id: 'player_pk_3', name: 'Morgan Davis' },
        { id: 'player_pk_4', name: 'Casey Wilson' },
      ],
    },
  ],
  rules: PICKLEBALL_PRESETS[0].rules as any as PickleballMatchRules,
  score: { teamAScore: 22, teamBScore: 16, setScores: [[11, 9], [11, 7]] },
  privacy: 'public',
  notes: 'Great kitchen play by Team Champions',
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export const PICKLEBALL_MATCH_002: Match = {
  id: 'pickleball_match_002',
  sport: SportType.Pickleball,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Basic,
  status: MatchStatus.InProgress,
  date: new Date().toISOString(),
  locationId: 'loc_pickleball_002',
  createdBy: 'user_002',
  teams: [
    {
      id: 'team_pk_singles_a',
      name: 'Team A',
      players: [{ id: 'player_pk_singles_a', name: 'Player A' }],
    },
    {
      id: 'team_pk_singles_b',
      name: 'Team B',
      players: [{ id: 'player_pk_singles_b', name: 'Player B' }],
    },
  ],
  rules: PICKLEBALL_PRESETS[1].rules as any as PickleballMatchRules,
  score: { teamAScore: 8, teamBScore: 11 },
  privacy: 'public',
  notes: 'Competitive singles match in progress',
  createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export const PICKLEBALL_MATCH_003: Match = {
  id: 'pickleball_match_003',
  sport: SportType.Pickleball,
  type: MatchType.Single,
  mode: MatchMode.Competitive,
  teamSize: { label: 'Doubles (2v2)', playersPerTeam: 2, substitutes: 0 },
  statIntensity: StatIntensity.Advanced,
  status: MatchStatus.Scheduled,
  date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_pickleball_003',
  createdBy: 'user_003',
  teams: [
    {
      id: 'team_pk_pro_a',
      name: 'Elite Team',
      players: [
        { id: 'player_pk_pro_1', name: 'Maria Garcia' },
        { id: 'player_pk_pro_2', name: 'James Chen' },
      ],
    },
    {
      id: 'team_pk_pro_b',
      name: 'Challenger Team',
      players: [
        { id: 'player_pk_pro_3', name: 'Sarah Johnson' },
        { id: 'player_pk_pro_4', name: 'Mike Thompson' },
      ],
    },
  ],
  rules: PICKLEBALL_PRESETS[2].rules as any as PickleballMatchRules,
  privacy: 'public',
  schedule: {
    type: 'scheduled',
    scheduledTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  notes: 'Tournament playoff match - winners move to finals',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const PICKLEBALL_MATCH_004: Match = {
  id: 'pickleball_match_004',
  sport: SportType.Pickleball,
  type: MatchType.Single,
  mode: MatchMode.Casual,
  teamSize: { label: 'Singles (1v1)', playersPerTeam: 1, substitutes: 0 },
  statIntensity: StatIntensity.Basic,
  status: MatchStatus.Draft,
  date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
  locationId: 'loc_pickleball_004',
  createdBy: 'user_004',
  teams: [
    {
      id: 'team_pk_quick_a',
      name: 'Team Open',
      players: [{ id: 'player_pk_quick_a', name: 'Open Player' }],
    },
    {
      id: 'team_pk_quick_b',
      name: 'Seeking Player',
      players: [{ id: 'placeholder', name: 'Seeking Opponent' }],
    },
  ],
  rules: PICKLEBALL_PRESETS[3].rules as any as PickleballMatchRules,
  privacy: 'public',
  notes: 'Quick fun game - come join for some dinking!',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_PICKLEBALL_MATCHES: Match[] = [
  PICKLEBALL_MATCH_001,
  PICKLEBALL_MATCH_002,
  PICKLEBALL_MATCH_003,
  PICKLEBALL_MATCH_004,
];
