'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_USERS, validateUserName, AccountType, type User, type PlayerUser, type BusinessUser } from '@athlehub/shared';

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

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate name
    const validation = validateUserName(name);
    if (!validation.valid) {
      setError(validation.error || 'Invalid name');
      return;
    }

    try {
      await login(name);
      router.push('/');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  const handleQuickLogin = async (user: User) => {
    try {
      const displayName = getUserDisplayName(user);
      await login(displayName, user.accountType);
      router.push('/');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Athlehub
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Mock Authentication
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Enter your name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/register"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Don't have an account? Register here
            </Link>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or use a mock profile
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {MOCK_USERS.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleQuickLogin(user)}
                  disabled={isLoading}
                  className="flex items-center gap-3 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {getUserInitials(user)}
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {getUserDisplayName(user)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {user.accountType}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          This is a mock authentication system for development purposes only.
        </p>
      </div>
    </div>
  );
}

