'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { AccountType, type User, type PlayerUser, type BusinessUser } from '@athlehub/shared';

// Helper function to get display name for any user type
function getUserDisplayName(user: User): string {
  if (user.accountType === AccountType.Player) {
    const playerUser = user as PlayerUser;
    return `${playerUser.firstName} ${playerUser.lastName}`;
  } else if (user.accountType === AccountType.Business) {
    const businessUser = user as BusinessUser;
    return businessUser.businessName;
  } else {
    return 'Visitor';
  }
}

// Helper function to get initials for avatar
function getUserInitials(user: User): string {
  if (user.accountType === AccountType.Player) {
    const playerUser = user as PlayerUser;
    return `${playerUser.firstName[0]}${playerUser.lastName[0]}`;
  } else if (user.accountType === AccountType.Business) {
    const businessUser = user as BusinessUser;
    return businessUser.businessName.split(' ').map(n => n[0]).join('').substring(0, 2);
  } else {
    return 'V';
  }
}

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Don't show header on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Athlehub
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {/* Navigation will be added here */}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user && (
            <>
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {getUserDisplayName(user)}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {getUserInitials(user)}
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

