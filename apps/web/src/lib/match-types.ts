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
 * Scoring system variant
 */
export enum ScoringSystem {
  Standard = 'Standard',       // 2pt, 3pt (basketball)
  Streetball = 'Streetball',   // 1pt, 2pt
  PointBased = 'PointBased',   // First to N points
  SetBased = 'SetBased'        // Sets/games
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
 * Team size configuration
 */
export interface TeamSizeConfig {
  label: string;               // e.g., "5v5", "3v3"
  playersPerTeam: number;      // Players required per team (e.g., 5)
  substitutes: number;         // Maximum substitutes allowed (e.g., 7)
}

/**
 * Rules configuration for a match
 */
export interface MatchRules {
  presetName: string;          // Name of rule preset (e.g., "FIBA", "NBA", "Streetball", "Custom")
  scoringSystem?: ScoringSystem;  // Scoring system variant (optional for backwards compatibility)
  pointsToWin?: number;           // Points needed to win (optional)
  maxDuration?: number;           // Max match duration in minutes (optional)
  customRules?: string;           // Free text for custom rules (optional)
  
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
  shotClock: '12' | '24' | '30' | '35' | 'none';       // Shot clock duration
  
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
 * Soccer-specific match rules (extends or replaces MatchRules for soccer sport)
 */
export interface SoccerMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "FIFA Standard", "Youth")
  halfDuration: number;                         // Minutes per half (e.g., 45, 40, 35, 30)
  halves: number;                               // Number of halves (usually 2)
  extraTime: boolean;                           // Extra time option
  penalties: boolean;                           // Penalty shootout option
  offside: boolean;                             // Offside rule enabled
  substitutionRule: 'unlimited' | 'limited' | 'rolling';  // Substitution type
  maxSubstitutions?: number;                    // If limited: max subs per match
  pointsSystem: {
    win: number;                                // Points for win (usually 3)
    draw: number;                               // Points for draw (usually 1)
    loss: number;                               // Points for loss (usually 0)
  };
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * Tennis-specific match rules
 */
export interface TennisMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "Standard ATP/WTA", "No-Ad")
  bestOfSets: number;                           // E.g., 2 for best of 3, 3 for best of 5
  tiebreakAt?: number;                          // Tiebreak at X games (e.g., 6 for standard tennis)
  tiebreakFormat?: 'to7' | 'to10' | 'super10';  // Format of tiebreak
  advantageScoring: boolean;                    // Use advantage (deuce) or no-ad
  letRule: 'playLet' | 'noLet';                 // Let rule handling
  finalSetTiebreak?: 'super10' | 'to7' | 'none';  // Final set tiebreak format
  winByTwo: boolean;                            // Win by 2 (standard in tennis)
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * Badminton-specific match rules
 */
export interface BadmintonMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "BWF Standard", "11-point")
  gamesToWin: number;                           // Games to win match (typically 2 out of 3)
  pointsPerGame: number;                        // Points per game (typically 21, 15, or 11)
  winByTwo: boolean;                            // Win by 2 with cap
  pointsCap?: number;                           // Max points in a game (e.g., 30)
  serviceLaws: 'bwf' | 'custom';                // Service rules
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * Pickleball-specific match rules
 */
export interface PickleballMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "USAPA Standard", "Tournament")
  gamesToWin: number;                           // Games to win match (typically 2 out of 3)
  pointsPerGame: number;                        // Points per game (typically 11, 15, or 21)
  winByTwo: boolean;                            // Win by 2 with cap
  pointsCap?: number;                           // Max points in a game (e.g., 15)
  doubleBounceRule: boolean;                    // Double bounce rule (service and return)
  serviceLaws: 'usapa' | 'custom';              // Service rules
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * Volleyball-specific match rules
 */
