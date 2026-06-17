import { SportType } from './location-types';

/**
 * Match type option in sport configuration
 */
export interface MatchTypeOption {
  type: MatchType;
  label?: string;
  enabled?: boolean;  // Default true if omitted
  description?: string;
}

/**
 * Match subtype configuration (e.g., HORSE, Best of, King of Court)
 */
export interface MatchSubtypeConfig {
  id: string;                  // e.g., "horse", "best-of", "king-court"
  name: string;                // Display name
  description: string;         // Description for UI
  enabled: boolean;            // Whether this subtype is available
  requiresTeamSize: boolean;   // Whether team size selection is shown
  fixedTeamSize?: string;      // e.g., "1v1" for HORSE (if fixed)
  requiresStatIntensity: boolean; // Whether stat intensity selection is shown
  defaultStatIntensity?: StatIntensity; // Default stat intensity for this subtype
  requiresBestOf?: boolean;    // For best-of series, show best-of toggle
  defaultBestOf?: number;      // 3 or 5
  icon?: string;               // Optional emoji icon
  tooltip?: string;            // For disabled subtypes (e.g., "Coming soon")
}

/**
 * Match type configuration (e.g., Single Game, Set-Based, Tournament, Rotational)
 */
export interface MatchTypeConfig {
  id: string;                  // e.g., "single", "set-based", "tournament"
  name: string;                // Display name
  description: string;         // Description for UI
  icon?: string;               // Optional emoji icon
  enabled: boolean;            // Whether this type is available
  subtypes?: MatchSubtypeConfig[]; // Subtypes if this type has variants
  requiresTeamSize: boolean;   // Whether team size selection is needed for this type
  requiresStatIntensity: boolean; // Whether stat intensity is relevant
  defaultTeamSize?: string;    // e.g., "5v5"
  defaultStatIntensity?: StatIntensity;
  tooltip?: string;            // For disabled types (e.g., "Coming soon")
}

/**
 * Sport configuration - metadata for a sport
 */
export interface SportConfig {
  sport: SportType;            // Sport type key
  enabled: boolean;            // Whether this sport is fully implemented
  icon: string;               // Icon emoji or URL
  displayName: string;        // Display name for UI
  description?: string;       // Optional description
  matchTypes: MatchTypeOption[];
  matchTypeConfigs?: MatchTypeConfig[]; // New: detailed match type configurations for Step 2
  teamSizeOptions: TeamSizeConfig[];
  statIntensities: StatIntensity[];
  rulePresets: RulePreset[];
  positions?: string[];
}

/**
 * Match type - determines format of match
 */
export enum MatchType {
  Single = 'Single',           // One-off match with final score
  SetBased = 'SetBased',       // Multiple sets (e.g., tennis, volleyball)
  Tournament = 'Tournament',   // Tournament bracket (placeholder)
  Rotational = 'Rotational'    // Rotating players (placeholder)
}

/**
 * Stat tracking intensity
 */
export enum StatIntensity {
  Basic = 'Basic',             // Points only
  Advanced = 'Advanced',       // Points, Rebounds, Assists, Steals, Blocks, etc.
  Professional = 'Professional', // Advanced + shooting splits (future)
  Custom = 'Custom'            // User-defined (future)
}

/**
 * Team size configuration
 */
export interface TeamSizeConfig {
  label: string;               // e.g., "5v5", "3v3"
  playersPerTeam: number;      // Players required per team (e.g., 5)
  substitutes: number;         // Maximum substitutes allowed (e.g., 7)
}

/**
 * Rule preset configuration
 */
export interface RulePreset {
  name: string;
  description: string;
  rules: MatchRules;
}

/**
 * Scoring system variant
 */
export enum ScoringSystem {
  Standard = 'Standard',       // 2pt, 3pt (basketball)
  Streetball = 'Streetball',   // 1pt, 2pt
  PointBased = 'PointBased',   // First to N points
  SetBased = 'SetBased'        // Sets/games
}

/**
 * A player participating in a match
 */
export interface MatchPlayer {
  id: string;                  // Unique ID for this match player
  name: string;                // Player name
  userId?: string;             // Link to registered user (if applicable)
  jerseyNo?: string;           // Jersey number (for competitive matches)
  claimed?: boolean;           // Whether unregistered player claimed account
}

/**
 * A team in a match
 */
