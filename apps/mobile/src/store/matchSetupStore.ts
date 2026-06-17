import { create } from 'zustand';
import { MatchSetupSession, Team, MatchRules, MatchType, MatchMode, TeamSizeConfig, StatIntensity, MatchOfficials, MatchTypeConfig, MatchSubtypeConfig } from '@/lib/match-types';
import { SportType } from '@/lib/location-types';
import { sportConfigService } from '@/lib/sportConfigService';

/**
 * Match Setup Store - Manages temporary state for match creation wizard
 */
interface MatchSetupState {
  session: MatchSetupSession;
  
  // Queries
  getMatchTypes: (sport: SportType) => MatchTypeConfig[];
  getSubtypesForType: (sport: SportType, matchTypeId: string) => MatchSubtypeConfig[];
  canProceedStep2: () => boolean;
  
  // Actions
  initializeSession: (isLive?: boolean) => void;
  resetSession: () => void;
  setStep: (step: number) => void;
  setSport: (sport: SportType) => void;
  setMatchType: (type: MatchType, mode: MatchMode) => void;
  setMode: (mode: MatchMode) => void;
  setMatchTypeId: (matchTypeId: string) => void;
  setSubtypeId: (subtypeId: string | undefined) => void;
  setBestOf: (bestOf: number | undefined) => void;
  setTeamSize: (teamSize: TeamSizeConfig) => void;
  setStatIntensity: (intensity: StatIntensity) => void;
  setLocation: (locationId: string) => void;
  setDate: (date: string) => void;
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  removeTeam: (teamId: string) => void;
  setRules: (rules: MatchRules) => void;
  
  // Officials management
  setOfficials: (officials: MatchOfficials) => void;
  addReferee: (userId: string) => void;
  removeReferee: (userId: string) => void;
  setPrimaryRecorder: (userId: string) => void;
  addSecondaryRecorder: (userId: string) => void;
  removeSecondaryRecorder: (userId: string) => void;
  
  setSchedule: (schedule: Date | null) => void;
  setPrivacy: (privacy: 'public' | 'private' | 'invite') => void;
  setIsLive: (isLive: boolean) => void;
  setError: (step: number, error: string) => void;
  clearError: (step: number) => void;
  getSession: () => MatchSetupSession;
}

const initialSession: MatchSetupSession = {
  userId: 'current-user',
  step: 0,
  sport: undefined,
  matchTypeId: undefined,
  subtypeId: undefined,
  matchType: undefined,
  mode: undefined,
  teamSize: undefined,
  statIntensity: undefined,
  bestOf: undefined,
  locationId: undefined,
  date: new Date().toISOString(),
  teams: [
    {
      id: 'team_a',
      name: 'Team A',
      players: []
    },
    {
      id: 'team_b',
      name: 'Team B',
      players: []
    }
  ],
  rules: undefined,
  officials: undefined,
  schedule: null,
  privacy: 'public',
  isLive: false,
  isDraft: false,
  errors: {},
  lastUpdated: new Date()
};

