import {
  Match,
  MatchType,
  MatchMode,
  MatchStatus,
  Team,
  MatchPlayer,
  StatIntensity,
  TeamSizeConfig
} from './match-types';
import { SportType } from './location-types';
import { getDefaultPreset } from './mockRulePresets';

/**
 * Generate mock matches for testing
 */
export function generateMockMatches(): Match[] {
  // Default team size for basketball (5v5)
  const defaultTeamSize: TeamSizeConfig = {
    label: '5v5',
    playersPerTeam: 5,
    substitutes: 3
  };

  const matches: Match[] = [
    // Completed casual basketball match
    {
      id: 'match_001',
      sport: SportType.Basketball,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: defaultTeamSize,
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc_basketball_downtown',
      createdBy: 'user_001',
      teams: [
        {
          id: 'team_001',
          name: 'Team A',
          players: [
            { id: 'p_001', name: 'John', userId: 'user_001' },
            { id: 'p_002', name: 'Michael', userId: 'user_002' },
            { id: 'p_003', name: 'Sarah', userId: 'user_003' }
          ]
        },
        {
          id: 'team_002',
          name: 'Team B',
          players: [
            { id: 'p_004', name: 'James', userId: 'user_004' },
            { id: 'p_005', name: 'Emma', userId: 'user_005' },
            { id: 'p_006', name: 'David', userId: 'user_006' }
          ]
        }
      ],
      rules: getDefaultPreset(SportType.Basketball).rules,
      score: {
        teamAScore: 21,
        teamBScore: 15,
        winner: 'A'
      },
      privacy: 'public',
      notes: 'Great match! Close game throughout.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Upcoming competitive soccer match
    {
      id: 'match_002',
      sport: SportType.Soccer,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '11v11', playersPerTeam: 11, substitutes: 5 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Scheduled,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc_soccer_central',
      privacy: 'public',
      createdBy: 'user_002',
      teams: [
        {
          id: 'team_003',
          name: 'Dragons',
          players: [
            { id: 'p_007', name: 'Carlos', userId: 'user_007', jerseyNo: '1' },
            { id: 'p_008', name: 'Luis', userId: 'user_008', jerseyNo: '10' },
            { id: 'p_009', name: 'Miguel', userId: 'user_009', jerseyNo: '9' },
            { id: 'p_010', name: 'Diego', userId: 'user_010', jerseyNo: '7' }
          ]
        },
        {
          id: 'team_004',
          name: 'Tigers',
          players: [
            { id: 'p_011', name: 'Paulo', userId: 'user_011', jerseyNo: '1' },
            { id: 'p_012', name: 'Antonio', userId: 'user_012', jerseyNo: '10' },
            { id: 'p_013', name: 'Fernando', userId: 'user_013', jerseyNo: '9' },
            { id: 'p_014', name: 'Roberto', userId: 'user_014', jerseyNo: '5' }
          ]
        }
      ],
      rules: getDefaultPreset(SportType.Soccer).rules,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Completed tennis set-based match
    {
      id: 'match_003',
      sport: SportType.Tennis,
      type: MatchType.SetBased,
      mode: MatchMode.Casual,
      teamSize: { label: 'Singles', playersPerTeam: 1, substitutes: 0 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc_tennis_park',
      privacy: 'public',
      createdBy: 'user_003',
      teams: [
        {
          id: 'team_005',
          name: 'Player 1',
          players: [{ id: 'p_015', name: 'Alex', userId: 'user_015' }]
        },
        {
          id: 'team_006',
          name: 'Player 2',
          players: [{ id: 'p_016', name: 'Jordan', userId: 'user_016' }]
        }
      ],
      rules: getDefaultPreset(SportType.Tennis).rules,
      score: {
        teamAScore: 2,
        teamBScore: 1,
        setScores: [
          [6, 4],
          [4, 6],
          [6, 3]
        ],
        winner: 'A'
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Live match (in progress)
    {
      id: 'match_004',
      sport: SportType.Basketball,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '3v3', playersPerTeam: 3, substitutes: 1 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.InProgress,
      date: new Date().toISOString(),
      locationId: 'loc_basketball_eastside',
      privacy: 'public',
      createdBy: 'user_001',
      teams: [
        {
          id: 'team_007',
          name: 'Team A',
          players: [
            { id: 'p_017', name: 'Tom', userId: 'user_017' },
            { id: 'p_018', name: 'Jerry', userId: 'user_018' }
          ]
        },
        {
          id: 'team_008',
          name: 'Team B',
          players: [
            { id: 'p_019', name: 'Spike', userId: 'user_019' },
            { id: 'p_020', name: 'Tyke', userId: 'user_020' }
          ]
        }
      ],
      rules: getDefaultPreset(SportType.Basketball).rules,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Casual volleyball with unregistered player
    {
      id: 'match_005',
      sport: SportType.Volleyball,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '6v6', playersPerTeam: 6, substitutes: 2 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc_volleyball_beach',
      privacy: 'public',
      createdBy: 'user_004',
      teams: [
        {
          id: 'team_009',
          name: 'Team A',
          players: [
            { id: 'p_021', name: 'Lisa', userId: 'user_021' },
            { id: 'p_022', name: 'Anna', userId: 'user_022' },
            { id: 'p_023', name: 'Chris' } // No userId - unregistered
          ]
        },
        {
          id: 'team_010',
          name: 'Team B',
          players: [
            { id: 'p_024', name: 'Maria', userId: 'user_023' },
            { id: 'p_025', name: 'Sofia', userId: 'user_024' },
            { id: 'p_026', name: 'Nina', userId: 'user_025' }
          ]
        }
      ],
      rules: getDefaultPreset(SportType.Volleyball).rules,
      score: {
        teamAScore: 25,
        teamBScore: 22,
        winner: 'A'
      },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    // In-progress basketball match for live match testing
    {
      id: 'match_006',
      sport: SportType.Basketball,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: defaultTeamSize,
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.InProgress,
      date: new Date().toISOString(),
      locationId: 'loc_basketball_downtown',
      privacy: 'public',
      createdBy: 'user_001',
      teams: [
        {
          id: 'team_007',
          name: 'Warriors',
          players: [
            { id: 'p_101', name: 'Stephen', userId: 'user_101', jerseyNo: '30' },
            { id: 'p_102', name: 'Klay', userId: 'user_102', jerseyNo: '11' },
            { id: 'p_103', name: 'Draymond', userId: 'user_103', jerseyNo: '23' },
            { id: 'p_104', name: 'Andrew', userId: 'user_104', jerseyNo: '22' },
            { id: 'p_105', name: 'Kevon', userId: 'user_105', jerseyNo: '5' }
          ]
        },
        {
          id: 'team_008',
          name: 'Lakers',
          players: [
            { id: 'p_106', name: 'LeBron', userId: 'user_106', jerseyNo: '23' },
            { id: 'p_107', name: 'Anthony', userId: 'user_107', jerseyNo: '3' },
            { id: 'p_108', name: 'Austin', userId: 'user_108', jerseyNo: '0' },
            { id: 'p_109', name: 'Christian', userId: 'user_109', jerseyNo: '8' },
            { id: 'p_110', name: 'Jaxson', userId: 'user_110', jerseyNo: '2' }
          ]
        }
      ],
      rules: getDefaultPreset(SportType.Basketball).rules,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return matches;
}

/**
 * Generate player suggestions based on location
 * Returns list of players who have played at this location
 */
export function generateMockPlayerSuggestions(locationId: string): Array<{
  id: string;
  name: string;
  userId?: string;
  recentMatches: number;
}> {
  // Mock data: these players have played at various locations
  const allPlayers = [
    { id: 'p_001', name: 'John', userId: 'user_001', recentMatches: 5 },
    { id: 'p_002', name: 'Michael', userId: 'user_002', recentMatches: 3 },
    { id: 'p_003', name: 'Sarah', userId: 'user_003', recentMatches: 4 },
    { id: 'p_004', name: 'James', userId: 'user_004', recentMatches: 6 },
    { id: 'p_005', name: 'Emma', userId: 'user_005', recentMatches: 2 },
    { id: 'p_007', name: 'Carlos', userId: 'user_007', recentMatches: 7 },
    { id: 'p_008', name: 'Luis', userId: 'user_008', recentMatches: 5 },
    { id: 'p_015', name: 'Alex', userId: 'user_015', recentMatches: 3 },
    { id: 'p_017', name: 'Tom', userId: 'user_017', recentMatches: 4 },
    { id: 'p_021', name: 'Lisa', userId: 'user_021', recentMatches: 8 }
  ];

  // In a real app, this would query based on location
  // For now, return all players weighted by frequency
  return allPlayers.sort((a, b) => b.recentMatches - a.recentMatches);
}
