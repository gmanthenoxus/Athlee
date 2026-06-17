import type { User, PlayerUser, BusinessUser, VisitorUser } from './types';
import { AccountType, Gender, BusinessType } from './types';
import { generateUsername, generateBusinessUsername, reserveUsername } from './usernameService';

/**
 * Mock User Generator
 * Creates deterministic mock users for testing and development
 */

/**
 * Generate a deterministic user ID from a name
 */
function generateUserId(name: string): string {
  // Simple hash function for deterministic IDs
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `user_${Math.abs(hash).toString(16)}`;
}

/**
 * Generate avatar URL based on name
 */
function generateAvatar(name: string): string {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Using UI Avatars service for mock avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;
}

/**
 * Generate email from name
 */
function generateEmail(name: string): string {
  const username = name.toLowerCase().replace(/\s+/g, '.');
  return `${username}@athlehub.mock`;
}

/**
 * Generate a mock date of birth for a given age
 */
function generateDateOfBirth(age: number): string {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
  return birthDate.toISOString();
}

/**
 * Create a mock player user
 */
export function createMockPlayer(
  firstName: string,
  lastName: string,
  age: number = 25,
  primarySport: string = 'Basketball',
  gender?: Gender
): PlayerUser {
  const trimmedFirst = firstName.trim();
  const trimmedLast = lastName.trim();

  if (!trimmedFirst || !trimmedLast) {
    throw new Error('First name and last name are required');
  }

  const fullName = `${trimmedFirst} ${trimmedLast}`;
  const dateOfBirth = generateDateOfBirth(age);
  const username = generateUsername(trimmedFirst, trimmedLast);
  reserveUsername(username);

  return {
    id: generateUserId(fullName),
    email: generateEmail(fullName),
    accountType: AccountType.Player,
    username,
    firstName: trimmedFirst,
    lastName: trimmedLast,
    dateOfBirth,
    age,
    country: 'US',
    city: 'New York',
    gender,
    primarySport,
    isMinor: age < 18,
    avatar: generateAvatar(fullName),
    createdAt: new Date().toISOString(),
    // Legacy fields
    name: fullName,
    givenName: trimmedFirst,
    familyName: trimmedLast,
    displayName: fullName,
  };
}

/**
 * Create a mock business user
 */