export const useMatchSetupStore = create<MatchSetupState>((set, get) => ({
  session: { ...initialSession },

  // Query methods
  getMatchTypes: (sport: SportType): MatchTypeConfig[] => {
    return sportConfigService.getMatchTypes(sport);
  },

  getSubtypesForType: (sport: SportType, matchTypeId: string): MatchSubtypeConfig[] => {
    const matchTypes = sportConfigService.getMatchTypes(sport);
    const matchType = matchTypes.find(mt => mt.id === matchTypeId);
    return matchType?.subtypes || [];
  },

  canProceedStep2: (): boolean => {
    const { session } = get();
    const { sport, matchTypeId, subtypeId } = session;
    
    if (!sport || !matchTypeId) return false;
    
    // Get match type config
    const matchTypes = get().getMatchTypes(sport);
    const matchType = matchTypes.find(mt => mt.id === matchTypeId);
    if (!matchType) return false;
    
    // If type has subtypes, subtype must be selected
    if (matchType.subtypes && matchType.subtypes.length > 0 && !subtypeId) {
      return false;
    }
    
    // Get subtype config if applicable
    let requiresTeamSize = matchType.requiresTeamSize;
    let requiresStatIntensity = matchType.requiresStatIntensity;
    let requiresBestOf = false;
    
    if (subtypeId && matchType.subtypes) {
      const subtype = matchType.subtypes.find(st => st.id === subtypeId);
      if (subtype) {
        requiresTeamSize = subtype.requiresTeamSize;
        requiresStatIntensity = subtype.requiresStatIntensity;
        requiresBestOf = subtype.requiresBestOf || false;
      }
    }
    
    // Check all required fields are selected
    if (requiresTeamSize && !session.teamSize) return false;
    if (requiresStatIntensity && !session.statIntensity) return false;
    if (requiresBestOf && !session.bestOf) return false;
    
    return true;
  },

  initializeSession: (isLive = false) => {
    set({
      session: {
        ...initialSession,
        date: new Date().toISOString(),
        isLive,
        teams: [
          {
            id: 'team_a',
            name: 'Team A',
            players: []
          },
          {
            id: 'team_b',
            name: 'Team B',
            players: []
          }
        ],
        lastUpdated: new Date()
      }
    });
  },

  resetSession: () => {
    set({ session: { ...initialSession } });
  },

  setStep: (step: number) => {
    set((state) => ({
      session: { ...state.session, step }
    }));
  },

  setSport: (sport: SportType) => {
    set((state) => ({
      session: {
        ...state.session,
        sport,
        matchTypeId: undefined, // Reset match type when sport changes
        subtypeId: undefined,
        teamSize: undefined,
        statIntensity: undefined,
        bestOf: undefined,
      }
    }));
  },

  setMatchType: (type: MatchType, mode: MatchMode) => {
    set((state) => ({
      session: {
        ...state.session,
        matchType: type,
        mode
      }
    }));
  },

  setMode: (mode: MatchMode) => {
    set((state) => ({
      session: {
        ...state.session,
        mode
      }
    }));
  },

  setMatchTypeId: (matchTypeId: string) => {
    set((state) => ({
      session: {
        ...state.session,
        matchTypeId,
        subtypeId: undefined, // Reset subtype when match type changes
        teamSize: undefined,
        statIntensity: undefined,
        bestOf: undefined,
      }
    }));
  },

  setSubtypeId: (subtypeId: string | undefined) => {
    set((state) => ({
      session: {
        ...state.session,
        subtypeId,
        teamSize: undefined, // Reset dependent fields
        statIntensity: undefined,
        bestOf: undefined,
      }
    }));
  },

  setBestOf: (bestOf: number | undefined) => {
    set((state) => ({
      session: { ...state.session, bestOf }
    }));
  },

  setTeamSize: (teamSize: TeamSizeConfig) => {
    set((state) => ({
      session: { ...state.session, teamSize }
    }));
  },

  setStatIntensity: (intensity: StatIntensity) => {
    set((state) => ({
      session: { ...state.session, statIntensity: intensity }
    }));
  },

  setLocation: (locationId: string) => {
    set((state) => ({
      session: { ...state.session, locationId }
    }));
  },

  setDate: (date: string) => {
    set((state) => ({
      session: { ...state.session, date }
    }));
  },

  setTeams: (teams: Team[]) => {
    set((state) => ({
      session: { ...state.session, teams }
    }));
  },

  addTeam: (team: Team) => {
    set((state) => ({
      session: {
        ...state.session,
        teams: [...state.session.teams, team]
      }
    }));
  },

  removeTeam: (teamId: string) => {
    set((state) => ({
      session: {
        ...state.session,
        teams: state.session.teams.filter((t) => t.id !== teamId)
      }
    }));
  },

  setRules: (rules: MatchRules) => {
    set((state) => ({
      session: { ...state.session, rules }
    }));
  },

  setOfficials: (officials: MatchOfficials) => {
    set((state) => ({
      session: { ...state.session, officials }
    }));
  },

  addReferee: (userId: string) => {
    set((state) => {
      if (!state.session.officials) {
        return state; // Officials must be initialized first
      }
      // Avoid duplicates and limit to 3 referees
      if (state.session.officials.referees.includes(userId) || state.session.officials.referees.length >= 3) {
        return state;
      }
      return {
        session: {
          ...state.session,
          officials: {
            ...state.session.officials,
            referees: [...state.session.officials.referees, userId]
          }
        }
      };
    });
  },

  removeReferee: (userId: string) => {
    set((state) => {
      if (!state.session.officials) return state;
      return {
        session: {
          ...state.session,
          officials: {
            ...state.session.officials,
            referees: state.session.officials.referees.filter((id) => id !== userId)
          }
        }
      };
    });
  },

  setPrimaryRecorder: (userId: string) => {
    set((state) => {
      if (!state.session.officials) return state;
      return {
        session: {
          ...state.session,
          officials: {
            ...state.session.officials,
            primaryRecorder: userId
          }
        }
      };
    });
  },

  addSecondaryRecorder: (userId: string) => {
    set((state) => {
      if (!state.session.officials) return state;
      const secondaryRecorders = state.session.officials.secondaryRecorders || [];
      if (secondaryRecorders.includes(userId)) {
        return state; // Avoid duplicates
      }
      return {
        session: {
          ...state.session,
          officials: {
            ...state.session.officials,
            secondaryRecorders: [...secondaryRecorders, userId]
          }
        }
      };
    });
  },

  removeSecondaryRecorder: (userId: string) => {
    set((state) => {
      if (!state.session.officials) return state;
      const secondaryRecorders = state.session.officials.secondaryRecorders || [];
      return {
        session: {
          ...state.session,
          officials: {
            ...state.session.officials,
            secondaryRecorders: secondaryRecorders.filter((id) => id !== userId)
          }
        }
      };
    });
  },

  setSchedule: (schedule: Date | null) => {
    set((state) => ({
      session: { ...state.session, schedule }
    }));
  },

  setPrivacy: (privacy: 'public' | 'private' | 'invite') => {
    set((state) => ({
      session: { ...state.session, privacy }
    }));
  },

  setIsLive: (isLive: boolean) => {
    set((state) => ({
      session: { ...state.session, isLive }
    }));
  },

  setError: (step: number, error: string) => {
    set((state) => ({
      session: {
        ...state.session,
        errors: {
          ...state.session.errors,
          [`step_${step}`]: error
        }
      }
    }));
  },

  clearError: (step: number) => {
    set((state) => {
      const errors = { ...state.session.errors };
      delete errors[`step_${step}`];
      return {
        session: {
          ...state.session,
          errors
        }
      };
    });
  },

  getSession: () => get().session
}));
