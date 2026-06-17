/**
 * Auth Service - Web App Implementation
 * 
 * Handles all authentication operations locally.
 * Uses localStorage for mock data persistence.
 * 
 * In production, replace with API calls to backend.
 */

import type { User, PlayerUser, BusinessUser, VisitorUser, PlayerRegistrationData, BusinessRegistrationData } from '@/lib/auth-types';
import { Gender, BusinessType, AccountType } from '@/lib/auth-types';

const USERS_STORAGE_KEY = 'athlee_users';
const CURRENT_USER_KEY = 'athlee_current_user';
const AUTH_TOKEN_KEY = 'athlee_auth_token';
const MOCK_DB_KEY = 'athlee_mock_database';

/**
 * Generate a JWT-like token
 */
function generateAuthToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 7,
    })
  );
  const signature = btoa(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

/**
 * Generate unique user ID
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all users
 */
function getAllUsers(): User[] {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save users
 */
function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
}

/**
 * Find user by email
 */
function findUserByEmail(email: string): User | undefined {
  return getAllUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Find user by username
 */
function findUserByUsername(username: string): User | undefined {
  return getAllUsers().find(
    (u) => 'username' in u && u.username.toLowerCase() === username.toLowerCase()
  );
}

/**
 * AuthService Class
 */
export class AuthService {
  async registerPlayer(data: PlayerRegistrationData): Promise<PlayerUser> {
    if (findUserByEmail(data.email)) {
      throw new Error(`Email ${data.email} is already registered`);
    }
    if (findUserByUsername(data.username)) {
      throw new Error(`Username @${data.username} is already taken`);
    }

    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    const playerUser: PlayerUser = {
      id: generateUserId(),
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      age,
      country: data.country,
      city: data.city || '',
      gender: data.gender,
      primarySport: data.primarySport,
      isMinor: age < 18,
      accountType: AccountType.Player,
      createdAt: new Date().toISOString(),
    };

    const users = getAllUsers();
    users.push(playerUser);
    saveUsers(users);
    this.setCurrentUser(playerUser);

    return playerUser;
  }

  async registerBusiness(data: BusinessRegistrationData): Promise<BusinessUser> {
    if (findUserByEmail(data.email)) {
      throw new Error(`Email ${data.email} is already registered`);
    }
    if (findUserByUsername(data.username)) {
      throw new Error(`Username @${data.username} is already taken`);
    }

    const businessUser: BusinessUser = {
      id: generateUserId(),
      email: data.email,
      username: data.username,
      businessName: data.businessName,
      businessType: data.businessType,
      country: data.country,
      region: data.region,
      adminName: data.adminName,
      accountType: AccountType.Business,
      createdAt: new Date().toISOString(),
    };

    const users = getAllUsers();
    users.push(businessUser);
    saveUsers(users);
    this.setCurrentUser(businessUser);

    return businessUser;
  }

  async login(email: string): Promise<User> {
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = generateAuthToken(user.id);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.setCurrentUser(user);

    return user;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  async createVisitor(): Promise<VisitorUser> {
    const visitorUser: VisitorUser = {
      id: generateUserId(),
      email: `visitor_${Date.now()}@athlee.local`,
      accountType: AccountType.Visitor,
      sessionId: generateUserId(),
      createdAt: new Date().toISOString(),
    };

    const users = getAllUsers();
    users.push(visitorUser);
    saveUsers(users);
    this.setCurrentUser(visitorUser);

    return visitorUser;
  }

  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return false;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);

      return payload.exp > now;
    } catch {
      return false;
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateUsername(username: string): string {
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 30) return 'Username must be at most 30 characters';
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'Username can only contain letters, numbers, dashes, and underscores';
    }
    return '';
  }

  emailExists(email: string): boolean {
    return !!findUserByEmail(email);
  }

  usernameExists(username: string): boolean {
    return !!findUserByUsername(username);
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return getAllUsers().find((u) => u.id === userId);
  }
}

export const authService = new AuthService();

/**
 * Initialize mock database
 */
