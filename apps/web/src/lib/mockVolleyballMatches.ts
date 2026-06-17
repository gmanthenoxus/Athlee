/**
 * Mock Volleyball Matches
 * 
 * Sample volleyball match data for testing and development
 */

import {
  Match,
  MatchStatus,
  MatchMode,
  MatchType,
  StatIntensity,
} from './match-types';
import type { VolleyballMatchRules } from './match-types';
import { SportType } from './location-types';

export function generateMockVolleyballMatches(): Match[] {
  return [
    {
      id: 'vol-001',
      sport: SportType.Volleyball,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '6v6', playersPerTeam: 6, substitutes: 6 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc-001',
      createdBy: 'user-001',
      teams: [
        {
          id: 'team-001',
          name: 'Golden State Crushers',
          players: [
            { id: 'p1', name: 'Alex Johnson', jerseyNo: '1', position: 'Middle' },
            { id: 'p2', name: 'Maria Garcia', jerseyNo: '2', position: 'Setter' },
            { id: 'p3', name: 'Jordan Lee', jerseyNo: '3', position: 'Outside' },
            { id: 'p4', name: 'Sam Torres', jerseyNo: '4', position: 'Outside' },
            { id: 'p5', name: 'Casey Smith', jerseyNo: '5', position: 'Libero' },
            { id: 'p6', name: 'Taylor Davis', jerseyNo: '6', position: 'Middle' },
          ],
        },
        {
          id: 'team-002',
          name: 'Bay Area Titans',
          players: [
            { id: 'p7', name: 'Riley Brown', jerseyNo: '1', position: 'Middle' },
            { id: 'p8', name: 'Morgan White', jerseyNo: '2', position: 'Setter' },
            { id: 'p9', name: 'Jordan Martinez', jerseyNo: '3', position: 'Outside' },
            { id: 'p10', name: 'Casey Anderson', jerseyNo: '4', position: 'Outside' },
            { id: 'p11', name: 'Alex Taylor', jerseyNo: '5', position: 'Libero' },
            { id: 'p12', name: 'Jordan Robinson', jerseyNo: '6', position: 'Middle' },
          ],
        },
      ],
      rules: {
        presetName: 'FIVB',
        setsToWin: 3,
        pointsPerSet: 25,
        winByTwo: true,
        rallyScoring: true,
        liberoAllowed: true,
      } as VolleyballMatchRules,
      score: {
        teamAScore: 3,
        teamBScore: 1,
        setScores: [[25, 20], [22, 25], [25, 19], [25, 18]],
        winner: 'A',
      },
      privacy: 'public',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'vol-002',
      sport: SportType.Volleyball,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '2v2 Beach', playersPerTeam: 2, substitutes: 2 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.InProgress,
      date: new Date().toISOString(),
      locationId: 'loc-002',
      createdBy: 'user-002',
      teams: [
        {
          id: 'team-003',
          name: 'Sand Sharks',
          players: [
            { id: 'p13', name: 'Emma Wilson', jerseyNo: '1', position: 'All' },
            { id: 'p14', name: 'Lucas Gonzalez', jerseyNo: '2', position: 'All' },
          ],
        },
        {
          id: 'team-004',
          name: 'Wave Riders',
          players: [
            { id: 'p15', name: 'Sophie Chen', jerseyNo: '1', position: 'All' },
            { id: 'p16', name: 'Ethan Kelly', jerseyNo: '2', position: 'All' },
          ],
        },
      ],
      rules: {
        presetName: 'Beach',
        setsToWin: 2,
        pointsPerSet: 21,
        winByTwo: true,
        rallyScoring: true,
        liberoAllowed: false,
      } as VolleyballMatchRules,
      score: {
        teamAScore: 1,
        teamBScore: 0,
        setScores: [[21, 15]],
      },
      privacy: 'public',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'vol-003',
      sport: SportType.Volleyball,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '6v6', playersPerTeam: 6, substitutes: 6 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Scheduled,
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc-003',
      createdBy: 'user-003',
      teams: [
        {
          id: 'team-005',
          name: 'Lincoln Wildcats',
          players: [
            { id: 'p17', name: 'Grace Park', jerseyNo: '1', position: 'Middle' },
            { id: 'p18', name: 'Brandon Lee', jerseyNo: '2', position: 'Setter' },
            { id: 'p19', name: 'Jessica Chen', jerseyNo: '3', position: 'Outside' },
            { id: 'p20', name: 'Marcus Johnson', jerseyNo: '4', position: 'Outside' },
            { id: 'p21', name: 'Olivia Martinez', jerseyNo: '5', position: 'Libero' },
            { id: 'p22', name: 'Kevin Garcia', jerseyNo: '6', position: 'Middle' },
          ],
        },
        {
          id: 'team-006',
          name: 'Roosevelt Rough Riders',
          players: [
            { id: 'p23', name: 'Taylor Brown', jerseyNo: '1', position: 'Middle' },
            { id: 'p24', name: 'Nicholas Davis', jerseyNo: '2', position: 'Setter' },
            { id: 'p25', name: 'Hannah Wilson', jerseyNo: '3', position: 'Outside' },
            { id: 'p26', name: 'Samuel Anderson', jerseyNo: '4', position: 'Outside' },
            { id: 'p27', name: 'Sofia Taylor', jerseyNo: '5', position: 'Libero' },
            { id: 'p28', name: 'Jackson White', jerseyNo: '6', position: 'Middle' },
          ],
        },
      ],
      rules: {
        presetName: 'High School',
        setsToWin: 2,
        pointsPerSet: 25,
        winByTwo: true,
        rallyScoring: true,
        liberoAllowed: true,
      } as VolleyballMatchRules,
      privacy: 'public',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export default generateMockVolleyballMatches();
