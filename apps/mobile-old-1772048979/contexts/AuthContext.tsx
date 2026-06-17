import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthContextValue, MagicLinkState } from '@athlehub/shared';
import { AccountType } from '@athlehub/shared';
import { useAuthStore, initializeAuth } from '../store/authStore';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const MAGIC_LINK_KEY = 'athlehub_magic_link_state';

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
    AsyncStorage.getItem(MAGIC_LINK_KEY).then(stateStr => {
      if (stateStr) {
        try {
          setMagicLinkState(JSON.parse(stateStr));
        } catch {
          setMagicLinkState(null);
        }
      }
    });
  }, []);

  // Helper methods
  const isVisitor = () => user?.accountType === AccountType.Visitor;
  const isPlayer = () => user?.accountType === AccountType.Player;
  const isBusiness = () => user?.accountType === AccountType.Business;
  const isRegular = () => user?.accountType === AccountType.Player; // Backward compatibility

  /**
   * Get available navigation tabs based on account type
   */
  const getAvailableTabs = () => {
    if (!user) return [];
    
    switch (user.accountType) {
      case AccountType.Player:
        return ['feed', 'explore', 'messages', 'profile'];
      case AccountType.Business:
        return ['profile']; // Business has different tabs (Profile, Locations, Bookings, Messages)
      case AccountType.Visitor:
        return ['feed']; // Visitors can only see limited feed
      default:
        return [];
    }
  };

  /**
   * Check if user has feature access based on age and account type
   */
  const canAccessFeature = (feature: string): boolean => {
    if (!user) return false;
    
    // Visitors have very limited access
    if (isVisitor()) {
      return ['view-feed', 'view-profile'].includes(feature);
    }

    // Minors (under 18) have restricted access
    if ('isMinor' in user && user.isMinor) {
      const restrictedFeatures = [
        'public-discovery', // No public discover in explore
        'messaging-all', // Limited chat
      ];
      return !restrictedFeatures.includes(feature);
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

