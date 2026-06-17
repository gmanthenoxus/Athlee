/**
 * Mock American Football Matches
 * 
 * Sample American football match data for testing and development
 */

import {
  Match,
  MatchStatus,
  MatchMode,
  MatchType,
  StatIntensity,
} from './match-types';
import type { AmericanFootballMatchRules } from './match-types';
import { SportType } from './location-types';

export function generateMockAmericanFootballMatches(): Match[] {
  return [
    {
      id: 'foot-001',
      sport: SportType.American_Football,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '11v11', playersPerTeam: 11, substitutes: 11 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.Completed,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc-007',
      createdBy: 'user-007',
      teams: [
        {
          id: 'team-013',
          name: 'Midwest Chiefs',
          players: [
            { id: 'p53', name: 'Patrick Mahomes', jerseyNo: '15', position: 'QB' },
            { id: 'p54', name: 'Travis Kelce', jerseyNo: '87', position: 'TE' },
            { id: 'p55', name: 'Isiah Pacheco', jerseyNo: '10', position: 'RB' },
            { id: 'p56', name: 'Chris Jones', jerseyNo: '95', position: 'DE' },
            { id: 'p57', name: 'Orlando Brown Jr.', jerseyNo: '76', position: 'LT' },
            { id: 'p58', name: 'Mike Remmers', jerseyNo: '72', position: 'RT' },
            { id: 'p59', name: 'Joe Thuney', jerseyNo: '62', position: 'LG' },
            { id: 'p60', name: 'Austin Blythe', jerseyNo: '73', position: 'C' },
            { id: 'p61', name: 'Trey Smith', jerseyNo: '65', position: 'RG' },
            { id: 'p62', name: 'Kadarius Toney', jerseyNo: '19', position: 'WR' },
            { id: 'p63', name: 'Mecole Hardman', jerseyNo: '17', position: 'WR' },
          ],
        },
        {
          id: 'team-014',
          name: 'East Coast Eagles',
          players: [
            { id: 'p64', name: 'Jalen Hurts', jerseyNo: '1', position: 'QB' },
            { id: 'p65', name: 'A.J. Brown', jerseyNo: '11', position: 'WR' },
            { id: 'p66', name: 'Kenneth Gainwell', jerseyNo: '14', position: 'RB' },
            { id: 'p67', name: 'Brandon Graham', jerseyNo: '55', position: 'DE' },
            { id: 'p68', name: 'Lane Johnson', jerseyNo: '65', position: 'RT' },
            { id: 'p69', name: 'Jordan Mailata', jerseyNo: '68', position: 'LT' },
            { id: 'p70', name: 'Landon Dickerson', jerseyNo: '69', position: 'C' },
            { id: 'p71', name: 'Isaac Seumalo', jerseyNo: '73', position: 'LG' },
            { id: 'p72', name: 'Jack Driscoll', jerseyNo: '70', position: 'RG' },
            { id: 'p73', name: 'DeVonta Smith', jerseyNo: '6', position: 'WR' },
            { id: 'p74', name: 'Dallas Goedert', jerseyNo: '88', position: 'TE' },
          ],
        },
      ],
      rules: {
        presetName: 'NFL',
        quarterDuration: 15,
        quarters: 4,
        overtimeFormat: 'suddenDeath',
        twoPointConversion: true,
        timeoutsPerHalf: 3,
      } as AmericanFootballMatchRules,
      score: {
        teamAScore: 25,
        teamBScore: 22,
        setScores: [[3, 0], [10, 7], [2, 8], [10, 7]],
        winner: 'A',
      },
      privacy: 'public',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'foot-002',
      sport: SportType.American_Football,
      type: MatchType.Single,
      mode: MatchMode.Competitive,
      teamSize: { label: '11v11', playersPerTeam: 11, substitutes: 11 },
      statIntensity: StatIntensity.Advanced,
      status: MatchStatus.InProgress,
      date: new Date().toISOString(),
      locationId: 'loc-008',
      createdBy: 'user-008',
      teams: [
        {
          id: 'team-015',
          name: 'Lincoln Tigers',
          players: [
            { id: 'p75', name: 'Kyle Peterson', jerseyNo: '12', position: 'QB' },
            { id: 'p76', name: 'Jordan Williams', jerseyNo: '23', position: 'RB' },
            { id: 'p77', name: 'Tyler Martinez', jerseyNo: '55', position: 'LB' },
            { id: 'p78', name: 'Marcus Davis', jerseyNo: '78', position: 'OL' },
            { id: 'p79', name: 'Antonio Garcia', jerseyNo: '11', position: 'WR' },
            { id: 'p80', name: 'Kevin Brown', jerseyNo: '85', position: 'TE' },
            { id: 'p81', name: 'David Wilson', jerseyNo: '77', position: 'OL' },
            { id: 'p82', name: 'Michael Johnson', jerseyNo: '80', position: 'WR' },
            { id: 'p83', name: 'Christopher Lee', jerseyNo: '88', position: 'WR' },
            { id: 'p84', name: 'Daniel Rodriguez', jerseyNo: '42', position: 'DB' },
            { id: 'p85', name: 'Joseph Taylor', jerseyNo: '33', position: 'DB' },
          ],
        },
        {
          id: 'team-016',
          name: 'Roosevelt Ravens',
          players: [
            { id: 'p86', name: 'Marcus Johnson', jerseyNo: '7', position: 'QB' },
            { id: 'p87', name: 'Brandon Lewis', jerseyNo: '25', position: 'RB' },
            { id: 'p88', name: 'Anthony Davis', jerseyNo: '54', position: 'LB' },
            { id: 'p89', name: 'Robert Miller', jerseyNo: '75', position: 'OL' },
            { id: 'p90', name: 'James Anderson', jerseyNo: '18', position: 'WR' },
            { id: 'p91', name: 'Richard Jackson', jerseyNo: '82', position: 'TE' },
            { id: 'p92', name: 'Charles White', jerseyNo: '71', position: 'OL' },
            { id: 'p93', name: 'Eric Harris', jerseyNo: '84', position: 'WR' },
            { id: 'p94', name: 'Steven Martin', jerseyNo: '89', position: 'WR' },
            { id: 'p95', name: 'Mark Thompson', jerseyNo: '41', position: 'DB' },
            { id: 'p96', name: 'Paul Garcia', jerseyNo: '32', position: 'DB' },
          ],
        },
      ],
      rules: {
        presetName: 'High School',
        quarterDuration: 12,
        quarters: 4,
        overtimeFormat: 'suddenDeath',
        twoPointConversion: true,
        timeoutsPerHalf: 3,
      } as AmericanFootballMatchRules,
      score: {
        teamAScore: 20,
        teamBScore: 14,
        setScores: [[7, 0], [0, 7], [6, 7], [7, 0]],
      },
      privacy: 'public',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'foot-003',
      sport: SportType.American_Football,
      type: MatchType.Single,
      mode: MatchMode.Casual,
      teamSize: { label: '7v7', playersPerTeam: 7, substitutes: 3 },
      statIntensity: StatIntensity.Basic,
      status: MatchStatus.Scheduled,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      locationId: 'loc-009',
      createdBy: 'user-009',
      teams: [
        {
          id: 'team-017',
          name: 'Park Guardians',
          players: [
            { id: 'p97', name: 'Alex Rivera', jerseyNo: '3', position: 'QB' },
            { id: 'p98', name: 'Sam Thompson', jerseyNo: '24', position: 'RB' },
            { id: 'p99', name: 'Casey Johnson', jerseyNo: '51', position: 'LB' },
            { id: 'p100', name: 'Jordan Lee', jerseyNo: '15', position: 'WR' },
            { id: 'p101', name: 'Morgan Davis', jerseyNo: '40', position: 'DB' },
            { id: 'p102', name: 'Riley Martinez', jerseyNo: '77', position: 'OL' },
            { id: 'p103', name: 'Taylor Garcia', jerseyNo: '80', position: 'WR' },
          ],
        },
        {
          id: 'team-018',
          name: 'Field Fury',
          players: [
            { id: 'p104', name: 'Chris Anderson', jerseyNo: '5', position: 'QB' },
            { id: 'p105', name: 'Pat Wilson', jerseyNo: '22', position: 'RB' },
            { id: 'p106', name: 'Logan Brown', jerseyNo: '52', position: 'LB' },
            { id: 'p107', name: 'Ivy Garcia', jerseyNo: '14', position: 'WR' },
            { id: 'p108', name: 'Quinn Harris', jerseyNo: '43', position: 'DB' },
            { id: 'p109', name: 'River Jackson', jerseyNo: '75', position: 'OL' },
            { id: 'p110', name: 'Sky Martinez', jerseyNo: '81', position: 'WR' },
          ],
        },
      ],
      rules: {
        presetName: 'Flag Football',
        quarterDuration: 12,
        quarters: 4,
        overtimeFormat: 'none',
        twoPointConversion: true,
        timeoutsPerHalf: 2,
      } as AmericanFootballMatchRules,
      privacy: 'public',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export default generateMockAmericanFootballMatches();
