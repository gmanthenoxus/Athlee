'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTabsForAccountType, AccountType } from '@athlehub/shared';
import { useAuth } from '@/contexts/AuthContext';

export function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Don't show navigation on login or register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  // Get navigation items based on account type
  const navItems = user ? getTabsForAccountType(user.accountType) : [];

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 ${
              isActive
                ? 'text-zinc-900 dark:text-zinc-50'
                : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

