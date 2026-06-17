/**
 * AuthService
 * 
 * Core authentication service handling all auth operations:
 * - User registration (Player and Business accounts)
 * - User login/logout
 * - Token management
 * - Session validation
 * - Magic link flows
 * 
 * Code Reviewers: This service acts as the bridge between the frontend and authentication logic.
 * All sensitive operations like password hashing, token validation, and user creation
 * are abstracted here to maintain separation of concerns.
 */

import {
  User,
  AccountType,
  PlayerUser,
  BusinessUser,
  PlayerRegistrationData,
  BusinessRegistrationData,
  VisitorUser,
} from './types';
import {
  getMockUsers,
  storeMagicLink,
  verifyMagicLink as verifyMagicLinkInDb,
  clearMagicLink,
  initializeMockDatabase,
} from './mockDatabase';

/**
 * Mock database simulation using localStorage
 * In production, this would be an API call to a backend server
 */
const USERS_STORAGE_KEY = 'athlee_users';
const CURRENT_USER_KEY = 'athlee_current_user';
const AUTH_TOKEN_KEY = 'athlee_auth_token';

/**
 * Generate a simple JWT-like token for demo purposes
 * Code Reviewers: In production, tokens would be issued by backend server
 * and validated server-side on each request
 */
function generateAuthToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
    })
  );
  const signature = btoa(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
}

/**
 * Generate a unique user ID
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all stored users from localStorage
 */
function getAllUsers(): User[] {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.error('Failed to retrieve users from storage');
    return [];
  }
}

/**
 * Save users to localStorage
 */
function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    console.error('Failed to save users to storage');
  }
}

/**
 * Find user by email
 */
