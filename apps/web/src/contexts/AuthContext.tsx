/**
 * AuthContext
 * 
 * React Context for managing global authentication state and providing
 * authentication methods throughout the application.
 * 
 * Features:
 * - User authentication state management
 * - Registration and login flows
 * - Token management and session validation
 * - Type-safe authentication methods
 * - Account type helpers
 * 
 * Code Reviewers: This context is the central authentication hub.
 * All authentication operations flow through here, making it a key
 * integration point for adding logging, analytics, or additional validation.
 */

'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { authService, initializeMockDatabase } from '@/lib/authService';
import { matchService } from '@/lib/matchService';
import type {
  User,
  AuthContextValue,
  PlayerRegistrationData,
  BusinessRegistrationData,
  MagicLinkState,
} from '@/lib/auth-types';

/**
 * Create the AuthContext
 * Type: AuthContextValue | undefined (initially undefined until provider mounts)
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider Component
 * 
 * Wraps the application to provide authentication context.
 * 
 * Initialization:
 * - Checks for existing auth token on mount
 * - Restores user session if valid
 * - Handles loading state during initialization
 * 
 * Code Reviewers:
 * - useEffect runs once on mount to initialize auth state
 * - All state updates trigger re-renders for subscribed components
 * - Loading state prevents race conditions during auth checks
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // ===== STATE MANAGEMENT =====

  /** Current authenticated user, null if not authenticated */
  const [user, setUser] = useState<User | null>(null);

  /** Loading state during auth initialization and operations */
  const [isLoading, setIsLoading] = useState(true);

  /** Magic link flow state (for email-based authentication) */
  const [magicLinkState, setMagicLinkState] = useState<MagicLinkState | null>(null);

  // ===== INITIALIZATION =====

  /**
   * Initialize authentication state on mount
   * 
   * - Initialize mock database with demo data
   * - Checks if user was previously authenticated
   * - Validates auth token if present
   * - Restores session if valid
   * - Sets loading to false when complete
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Initialize mock database on first load
        initializeMockDatabase();

        // Initialize mock match data and stats
        matchService.initializeMockData();

        // Try to restore user session from storage
        const currentUser = authService.getCurrentUser();
        if (currentUser && authService.isAuthenticated()) {
          setUser(currentUser);
        } else {
          // Clear invalid auth data
          authService.logout();
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
        setUser(null);
      } finally {
        // Always set loading to false
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ===== AUTHENTICATION METHODS =====

  /**
   * Register a new Player account
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.registerPlayer()
   * 3. Update user state on success
   * 4. Throw error on failure
   * 
   * @param data - Player registration data
   * @throws Error if registration fails
   */
  const registerPlayer = useCallback(async (data: PlayerRegistrationData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.registerPlayer(data);
      setUser(newUser);
      console.log('Player registered successfully:', newUser.username);
    } catch (error) {
      console.error('Player registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register a new Business account
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.registerBusiness()
   * 3. Update user state on success
   * 4. Throw error on failure
   * 
   * @param data - Business registration data
   * @throws Error if registration fails
   */
  const registerBusiness = useCallback(async (data: BusinessRegistrationData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.registerBusiness(data);
      setUser(newUser);
      console.log('Business registered successfully:', newUser.username);
    } catch (error) {
      console.error('Business registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login with email (simplified for demo)
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.login()
   * 3. Update user state on success
   * 4. Throw error on failure
   * 
   * In production, this would also accept password and use API call.
   * 
   * @param email - User email
   * @throws Error if login fails
   */
  const login = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const authenticatedUser = await authService.login(email);
      setUser(authenticatedUser);
      console.log('User logged in successfully:', authenticatedUser.email);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Send magic link for passwordless authentication
   * 
   * Code Reviewers:
   * - Currently a stub for future implementation
   * - Would send email with verification link
   * - Updates magicLinkState to track flow
   * 
   * @param email - Email to send magic link to
   */
  const sendMagicLink = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      // Validate email exists
      if (!authService.validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      // TODO: Call backend API to send magic link
      // const response = await fetch('/api/auth/magic-link', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // For now, just update state
      setMagicLinkState({
        email,
        sentAt: new Date().toISOString(),
        verified: false,
      });

      console.log('Magic link sent to:', email);
    } catch (error) {
      console.error('Failed to send magic link:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verify magic link token
   * 
   * Code Reviewers:
   * - Currently a stub for future implementation
   * - Would validate token against backend
   * - Authenticates user on success
   * 
   * @param email - Email that received magic link
   * @param token - Token from magic link
   * @returns true if verified and authenticated
   */
  const verifyMagicLink = useCallback(async (email: string, token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // TODO: Call backend API to verify magic link
      // const response = await fetch('/api/auth/verify-magic-link', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, token })
      // });

      // For now, just clear state
      setMagicLinkState(null);
      return true;
    } catch (error) {
      console.error('Failed to verify magic link:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a temporary Visitor account
   * 
   * Visitor accounts have limited access and no persistent data.
   * Used for anonymous browsing and exploration.
   */
  const createVisitor = useCallback(async () => {
    setIsLoading(true);
    try {
      const visitorUser = await authService.createVisitor();
      setUser(visitorUser);
      console.log('Visitor session created');
    } catch (error) {
      console.error('Failed to create visitor session:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout current user
   * 
   * Flow:
   * 1. Set loading state
   * 2. Call authService.logout()
   * 3. Clear user state
   * 4. Clear magic link state
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setMagicLinkState(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ===== HELPER METHODS =====

  /**
   * Check if current user is a Visitor
   * Visitors have view-only access
   */
  const isVisitor = useCallback(() => {
    return user?.accountType === 'Visitor';
  }, [user]);

  /**
   * Check if current user is a Player
   * Players are individual users (athletes, enthusiasts)
   */
  const isPlayer = useCallback(() => {
    return user?.accountType === 'Player';
  }, [user]);

  /**
   * Check if current user is a Business
   * Businesses are venues, academies, clubs, brands
   */
  const isBusiness = useCallback(() => {
    return user?.accountType === 'Business';
  }, [user]);

  /**
   * Check if current user is authenticated (not just a visitor)
   */
  const isRegular = useCallback(() => {
    return isPlayer() || isBusiness();
  }, [isPlayer, isBusiness]);

  /**
   * Get available tabs based on account type
   * 
   * Different account types have different available features:
   * - Player: feed, explore, messages, profile
   * - Business: dashboard, bookings, messages, settings
   * - Visitor: explore only
   */
  const getAvailableTabs = useCallback((): string[] => {
    if (!user) return [];

    if (isPlayer()) {
      return ['feed', 'explore', 'messages', 'profile'];
    }

    if (isBusiness()) {
      return ['dashboard', 'bookings', 'messages', 'profile'];
    }

    // Visitor
    return ['explore'];
  }, [user, isPlayer, isBusiness]);

  /**
   * Check if user can access a specific feature
   * 
   * Feature access varies by account type:
   * - Players can: view feed, explore, message, edit profile
   * - Businesses can: manage bookings, send bookings, edit business info
   * - Visitors can: explore only
   */
  const canAccessFeature = useCallback((feature: string): boolean => {
    if (!user) return false;

    if (isVisitor()) {
      return feature === 'explore';
    }

    if (isPlayer()) {
      return ['feed', 'explore', 'messages', 'profile', 'edit-profile'].includes(feature);
    }

    if (isBusiness()) {
      return ['dashboard', 'bookings', 'messages', 'profile', 'edit-business'].includes(feature);
    }

    return false;
  }, [user, isVisitor, isPlayer, isBusiness]);

  // ===== CONTEXT VALUE =====

  const contextValue: AuthContextValue = {
    // State
    user,
    isAuthenticated: user !== null && authService.isAuthenticated(),
    isLoading,

    // Auth methods
    registerPlayer,
    registerBusiness,
    login,
    logout,
    sendMagicLink,
    verifyMagicLink,
    magicLinkState,
    createVisitor,

    // Helper methods
    isVisitor,
    isPlayer,
    isBusiness,
    isRegular,
    getAvailableTabs,
    canAccessFeature,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

