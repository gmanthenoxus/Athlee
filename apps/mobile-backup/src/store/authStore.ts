import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthStore, User } from '@athlehub/shared';
import { createMockUser, createMobileAuthStorage } from '@athlehub/shared';

const storage = createMobileAuthStorage(AsyncStorage);

/**
 * Zustand Auth Store for Mobile
 * Centralized authentication state management
 */
export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Actions
  login: async (name: string) => {
    try {
      set({ isLoading: true });
      
      // Create mock user
      const user = createMockUser(name);
      
      // Save to storage
      await storage.setUser(user);
      
      // Update state
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      
      // Remove from storage
      await storage.removeUser();
      
      // Clear state
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

/**
 * Initialize auth state from storage
 */
export async function initializeAuth() {
  try {
    const user = await storage.getUser();
    useAuthStore.getState().setUser(user);
  } catch (error) {
    console.error('Failed to initialize auth:', error);
    useAuthStore.getState().setLoading(false);
  }
}

