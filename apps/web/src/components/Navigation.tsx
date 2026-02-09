'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from 'shared';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.key}
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

