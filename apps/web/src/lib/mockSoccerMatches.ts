/**
 * Mock Soccer Matches for Testing and Development
 * 
 * Provides realistic soccer matches at various stages:
 * - Completed matches with scores and player stats
 * - In-progress matches
 * - Upcoming scheduled matches
 */

import {
  Match,
  MatchType,
  MatchMode,
  MatchStatus,
  Team,
  MatchPlayer,
  StatIntensity,
  TeamSizeConfig,
} from './match-types';
import type { SoccerMatchRules } from './match-types';
import { SportType } from './location-types';

/**
 * Generate mock soccer matches for development and testing
 */
export function generateMockSoccerMatches(): Match[] {
  return [
    // Completed competitive match (7v7)
    {
      id: 'soccer_match_001',
      sport: SportType.Soccer,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '7v7', playersPerTeam: 7, substitutes: 5 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc_soccer_central',
      createdBy: 'user_001',
      teams: [
        {
          id: 'soccer_team_001',
          name: 'City Strikers',
          players: [
            {
              id: 'sp_001',
              name: 'Carlos Martinez',
              userId: 'user_001',
              jerseyNo: '1',
              position: 'GK',
            },
            {
              id: 'sp_002',
              name: 'Luis Garcia',
              userId: 'user_002',
              jerseyNo: '4',
              position: 'DEF',
            },
            {
              id: 'sp_003',
              name: 'Juan Rodriguez',
              userId: 'user_003',
              jerseyNo: '5',
              position: 'DEF',
            },
            {
              id: 'sp_004',
              name: 'Miguel Lopez',
              userId: 'user_004',
              jerseyNo: '8',
              position: 'MID',
            },
            {
              id: 'sp_005',
              name: 'Diego Sanchez',
              userId: 'user_005',
              jerseyNo: '10',
              position: 'MID',
            },
            {
              id: 'sp_006',
              name: 'Antonio Ruiz',
              userId: 'user_006',
              jerseyNo: '9',
              position: 'FWD',
            },
            {
              id: 'sp_007',
              name: 'Pablo Fernandez',
              userId: 'user_007',
              jerseyNo: '7',
              position: 'FWD',
            },
          ],
        },
        {
          id: 'soccer_team_002',
          name: 'United Phoenix',
          players: [
            {
              id: 'sp_008',
              name: 'Paulo Silva',
              userId: 'user_008',
              jerseyNo: '1',
              position: 'GK',
            },
            {
              id: 'sp_009',
              name: 'Andre Costa',
              userId: 'user_009',
              jerseyNo: '2',
              position: 'DEF',
            },
            {
              id: 'sp_010',
              name: 'Roberto Oliveira',
              userId: 'user_010',
              jerseyNo: '6',
              position: 'DEF',
            },
            {
              id: 'sp_011',
              name: 'Antonio Santos',
              userId: 'user_011',
              jerseyNo: '4',
              position: 'DEF',
            },
            {
              id: 'sp_012',
              name: 'Fernando Alves',
              userId: 'user_012',
              jerseyNo: '11',
              position: 'MID',
            },
            {
              id: 'sp_013',
              name: 'Rafael Pereira',
              userId: 'user_013',
              jerseyNo: '10',
              position: 'FWD',
            },
            {
              id: 'sp_014',
              name: 'Sergio Teixeira',
              userId: 'user_014',
              jerseyNo: '9',
              position: 'FWD',
            },
          ],
        },
      ],
      rules: {
        presetName: 'FIFA Standard',
        halfDuration: 35,
        halves: 2,
        extraTime: false,
        penalties: false,
        offside: true,
        substitutionRule: 'limited',
        maxSubstitutions: 3,
        pointsSystem: { win: 3, draw: 1, loss: 0 },
        houseRules: [],
        unwrittenRules: 'Standard FIFA rules with adjusted halves for 7v7 format.',
      } as const,
      score: {
        teamAScore: 3,
        teamBScore: 2,
        winner: 'A',
      },
      privacy: 'public',
      notes: 'Great competitive match with exciting ending!',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // In-progress casual match (5v5)
    {
      id: 'soccer_match_002',
      sport: SportType.Soccer,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '5v5', playersPerTeam: 5, substitutes: 3 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.InProgress,
      date: new Date().toISOString(),
      locationId: 'loc_soccer_midtown',
      createdBy: 'user_015',
      teams: [
        {
          id: 'soccer_team_003',
          name: 'Red Team',
          players: [
            { id: 'sp_015', name: 'Alex Turner', userId: 'user_015', jerseyNo: '1' },
            { id: 'sp_016', name: 'Ben Clark', userId: 'user_016', jerseyNo: '2' },
            { id: 'sp_017', name: 'Chris Lee', userId: 'user_017', jerseyNo: '5' },
            { id: 'sp_018', name: 'Daniel Wong', userId: 'user_018', jerseyNo: '9' },
            { id: 'sp_019', name: 'Emma Davis', userId: 'user_019', jerseyNo: '10' },
          ],
        },
        {
          id: 'soccer_team_004',
          name: 'Blue Team',
          players: [
            { id: 'sp_020', name: 'Frank Miller', userId: 'user_020', jerseyNo: '1' },
            { id: 'sp_021', name: 'Grace Johnson', userId: 'user_021', jerseyNo: '3' },
            { id: 'sp_022', name: 'Henry Brown', userId: 'user_022', jerseyNo: '4' },
            { id: 'sp_023', name: 'Iris Chen', userId: 'user_023', jerseyNo: '7' },
            { id: 'sp_024', name: 'Jack Wilson', userId: 'user_024', jerseyNo: '9' },
          ],
        },
      ],
      rules: {
        presetName: 'Casual 5v5',
        halfDuration: 25,
        halves: 2,
        extraTime: false,
        penalties: false,
        offside: true,
        substitutionRule: 'unlimited',
        maxSubstitutions: undefined,
        pointsSystem: { win: 3, draw: 1, loss: 0 },
        houseRules: ['No hard tackling', 'Fair play encouraged'],
        unwrittenRules: 'Friendly pickup game, have fun!',
      } as const,
      score: {
        teamAScore: 2,
        teamBScore: 1,
      },
      privacy: 'public',
      notes: 'Exciting match underway!',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },

    // Scheduled upcoming match (11v11)
    {
      id: 'soccer_match_003',
      sport: SportType.Soccer,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '11v11', playersPerTeam: 11, substitutes: 7 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Scheduled,
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc_soccer_downtown',
      createdBy: 'user_025',
      teams: [
        {
          id: 'soccer_team_005',
          name: 'Downtown Tredders',
          players: Array.from({ length: 11 }, (_, i) => ({
            id: `sp_${100 + i}`,
            name: `Team A Player ${i + 1}`,
            jerseyNo: String(i + 1).padStart(2, '0'),
            position: ['GK', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD'][i],
          })),
        },
        {
          id: 'soccer_team_006',
          name: 'Harbor Athletic',
          players: Array.from({ length: 11 }, (_, i) => ({
            id: `sp_${200 + i}`,
            name: `Team B Player ${i + 1}`,
            jerseyNo: String(i + 1).padStart(2, '0'),
            position: ['GK', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD'][i],
          })),
        },
      ],
      rules: {
        presetName: 'FIFA Standard',
        halfDuration: 45,
        halves: 2,
        extraTime: true,
        penalties: true,
        offside: true,
        substitutionRule: 'limited',
        maxSubstitutions: 3,
        pointsSystem: { win: 3, draw: 1, loss: 0 },
        houseRules: [],
        unwrittenRules: 'Official FIFA rules. All competitors must be registered.',
      } as const,
      privacy: 'public',
      notes: 'Season opener - championship-level competition',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },

    // Draft match (not yet scheduled)
    {
      id: 'soccer_match_004',
      sport: SportType.Soccer,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '3v3', playersPerTeam: 3, substitutes: 2 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.Draft,
      date: new Date().toISOString(),
      locationId: 'loc_soccer_park',
      createdBy: 'user_030',
      teams: [
        {
          id: 'soccer_team_007',
          name: 'Team A',
          players: [
            { id: 'sp_300', name: 'Player 1', jerseyNo: '1' },
            { id: 'sp_301', name: 'Player 2', jerseyNo: '2' },
            { id: 'sp_302', name: 'Player 3', jerseyNo: '3' },
          ],
        },
        {
          id: 'soccer_team_008',
          name: 'Team B',
          players: [
            { id: 'sp_303', name: 'Player 4', jerseyNo: '1' },
            { id: 'sp_304', name: 'Player 5', jerseyNo: '2' },
            { id: 'sp_305', name: 'Player 6', jerseyNo: '3' },
          ],
        },
      ],
      rules: {
        presetName: 'Indoor',
        halfDuration: 15,
        halves: 2,
        extraTime: false,
        penalties: false,
        offside: false,
        substitutionRule: 'unlimited',
        maxSubstitutions: undefined,
        pointsSystem: { win: 3, draw: 1, loss: 0 },
        houseRules: ['No diving', 'Quick play'],
        unwrittenRules: 'Fun pickup game',
      } as const,
      privacy: 'private',
      notes: 'Quick 3v3 game during lunch break',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}
