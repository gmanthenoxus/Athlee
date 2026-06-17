/**
 * Users Directory Page
 * 
 * Browse all users and view their profiles.
 * 
 * Features:
 * - List all registered users
 * - Filter by account type
 * - Click to view any user's profile
 * - Search by name/email
 * 
 * Code Reviewers:
 * - Fetches all users from localStorage mock database
 * - Displays user cards with quick info
 * - Links to individual profile pages
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function UsersDirectory() {
  const { user: currentUser, isLoading } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [directoryLoading, setDirectoryLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      try {
        const allUsers = JSON.parse(localStorage.getItem('athlee_users') || '[]');
        setUsers(allUsers);
        filterUsers(allUsers, searchTerm, selectedType);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
      setDirectoryLoading(false);
    }
  }, [isLoading]);

  const filterUsers = (allUsers: any[], search: string, type: string) => {
    let filtered = allUsers;

    if (type !== 'all') {
      filtered = filtered.filter((u) => u.accountType === type);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          (u.firstName && u.firstName.toLowerCase().includes(searchLower)) ||
          (u.lastName && u.lastName.toLowerCase().includes(searchLower)) ||
          (u.businessName && u.businessName.toLowerCase().includes(searchLower)) ||
          (u.username && u.username.toLowerCase().includes(searchLower)) ||
          (u.email && u.email.toLowerCase().includes(searchLower))
      );
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    filterUsers(users, search, selectedType);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterUsers(users, searchTerm, type);
  };

  if (isLoading || directoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading directory...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Authenticated</h2>
          <p className="text-gray-600 mb-8">Please log in to view the users directory.</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Athlee
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href={`/profile/${currentUser.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                My Profile
              </Link>
              <Link href="/logout" className="text-red-600 hover:text-red-800 font-medium">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Users Directory</h1>
          <p className="text-gray-600 mt-2">Browse and connect with the Athlee community</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Name, email, or username..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Account Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => handleTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Player">Players</option>
                <option value="Business">Businesses</option>
                <option value="Visitor">Visitors</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="mb-4">
            <p className="text-gray-600">
              Found <span className="font-semibold">{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                  {/* Header with Badge */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200 flex items-start justify-between">
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        user.accountType === 'Player'
                          ? 'bg-blue-100 text-blue-700'
                          : user.accountType === 'Business'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.accountType}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Username (Primary) */}
                    <Link href={`/profile/${user.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 transition cursor-pointer truncate">
                        @{user.username || user.email.split('@')[0]}
                      </h3>
                    </Link>

                    {/* Display Name (Secondary) */}
                    <p className="text-sm text-gray-600 mb-4 truncate">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.businessName || user.email}
                    </p>

                    {/* Account-Specific Info */}
                    <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
                      {user.accountType === 'Player' && (
                        <>
                          {user.primarySport && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">⚽</span>
                              <span className="text-sm text-gray-600">{user.primarySport}</span>
                            </div>
                          )}
                          {user.city && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">📍</span>
                              <span className="text-sm text-gray-600">{user.city}, {user.country}</span>
                            </div>
                          )}
                          {user.age && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">📅</span>
                              <span className="text-sm text-gray-600">{user.age} years old</span>
                            </div>
                          )}
                        </>
                      )}

                      {user.accountType === 'Business' && (
                        <>
                          {user.businessType && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">🏢</span>
                              <span className="text-sm text-gray-600">{user.businessType}</span>
                            </div>
                          )}
                          {user.region && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">📍</span>
                              <span className="text-sm text-gray-600">{user.region}, {user.country}</span>
                            </div>
                          )}
                          {user.adminName && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">👤</span>
                              <span className="text-sm text-gray-600">{user.adminName}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Member Since */}
                    <p className="text-xs text-gray-500 mb-4">
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>

                    {/* View Profile Link */}
                    <Link
                      href={`/profile/${user.id}`}
                      className="inline-block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 font-medium transition"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg">No users found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  filterUsers(users, '', 'all');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
