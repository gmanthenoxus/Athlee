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
  canProceedStep4: () => boolean;
  getAllTeamPlayerIds: () => string[];
  
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
  addTeamPlayer: (teamId: string, player: any) => void;
  removeTeamPlayer: (teamId: string, playerId: string) => void;
  updateTeamPlayer: (teamId: string, playerId: string, updates: Partial<any>) => void;
  updateTeamName: (teamId: string, name: string) => void;
  setRules: (rules: MatchRules) => void;
  updateRuleField: (path: string, value: any) => void;
  updateRulesFromPreset: (presetRules: MatchRules) => void;
  
  // Officials management
  setOfficials: (officials: MatchOfficials) => void;
  addReferee: (userId: string) => void;
  removeReferee: (userId: string) => void;
  setPrimaryRecorder: (userId: string) => void;
  addSecondaryRecorder: (userId: string) => void;
  removeSecondaryRecorder: (userId: string) => void;
  
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
  isLive: false,
  errors: {},
  isDraft: false,
  lastUpdated: new Date().toISOString()
};

export const useMatchSetupStore = create<MatchSetupState>((set, get) => ({
  session: { ...initialSession },

  // Queries
  getMatchTypes: (sport: SportType) => {
    return sportConfigService.getMatchTypes(sport);
  },

  getSubtypesForType: (sport: SportType, matchTypeId: string) => {
    const matchTypes = sportConfigService.getMatchTypes(sport);
    const matchType = matchTypes.find((t) => t.id === matchTypeId);
    return matchType?.subtypes || [];
  },

  canProceedStep2: () => {
    const { session } = get();
    
    if (!session.sport || !session.matchTypeId) return false;

    const matchTypes = sportConfigService.getMatchTypes(session.sport);
    const selectedType = matchTypes.find((t) => t.id === session.matchTypeId);

    if (!selectedType) return false;

    // If type has subtypes, require subtype selection
    if (selectedType.subtypes && selectedType.subtypes.length > 0) {
      if (!session.subtypeId) return false;
      const selectedSubtype = selectedType.subtypes.find((s) => s.id === session.subtypeId);
      if (!selectedSubtype) return false;

      // Check subtype requirements
      if (selectedSubtype.requiresTeamSize && !session.teamSize) return false;
      if (selectedSubtype.requiresStatIntensity && !session.statIntensity) return false;
      if (selectedSubtype.requiresBestOf && !session.bestOf) return false;
    } else {
      // Check type requirements if no subtypes
      if (selectedType.requiresTeamSize && !session.teamSize) return false;
      if (selectedType.requiresStatIntensity && !session.statIntensity) return false;
    }

    return true;
  },

  canProceedStep4: () => {
    const { session } = get();
    const { teams, mode, teamSize } = session;
    
    if (!teams || teams.length === 0) return false;
    if (!teamSize) return false;
    
    // Competitive mode validation
    if (mode === MatchMode.Competitive) {
      for (const team of teams) {
        // Must have minimum players
        if (team.players.length < teamSize.playersPerTeam) return false;
        
        // Count non-substitutes and captains
        const nonSubstitutes = team.players.filter((p) => !p.isSubstitute);
        const captains = team.players.filter((p) => p.isCaptain);
        
        // Must have exactly one captain
        if (captains.length !== 1) return false;
        
        // All non-substitutes must have jersey number AND position
        for (const player of nonSubstitutes) {
          if (!player.jerseyNo || !player.position) return false;
        }
      }
      return true;
    }
    
    // Casual mode: at least 1 player per team
    return teams.every((team) => team.players.length >= 1);
  },

  getAllTeamPlayerIds: () => {
    const { session } = get();
    return session.teams.flatMap((team) => team.players.map((p) => p.id));
  },

  // Actions
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
        ]
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
        // Clear dependent fields
        matchTypeId: undefined,
        subtypeId: undefined,
        teamSize: undefined,
        statIntensity: undefined,
        bestOf: undefined
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
      session: { ...state.session, mode }
    }));
  },

  setMatchTypeId: (matchTypeId: string) => {
    set((state) => ({
      session: {
        ...state.session,
        matchTypeId,
        // Clear dependent fields
        subtypeId: undefined,
        teamSize: undefined,
        statIntensity: undefined,
        bestOf: undefined
      }
    }));
  },

  setSubtypeId: (subtypeId: string | undefined) => {
    set((state) => ({
      session: {
        ...state.session,
        subtypeId,
        // Clear dependent fields
        teamSize: undefined,
        statIntensity: undefined,
        bestOf: undefined
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

  addTeamPlayer: (teamId: string, player: any) => {
    set((state) => ({
      session: {
        ...state.session,
        teams: state.session.teams.map((team) =>
          team.id === teamId
            ? { ...team, players: [...team.players, player] }
            : team
        )
      }
    }));
  },

  removeTeamPlayer: (teamId: string, playerId: string) => {
    set((state) => ({
      session: {
        ...state.session,
        teams: state.session.teams.map((team) =>
          team.id === teamId
            ? {
                ...team,
                players: team.players.filter((p) => p.id !== playerId)
              }
            : team
        )
      }
    }));
  },

  updateTeamPlayer: (teamId: string, playerId: string, updates: Partial<any>) => {
    set((state) => ({
      session: {
        ...state.session,
        teams: state.session.teams.map((team) =>
          team.id === teamId
            ? {
                ...team,
                players: team.players.map((p) => {
                  // If setting this player as captain, unset other captains in same team
                  if (updates.isCaptain === true && p.id !== playerId) {
                    return { ...p, isCaptain: false };
                  }
                  // Update the target player
                  if (p.id === playerId) {
                    return { ...p, ...updates };
                  }
                  return p;
                })
              }
            : team
        )
      }
    }));
  },

  updateTeamName: (teamId: string, name: string) => {
    set((state) => ({
      session: {
        ...state.session,
        teams: state.session.teams.map((team) =>
          team.id === teamId ? { ...team, name } : team
        )
      }
    }));
  },

  setRules: (rules: MatchRules) => {
    set((state) => ({
      session: { ...state.session, rules }
    }));
  },

  updateRuleField: (path: string, value: any) => {
    set((state) => {
      if (!state.session.rules) return state;

      const keys = path.split('.');
      const newRules = JSON.parse(JSON.stringify(state.session.rules));

      let current: any = newRules;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return {
        session: { ...state.session, rules: newRules }
      };
    });
  },

  updateRulesFromPreset: (presetRules: MatchRules) => {
    set((state) => ({
      session: { ...state.session, rules: presetRules }
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
        return state;
      }
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
        return state;
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
