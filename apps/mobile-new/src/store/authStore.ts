import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserRole {
  Player = 'Player',
  Business = 'Business',
  Visitor = 'Visitor',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  username?: string;
  profileImage?: string;
  primarySport?: string;
  city?: string;
  country?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Mock login - replace with API call
          const mockUser: User = {
            id: `user_${Date.now()}`,
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: UserRole.Player,
            username: email.split('@')[0],
            primarySport: 'Basketball',
            city: 'San Francisco',
            country: 'USA',
            createdAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        try {
          // Mock registration - replace with API call
          const newUser: User = {
            id: `user_${Date.now()}`,
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            role: userData.role || UserRole.Player,
            username: userData.username,
            primarySport: userData.primarySport,
            city: userData.city,
            country: userData.country,
            createdAt: new Date().toISOString(),
          };

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