export interface Team {
  id: string;                  // Team ID
  name: string;                // Team name (e.g., "Team A", "Custom Team")
  players: MatchPlayer[];      // Players on this team
}

/**
 * Rules configuration for a match
 */
export interface MatchRules {
  scoringSystem: ScoringSystem;
  pointsToWin: number;         // Points needed to win (e.g., 21)
  winByTwo: boolean;           // Must win by 2 points
  maxSets?: number;            // For set-based matches
  maxDuration?: number;        // Duration in minutes (optional)
  customRules?: string;        // Freeform custom rules
}

/**
 * Score for a completed match
 */
export interface MatchScore {
  teamAScore: number;          // Final score for Team A
  teamBScore: number;          // Final score for Team B
  setScores?: number[][];      // For set-based matches: array of [teamA, teamB] per set
  winner?: 'A' | 'B';          // Winning team
}

/**
 * Match mode - determines rules and validation
 */
export enum MatchMode {
  Casual = 'Casual',           // Simple logging, minimal validation
  Competitive = 'Competitive'  // Requires jersey numbers, strict validation
}

/**
 * Match status - current state of match
 */
export enum MatchStatus {
  Draft = 'Draft',             // Being created
  Scheduled = 'Scheduled',     // Created but not started
  InProgress = 'InProgress',   // Live match in progress
  Completed = 'Completed',     // Match finished with score
  Cancelled = 'Cancelled'      // Match cancelled
}

/**
 * Match schedule configuration
 */
export interface MatchSchedule {
  type: 'now' | 'scheduled' | 'draft';  // Schedule type
  scheduledTime?: string;                 // ISO datetime if type = scheduled
}

/**
 * Core Match interface
 */
export interface Match {
  id: string;                  // Unique match ID
  sport: SportType;            // Sport type
  type: MatchType;             // Match format
  mode: MatchMode;             // Casual or competitive
  status: MatchStatus;         // Current state
  date: string;                // ISO datetime when match occurred or is scheduled
  locationId?: string;         // Reference to Location ID
  createdBy: string;           // User ID who created match
  teams: Team[];               // Array of teams (usually 2)
  rules: MatchRules;           // Match rules
  score?: MatchScore;          // Score if completed
  privacy: 'public' | 'private' | 'invite';  // Privacy setting
  schedule?: MatchSchedule;    // Schedule configuration
  notes?: string;              // Optional notes/commentary
  createdAt: string;           // ISO datetime when created
  updatedAt: string;           // ISO datetime of last update
}

/**
 * Officials for competitive matches
 */
export interface MatchOfficials {
  referees: string[];              // User IDs of referees (1-3 recommended)
  primaryRecorder: string;         // User ID of primary stat recorder (defaults to match creator)
  secondaryRecorders?: string[];   // User IDs of secondary recorders (future use)
}

/**
 * Temporary session for match creation (not persisted)
 */
export interface MatchSetupSession {
  userId?: string;             // User creating the match
  step: number;                // Current wizard step (0-6)
  sport?: SportType;
  matchTypeId?: string;        // ID of selected match type (e.g., "single", "set-based")
  subtypeId?: string;          // ID of selected subtype (e.g., "horse", "best-of")
  matchType?: MatchType;       // Legacy field, kept for compatibility
  mode?: MatchMode;
  teamSize?: TeamSizeConfig;
  statIntensity?: StatIntensity;
  bestOf?: number;             // For best-of series: 3 or 5
  locationId?: string;
  date?: string;               // ISO datetime
  teams: Team[];
  rules?: MatchRules;
  officials?: MatchOfficials;  // Officials for competitive matches (Step 6)
  schedule?: Date | null;      // null means play now
  privacy?: 'public' | 'private' | 'invite';
  isLive?: boolean;            // true for live match, false for logging past
  isDraft?: boolean;
  errors: Record<string, string>; // Validation errors by step
  lastUpdated?: Date;
}

/**
 * Match filters for querying
 */
export interface MatchFilters {
  userId?: string;             // Matches involving user
  createdBy?: string;          // Matches created by user
  sport?: SportType;
  status?: MatchStatus;
  locationId?: string;
  from?: string;               // ISO datetime range start
  to?: string;                 // ISO datetime range end
}

/**
 * Regular player suggestion
 */
export interface PlayerSuggestion {
  id: string;
  name: string;
  userId?: string;
  recentMatches?: number;      // How many matches at this location
}
