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
        primarySport: 'Football',
        isMinor: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      } as PlayerUser,
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
    ];

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));

    // Initialize mock follower data for realistic profiles
    const mockFollowers = {
      // player_001 follows and is followed by several users
      'followers_player_001': ['player_002', 'business_001'],
      'following_player_001': ['player_002', 'business_001', 'business_002'],
      
      // player_002 has followers
      'followers_player_002': ['player_001', 'business_001', 'business_002'],
      'following_player_002': ['player_001', 'business_001'],
      
      // business_001 has followers
      'followers_business_001': ['player_001', 'player_002', 'business_002'],
      'following_business_001': ['player_001', 'player_002'],
      
      // business_002 has followers
      'followers_business_002': ['player_001', 'player_002', 'business_001'],
      'following_business_002': ['business_001'],
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
