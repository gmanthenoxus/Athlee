import { create } from 'zustand';
import type {
  AuthStore,
  User,
  PlayerUser,
  BusinessUser,
  PlayerRegistrationData,
  BusinessRegistrationData
} from '@athlehub/shared';
import {
  createMockUser,
  createAuthStorage,
  AccountType,
  createVisitorUser,
  sendMagicLink as sendMagicLinkService,
  verifyMagicLink as verifyMagicLinkService,
  clearMagicLinkState,
  validateAge,
  clearProfileCache,
} from '@athlehub/shared';

const storage = createAuthStorage();

/**
 * Zustand Auth Store
 * Centralized authentication state management
 */
export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Actions
  login: async (name: string, accountType: AccountType = AccountType.Player) => {
    try {
      set({ isLoading: true });

      // Clear old profile cache to ensure fresh profiles are created from user data
      if (typeof window !== 'undefined') {
        clearProfileCache();
      }

      // Create mock user
      const user = createMockUser(name, accountType);

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

  registerPlayer: async (data: PlayerRegistrationData) => {
    try {
      set({ isLoading: true });

      // Validate age
      const ageValidation = validateAge(data.dateOfBirth);
      if (!ageValidation.canRegister) {
        throw new Error(ageValidation.error || 'Cannot register');
      }

      // Create player user
      const fullName = `${data.firstName} ${data.lastName}`;
      const user: PlayerUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        email: data.email,
        accountType: AccountType.Player,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        age: ageValidation.age,
        country: data.country,
        city: data.city,
        gender: data.gender,
        primarySport: data.primarySport,
        isMinor: ageValidation.isMinor,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=128`,
        createdAt: new Date().toISOString(),
        // Legacy fields
        name: fullName,
        givenName: data.firstName,
        familyName: data.lastName,
        displayName: fullName,
      };

      // Save to storage
      await storage.setUser(user);

      // Clear magic link state
      clearMagicLinkState();

      // Update state
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Player registration failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  registerBusiness: async (data: BusinessRegistrationData) => {
    try {
      set({ isLoading: true });

      // Create business user
      const user: BusinessUser = {
        id: `business_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        email: data.email,
        accountType: AccountType.Business,
        username: data.username,
        businessName: data.businessName,
        businessType: data.businessType,
        country: data.country,
        region: data.region,
        adminName: data.adminName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.businessName)}&background=random&size=128`,
        createdAt: new Date().toISOString(),
      };

      // Save to storage
      await storage.setUser(user);

      // Clear magic link state
      clearMagicLinkState();

      // Update state
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Business registration failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  sendMagicLink: async (email: string) => {
    try {
      await sendMagicLinkService(email);
    } catch (error) {
      console.error('Send magic link failed:', error);
      throw error;
    }
  },

  verifyMagicLink: async (email: string, token: string) => {
    try {
      const isValid = await verifyMagicLinkService(email, token);
      return isValid;
    } catch (error) {
      console.error('Verify magic link failed:', error);
      throw error;
    }
  },

  createVisitor: async () => {
    try {
      set({ isLoading: true });

      // Create visitor user
      const user = createVisitorUser();

      // Save to storage
      await storage.setUser(user);

      // Update state
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Create visitor failed:', error);
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

