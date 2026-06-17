'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AuthContextValue, MagicLinkState, PlayerUser } from '@athlehub/shared';
import { AccountType, getMagicLinkState } from '@athlehub/shared';
import { useAuthStore, initializeAuth } from '@/store/authStore';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    registerPlayer,
    registerBusiness,
    logout,
    sendMagicLink,
    verifyMagicLink,
    createVisitor,
  } = useAuthStore();

  const [magicLinkState, setMagicLinkState] = useState<MagicLinkState | null>(null);

  // Initialize auth state from storage on mount
  useEffect(() => {
    initializeAuth();

    // Check for magic link state
    const state = getMagicLinkState();
    setMagicLinkState(state);
  }, []);

  // Helper methods
  const isVisitor = () => user?.accountType === AccountType.Visitor;
  const isPlayer = () => user?.accountType === AccountType.Player;
  const isBusiness = () => user?.accountType === AccountType.Business;
  const isRegular = () => isPlayer() || isBusiness();

  const getAvailableTabs = () => {
    if (isPlayer()) return ['feed', 'explore', 'messages', 'profile'];
    if (isBusiness()) return ['profile'];
    return ['feed'];
  };

  const canAccessFeature = (feature: string): boolean => {
    if (isVisitor()) {
      return ['feed'].includes(feature);
    }
    if (isPlayer()) {
      const playerUser = user as PlayerUser;
      // Check minor restrictions
      if (playerUser?.isMinor) {
        const minorRestrictions = ['private_profile', 'public_discovery', 'unlimited_chat'];
        return !minorRestrictions.includes(feature);
      }
      return true;
    }
    return true;
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    registerPlayer,
    registerBusiness,
    logout,
    sendMagicLink,
    verifyMagicLink,
    magicLinkState,
    createVisitor,
    isVisitor,
    isPlayer,
    isBusiness,
    isRegular,
    getAvailableTabs,
    canAccessFeature,
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

