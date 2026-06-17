'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  // Public routes that don't require authentication
  const isPublicRoute = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected route
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }

    // Redirect to home if authenticated and trying to access login or register
    if (!isLoading && isAuthenticated && (pathname === '/login' || pathname === '/register')) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, isPublicRoute, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}

