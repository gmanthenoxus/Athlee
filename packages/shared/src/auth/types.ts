/**
 * Account Type Enum
 * Simplified to two main types: Player (all individual users) and Business (venues/orgs)
 */
export enum AccountType {
  Visitor = 'Visitor',  // View-only, limited access, no profile
  Player = 'Player',    // All individual users (athletes, enthusiasts)
  Business = 'Business', // Venues, academies, clubs, brands
}

/**
 * Gender Enum
 * Optional field for player profiles
 */
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'Non-binary',
  PreferNotToSay = 'Prefer not to say',
}

/**
 * Business Type Enum
 * Categories for business accounts
 */
export enum BusinessType {
  Venue = 'Venue',       // Sports facilities, courts
  Academy = 'Academy',   // Training academies
  Club = 'Club',         // Sports clubs
  Brand = 'Brand',       // Sports brands, sponsors
}

/**
 * Account Flags
 * Additional flags for account features and verification
 */
export interface AccountFlags {
  dualRoleEnabled?: boolean;
  isVerifiedOrganizer?: boolean;
  isVerifiedBusiness?: boolean;
}

/**
 * Base User Model
 * Common fields for all account types
 */
interface BaseUser {
  id: string;
  email: string;
  accountType: AccountType;
  createdAt: string;
}

/**
 * Player User Model
 * For all individual users (athletes, enthusiasts)
 */
export interface PlayerUser extends BaseUser {
  accountType: AccountType.Player;
  username: string;           // Unique identifier (e.g., @johndoe)
  firstName: string;          // First name
  lastName: string;           // Last name
  dateOfBirth: string;        // ISO date string
  age: number;                // Calculated from DOB
  country: string;            // Country code (e.g., 'US', 'UK')
  city?: string;              // Optional city
  gender?: Gender;            // Optional gender
  primarySport: string;       // Required SportType
  isMinor: boolean;           // true if age < 18
  avatar?: string;
  bio?: string;               // User bio/description
  locations?: string[];       // Favorite location IDs

  // Legacy fields for backward compatibility
  name?: string;
  givenName?: string;
  familyName?: string;
  displayName?: string;
}

/**
 * Business User Model
 * For venues, academies, clubs, brands
 */
export interface BusinessUser extends BaseUser {
  accountType: AccountType.Business;
  username: string;           // Unique identifier (e.g., @elitesportsarena)
  businessName: string;
  businessType: BusinessType;
  country: string;            // Country of operation
  region: string;             // City/region
  adminName: string;          // Account admin's name
  avatar?: string;
}

/**
 * Visitor User Model
 * For temporary view-only access
 */
export interface VisitorUser extends BaseUser {
  accountType: AccountType.Visitor;
  sessionId: string;
}

/**
 * Union type for all user types
 */
export type User = PlayerUser | BusinessUser | VisitorUser;

/**
 * Auth State
 * Represents the current authentication state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Player Registration Data
 * All required fields for player account creation
 */
export interface PlayerRegistrationData {
  email: string;
  username: string;           // Unique identifier
  firstName: string;          // First name
  lastName: string;           // Last name
  dateOfBirth: string;        // ISO date string
  country: string;            // Country code
  city?: string;              // Optional city
  gender?: Gender;            // Optional gender
  primarySport: string;       // Required SportType
  acceptedTerms: boolean;     // Must be true
}

/**
 * Business Registration Data
 * All required fields for business account creation
 */
export interface BusinessRegistrationData {
  email: string;
  username: string;           // Unique identifier
  businessName: string;
  businessType: BusinessType;
  country: string;            // Country of operation
  region: string;             // City/region
  adminName: string;          // Account admin's name
  acceptedTerms: boolean;     // Must be true
}

/**
 * Union type for registration data
 */
export type RegistrationData = PlayerRegistrationData | BusinessRegistrationData;

/**
 * Magic Link State
 * Tracks magic link authentication flow
 */
export interface MagicLinkState {
  email: string;
  sentAt: string;
  verified: boolean;
}

/**
 * Auth Actions
 * Available authentication actions
 */
export interface AuthActions {
  // Legacy login (for backward compatibility)
  login: (name: string, accountType?: AccountType) => Promise<void>;

  // Player registration
  registerPlayer: (data: PlayerRegistrationData) => Promise<void>;

  // Business registration
  registerBusiness: (data: BusinessRegistrationData) => Promise<void>;

  // Magic link flow
  sendMagicLink: (email: string) => Promise<void>;
  verifyMagicLink: (email: string, token: string) => Promise<boolean>;

  // Visitor account
  createVisitor: () => Promise<void>;

  // Standard actions
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Auth Store
 * Combined auth state and actions
 */
export type AuthStore = AuthState & AuthActions;

/**
 * Auth Context Value
 * Value provided by AuthProvider
 */
export interface AuthContextValue extends AuthState {
  // Legacy login
  login: (name: string, accountType?: AccountType) => Promise<void>;

  // Player registration
  registerPlayer: (data: PlayerRegistrationData) => Promise<void>;

  // Business registration
  registerBusiness: (data: BusinessRegistrationData) => Promise<void>;

  // Magic link flow
  sendMagicLink: (email: string) => Promise<void>;
  verifyMagicLink: (email: string, token: string) => Promise<boolean>;
  magicLinkState: MagicLinkState | null;

  // Visitor account
  createVisitor: () => Promise<void>;
  
  // Account type helpers
  isVisitor: () => boolean;
  isPlayer: () => boolean;
  isBusiness: () => boolean;
  isRegular: () => boolean;

  // Feature access
  getAvailableTabs: () => string[];
  canAccessFeature: (feature: string) => boolean;

  // Standard actions
  logout: () => Promise<void>;
}

