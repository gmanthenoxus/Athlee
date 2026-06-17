/**
 * Cache Utilities
 * Functions to clear and reset all application caches and storage
 * 
 * Use these functions when performing a complete fresh start or
 * resetting the application state for testing/development
 */

import { PROFILE_STORAGE_KEYS } from '../profile/storage';
import { STORAGE_KEYS } from '../auth/storage';

/**
 * Clear all profile-related data from localStorage
 */
export function clearProfileCache(): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available');
      return;
    }

    // Get all profile keys and remove them
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PROFILE_STORAGE_KEYS.PROFILE_PREFIX)) {
        keysToRemove.push(key);
      }
      if (key && key.startsWith(PROFILE_STORAGE_KEYS.USERNAME_INDEX)) {
        keysToRemove.push(key);
      }
      if (key === PROFILE_STORAGE_KEYS.ALL_PROFILES) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared ${keysToRemove.length} profile cache entries`);
  } catch (error) {
    console.error('Failed to clear profile cache:', error);
  }
}

/**
 * Clear all auth-related data from localStorage
 */
export function clearAuthCache(): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available');
      return;
    }

    // Get all auth keys and remove them
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key === STORAGE_KEYS.USER) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Cleared ${keysToRemove.length} auth cache entries`);
  } catch (error) {
    console.error('Failed to clear auth cache:', error);
  }
}

/**
 * Clear all application caches (profiles, auth, sessions, etc.)
 * WARNING: This will log out the user and clear all cached data
 */
export function clearAllCaches(): void {
  console.warn('🔴 Clearing ALL application caches...');
  
  try {
    clearProfileCache();
    clearAuthCache();

    // Clear sessionStorage as well
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.clear();
      console.log('Cleared sessionStorage');
    }

    console.log('✅ All caches cleared successfully');
  } catch (error) {
    console.error('Failed to clear all caches:', error);
  }
}

/**
 * Reset application to factory defaults
 * Clears all caches and forces a page reload
 */
export function resetApplicationToDefaults(): void {
  console.warn('🔴 Resetting application to factory defaults...');
  clearAllCaches();
  
  // Force reload the page
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

/**
 * Log all current cache entries for debugging
 */
export function debugCacheContents(): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available');
      return;
    }

    console.group('📦 Cache Contents Debug');
    
    const profiles: Record<string, unknown[]> = {};
    const auth: Record<string, unknown[]> = {};
    const other: Record<string, unknown[]> = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const value = localStorage.getItem(key);
      
      if (key.startsWith(PROFILE_STORAGE_KEYS.PROFILE_PREFIX)) {
        if (!profiles['Profiles']) profiles['Profiles'] = [];
        profiles['Profiles'].push({ key, size: value?.length || 0 });
      } else if (key.startsWith(PROFILE_STORAGE_KEYS.USERNAME_INDEX)) {
        if (!profiles['Username Index']) profiles['Username Index'] = [];
        profiles['Username Index'].push({ key, size: value?.length || 0 });
      } else if (key === PROFILE_STORAGE_KEYS.ALL_PROFILES) {
        if (!profiles['All Profiles']) profiles['All Profiles'] = [];
        profiles['All Profiles'].push({ key, size: value?.length || 0 });
      } else if (key === STORAGE_KEYS.USER) {
        if (!auth['Auth Data']) auth['Auth Data'] = [];
        auth['Auth Data'].push({ key, size: value?.length || 0 });
      } else {
        if (!other['Other']) other['Other'] = [];
        other['Other'].push({ key, size: value?.length || 0 });
      }
    }

    if (Object.keys(profiles).length > 0) {
      console.group('👥 Profile Cache');
      console.table(profiles);
      console.groupEnd();
    }

    if (Object.keys(auth).length > 0) {
      console.group('🔐 Auth Cache');
      console.table(auth);
      console.groupEnd();
    }

    if (Object.keys(other).length > 0) {
      console.group('📌 Other Cache');
      console.table(other);
      console.groupEnd();
    }

    console.log(`Total cache entries: ${localStorage.length}`);
    console.groupEnd();
  } catch (error) {
    console.error('Failed to debug cache contents:', error);
  }
}
