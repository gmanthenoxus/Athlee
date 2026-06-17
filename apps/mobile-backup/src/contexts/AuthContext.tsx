import { createContext, useContext, useEffect, ReactNode } from 'react';
import type { AuthContextValue } from '@athlehub/shared';
import { useAuthStore, initializeAuth } from '../store/authStore';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isAuthenticated, isLoading, login, logout } = useAuthStore();

  // Initialize auth state from storage on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * Access authentication state and actions
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

