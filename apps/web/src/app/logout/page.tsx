/**
 * Logout Page
 * 
 * Handles user logout flow.
 * 
 * Process:
 * 1. Calls logout from AuthContext
 * 2. Clears user session
 * 3. Redirects to landing page
 * 
 * Code Reviewers:
 * - This page is a simple intermediary that performs cleanup
 * - All heavy lifting is done in AuthContext.logout()
 * - Immediate redirect prevents flashing this page
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        // Redirect to landing page after logout
        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if there's an error
        router.push('/');
      }
    };

    performLogout();
  }, [logout, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  );
}
