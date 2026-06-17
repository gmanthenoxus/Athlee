'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Profile Page - Redirects to current user's profile
 * Users are redirected to /profile/[id] with their own user ID
 */
export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user?.id) {
        // Redirect to the user's profile page
        router.push(`/profile/${user.id}`);
      } else {
        // Redirect to login if no user
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-zinc-600 dark:text-zinc-400">
        Loading your profile...
      </div>
    </div>
  );
}

