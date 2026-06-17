/**
 * Mock XP Data
 * Generates mock XP profiles for testing and demonstration
 */

import { XPProfile, RankTitle, XPSource, XPEntry } from './xp-types';

/**
 * Generate mock XP profiles with various progression levels
 */
export function generateMockXPProfiles(): Record<string, XPProfile> {
  return {
    // User 1: Rookie (beginning player)
    'user_1': {
      userId: 'user_1',
      totalXP: 45,
      level: 1,
      rankTitle: RankTitle.Rookie,
      history: [
        {
          id: 'xp_1',
          userId: 'user_1',
          source: XPSource.MatchCompletion,
          amount: 10,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          description: 'Completed casual match',
          relatedId: 'match_1'
        },
        {
          id: 'xp_2',
          userId: 'user_1',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_2'
        },
        {
          id: 'xp_3',
          userId: 'user_1',
          source: XPSource.Badge,
          amount: 25,
          timestamp: new Date(Date.now() - 21600000).toISOString(),
          description: 'Earned First Match badge',
          relatedId: 'badge_first_match'
        }
      ],
      lastUpdated: new Date().toISOString()
    },

    // User 2: Contender (mid-level player)
    'user_2': {
      userId: 'user_2',
      totalXP: 350,
      level: 3,
      rankTitle: RankTitle.Contender,
      history: [
        {
          id: 'xp_4',
          userId: 'user_2',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 345600000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_5'
        },
        {
          id: 'xp_5',
          userId: 'user_2',
          source: XPSource.MatchWin,
          amount: 5,
          timestamp: new Date(Date.now() - 324000000).toISOString(),
          description: 'Won match',
          relatedId: 'match_5'
        },
        {
          id: 'xp_6',
          userId: 'user_2',
          source: XPSource.Badge,
          amount: 25,
          timestamp: new Date(Date.now() - 302400000).toISOString(),
          description: 'Earned Victorious badge',
          relatedId: 'badge_victorious'
        },
        {
          id: 'xp_7',
          userId: 'user_2',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_8'
        },
        {
          id: 'xp_8',
          userId: 'user_2',
          source: XPSource.MatchWin,
          amount: 5,
          timestamp: new Date(Date.now() - 216000000).toISOString(),
          description: 'Won match',
          relatedId: 'match_9'
        },
        {
          id: 'xp_9',
          userId: 'user_2',
          source: XPSource.Milestone,
          amount: 10,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          description: 'Reached 50 total points',
          relatedId: undefined
        },
        {
          id: 'xp_10',
          userId: 'user_2',
          source: XPSource.Badge,
          amount: 25,
          timestamp: new Date(Date.now() - 129600000).toISOString(),
          description: 'Earned Scorer badge',
          relatedId: 'badge_scorer'
        },
        {
          id: 'xp_11',
          userId: 'user_2',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_12'
        },
        {
          id: 'xp_12',
          userId: 'user_2',
          source: XPSource.MVP,
          amount: 20,
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          description: 'Awarded MVP',
          relatedId: 'match_12'
        },
        {
          id: 'xp_13',
          userId: 'user_2',
          source: XPSource.MatchWin,
          amount: 5,
          timestamp: new Date(Date.now() - 43200000).toISOString(),
          description: 'Won match',
          relatedId: 'match_12'
        },
        {
          id: 'xp_14',
          userId: 'user_2',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 21600000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_13'
        },
        {
          id: 'xp_15',
          userId: 'user_2',
          source: XPSource.Badge,
          amount: 25,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          description: 'Earned On Fire badge',
          relatedId: 'badge_on_fire'
        }
      ],
      lastUpdated: new Date().toISOString()
    },

    // User 3: All-Star (experienced player)
    'user_3': {
      userId: 'user_3',
      totalXP: 1250,
      level: 5,
      rankTitle: RankTitle.AllStar,
      history: [
        {
          id: 'xp_16',
          userId: 'user_3',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 604800000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_20'
        },
        {
          id: 'xp_17',
          userId: 'user_3',
          source: XPSource.MatchWin,
          amount: 5,
          timestamp: new Date(Date.now() - 604800000).toISOString(),
          description: 'Won match',
          relatedId: 'match_20'
        },
        {
          id: 'xp_18',
          userId: 'user_3',
          source: XPSource.MVP,
          amount: 20,
          timestamp: new Date(Date.now() - 604800000).toISOString(),
          description: 'Awarded MVP',
          relatedId: 'match_20'
        },
        {
          id: 'xp_19',
          userId: 'user_3',
          source: XPSource.Badge,
          amount: 25,
          timestamp: new Date(Date.now() - 518400000).toISOString(),
          description: 'Earned Champion badge',
          relatedId: 'badge_champion'
        },
        {
          id: 'xp_20',
          userId: 'user_3',
          source: XPSource.Milestone,
          amount: 10,
          timestamp: new Date(Date.now() - 432000000).toISOString(),
          description: 'Reached 100 total points',
          relatedId: undefined
        }
      ],
      lastUpdated: new Date().toISOString()
    },

    // User 4: Elite (very experienced)
    'user_4': {
      userId: 'user_4',
      totalXP: 6500,
      level: 7,
      rankTitle: RankTitle.Elite,
      history: [
        {
          id: 'xp_21',
          userId: 'user_4',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 1209600000).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_30'
        },
        {
          id: 'xp_22',
          userId: 'user_4',
          source: XPSource.MVP,
          amount: 20,
          timestamp: new Date(Date.now() - 1209600000).toISOString(),
          description: 'Awarded MVP',
          relatedId: 'match_30'
        }
      ],
      lastUpdated: new Date().toISOString()
    },

    // User 5: Legend (top-tier player)
    'user_5': {
      userId: 'user_5',
      totalXP: 25000,
      level: 10,
      rankTitle: RankTitle.Legend,
      history: [
        {
          id: 'xp_23',
          userId: 'user_5',
          source: XPSource.MatchCompletion,
          amount: 15,
          timestamp: new Date(Date.now() - 2.592e9).toISOString(),
          description: 'Completed competitive match',
          relatedId: 'match_50'
        },
        {
          id: 'xp_24',
          userId: 'user_5',
          source: XPSource.MVP,
          amount: 20,
          timestamp: new Date(Date.now() - 2.592e9).toISOString(),
          description: 'Awarded MVP',
          relatedId: 'match_50'
        }
      ],
      lastUpdated: new Date().toISOString()
    }
  };
}

/**
 * Initialize mock XP data in localStorage
 */
export function initializeMockXPData(): void {
  try {
    if (typeof localStorage === 'undefined') return;

    const mockProfiles = generateMockXPProfiles();
    Object.entries(mockProfiles).forEach(([userId, profile]) => {
      const key = `athlee_xp_profile_${userId}`;
      localStorage.setItem(key, JSON.stringify(profile));
    });

    console.log('✅ Mock XP data initialized for 5 users');
  } catch (error) {
    console.error('Failed to initialize mock XP data:', error);
  }
}

/**
 * Clear all mock XP data
 */
export function clearMockXPData(): void {
  try {
    if (typeof localStorage === 'undefined') return;

    const mockProfiles = generateMockXPProfiles();
    Object.keys(mockProfiles).forEach((userId) => {
      const key = `athlee_xp_profile_${userId}`;
      localStorage.removeItem(key);
    });

    console.log('✅ Mock XP data cleared');
  } catch (error) {
    console.error('Failed to clear mock XP data:', error);
  }
}