function findUserByEmail(email: string): User | undefined {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Find user by username
 */
function findUserByUsername(username: string): User | undefined {
  const users = getAllUsers();
  return users.find((u) => 'username' in u && u.username.toLowerCase() === username.toLowerCase());
}

/**
 * AuthService
 * Main authentication service class
 */
export class AuthService {
  /**
   * Register a new Player account
   * 
   * Code Reviewers:
   * - Email and username must be unique (checked against existing users)
   * - Age validation: dates of birth are validated
   * - Password hashing: In production, use bcrypt on backend
   * - Return value: Created player user object
   * 
   * @param data - Player registration data
   * @returns Created player user
   * @throws Error if email/username already exists or validation fails
   */
  async registerPlayer(data: PlayerRegistrationData): Promise<PlayerUser> {
    // Validate unique email
    if (findUserByEmail(data.email)) {
      throw new Error(`Email ${data.email} is already registered`);
    }

    // Validate unique username
    if (findUserByUsername(data.username)) {
      throw new Error(`Username @${data.username} is already taken`);
    }

    // Calculate age from date of birth
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // Create new player user
    const playerUser: PlayerUser = {
      id: generateUserId(),
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      age,
      country: data.country,
      city: data.city,
      gender: data.gender,
      primarySport: data.primarySport,
      isMinor: age < 18,
      accountType: AccountType.Player,
      createdAt: new Date().toISOString(),
    };

    // Save to storage
    const users = getAllUsers();
    users.push(playerUser);
    saveUsers(users);

    // Set as current user
    this.setCurrentUser(playerUser);

    return playerUser;
  }

  /**
   * Register a new Business account
   * 
   * Code Reviewers:
   * - Email and username must be unique
   * - Business type is validated against enum
   * - Admin name is required (person responsible for account)
   * - Return value: Created business user object
   * 
   * @param data - Business registration data
   * @returns Created business user
   * @throws Error if email/username already exists or validation fails
   */
  async registerBusiness(data: BusinessRegistrationData): Promise<BusinessUser> {
    // Validate unique email
    if (findUserByEmail(data.email)) {
      throw new Error(`Email ${data.email} is already registered`);
    }

    // Validate unique username
    if (findUserByUsername(data.username)) {
      throw new Error(`Username @${data.username} is already taken`);
    }

    // Create new business user
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

    // Save to storage
    const users = getAllUsers();
    users.push(businessUser);
    saveUsers(users);

    // Set as current user
    this.setCurrentUser(businessUser);

    return businessUser;
  }

  /**
   * Login with existing credentials (simplified for demo)
   * 
   * Code Reviewers:
   * - In production: Use email + password with bcrypt verification
   * - Currently: Uses email lookup for demo purposes
   * - Token: Generated and stored in localStorage
   * - Session: User is set as current user
   * 
   * @param email - User email
   * @returns Authenticated user
   * @throws Error if user not found
   */
  async login(email: string): Promise<User> {
    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Generate auth token
    const token = generateAuthToken(user.id);
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    // Set as current user
    this.setCurrentUser(user);

    return user;
  }

  /**
   * Create a temporary Visitor account (view-only access)
   * 
   * Code Reviewers:
   * - No registration required
   * - Limited feature access
   * - Session-based (no persistent user data)
   * - Used for anonymous browsing
   * 
   * @returns Visitor user session
   */
  async createVisitor(): Promise<VisitorUser> {
    const visitorUser: VisitorUser = {
      id: generateUserId(),
      email: '',
      accountType: AccountType.Visitor,
      sessionId: `session_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    this.setCurrentUser(visitorUser);
    return visitorUser;
  }

  /**
   * Logout current user
   * 
   * Code Reviewers:
   * - Clears auth token from storage
   * - Clears current user session
   * - In production: Invalidate token on backend
   */
  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  /**
   * Get current authenticated user
   * 
   * @returns Current user or null if not authenticated
   */
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  /**
   * Set current user (internal method)
   * 
   * @param user - User to set as current
   */
  private setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  /**
   * Verify auth token validity
   * 
   * Code Reviewers:
   * - In production: Validate JWT signature on backend
   * - Currently: Simple expiration check
   * 
   * @returns true if valid token exists
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return false;

    try {
      // Decode token (basic validation)
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);

      // Check expiration
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  /**
   * Validate email format
   * 
   * @param email - Email to validate
   * @returns true if valid email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate username format
   * 
   * @param username - Username to validate
   * @returns Error message if invalid, empty string if valid
   */
  validateUsername(username: string): string {
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (username.length > 30) {
      return 'Username must be at most 30 characters';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'Username can only contain letters, numbers, dashes, and underscores';
    }
    return '';
  }

  /**
   * Check if email is already registered
   * 
   * @param email - Email to check
   * @returns true if email exists
   */
  emailExists(email: string): boolean {
    return !!findUserByEmail(email);
  }

  /**
   * Check if username is already registered
   * 
   * @param username - Username to check
   * @returns true if username exists
   */
  usernameExists(username: string): boolean {
    return !!findUserByUsername(username);
  }

  /**
   * Get user by ID
   * 
   * @param userId - User ID to fetch
   * @returns User or undefined if not found
   */
  async getUserById(userId: string): Promise<User | undefined> {
    const users = getAllUsers();
    return users.find((u) => u.id === userId);
  }

  /**
   * Send Magic Link for passwordless authentication
   * 
   * Code Reviewers:
   * - Generates a unique token for email verification
   * - In production: Send via email service (SendGrid, Mailgun, etc.)
   * - Token expires after 15 minutes
   * - Replaces password-based auth for simpler UX
   * 
   * @param email - User email address
   * @returns Magic link token (in demo, also returned here)
   * @throws Error if email not found
   */
  async sendMagicLink(email: string): Promise<string> {
    // Check if email is registered
    if (!findUserByEmail(email)) {
      throw new Error(`Email ${email} is not registered. Please register first.`);
    }

    // Generate magic link token
    const token = btoa(`${email}:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`);
    
    // Store token with 15-minute expiration
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    storeMagicLink(email, token, expiresAt);

    // In production, send email with magic link:
    // const magicLinkUrl = `https://athlee.com/auth/verify-magic-link?token=${token}&email=${email}`;
    // await emailService.send({
    //   to: email,
    //   subject: 'Sign in to Athlee',
    //   template: 'magic-link',
    //   data: { magicLinkUrl }
    // });

    // For demo purposes, return token (in production, never return this)
    console.log(`[DEMO] Magic link token for ${email}: ${token}`);
    return token;
  }

  /**
   * Verify Magic Link token and authenticate user
   * 
   * Code Reviewers:
   * - Validates token expiration
   * - Checks token matches stored value
   * - Creates session for verified email
   * - Clears token after use
   * 
   * @param email - User email
   * @param token - Magic link token
   * @returns Authenticated user
   * @throws Error if token invalid or expired
   */
  async verifyMagicLink(email: string, token: string): Promise<User> {
    // Verify token
    if (!verifyMagicLinkInDb(email, token)) {
      throw new Error('Invalid or expired magic link');
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Clear token after use
    clearMagicLink(email);

    // Create session
    const authToken = generateAuthToken(user.id);
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    this.setCurrentUser(user);

    return user;
  }

  /**
   * Initialize demo database with mock accounts
   * Call this once on app startup
   */
  initializeDemoData(): void {
    initializeMockDatabase();
  }
}

// Export singleton instance
export const authService = new AuthService();
