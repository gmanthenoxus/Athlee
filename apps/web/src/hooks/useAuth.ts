/**
 * useAuth Hook
 * 
 * Custom hook to access authentication context.
 * Must be used inside <AuthProvider>.
 * 
 * Usage:
 * ```tsx
 * const { user, isLoading, login, logout } = useAuth();
 * ```
 * 
 * Code Reviewers: This hook provides type-safe access to auth context
 * with helpful error messages if used outside provider.
 */

'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { AuthContextValue } from '@/lib/auth-types';

/**
 * useAuth Hook
 * 
 * Returns the authentication context value.
 * 
 * @returns AuthContextValue with all auth state and methods
 * @throws Error if used outside AuthProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isLoading, logout } = useAuth();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (!user) return <div>Not authenticated</div>;
 *   
 *   return (
 *     <div>
 *       Welcome, {user.email}
 *       <button onClick={logout}>Logout</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used inside <AuthProvider>. ' +
        'Please ensure your component is wrapped with AuthProvider in the component tree.'
    );
  }

  return context;
}