export function initializeMockDatabase(): void {
  try {
    const existing = localStorage.getItem(MOCK_DB_KEY);
    if (existing) return;

    const mockUsers: User[] = [
      // ===== PLAYER USERS (Basketball) =====
      {
        id: 'player_001',
        email: 'player@example.com',
        username: 'alex_player',
        accountType: 'Player',
        firstName: 'Alex',
        lastName: 'Thompson',
        dateOfBirth: '2000-05-15',
        age: 24,
        country: 'United States',
        city: 'New York',
        gender: 'Male' as Gender,
        primarySport: 'Basketball',
        isMinor: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_002',
        email: 'sarah@example.com',
        username: 'sarah_tennis',
        accountType: 'Player',
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: '1998-08-22',
        age: 26,
        country: 'Canada',
        city: 'Toronto',
        gender: 'Female' as Gender,
        primarySport: 'Tennis',
        isMinor: false,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_003',
        email: 'michael.soccer@example.com',
        username: 'michael_soccer',
        accountType: 'Player',
        firstName: 'Michael',
        lastName: 'Chen',
        dateOfBirth: '1995-03-10',
        age: 29,
        country: 'United States',
        city: 'Los Angeles',
        gender: 'Male' as Gender,
        primarySport: 'Soccer',
        isMinor: false,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_004',
        email: 'emma.volleyball@example.com',
        username: 'emma_v',
        accountType: 'Player',
        firstName: 'Emma',
        lastName: 'Rodriguez',
        dateOfBirth: '2002-11-28',
        age: 22,
        country: 'Spain',
        city: 'Barcelona',
        gender: 'Female' as Gender,
        primarySport: 'Volleyball',
        isMinor: false,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_005',
        email: 'james.basketball@example.com',
        username: 'james_b',
        accountType: 'Player',
        firstName: 'James',
        lastName: 'Williams',
        dateOfBirth: '1997-07-14',
        age: 27,
        country: 'United States',
        city: 'Chicago',
        gender: 'Male' as Gender,
        primarySport: 'Basketball',
        isMinor: false,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_006',
        email: 'olivia.badminton@example.com',
        username: 'olivia_badminton',
        accountType: 'Player',
        firstName: 'Olivia',
        lastName: 'Martinez',
        dateOfBirth: '2001-02-05',
        age: 23,
        country: 'Mexico',
        city: 'Mexico City',
        gender: 'Female' as Gender,
        primarySport: 'Badminton',
        isMinor: false,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_007',
        email: 'david.soccer@example.com',
        username: 'david_striker',
        accountType: 'Player',
        firstName: 'David',
        lastName: 'Foster',
        dateOfBirth: '1999-09-20',
        age: 25,
        country: 'United Kingdom',
        city: 'Manchester',
        gender: 'Male' as Gender,
        primarySport: 'Soccer',
        isMinor: false,
        createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_008',
        email: 'sophie.tennis@example.com',
        username: 'sophie_t',
        accountType: 'Player',
        firstName: 'Sophie',
        lastName: 'Bernard',
        dateOfBirth: '1996-12-11',
        age: 28,
        country: 'France',
        city: 'Paris',
        gender: 'Female' as Gender,
        primarySport: 'Tennis',
        isMinor: false,
        createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_009',
        email: 'marco.volleyball@example.com',
        username: 'marco_v',
        accountType: 'Player',
        firstName: 'Marco',
        lastName: 'Rossi',
        dateOfBirth: '2000-01-25',
        age: 24,
        country: 'Italy',
        city: 'Rome',
        gender: 'Male' as Gender,
        primarySport: 'Volleyball',
        isMinor: false,
        createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
      {
        id: 'player_010',
        email: 'luke.basketball@example.com',
        username: 'luke_hoops',
        accountType: 'Player',
        firstName: 'Luke',
        lastName: 'Patel',
        dateOfBirth: '1998-06-18',
        age: 26,
        country: 'United States',
        city: 'Houston',
        gender: 'Male' as Gender,
        primarySport: 'Basketball',
        isMinor: false,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,

      // ===== BUSINESS USERS =====
      {
        id: 'business_001',
        email: 'business@example.com',
        username: 'academy_sports',
        accountType: 'Business',
        businessName: 'Elite Sports Academy',
        businessType: 'Academy' as BusinessType,
        adminName: 'James Mitchell',
        country: 'United States',
        region: 'California',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      } as BusinessUser,
      {
        id: 'business_002',
        email: 'venue@example.com',
        username: 'central_sports_venue',
        accountType: 'Business',
        businessName: 'Central Sports Venue',
        businessType: 'Venue' as BusinessType,
        adminName: 'Maria Garcia',
        country: 'United Kingdom',
        region: 'London',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      } as BusinessUser,
      {
        id: 'business_003',
        email: 'court.rental@example.com',
        username: 'basketball_courts',
        accountType: 'Business',
        businessName: 'Urban Basketball Courts',
        businessType: 'Venue' as BusinessType,
        adminName: 'Antonio Santos',
        country: 'United States',
        region: 'New York',
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      } as BusinessUser,
      {
        id: 'business_004',
        email: 'tennis.club@example.com',
        username: 'cypress_tennis',
        accountType: 'Business',
        businessName: 'Cypress Tennis Club',
        businessType: 'Club' as BusinessType,
        adminName: 'Rebecca Chen',
        country: 'Canada',
        region: 'Ontario',
        createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      } as BusinessUser,
      {
        id: 'business_005',
        email: 'soccer.league@example.com',
        username: 'metro_soccer_league',
        accountType: 'Business',
        businessName: 'Metro Soccer League',
        businessType: 'League' as BusinessType,
        adminName: 'Pedro Gonzalez',
        country: 'Mexico',
        region: 'Mexico City',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      } as BusinessUser,
      {
        id: 'business_006',
        email: 'gym.fitness@example.com',
        username: 'power_fitness',
        accountType: 'Business',
        businessName: 'Power Fitness Gym',
        businessType: 'Gym' as BusinessType,
        adminName: 'Klaus Mueller',
        country: 'Germany',
        region: 'Berlin',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      } as BusinessUser,
    ];

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));

    // Initialize comprehensive mock follower data for realistic social networks
    const mockFollowers = {
      // player_001 (Alex) - Active player with followers
      'followers_player_001': ['player_003', 'player_005', 'player_010', 'business_001'],
      'following_player_001': ['player_002', 'player_005', 'business_001', 'business_003'],
      
      // player_002 (Sarah) - Well-connected
      'followers_player_002': ['player_001', 'player_004', 'player_008', 'business_002'],
      'following_player_002': ['player_001', 'business_002', 'business_004'],
      
      // player_003 (Michael) - Soccer player
      'followers_player_003': ['player_005', 'player_007', 'player_009', 'business_001'],
      'following_player_003': ['player_001', 'player_007', 'business_005'],
      
      // player_004 (Emma) - Volleyball player
      'followers_player_004': ['player_002', 'player_009', 'business_001'],
      'following_player_004': ['player_009', 'business_002', 'business_004'],
      
      // player_005 (James) - Basketball player
      'followers_player_005': ['player_001', 'player_003', 'player_010', 'business_003'],
      'following_player_005': ['player_001', 'player_010', 'business_001', 'business_003'],
      
      // player_006 (Olivia) - Badminton player
      'followers_player_006': ['player_001', 'player_002', 'business_001'],
      'following_player_006': ['player_001', 'business_005', 'business_006'],
      
      // player_007 (David) - Soccer player
      'followers_player_007': ['player_003', 'player_009', 'business_005'],
      'following_player_007': ['player_003', 'business_005'],
      
      // player_008 (Sophie) - Tennis player
      'followers_player_008': ['player_002', 'player_004', 'business_004'],
      'following_player_008': ['player_002', 'business_002', 'business_004'],
      
      // player_009 (Marco) - Volleyball player
      'followers_player_009': ['player_003', 'player_004', 'player_007', 'business_001'],
      'following_player_009': ['player_004', 'player_007', 'business_001', 'business_002'],
      
      // player_010 (Luke) - Basketball player
      'followers_player_010': ['player_005', 'player_001', 'business_003'],
      'following_player_010': ['player_001', 'player_005', 'business_003'],
      
      // Business accounts
      'followers_business_001': ['player_001', 'player_003', 'player_005', 'player_009'],
      'following_business_001': ['player_001', 'player_005'],
      
      'followers_business_002': ['player_002', 'player_004', 'player_008', 'player_009'],
      'following_business_002': ['player_002', 'player_008'],
      
      'followers_business_003': ['player_001', 'player_005', 'player_010'],
      'following_business_003': ['player_001', 'player_005'],
      
      'followers_business_004': ['player_002', 'player_004', 'player_008'],
      'following_business_004': ['player_002', 'player_008'],
      
      'followers_business_005': ['player_003', 'player_006', 'player_007'],
      'following_business_005': ['player_003', 'player_007'],
      
      'followers_business_006': ['player_006', 'player_001'],
      'following_business_006': ['player_001', 'player_006'],
    };

    // Save follower data to localStorage
    Object.entries(mockFollowers).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });

    localStorage.setItem(MOCK_DB_KEY, JSON.stringify({ initialized: true }));
  } catch (error) {
    console.error('Failed to initialize mock database:', error);
  }
}
