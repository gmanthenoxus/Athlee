'use client';

import Link from 'next/link';

export function Header() {
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
          {/* User menu placeholder */}
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </header>
  );
}

