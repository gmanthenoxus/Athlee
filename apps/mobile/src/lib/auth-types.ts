/**
 * Shared Auth Types
 * 
 * For this fresh web app, we'll use these types directly
 * In production, these would come from @athlee/shared package
 */

/**
 * Account Type Enum
 */
export enum AccountType {
  Visitor = 'Visitor',
  Player = 'Player',
  Business = 'Business',
}

/**
 * Gender Enum
 */
export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'Non-binary',
  PreferNotToSay = 'Prefer not to say',
}

/**
 * Business Type Enum
 */
export enum BusinessType {
  Venue = 'Venue',
  Academy = 'Academy',
  Club = 'Club',
  Brand = 'Brand',
}

/**
 * Base User Model
 */
interface BaseUser {
  id: string;
  email: string;
  accountType: AccountType;
  createdAt: string;
}

/**
 * Player User Model
 */
export interface PlayerUser extends BaseUser {
  accountType: AccountType.Player;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  country: string;
  city?: string;
  gender?: Gender;
  primarySport: string;
  isMinor: boolean;
  avatar?: string;
  bio?: string;
  locations?: string[];
}

/**
 * Business User Model
 */
export interface BusinessUser extends BaseUser {
  accountType: AccountType.Business;
  username: string;
  businessName: string;
  businessType: BusinessType;
  country: string;
  region: string;
  adminName: string;
  avatar?: string;
}

/**
 * Visitor User Model
 */
export interface VisitorUser extends BaseUser {
  accountType: AccountType.Visitor;
  sessionId: string;
}

/**
 * Union type for all users
 */
export type User = PlayerUser | BusinessUser | VisitorUser;

/**
 * Auth State
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Player Registration Data
 */
export interface PlayerRegistrationData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city?: string;
  gender?: Gender;
  primarySport: string;
  acceptedTerms: boolean;
}

/**
 * Business Registration Data
 */
export interface BusinessRegistrationData {
  email: string;
  username: string;
  businessName: string;
  businessType: BusinessType;
  country: string;
  region: string;
  adminName: string;
  acceptedTerms: boolean;
}

/**
 * Union type for registration data
 */
export type RegistrationData = PlayerRegistrationData | BusinessRegistrationData;

/**
 * Magic Link State
 */
export interface MagicLinkState {
  email: string;
  sentAt: string;
  verified: boolean;
}

/**
 * Auth Context Value
 */
export interface AuthContextValue extends AuthState {
  login: (email: string) => Promise<void>;
  registerPlayer: (data: PlayerRegistrationData) => Promise<void>;
  registerBusiness: (data: BusinessRegistrationData) => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  verifyMagicLink: (email: string, token: string) => Promise<boolean>;
  magicLinkState: MagicLinkState | null;
  createVisitor: () => Promise<void>;
  isVisitor: () => boolean;
  isPlayer: () => boolean;
  isBusiness: () => boolean;
  isRegular: () => boolean;
  getAvailableTabs: () => string[];
  canAccessFeature: (feature: string) => boolean;
  logout: () => Promise<void>;
}
