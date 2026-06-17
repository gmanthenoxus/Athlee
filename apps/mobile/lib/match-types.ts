import { SportType } from './location-types';

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
 * Match mode - determines rules and validation
 */
export enum MatchMode {
  Casual = 'Casual',           // Simple logging, minimal validation
  Competitive = 'Competitive'  // Requires jersey numbers, strict validation
}

/**
 * Stat intensity levels
 */
export enum StatIntensity {
  Basic = 'Basic',                     // Points only
  Advanced = 'Advanced',               // Points, Rebounds, Assists, Steals, Blocks
  Professional = 'Professional',       // Advanced + Shooting Splits
  Custom = 'Custom'                    // Custom tracked stats
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
 * Scoring system variant
 */
export enum ScoringSystem {
  Standard = 'Standard',       // 2pt, 3pt (basketball)
  Streetball = 'Streetball',   // 1pt, 2pt
  PointBased = 'PointBased',   // First to N points
  SetBased = 'SetBased'        // Sets/games
}

/**
 * Team size configuration
 */
export interface TeamSizeConfig {
  label: string;              // e.g., "5v5"
  playersPerTeam: number;
  substitutes: number;
}

/**
 * Match subtype configuration (e.g., H.O.R.S.E., Best of, King of Court)
 */
export interface MatchSubtypeConfig {
  id: string;                  // e.g., "horse", "best-of", "king-court"
  name: string;                // Display name
  description: string;         // Description for UI
  enabled: boolean;            // Whether this subtype is available
  requiresTeamSize: boolean;   // Whether team size selection is shown
  teamSizes?: TeamSizeConfig[]; // Available team sizes for this subtype
  fixedTeamSize?: string;      // e.g., "1v1" for H.O.R.S.E. (if fixed)
  requiresStatIntensity: boolean; // Whether stat intensity selection is shown
  statIntensities?: StatIntensity[]; // Available stat intensities
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
  teamSizes?: TeamSizeConfig[]; // Available team sizes for this type
  requiresStatIntensity: boolean; // Whether stat intensity is relevant
  statIntensities?: StatIntensity[]; // Available stat intensities
  defaultTeamSize?: string;    // e.g., "5v5"
  defaultStatIntensity?: StatIntensity;
  tooltip?: string;            // For disabled types (e.g., "Coming soon")
}

/**
 * A player participating in a match
 */
export interface MatchPlayer {
  id: string;                  // Unique ID for this match player
  name: string;                // Player name
  userId?: string;             // Link to registered user (if applicable)
  avatarUrl?: string;          // Profile avatar URL (for display)
  jerseyNo?: string;           // Jersey number (for competitive matches)
  position?: string;           // Player position (e.g., "PG", "SG")
  isCaptain?: boolean;         // Whether player is captain
  isSubstitute?: boolean;      // Whether player is a substitute
  claimed?: boolean;           // Whether unregistered player claimed account
}

/**
 * Player suggestion with context-based ranking
 */
export interface PlayerSuggestion extends MatchPlayer {
  category: 'friend' | 'regular' | 'sport' | 'nearby' | 'suggested';
  rankingScore: number;        // Higher = more relevant
  mutualFriendsCount?: number; // Number of mutual friends
  recentMatches?: number;      // How many matches at this location
  isFriend?: boolean;
  isRegular?: boolean;
  nearbyScore?: number;        // Distance-based score
}

/**
 * Context for player suggestions
 */
export interface PlayerSuggestionContext {
  currentUserId: string;
  locationId?: string;
  sport?: SportType;
  searchQuery?: string;
  excludePlayerIds?: string[]; // Players already added to teams
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
  presetName: string;          // Name of rule preset (e.g., "FIBA", "NBA", "Streetball", "Custom")
  
  // TIMING TAB
  gameFormat: 'timed' | 'firstTo' | 'untimed';  // Primary decision point
  
  // If gameFormat = 'timed'
  periodStructure?: 'quarters' | 'halves';      // e.g., "Quarters" or "Halves"
  periodDuration?: number;                      // Minutes per period (8, 10, 12, 15, 20)
  overtimeFormat?: '5min' | '7min' | '10min' | 'none';  // Overtime duration
  
