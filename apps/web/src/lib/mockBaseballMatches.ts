/**
 * Mock Baseball Matches
 * 
 * Sample baseball match data for testing and development
 */

import {
  Match,
  MatchStatus,
  MatchMode,
  MatchType,
  StatIntensity,
} from './match-types';
import type { BaseballMatchRules } from './match-types';
import { SportType } from './location-types';

export function generateMockBaseballMatches(): Match[] {
  return [
    {
      id: 'base-001',
      sport: SportType.Baseball,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '9v9', playersPerTeam: 9, substitutes: 6 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc-004',
      createdBy: 'user-004',
      teams: [
        {
          id: 'team-007',
          name: 'City Giants',
          players: [
            { id: 'p29', name: 'Derek Rodriguez', jerseyNo: '1', position: 'P' },
            { id: 'p30', name: 'Brandon Hayes', jerseyNo: '2', position: 'C' },
            { id: 'p31', name: 'Cody Mitchell', jerseyNo: '3', position: 'SS' },
            { id: 'p32', name: 'Tyler Jenkins', jerseyNo: '4', position: '2B' },
            { id: 'p33', name: 'Lucas Flores', jerseyNo: '5', position: '3B' },
            { id: 'p34', name: 'Marcus Davis', jerseyNo: '6', position: '1B' },
            { id: 'p35', name: 'Antonio Kim', jerseyNo: '7', position: 'LF' },
            { id: 'p36', name: 'Vincent Park', jerseyNo: '8', position: 'CF' },
            { id: 'p37', name: 'Benjamin Stone', jerseyNo: '9', position: 'RF' },
          ],
        },
        {
          id: 'team-008',
          name: 'Coastal Waves',
          players: [
            { id: 'p38', name: 'Mike Patterson', jerseyNo: '1', position: 'P' },
            { id: 'p39', name: 'James Robinson', jerseyNo: '2', position: 'C' },
            { id: 'p40', name: 'Victor Santiago', jerseyNo: '3', position: 'SS' },
            { id: 'p41', name: 'Andrew Chen', jerseyNo: '4', position: '2B' },
            { id: 'p42', name: 'Kevin Alexander', jerseyNo: '5', position: '3B' },
            { id: 'p43', name: 'David Walsh', jerseyNo: '6', position: '1B' },
            { id: 'p44', name: 'Matthew Grant', jerseyNo: '7', position: 'LF' },
            { id: 'p45', name: 'Jonathan Price', jerseyNo: '8', position: 'CF' },
            { id: 'p46', name: 'Samuel Cooper', jerseyNo: '9', position: 'RF' },
          ],
        },
      ],
      rules: {
        presetName: 'MLB',
        innings: 9,
        designatedHitter: true,
        extraInningsFormat: 'runnerOnSecond',
      } as BaseballMatchRules,
      score: {
        teamAScore: 7,
        teamBScore: 4,
        setScores: [[0, 0], [1, 0], [2, 1], [2, 1], [1, 0], [1, 2], [0, 0], [0, 0], [0, 0]],
        winner: 'A',
      },
      privacy: 'public',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'base-002',
      sport: SportType.Baseball,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '7v7', playersPerTeam: 7, substitutes: 3 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.InProgress,
      date: new Date().toISOString(),
      locationId: 'loc-005',
      createdBy: 'user-005',
      teams: [
        {
          id: 'team-009',
          name: 'Riverside Warriors',
          players: [
            { id: 'p47', name: 'Emma Thompson', jerseyNo: '1', position: 'P' },
            { id: 'p48', name: 'Liam Garcia', jerseyNo: '2', position: 'C' },
            { id: 'p49', name: 'Sophia Rodriguez', jerseyNo: '3', position: 'SS' },
            { id: 'p50', name: 'Ethan Brown', jerseyNo: '4', position: '2B' },
            { id: 'p51', name: 'Olivia Martinez', jerseyNo: '5', position: 'OF' },
            { id: 'p52', name: 'Noah Garcia', jerseyNo: '6', position: 'OF' },
            { id: 'p53', name: 'Charlotte Taylor', jerseyNo: '7', position: 'OF' },
          ],
        },
        {
          id: 'team-010',
          name: 'Central Eagles',
          players: [
            { id: 'p54', name: 'Noah Carter', jerseyNo: '1', position: 'P' },
            { id: 'p55', name: 'Charlotte Martinez', jerseyNo: '2', position: 'C' },
            { id: 'p56', name: 'Mason Lee', jerseyNo: '3', position: 'SS' },
            { id: 'p57', name: 'Isabella Chen', jerseyNo: '4', position: '2B' },
            { id: 'p58', name: 'Lucas Johnson', jerseyNo: '5', position: 'OF' },
            { id: 'p59', name: 'Ava Davis', jerseyNo: '6', position: 'OF' },
            { id: 'p60', name: 'Ethan Miller', jerseyNo: '7', position: 'OF' },
          ],
        },
      ],
      rules: {
        presetName: 'Little League',
        innings: 6,
        designatedHitter: false,
        mercyRule: { runDifference: 10, afterInning: 4 },
        extraInningsFormat: 'standard',
      } as BaseballMatchRules,
      score: {
        teamAScore: 3,
        teamBScore: 2,
        setScores: [[1, 0], [0, 1], [2, 1], [0, 0]],
      },
      privacy: 'public',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'base-003',
      sport: SportType.Baseball,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '9v9', playersPerTeam: 9, substitutes: 6 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Scheduled,
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc-006',
      createdBy: 'user-006',
      teams: [
        {
          id: 'team-011',
          name: 'UC Bears',
          players: [
            { id: 'p61', name: 'Aaron Martinez', jerseyNo: '1', position: 'P' },
            { id: 'p62', name: 'Benjamin Wong', jerseyNo: '2', position: 'C' },
            { id: 'p63', name: 'Christopher Davis', jerseyNo: '3', position: 'SS' },
            { id: 'p64', name: 'Daniel Wilson', jerseyNo: '4', position: '2B' },
            { id: 'p65', name: 'Ethan Anderson', jerseyNo: '5', position: '3B' },
            { id: 'p66', name: 'Fredrick Jones', jerseyNo: '6', position: '1B' },
            { id: 'p67', name: 'Gregory Brown', jerseyNo: '7', position: 'OF' },
            { id: 'p68', name: 'Henry Taylor', jerseyNo: '8', position: 'OF' },
            { id: 'p69', name: 'Isaac White', jerseyNo: '9', position: 'OF' },
          ],
        },
        {
          id: 'team-012',
          name: 'State Spartans',
          players: [
            { id: 'p70', name: 'Jack Harris', jerseyNo: '1', position: 'P' },
            { id: 'p71', name: 'Kevin Martin', jerseyNo: '2', position: 'C' },
            { id: 'p72', name: 'Lucas Thompson', jerseyNo: '3', position: 'SS' },
            { id: 'p73', name: 'Michael Garcia', jerseyNo: '4', position: '2B' },
            { id: 'p74', name: 'Nicholas Lee', jerseyNo: '5', position: '3B' },
            { id: 'p75', name: 'Oliver Rodriguez', jerseyNo: '6', position: '1B' },
            { id: 'p76', name: 'Patrick Kim', jerseyNo: '7', position: 'OF' },
            { id: 'p77', name: 'Quentin Davis', jerseyNo: '8', position: 'OF' },
            { id: 'p78', name: 'Ryan Johnson', jerseyNo: '9', position: 'OF' },
          ],
        },
      ],
      rules: {
        presetName: 'College',
        innings: 9,
        designatedHitter: true,
        extraInningsFormat: 'standard',
      } as BaseballMatchRules,
      privacy: 'public',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export default generateMockBaseballMatches();
