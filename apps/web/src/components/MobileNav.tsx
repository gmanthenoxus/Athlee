'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from 'shared';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.key}
              href={item.path}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <div className="h-5 w-5 flex items-center justify-center">
                {/* Icon placeholder - will be replaced with actual icons */}
                <span className="text-xs">●</span>
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