  // If gameFormat = 'firstTo'
  winningScore?: number;                        // Points to win (11, 15, 21, 25, 30, or custom)
  winByTwo?: boolean;                           // Must win by 2 points?
  overtimeLimit?: number;                       // Max score in overtime (0 = none)
  
  // Always visible
  shotClock: '24' | '30' | '35' | 'none';       // Shot clock duration
  
  // SCORING TAB
  pointsInside: 1 | 2 | 3;                      // Points for inside basket
  pointsOutside: 2 | 3 | 4;                     // Points for outside basket (3-pointer)
  freeThrowValue: 1 | 2 | 'none';               // Points per free throw
  
  // FOULS TAB
  personalFoulLimit: '4' | '5' | '6' | 'none';  // Fouls before ejection
  teamFoulLimit: '4perQtr' | '5perQtr' | '7perHalf' | '5perHalf' | 'none';  // Team foul limit
  bonusAfter: '4' | '5' | '7' | 'none';         // Bonus after N fouls
  technicalFoulValue: '1ftPos' | '2ftPos' | '1ftOnly' | 'none';  // Technical foul consequence
  flagrantFoulPenalty: '2ftPos' | 'ejection2ft' | 'none';  // Flagrant foul penalty
  
  // VIOLATIONS TAB
  backcourt: '8' | '10' | 'none';               // Backcourt violation time
  threeSecondViolation: 'defensive3' | 'offensive3' | 'both' | 'none';  // 3-second rule
  goaltendingAllowed: boolean;                  // Is goaltending allowed?
  travelingCalled: boolean;                     // Is traveling called?
  doubleDribbleCalled: boolean;                 // Is double dribble called?
  
  // GAMEPLAY TAB
  timeoutStructure: 'fiba' | 'nba' | 'ncaa' | 'hs' | 'custom' | 'none';  // Timeout preset
  customTimeoutsPerHalf?: number;               // If custom: timeouts per half (0-10)
  customTimeoutsPerOT?: number;                 // If custom: timeouts per OT (0-5)
  customTimeoutsCanCarryOver?: boolean;         // If custom: can they carry over?
  customTimeoutDuration?: '30' | '60' | '75' | '100';  // If custom: timeout duration in seconds
  
  substitutions: 'unlimited' | 'limited7' | 'limited10' | 'hockey' | 'none';  // Substitution rules
  shotClockResetAfter: 'made' | 'rim' | 'none';  // When does shot clock reset?
  jumpBallRule: 'tipoff' | 'alternating' | 'alwaysJump';  // Jump ball handling
  
  // HOUSE RULES (read-only from location)
  houseRules?: string[];                        // Array of house rules from location
  
  // User custom notes
  unwrittenRules?: string;                      // Free text for local customs/rules
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
  notes?: string;              // Optional notes/commentary
  createdAt: string;           // ISO datetime when created
  updatedAt: string;           // ISO datetime of last update
  teamSize?: TeamSizeConfig;   // Team size for this match
  statIntensity?: StatIntensity; // Stat tracking intensity
}

/**
 * Temporary session for match creation (not persisted unless persisted by Zustand)
 */
export interface MatchSetupSession {
  userId: string;              // Current user ID
  step: number;                // Current wizard step (0-6)
  sport?: SportType;
  matchTypeId?: string;        // ID of selected match type
  subtypeId?: string;          // ID of selected subtype (if applicable)
  matchType?: MatchType;       // For backwards compatibility
  mode?: MatchMode;
  teamSize?: TeamSizeConfig;   // Selected team size
  statIntensity?: StatIntensity; // Selected stat intensity
  bestOf?: number;             // Best of 3 or 5 for series matches
  locationId?: string;
  date?: string;               // ISO datetime
  teams: Team[];
  rules?: MatchRules;
  isLive: boolean;             // true for live match, false for logging past
  errors: Record<string, string>; // Validation errors by step
  isDraft?: boolean;           // Whether this is a draft session
  lastUpdated?: string;        // ISO datetime of last update
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
