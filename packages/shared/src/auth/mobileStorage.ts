import type { User } from './types';
import type { AuthStorage } from './storage';
import { STORAGE_KEYS } from './storage';

/**
 * Mobile Storage Implementation (AsyncStorage)
 * For React Native applications
 */

/**
 * Create mobile auth storage using AsyncStorage
 * This is a factory function that will be called from the mobile app
 */
export function createMobileAuthStorage(AsyncStorage: any): AuthStorage {
  return {
    async getUser(): Promise<User | null> {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        if (!data) return null;
        return JSON.parse(data) as User;
      } catch (error) {
        console.error('Failed to get user from storage:', error);
        return null;
      }
    },

    async setUser(user: User): Promise<void> {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } catch (error) {
        console.error('Failed to save user to storage:', error);
      }
    },

    async removeUser(): Promise<void> {
      try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      } catch (error) {
        console.error('Failed to remove user from storage:', error);
      }
    },
  };
}

