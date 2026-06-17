import type { User } from './types';

/**
 * Storage Interface
 * Abstract storage for auth session persistence
 */
export interface AuthStorage {
  getUser(): Promise<User | null>;
  setUser(user: User): Promise<void>;
  removeUser(): Promise<void>;
}

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  USER: 'athlehub_auth_user',
} as const;

/**
 * Web Storage Implementation (localStorage)
 */
export class WebAuthStorage implements AuthStorage {
  async getUser(): Promise<User | null> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (!data) return null;
      return JSON.parse(data) as User;
    } catch (error) {
      console.error('Failed to get user from storage:', error);
      return null;
    }
  }

  async setUser(user: User): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }

  async removeUser(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Failed to remove user from storage:', error);
    }
  }
}

/**
 * Memory Storage Implementation (fallback)
 * Used when localStorage is not available or for testing
 */
export class MemoryAuthStorage implements AuthStorage {
  private user: User | null = null;

  async getUser(): Promise<User | null> {
    return this.user;
  }

  async setUser(user: User): Promise<void> {
    this.user = user;
  }

  async removeUser(): Promise<void> {
    this.user = null;
  }
}

/**
 * Create appropriate storage instance based on environment
 */
export function createAuthStorage(): AuthStorage {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.localStorage) {
    return new WebAuthStorage();
  }
  
  // Fallback to memory storage
  return new MemoryAuthStorage();
}

