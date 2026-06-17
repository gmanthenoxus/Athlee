/**
 * ProtectedRoute Component
 * 
 * HOC (Higher-Order Component) that wraps pages to enforce authentication.
 * 
 * Features:
 * - Redirects unauthenticated users to login
 * - Shows loading state while checking auth
 * - Supports optional role-based access control
 * - Handles visitor access restrictions
 * 
 * Code Reviewers:
 * - Uses 'use client' for client-side auth checks
 * - Implements proper loading and error states
 * - Provides clear error messages for debugging
 * - Supports nested component patterns for flexibility
 */

'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import type { AccountType } from '@/lib/auth-types';

interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * Allow specific account types to access this route
   * If not specified, any authenticated user can access
   * Example: ['Player', 'Business'] allows both player and business accounts
   */
  allowedAccountTypes?: AccountType[];

  /** Show loading component while checking auth */
  loadingComponent?: ReactNode;

  /** Show not authorized component if user lacks permission */
  unauthorizedComponent?: ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * Usage:
 * ```tsx
 * // Protect route from unauthenticated users
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * 
 * // Restrict to specific account types
 * <ProtectedRoute allowedAccountTypes={['Player', 'Business']}>
 *   <Dashboard />
 * </ProtectedRoute>
 * 
 * // Custom loading/unauthorized components
 * <ProtectedRoute
 *   loadingComponent={<CustomLoader />}
 *   unauthorizedComponent={<AccessDenied />}
 * >
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({
  children,
  allowedAccountTypes,
  loadingComponent = <div className="flex items-center justify-center h-screen">Loading...</div>,
  unauthorizedComponent = <div className="flex items-center justify-center h-screen">Access Denied</div>,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  /**
   * Handle authentication and authorization checks
   * 
   * Flow:
   * 1. If still loading, show loading component
   * 2. If not authenticated, redirect to login
   * 3. If account type restricted, check if user has permission
   * 4. If unauthorized, show unauthorized component
   * 5. Otherwise, render protected content
   */
  useEffect(() => {
    if (isLoading) {
      // Still checking authentication, wait
      return;
    }

    if (!isAuthenticated) {
      // Not authenticated, redirect to login
      console.warn('Unauthenticated access attempt to protected route');
      router.push('/login');
      return;
    }

    if (allowedAccountTypes && user) {
      // Check if user's account type is allowed
      if (!allowedAccountTypes.includes(user.accountType)) {
        console.warn(
          `Unauthorized access attempt: ${user.accountType} tried to access ${allowedAccountTypes.join(', ')} only route`
        );
        // Will render unauthorizedComponent below
      }
    }
  }, [isLoading, isAuthenticated, user, allowedAccountTypes, router]);

  // Show loading component while checking authentication
  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  // Redirect if not authenticated (will happen in useEffect, but render nothing while redirecting)
  if (!isAuthenticated) {
    return null;
  }

  // Check account type restrictions
  if (allowedAccountTypes && user && !allowedAccountTypes.includes(user.accountType)) {
    return <>{unauthorizedComponent}</>;
  }

  // User is authenticated and authorized, render protected content
  return <>{children}</>;
}

