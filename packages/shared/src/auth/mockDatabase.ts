/**
 * Mock User Data Store
 * 
 * This file provides a centralized, viewable/editable mock user database.
 * In production, this would be replaced with an actual database.
 * 
 * Access via: /dev/admin - to view and manage mock data
 * 
 * Data is persisted to localStorage with key: 'athlee_mock_database'
 */

import {
  User,
  AccountType,
  Gender,
  BusinessType,
  PlayerUser,
  BusinessUser,
  VisitorUser,
} from './types';

const MOCK_DB_KEY = 'athlee_mock_database';

/**
 * Initialize mock database with sample data
 */
export function initializeMockDatabase(): void {
  try {
    const existing = localStorage.getItem(MOCK_DB_KEY);
    if (existing) return; // Already initialized
    
    const mockDatabase: MockDatabase = {
      users: generateMockUsers(),
      magicLinks: {},
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(mockDatabase));
  } catch (error) {
    console.error('Failed to initialize mock database:', error);
  }
}

/**
 * Get entire mock database
 */
export function getMockDatabase(): MockDatabase {
  try {
    const data = localStorage.getItem(MOCK_DB_KEY);
    if (!data) {
      initializeMockDatabase();
      return getMockDatabase();
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to retrieve mock database:', error);
    return {
      users: [],
      magicLinks: {},
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Update entire mock database
 */
export function updateMockDatabase(db: MockDatabase): void {
  try {
    db.lastUpdated = new Date().toISOString();
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.error('Failed to update mock database:', error);
  }
}

/**
 * Get all users from mock database
 */
export function getMockUsers(): User[] {
  return getMockDatabase().users;
}

/**
 * Add user to mock database
 */
export function addMockUser(user: User): void {
  const db = getMockDatabase();
  db.users.push(user);
  updateMockDatabase(db);
}

/**
 * Update user in mock database
 */
export function updateMockUser(userId: string, updates: Partial<User>): void {
  const db = getMockDatabase();
  const index = db.users.findIndex(u => u.id === userId);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updates };
    updateMockDatabase(db);
  }
}

/**
 * Delete user from mock database
 */
export function deleteMockUser(userId: string): void {
  const db = getMockDatabase();
  db.users = db.users.filter(u => u.id !== userId);
  updateMockDatabase(db);
}

/**
 * Store magic link token for email
 */
export function storeMagicLink(email: string, token: string, expiresAt: string): void {
  const db = getMockDatabase();
  db.magicLinks[email] = {
    token,
    expiresAt,
    createdAt: new Date().toISOString(),
  };
  updateMockDatabase(db);
}

/**
 * Verify magic link token
 */
export function verifyMagicLink(email: string, token: string): boolean {
  const db = getMockDatabase();
  const link = db.magicLinks[email];
  
  if (!link) return false;
  
  // Check expiration
  if (new Date(link.expiresAt) < new Date()) {
    delete db.magicLinks[email];
    updateMockDatabase(db);
    return false;
  }
  
  // Check token
  return link.token === token;
}

/**
 * Clear magic link
 */
export function clearMagicLink(email: string): void {
  const db = getMockDatabase();
  delete db.magicLinks[email];
  updateMockDatabase(db);
}

/**
 * Mock Database Type
 */
export interface MockDatabase {
  users: User[];
  magicLinks: Record<string, MagicLinkRecord>;
  lastUpdated: string;
}

/**
 * Magic Link Record
 */
export interface MagicLinkRecord {
  token: string;
  expiresAt: string;
  createdAt: string;
}

/**
 * Generate mock users for testing
 */
function generateMockUsers(): User[] {
  return [
    // Mock Player Account
    {
      id: 'player_001',
      email: 'player@example.com',
      username: 'alex_player',
      accountType: AccountType.Player,
      firstName: 'Alex',
      lastName: 'Thompson',
      dateOfBirth: '2000-05-15',
      age: 24,
      country: 'United States',
      city: 'New York',
      gender: Gender.Male,
      primarySport: 'Football',
      isMinor: false,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    } as PlayerUser,
    
    // Mock Business Account
    {
      id: 'business_001',
      email: 'business@example.com',
      username: 'academy_sports',
      accountType: AccountType.Business,
      businessName: 'Elite Sports Academy',
      businessType: BusinessType.Academy,
      adminName: 'James Mitchell',
      country: 'United States',
      region: 'California',
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    } as BusinessUser,
    
    // Another Player Account
    {
      id: 'player_002',
      email: 'sarah@example.com',
      username: 'sarah_tennis',
      accountType: AccountType.Player,
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1998-08-22',
      age: 26,
      country: 'Canada',
      city: 'Toronto',
      gender: Gender.Female,
      primarySport: 'Tennis',
      isMinor: false,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
      lastLogin: new Date().toISOString(), // Just logged in
    } as PlayerUser,
    
    // Venue Business Account
    {
      id: 'business_002',
      email: 'venue@example.com',
      username: 'central_sports_venue',
      accountType: AccountType.Business,
      businessName: 'Central Sports Venue',
      businessType: BusinessType.Venue,
      adminName: 'Maria Garcia',
      country: 'United Kingdom',
      region: 'London',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
      lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    } as BusinessUser,
    
    // Visitor Account (no persistent data except ID)
    {
      id: 'visitor_001',
      email: 'visitor_session_001@example.com',
      accountType: AccountType.Visitor,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    } as VisitorUser,
  ];
}
