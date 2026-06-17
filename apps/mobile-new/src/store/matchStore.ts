import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Match, MatchStatus, SportType, MatchMode, MatchType } from '../lib/match-types';

interface MatchState {
  matches: Match[];
  filteredMatches: Match[];
  selectedMatch: Match | null;

  // Actions
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  getMatches: (status?: MatchStatus) => Match[];
  getMatchById: (id: string) => Match | null;
  setSelectedMatch: (match: Match | null) => void;
}

const mockMatches: Match[] = [
  {
    id: 'match_1',
    sport: SportType.Basketball,
    type: MatchType.Single,
    mode: MatchMode.Casual,
    status: MatchStatus.Scheduled,
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    locationId: 'loc_1',
    createdBy: 'user_1',
    teams: [
      {
        id: 'team_a',
        name: 'Team A',
        players: [
          { id: 'p1', name: 'John' },
          { id: 'p2', name: 'Mike' },
        ],
      },
      {
        id: 'team_b',
        name: 'Team B',
        players: [
          { id: 'p3', name: 'Sarah' },
          { id: 'p4', name: 'Emma' },
        ],
      },
    ],
    rules: {
      scoringSystem: 'Standard',
      pointsToWin: 21,
      winByTwo: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useMatchStore = create<MatchState>()(
  persist(
    (set, get) => ({
      matches: mockMatches,
      filteredMatches: mockMatches,
      selectedMatch: null,

      setMatches: (matches: Match[]) => {
        set({ matches, filteredMatches: matches });
      },

      addMatch: (match: Match) => {
        const updated = [...get().matches, match];
        set({ matches: updated, filteredMatches: updated });
      },

      getMatches: (status?: MatchStatus): Match[] => {
        const all = get().matches;
        if (!status) return all;
        return all.filter((m) => m.status === status);
      },

      getMatchById: (id: string): Match | null => {
        return get().matches.find((m) => m.id === id) || null;
      },

      setSelectedMatch: (match: Match | null) => {
        set({ selectedMatch: match });
      },
    }),
    {
      name: 'match-store',
    }
  )
);