export interface VolleyballMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "FIVB Indoor", "Beach")
  setsToWin: number;                            // Sets to win match (typically 2 or 3)
  pointsPerSet: number;                         // Points per set (typically 25, 21, 15)
  winByTwo: boolean;                            // Win by 2 with cap
  pointsCap?: number;                           // Cap on points in a set (e.g., 27)
  rallyScoring: boolean;                        // Rally scoring (always true in modern volleyball)
  liberoAllowed: boolean;                       // Libero position allowed
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * Baseball-specific match rules
 */
export interface BaseballMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "MLB", "Little League")
  innings: number;                              // Number of innings (typically 9)
  designatedHitter: boolean;                    // DH allowed
  mercyRule?: { runDifference: number; afterInning: number };  // Mercy rule optional
  extraInningsFormat: 'standard' | 'runnerOnSecond';  // Extra innings format
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * American Football-specific match rules
 */
export interface AmericanFootballMatchRules {
  presetName: string;                           // Name of rule preset (e.g., "NFL", "College", "Flag Football")
  quarterDuration: number;                      // Minutes per quarter (15, 12, etc.)
  quarters: number;                             // Number of quarters (typically 4)
  overtimeFormat: 'suddenDeath' | 'college' | 'none';  // Overtime format
  twoPointConversion: boolean;                  // Two-point conversion allowed
  timeoutsPerHalf: number;                      // Number of timeouts per half
  houseRules?: string[];                        // Array of house rules from location
  unwrittenRules?: string;                      // Free text for local customs/rules
}

/**
 * Union type for all sport-specific match rules
 */
export type AllMatchRules = MatchRules | SoccerMatchRules | TennisMatchRules | BadmintonMatchRules | PickleballMatchRules | VolleyballMatchRules | BaseballMatchRules | AmericanFootballMatchRules;

/**
 * Officials for competitive matches
 */
export interface MatchOfficials {
  referees: string[];              // User IDs of referees (1-3 recommended)
  primaryRecorder: string;         // User ID of primary stat recorder (defaults to match creator)
  secondaryRecorders?: string[];   // User IDs of secondary recorders (future use)
}

/**
 * @deprecated Use MatchOfficials instead
 */
export type Officials = MatchOfficials;

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
  teamSize: TeamSizeConfig;    // Team size configuration
  statIntensity: StatIntensity; // Stat tracking level
  status: MatchStatus;         // Current state
  date: string;                // ISO datetime when match occurred or is scheduled
  locationId?: string;         // Reference to Location ID
  createdBy: string;           // User ID who created match
  teams: Team[];               // Array of teams (usually 2)
  rules: AllMatchRules;        // Match rules (sport-specific)
  officials?: Officials;       // Officials for competitive matches
  score?: MatchScore;          // Score if completed
  privacy: 'public' | 'private' | 'invite';  // Privacy setting
  schedule?: MatchSchedule;    // Schedule configuration
  notes?: string;              // Optional notes/commentary
  createdAt: string;           // ISO datetime when created
  updatedAt: string;           // ISO datetime of last update
}

/**
 * Sport configuration defining options for a sport
 */
export interface RulePreset {
  name: string;
  description: string;
  rules: MatchRules;
}

/**
 * Temporary session for match creation (not persisted)
 */
export interface MatchSetupSession {
  userId: string;              // User creating the match
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
  rules?: AllMatchRules;
  officials?: MatchOfficials;  // Officials for competitive matches (Step 6)
  schedule?: Date | null;      // null means play now
  privacy?: 'public' | 'private' | 'invite';
  isDraft: boolean;
  errors: Record<string, string>; // Validation errors by step
  lastUpdated: Date;
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
 * Match type configuration (e.g., Single Game, Set-Based, Tournament)
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
 * Regular player suggestion
 */
export interface PlayerSuggestion {
  id: string;
  name: string;
  userId?: string;
  recentMatches?: number;      // How many matches at this location
  isFriend?: boolean;
  isRegular?: boolean;
  nearbyScore?: number;        // Distance-based score
}