export function createMockBusiness(
  businessName: string,
  businessType: BusinessType = BusinessType.Venue,
  adminName: string = 'Admin User'
): BusinessUser {
  const trimmedName = businessName.trim();
  if (!trimmedName) {
    throw new Error('Business name cannot be empty');
  }

  const username = generateBusinessUsername(trimmedName);
  reserveUsername(username);

  return {
    id: generateUserId(trimmedName),
    email: generateEmail(trimmedName),
    accountType: AccountType.Business,
    username,
    businessName: trimmedName,
    businessType,
    country: 'US',
    region: 'New York',
    adminName,
    avatar: generateAvatar(trimmedName),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Legacy function for backward compatibility
 */
export function createMockUser(name: string, accountType: AccountType = AccountType.Player): User {
  if (accountType === AccountType.Business) {
    return createMockBusiness(name);
  }
  // Split name into first and last
  const parts = name.trim().split(' ');
  const firstName = parts[0] || 'User';
  const lastName = parts.slice(1).join(' ') || 'Name';
  return createMockPlayer(firstName, lastName);
}

/**
 * Predefined comprehensive mock users covering all platform scenarios
 * VERSION 2 - COMPLETE FRESH START
 * All users have complete data, extensive coverage of all field combinations
 * 
 * Coverage Matrix:
 * - Young players (ages 13-17, minors with new accounts)
 * - Adult players (ages 18-35, intermediate skill levels)
 * - Senior players (ages 35+, professional/experienced)
 * - All genders (Male, Female, Non-binary)
 * - All sports (Basketball, Football, Tennis, Volleyball, Badminton, TableTennis, Pickleball)
 * - All business types (Venue, Academy, Club, Brand)
 * - Diverse geographic locations across USA
 * - All privacy settings variants
 * - Multiple location mappings per user
 */
export const MOCK_USERS: User[] = [
  // ===== YOUNG PLAYERS (MINORS - Ages 13-17) =====
  {
    id: 'player_new_001',
    email: 'marcus.teen@athlehub.mock',
    accountType: AccountType.Player,
    username: 'marcus_hoops_01',
    firstName: 'Marcus',
    lastName: 'Thompson',
    dateOfBirth: '2010-05-12',
    age: 15,
    country: 'United States',
    city: 'New York',
    gender: Gender.Male,
    primarySport: 'Basketball',
    isMinor: true,
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Thompson&background=3B82F6&color=fff',
    bio: 'High school basketball player. Love the game, always practicing!',
    locations: ['business_venue_001'],
    createdAt: new Date('2026-02-01').toISOString(),
    name: 'Marcus Thompson',
    givenName: 'Marcus',
    familyName: 'Thompson',
    displayName: 'Marcus Thompson',
  } as PlayerUser,
  {
    id: 'player_new_002',
    email: 'sophia.young@athlehub.mock',
    accountType: AccountType.Player,
    username: 'sophia_tennis_02',
    firstName: 'Sophia',
    lastName: 'Rodriguez',
    dateOfBirth: '2011-08-24',
    age: 14,
    country: 'United States',
    city: 'Los Angeles',
    gender: Gender.Female,
    primarySport: 'Tennis',
    isMinor: true,
    avatar: 'https://ui-avatars.com/api/?name=Sophia+Rodriguez&background=EC4899&color=fff',
    bio: 'Junior tennis enthusiast. Training hard to improve my game.',
    locations: ['business_academy_002'],
    createdAt: new Date('2026-02-02').toISOString(),
    name: 'Sophia Rodriguez',
    givenName: 'Sophia',
    familyName: 'Rodriguez',
    displayName: 'Sophia Rodriguez',
  } as PlayerUser,
  {
    id: 'player_new_003',
    email: 'jason.kim@athlehub.mock',
    accountType: AccountType.Player,
    username: 'jason_football_03',
    firstName: 'Jason',
    lastName: 'Kim',
    dateOfBirth: '2004-03-18',
    age: 21,
    country: 'United States',
    city: 'Chicago',
    gender: Gender.Male,
    primarySport: 'Football',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Jason+Kim&background=10B981&color=fff',
    bio: 'Just getting started with football. Excited to meet new players!',
    locations: ['business_venue_002'],
    createdAt: new Date('2026-02-03').toISOString(),
    name: 'Jason Kim',
    givenName: 'Jason',
    familyName: 'Kim',
    displayName: 'Jason Kim',
  } as PlayerUser,

  // ===== FRESH INTERMEDIATE PLAYERS =====
  {
    id: 'player_mid_001',
    email: 'alex.brooks@athlehub.mock',
    accountType: AccountType.Player,
    username: 'alex_courts_04',
    firstName: 'Alexander',
    lastName: 'Brooks',
    dateOfBirth: '1994-07-15',
    age: 31,
    country: 'United States',
    city: 'New York',
    gender: Gender.Male,
    primarySport: 'Basketball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Alex+Brooks&background=F59E0B&color=fff',
    bio: 'Competitive basketball player. Love the fast-paced action and team play.',
    locations: ['business_venue_001', 'business_venue_002'],
    createdAt: new Date('2026-02-04').toISOString(),
    name: 'Alexander Brooks',
    givenName: 'Alexander',
    familyName: 'Brooks',
    displayName: 'Alex Brooks',
  } as PlayerUser,
  {
    id: 'player_mid_002',
    email: 'david.chen@athlehub.mock',
    accountType: AccountType.Player,
    username: 'david_volley_05',
    firstName: 'David',
    lastName: 'Chen',
    dateOfBirth: '1996-02-22',
    age: 29,
    country: 'United States',
    city: 'San Francisco',
    gender: Gender.Male,
    primarySport: 'Volleyball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=06B6D4&color=fff',
    bio: 'Volleyball enthusiast. Always looking for a good match and team.',
    locations: ['business_club_001'],
    createdAt: new Date('2026-02-05').toISOString(),
    name: 'David Chen',
    givenName: 'David',
    familyName: 'Chen',
    displayName: 'David Chen',
  } as PlayerUser,
  {
    id: 'player_mid_003',
    email: 'ryan.martinez@athlehub.mock',
    accountType: AccountType.Player,
    username: 'ryan_football_06',
    firstName: 'Ryan',
    lastName: 'Martinez',
    dateOfBirth: '1992-11-05',
    age: 33,
    country: 'United States',
    city: 'Miami',
    gender: Gender.Male,
    primarySport: 'Football',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Ryan+Martinez&background=8B5CF6&color=fff',
    bio: 'Football lover. Been playing for 15+ years. Casual games and tournaments.',
    locations: ['business_venue_002', 'business_venue_003'],
    createdAt: new Date('2026-02-06').toISOString(),
    name: 'Ryan Martinez',
    givenName: 'Ryan',
    familyName: 'Martinez',
    displayName: 'Ryan Martinez',
  } as PlayerUser,
  {
    id: 'player_mid_004',
    email: 'michael.smith@athlehub.mock',
    accountType: AccountType.Player,
    username: 'michael_badminton_07',
    firstName: 'Michael',
    lastName: 'Smith',
    dateOfBirth: '1998-09-30',
    age: 27,
    country: 'United States',
    city: 'Seattle',
    gender: Gender.Male,
    primarySport: 'Badminton',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Michael+Smith&background=EF4444&color=fff',
    bio: 'Badminton player | Competitive but fun matches. Join me for some action!',
    locations: ['business_club_002'],
    createdAt: new Date('2026-02-07').toISOString(),
    name: 'Michael Smith',
    givenName: 'Michael',
    familyName: 'Smith',
    displayName: 'Michael Smith',
  } as PlayerUser,
  {
    id: 'player_mid_005',
    email: 'christopher.lee@athlehub.mock',
    accountType: AccountType.Player,
    username: 'chris_tt_08',
    firstName: 'Christopher',
    lastName: 'Lee',
    dateOfBirth: '1995-04-18',
    age: 30,
    country: 'United States',
    city: 'Boston',
    gender: Gender.Male,
    primarySport: 'TableTennis',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Chris+Lee&background=14B8A6&color=fff',
    bio: 'Table Tennis Champion wannabe. Daily practice, serious about improvement.',
    locations: ['business_academy_001'],
    createdAt: new Date('2026-02-08').toISOString(),
    name: 'Christopher Lee',
    givenName: 'Christopher',
    familyName: 'Lee',
    displayName: 'Chris Lee',
  } as PlayerUser,
  {
    id: 'player_mid_006',
    email: 'james.wilson@athlehub.mock',
    accountType: AccountType.Player,
    username: 'james_pickle_09',
    firstName: 'James',
    lastName: 'Wilson',
    dateOfBirth: '1991-12-10',
    age: 34,
    country: 'United States',
    city: 'Phoenix',
    gender: Gender.Male,
    primarySport: 'Pickleball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=F43F5E&color=fff',
    bio: 'Pickleball enthusiast | Easy-going player who loves the community aspect.',
    locations: ['business_venue_003'],
    createdAt: new Date('2026-02-09').toISOString(),
    name: 'James Wilson',
    givenName: 'James',
    familyName: 'Wilson',
    displayName: 'James Wilson',
  } as PlayerUser,
  {
    id: 'player_mid_007',
    email: 'emma.johnson@athlehub.mock',
    accountType: AccountType.Player,
    username: 'emma_bball_10',
    firstName: 'Emma',
    lastName: 'Johnson',
    dateOfBirth: '1997-01-28',
    age: 28,
    country: 'United States',
    city: 'Denver',
    gender: Gender.Female,
    primarySport: 'Basketball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Emma+Johnson&background=D946EF&color=fff',
    bio: 'Basketball lover | Competitive player looking for serious matches.',
    locations: ['business_venue_001', 'business_venue_002'],
    createdAt: new Date('2026-02-10').toISOString(),
    name: 'Emma Johnson',
    givenName: 'Emma',
    familyName: 'Johnson',
    displayName: 'Emma Johnson',
  } as PlayerUser,
  {
    id: 'player_mid_008',
    email: 'olivia.green@athlehub.mock',
    accountType: AccountType.Player,
    username: 'olivia_tennis_11',
    firstName: 'Olivia',
    lastName: 'Green',
    dateOfBirth: '1993-06-14',
    age: 32,
    country: 'United States',
    city: 'Austin',
    gender: Gender.Female,
    primarySport: 'Tennis',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Olivia+Green&background=84CC16&color=fff',
    bio: 'Tennis enthusiast with 10+ years experience. Always improving!',
    locations: ['business_academy_002'],
    createdAt: new Date('2026-02-11').toISOString(),
    name: 'Olivia Green',
    givenName: 'Olivia',
    familyName: 'Green',
    displayName: 'Olivia Green',
  } as PlayerUser,
  {
    id: 'player_mid_009',
    email: 'jessica.brown@athlehub.mock',
    accountType: AccountType.Player,
    username: 'jessica_volley_12',
    firstName: 'Jessica',
    lastName: 'Brown',
    dateOfBirth: '1999-10-02',
    age: 26,
    country: 'United States',
    city: 'Portland',
    gender: Gender.Female,
    primarySport: 'Volleyball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Jessica+Brown&background=0D9488&color=fff',
    bio: 'Volleyball is my passion! Love the team dynamics and friendships.',
    locations: ['business_club_001'],
    createdAt: new Date('2026-02-12').toISOString(),
    name: 'Jessica Brown',
    givenName: 'Jessica',
    familyName: 'Brown',
    displayName: 'Jessica Brown',
  } as PlayerUser,
  {
    id: 'player_mid_010',
    email: 'rachel.davis@athlehub.mock',
    accountType: AccountType.Player,
    username: 'rachel_badminton_13',
    firstName: 'Rachel',
    lastName: 'Davis',
    dateOfBirth: '1996-03-20',
    age: 29,
    country: 'United States',
    city: 'Atlanta',
    gender: Gender.Female,
    primarySport: 'Badminton',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Rachel+Davis&background=7C3AED&color=fff',
    bio: 'Badminton player | Casual and competitive matches welcome.',
    locations: ['business_club_002'],
    createdAt: new Date('2026-02-13').toISOString(),
    name: 'Rachel Davis',
    givenName: 'Rachel',
    familyName: 'Davis',
    displayName: 'Rachel Davis',
  } as PlayerUser,
  {
    id: 'player_mid_011',
    email: 'amanda.taylor@athlehub.mock',
    accountType: AccountType.Player,
    username: 'amanda_tt_14',
    firstName: 'Amanda',
    lastName: 'Taylor',
    dateOfBirth: '1994-08-07',
    age: 31,
    country: 'United States',
    city: 'Nashville',
    gender: Gender.Female,
    primarySport: 'TableTennis',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Amanda+Taylor&background=06B6D4&color=fff',
    bio: 'Table Tennis instructor | Love teaching and playing competitively.',
    locations: ['business_academy_001'],
    createdAt: new Date('2026-02-14').toISOString(),
    name: 'Amanda Taylor',
    givenName: 'Amanda',
    familyName: 'Taylor',
    displayName: 'Amanda Taylor',
  } as PlayerUser,

  // ===== FRESH NON-BINARY PLAYERS =====
  {
    id: 'player_nb_001',
    email: 'jordan.cooper@athlehub.mock',
    accountType: AccountType.Player,
    username: 'jordan_multi_15',
    firstName: 'Jordan',
    lastName: 'Cooper',
    dateOfBirth: '2000-05-30',
    age: 25,
    country: 'United States',
    city: 'Houston',
    gender: Gender.NonBinary,
    primarySport: 'Basketball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Jordan+Cooper&background=A78BFA&color=fff',
    bio: 'Basketball enthusiast | All-around athlete looking for diverse matches.',
    locations: ['business_venue_001'],
    createdAt: new Date('2026-02-15').toISOString(),
    name: 'Jordan Cooper',
    givenName: 'Jordan',
    familyName: 'Cooper',
    displayName: 'Jordan Cooper',
  } as PlayerUser,
  {
    id: 'player_nb_002',
    email: 'alex.morgan@athlehub.mock',
    accountType: AccountType.Player,
    username: 'alex_play_16',
    firstName: 'Alex',
    lastName: 'Morgan',
    dateOfBirth: '1998-11-15',
    age: 27,
    country: 'United States',
    city: 'Philadelphia',
    gender: Gender.NonBinary,
    primarySport: 'Football',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Alex+Morgan&background=F472B6&color=fff',
    bio: 'Football player | Social and competitive, let\'s play together!',
    locations: ['business_venue_002', 'business_venue_003'],
    createdAt: new Date('2026-02-16').toISOString(),
    name: 'Alex Morgan',
    givenName: 'Alex',
    familyName: 'Morgan',
    displayName: 'Alex Morgan',
  } as PlayerUser,

  // ===== FRESH PROFESSIONAL PLAYERS =====
  {
    id: 'player_pro_001',
    email: 'victor.elite@athlehub.mock',
    accountType: AccountType.Player,
    username: 'victor_pro_17',
    firstName: 'Victor',
    lastName: 'Richardson',
    dateOfBirth: '1988-02-14',
    age: 37,
    country: 'United States',
    city: 'New York',
    gender: Gender.Male,
    primarySport: 'Basketball',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Victor+Richardson&background=0F172A&color=fff',
    bio: 'Professional basketball player | 15+ years experience. Always training hard.',
    locations: ['business_venue_001', 'business_venue_002'],
    createdAt: new Date('2026-02-17').toISOString(),
    name: 'Victor Richardson',
    givenName: 'Victor',
    familyName: 'Richardson',
    displayName: 'Victor Richardson',
  } as PlayerUser,
  {
    id: 'player_pro_002',
    email: 'serena.champion@athlehub.mock',
    accountType: AccountType.Player,
    username: 'serena_ace_18',
    firstName: 'Serena',
    lastName: 'Williams',
    dateOfBirth: '1989-09-26',
    age: 36,
    country: 'United States',
    city: 'Los Angeles',
    gender: Gender.Female,
    primarySport: 'Tennis',
    isMinor: false,
    avatar: 'https://ui-avatars.com/api/?name=Serena+Williams&background=1E293B&color=fff',
    bio: 'Professional tennis player | Former champion. Love mentoring young players.',
    locations: ['business_academy_002'],
    createdAt: new Date('2026-02-18').toISOString(),
    name: 'Serena Williams',
    givenName: 'Serena',
    familyName: 'Williams',
    displayName: 'Serena Williams',
  } as PlayerUser,

  // ===== FRESH BUSINESS OWNERS =====
  {
    id: 'business_venue_001',
    email: 'marcus@centralcourt.com',
    accountType: AccountType.Business,
    username: 'central_basketball_court',
    businessName: 'Central Basketball Court',
    businessType: BusinessType.Venue,
    country: 'United States',
    region: 'Manhattan, New York',
    adminName: 'Marcus Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Central+Basketball&background=1E40AF&color=fff',
    createdAt: new Date('2026-02-19').toISOString(),
  } as BusinessUser,
  {
    id: 'business_venue_002',
    email: 'patricia@eastside.com',
    accountType: AccountType.Business,
    username: 'eastside_arena',
    businessName: 'Eastside Multi-Sport Arena',
    businessType: BusinessType.Venue,
    country: 'United States',
    region: 'Queens, New York',
    adminName: 'Patricia Chen',
    avatar: 'https://ui-avatars.com/api/?name=Eastside+Arena&background=1E3A8A&color=fff',
    createdAt: new Date('2026-02-20').toISOString(),
  } as BusinessUser,
  {
    id: 'business_venue_003',
    email: 'robert@pickleballparadise.com',
    accountType: AccountType.Business,
    username: 'pickleball_paradise',
    businessName: 'Pickleball Paradise',
    businessType: BusinessType.Venue,
    country: 'United States',
    region: 'Brooklyn, New York',
    adminName: 'Robert Martinez',
    avatar: 'https://ui-avatars.com/api/?name=Pickleball+Paradise&background=7C2D12&color=fff',
    createdAt: new Date('2026-02-21').toISOString(),
  } as BusinessUser,
  {
    id: 'business_academy_001',
    email: 'david@tabletennis.com',
    accountType: AccountType.Business,
    username: 'downtown_tt_academy',
    businessName: 'Downtown Table Tennis Academy',
    businessType: BusinessType.Academy,
    country: 'United States',
    region: 'Manhattan, New York',
    adminName: 'David Wong',
    avatar: 'https://ui-avatars.com/api/?name=TT+Academy&background=1C1917&color=fff',
    createdAt: new Date('2026-02-22').toISOString(),
  } as BusinessUser,
  {
    id: 'business_academy_002',
    email: 'jennifer@tennisacademy.com',
    accountType: AccountType.Business,
    username: 'central_tennis_academy',
    businessName: 'Central Tennis Academy',
    businessType: BusinessType.Academy,
    country: 'United States',
    region: 'Manhattan, New York',
    adminName: 'Jennifer Martinez',
    avatar: 'https://ui-avatars.com/api/?name=Tennis+Academy&background=292524&color=fff',
    createdAt: new Date('2026-02-23').toISOString(),
  } as BusinessUser,
  {
    id: 'business_club_001',
    email: 'lisa@volleyballclub.com',
    accountType: AccountType.Business,
    username: 'valley_volleyball_club',
    businessName: 'Valley Volleyball Club',
    businessType: BusinessType.Club,
    country: 'United States',
    region: 'Queens, New York',
    adminName: 'Lisa Anderson',
    avatar: 'https://ui-avatars.com/api/?name=Volleyball+Club&background=1F2937&color=fff',
    createdAt: new Date('2026-02-24').toISOString(),
  } as BusinessUser,
  {
    id: 'business_club_002',
    email: 'robert@badmintonclub.com',
    accountType: AccountType.Business,
    username: 'uptown_badminton_club',
    businessName: 'Uptown Badminton Club',
    businessType: BusinessType.Club,
    country: 'United States',
    region: 'Manhattan, New York',
    adminName: 'Robert Kim',
    avatar: 'https://ui-avatars.com/api/?name=Badminton+Club&background=111827&color=fff',
    createdAt: new Date('2026-02-25').toISOString(),
  } as BusinessUser,
  {
    id: 'business_brand_001',
    email: 'info@athleticgear.com',
    accountType: AccountType.Business,
    username: 'athletic_gear_ny',
    businessName: 'Athletic Gear NY',
    businessType: BusinessType.Brand,
    country: 'United States',
    region: 'Manhattan, New York',
    adminName: 'Sarah Thompson',
    avatar: 'https://ui-avatars.com/api/?name=Athletic+Gear&background=0F172A&color=fff',
    createdAt: new Date('2026-02-26').toISOString(),
  } as BusinessUser,
  {
    id: 'business_brand_002',
    email: 'contact@sportstech.com',
    accountType: AccountType.Business,
    username: 'sports_tech_solutions',
    businessName: 'SportsTech Solutions',
    businessType: BusinessType.Brand,
    country: 'United States',
    region: 'Brooklyn, New York',
    adminName: 'Michael Chang',
    avatar: 'https://ui-avatars.com/api/?name=SportsTech&background=064E3B&color=fff',
    createdAt: new Date('2026-02-27').toISOString(),
  } as BusinessUser,
];

/**
 * Validate user name
 */
export function validateUserName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();

  if (!trimmed) {
    return { valid: false, error: 'Name cannot be empty' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'Name must be less than 50 characters' };
  }

  return { valid: true };
}

/**
 * Validate email address
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();

  if (!trimmed) {
    return { valid: false, error: 'Email cannot be empty' };
  }

  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

/**
 * Generate display name from given and family names
 */
export function generateDisplayName(givenName: string, familyName: string): string {
  const given = givenName.trim();
  const family = familyName.trim();

  if (!given && !family) {
    return 'User';
  }

  if (!family) {
    return given;
  }

  return `${given} ${family}`;
}

/**
 * Create visitor user
 */
export function createVisitorUser(): VisitorUser {
  const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

  return {
    id: visitorId,
    email: `${visitorId}@visitor.athlehub.mock`,
    accountType: AccountType.Visitor,
    sessionId: visitorId,
    createdAt: new Date().toISOString(),
  };
}

