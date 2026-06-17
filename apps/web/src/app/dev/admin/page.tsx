/**
 * Dev Admin Dashboard
 * 
 * Comprehensive development dashboard for managing mock data ecosystem
 * - Real-time database statistics
 * - Court regulars management (NEW)
 * - User, location, and match management
 * - Ecosystem generation and testing
 * 
 * ⚠️ Development Only - Not for production use
 */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { StatsDebugPanel } from '@/components/dev/StatsDebugPanel';
import { AdminUserEditor } from '@/components/dev/AdminUserEditor';
import { AdminLocationEditor } from '@/components/dev/AdminLocationEditor';
import { AdminXPTab } from '@/components/dev/AdminXPTab';
import { AdminBadgesTab } from '@/components/dev/AdminBadgesTab';
import { AdminCourtRegularsTab } from '@/components/dev/AdminCourtRegularsTab';
import { AdminFollowersNetworkTab } from '@/components/dev/AdminFollowersNetworkTab';
import { AdminLeaderboardsTab } from '@/components/dev/AdminLeaderboardsTab';
import { AdminHealthStatsTab } from '@/components/dev/AdminHealthStatsTab';
import { initializeComprehensiveMockDataEcosystem, clearComprehensiveMockData, getEcosystemStats } from '@/lib/mockDataInitializer';
import { getAllPlayerUsers, getAllBusinessUsers } from '@/lib/mockUsersComprehensive';
import { userStatsService } from '@/lib/userStatsService';
import { courtRegularsService } from '@/lib/courtRegularsService';
import { getAllComprehensiveLocations } from '@/lib/mockLocationsComprehensive';
import { getAllComprehensiveMatches } from '@/lib/mockMatchesComprehensive';
import { followerService } from '@/lib/followerService';
import { Team, MatchPlayer } from '@/lib/match-types';

// Types
interface MockDatabase {
  users: any[];
  locations: any[];
  matches: any[];
  events: any[];
  bookings: any[];
  lastUpdated: string;
}

type TabType = 'overview' | 'court-regulars' | 'followers-network' | 'leaderboards' | 'health-stats' | 'users' | 'locations' | 'matches' | 'events' | 'xp' | 'badges' | 'storage';

// Stat Card Component
const StatCard = ({ icon, label, value, color, trend }: any) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-4 shadow-md border border-white/20`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        {trend && <p className="text-xs text-green-600 mt-1">↑ {trend}</p>}
      </div>
      <div className="text-4xl opacity-20">{icon}</div>
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, icon, description }: any) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
      <span className="text-3xl">{icon}</span>
      {title}
    </h2>
    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
  </div>
);

// Tab Button Component
const TabButton = ({ active, icon, label, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      active
        ? 'bg-blue-600 text-white shadow-lg scale-105'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`}
  >
    <span className="text-xl">{icon}</span>
    {label}
  </button>
);

export default function DevAdminPage() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [database, setDatabase] = useState<MockDatabase | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [courtStats, setCourtStats] = useState<any[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingLocation, setEditingLocation] = useState<any>(null);
  const [editingMatch, setEditingMatch] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'user' | 'location' | 'match'>('user');
  const [isResetting, setIsResetting] = useState(false);
  
  // New: Detail view states
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailType, setDetailType] = useState<'user' | 'location' | 'match'>('user');

  // New: Filter and pagination states
  const [usersSearchTerm, setUsersSearchTerm] = useState('');
  const [usersPage, setUsersPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(18);
  
  const [locationsSearchTerm, setLocationsSearchTerm] = useState('');
  const [locationsPage, setLocationsPage] = useState(0);
  const [locationsPerPage, setLocationsPerPage] = useState(12);
  
  const [matchesSearchTerm, setMatchesSearchTerm] = useState('');
  const [matchesStatusFilter, setMatchesStatusFilter] = useState<'all' | 'Scheduled' | 'InProgress' | 'Completed'>('all');
  const [matchesPage, setMatchesPage] = useState(0);
  const [matchesPerPage, setMatchesPerPage] = useState(12);

  // Load database and refresh stats
  const loadData = () => {
    try {
      const users = JSON.parse(localStorage.getItem('athlee_users') || '[]');
      const locations = JSON.parse(localStorage.getItem('athlee_locations') || '[]');
      const matches = JSON.parse(localStorage.getItem('athlee_matches') || '[]');
      const events = JSON.parse(localStorage.getItem('athlee_events') || '[]');
      const bookings = JSON.parse(localStorage.getItem('athlee_bookings') || '[]');

      setDatabase({
        users: users || [],
        locations: locations || [],
        matches: matches || [],
        events: events || [],
        bookings: bookings || [],
        lastUpdated: new Date().toISOString(),
      });

      // Load ecosystem stats
      const ecosystemStats = getEcosystemStats();
      setStats(ecosystemStats);

      // Load court stats
      const allCourtStats = courtRegularsService.getAllCourtStats();
      setCourtStats(allCourtStats);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInitializeEcosystem = async () => {
    setIsInitializing(true);
    try {
      initializeComprehensiveMockDataEcosystem();
      setTimeout(() => {
        loadData();
        setIsInitializing(false);
      }, 1000);
    } catch (error) {
      console.error('Error initializing:', error);
      setIsInitializing(false);
    }
  };

  const handleClearEcosystem = async () => {
    if (confirm('Clear all data? This cannot be undone.')) {
      await clearComprehensiveMockData();
      loadData();
      setShowReset(false);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!database) return;
    const updatedUsers = database?.users?.filter(u => u.id !== userId) || [];
    localStorage.setItem('athlee_users', JSON.stringify(updatedUsers));
    loadData();
  };

  const handleDeleteLocation = (locationId: string) => {
    if (!database) return;
    const updatedLocations = database?.locations?.filter(l => l.id !== locationId) || [];
    localStorage.setItem('athlee_locations', JSON.stringify(updatedLocations));
    loadData();
  };

  const handleDeleteMatch = (matchId: string) => {
    if (!database) return;
    const updatedMatches = database?.matches?.filter(m => m.id !== matchId) || [];
    localStorage.setItem('athlee_matches', JSON.stringify(updatedMatches));
    loadData();
  };

  const handleEditUser = (user: any) => {
    setEditingUser({ ...user });
    setFormType('user');
    setShowForm(true);
  };

  const handleEditLocation = (location: any) => {
    setEditingLocation({ ...location });
    setFormType('location');
    setShowForm(true);
  };

  const handleEditMatch = (match: any) => {
    setEditingMatch({ ...match });
    setFormType('match');
    setShowForm(true);
  };

  // New: View details handlers
  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setDetailType('user');
    setShowDetailModal(true);
  };

  const handleViewLocation = (location: any) => {
    setSelectedLocation(location);
    setDetailType('location');
    setShowDetailModal(true);
  };

  const handleViewMatch = (match: any) => {
    setSelectedMatch(match);
    setDetailType('match');
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedUser(null);
    setSelectedLocation(null);
    setSelectedMatch(null);
  };

  const handleSaveUser = () => {
    if (!database || !editingUser) return;

    const updatedUsers = database?.users?.map(u =>
      u.id === editingUser.id ? editingUser : u
    ) || [];
    localStorage.setItem('athlee_users', JSON.stringify(updatedUsers));
    loadData();
    setShowForm(false);
    setEditingUser(null);
  };

  const handleSaveLocation = () => {
    if (!database || !editingLocation) return;

    const updatedLocations = database?.locations?.map(l =>
      l.id === editingLocation.id ? editingLocation : l
    ) || [];
    localStorage.setItem('athlee_locations', JSON.stringify(updatedLocations));
    loadData();
    setShowForm(false);
    setEditingLocation(null);
  };

  const handleSaveMatch = () => {
    if (!database || !editingMatch) return;

    const updatedMatches = database?.matches?.map(m =>
      m.id === editingMatch.id ? editingMatch : m
    ) || [];
    localStorage.setItem('athlee_matches', JSON.stringify(updatedMatches));
    loadData();
    setShowForm(false);
    setEditingMatch(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setEditingLocation(null);
    setEditingMatch(null);
  };

  if (!database) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Dashboard...</h1>
          <p className="text-gray-600 dark:text-gray-400">Initializing mock data ecosystem</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">🛠️ Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Development environment • Last updated: {new Date(database.lastUpdated).toLocaleTimeString()}</p>
            </div>
            <button
              onClick={() => setShowReset(true)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              🔄 Reset All Data
            </button>
          </div>

          {/* Warning Banner */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              ⚠️ <strong>Development Only:</strong> This page is for testing and development. All data is mock/demo and stored in localStorage.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <TabButton active={activeTab === 'overview'} icon="📊" label="Overview" onClick={() => setActiveTab('overview')} />
          <TabButton active={activeTab === 'court-regulars'} icon="👑" label="Court Regulars" onClick={() => setActiveTab('court-regulars')} />
          <TabButton active={activeTab === 'followers-network'} icon="🤝" label="Followers Network" onClick={() => setActiveTab('followers-network')} />
          <TabButton active={activeTab === 'leaderboards'} icon="🏆" label="Leaderboards" onClick={() => setActiveTab('leaderboards')} />
          <TabButton active={activeTab === 'health-stats'} icon="🏥" label="Health & Stats" onClick={() => setActiveTab('health-stats')} />
          <TabButton active={activeTab === 'users'} icon="👥" label={`Users (${database.users.length})`} onClick={() => setActiveTab('users')} />
          <TabButton active={activeTab === 'locations'} icon="📍" label={`Locations (${database.locations.length})`} onClick={() => setActiveTab('locations')} />
          <TabButton active={activeTab === 'matches'} icon="🏆" label={`Matches (${database.matches.length})`} onClick={() => setActiveTab('matches')} />
          <TabButton active={activeTab === 'events'} icon="📅" label={`Events (${database.events.length})`} onClick={() => setActiveTab('events')} />
          <TabButton active={activeTab === 'xp'} icon="⚡" label="XP & Levels" onClick={() => setActiveTab('xp')} />
          <TabButton active={activeTab === 'badges'} icon="🏅" label="Badges" onClick={() => setActiveTab('badges')} />
          <TabButton active={activeTab === 'storage'} icon="💾" label="Storage" onClick={() => setActiveTab('storage')} />
        </div>

        {/* TAB: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <SectionHeader title="Quick Actions" icon="⚡" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleInitializeEcosystem}
                  disabled={isInitializing}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isInitializing ? '⏳ Initializing...' : '🚀 Generate Complete Ecosystem'}
                </button>
                <button
                  onClick={handleClearEcosystem}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  🗑️ Clear Everything
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            {stats && (
              <>
                <div>
                  <SectionHeader title="Ecosystem Overview" icon="🌐" description="Complete snapshot of your mock data environment" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon="👤" label="Total Players" value={stats.totalPlayers} color="from-blue-100 to-blue-200" />
                    <StatCard icon="📍" label="Locations" value={stats.totalLocations} color="from-purple-100 to-purple-200" />
                    <StatCard icon="🏆" label="Total Matches" value={stats.totalMatches} color="from-green-100 to-green-200" />
                    <StatCard icon="📅" label="Events" value={stats.totalEvents} color="from-orange-100 to-orange-200" />
                  </div>
                </div>

                <div>
                  <SectionHeader title="Match Distribution" icon="📊" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Scheduled</p>
                      <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">{stats.matchesByStatus?.Scheduled || 0}</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">In Progress</p>
                      <p className="text-4xl font-bold text-yellow-900 dark:text-yellow-100">{stats.matchesByStatus?.InProgress || 0}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Completed</p>
                      <p className="text-4xl font-bold text-green-900 dark:text-green-100">{stats.matchesByStatus?.Completed || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <SectionHeader title="Top Sports" icon="🎾" />
                    <div className="space-y-2">
                      {stats.topSports?.map((sport: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="font-medium text-gray-900 dark:text-white">{sport.sport}</span>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-full text-sm font-semibold">{sport.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <SectionHeader title="Player Levels" icon="📈" />
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Average Level</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgLevel?.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Average Win Rate</p>
                        <p className="text-3xl font-bold text-green-600">{stats.avgWinRate?.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Social Connections</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.totalFollows || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB: Court Regulars */}
        {activeTab === 'court-regulars' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <AdminCourtRegularsTab users={database.users} onUpdate={loadData} />
          </div>
        )}

        {/* TAB: Followers Network */}
        {activeTab === 'followers-network' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <AdminFollowersNetworkTab users={database.users} onUpdate={loadData} />
          </div>
        )}

        {/* TAB: Leaderboards */}
        {activeTab === 'leaderboards' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <AdminLeaderboardsTab users={database.users} onUpdate={loadData} />
          </div>
        )}

        {/* TAB: Health & Stats */}
        {activeTab === 'health-stats' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <AdminHealthStatsTab users={database.users} onUpdate={loadData} />
          </div>
        )}

        {/* TAB: Users */}
        {activeTab === 'users' && (
          <div>
            <SectionHeader title="User Management" icon="👥" description={`${database.users.length} total users in the system`} />
            
            {/* Search & Filter */}
            <div className="mb-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={usersSearchTerm}
                  onChange={(e) => {
                    setUsersSearchTerm(e.target.value);
                    setUsersPage(0);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={usersPerPage}
                  onChange={(e) => {
                    setUsersPerPage(Number(e.target.value));
                    setUsersPage(0);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="12">12 per page</option>
                  <option value="18">18 per page</option>
                  <option value="36">36 per page</option>
                  <option value="100">100 per page</option>
                  <option value="999999">Show all</option>
                </select>
              </div>
            </div>

            {/* Filtered Users */}
            {(() => {
              const filtered = database.users.filter(u => 
                u.email.toLowerCase().includes(usersSearchTerm.toLowerCase()) ||
                (u.username?.toLowerCase().includes(usersSearchTerm.toLowerCase())) ||
                (u.firstName?.toLowerCase().includes(usersSearchTerm.toLowerCase())) ||
                (u.lastName?.toLowerCase().includes(usersSearchTerm.toLowerCase()))
              );
              
              const startIdx = usersPage * usersPerPage;
              const paged = filtered.slice(startIdx, startIdx + usersPerPage);
              const totalPages = Math.ceil(filtered.length / usersPerPage);

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {paged.map((user: any) => (
                      <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{user.username || user.email.split('@')[0]}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.accountType === 'Player'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100'
                          }`}>
                            {user.accountType}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{new Date(user.createdAt).toLocaleDateString()}</p>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${user.email}?`)) handleDeleteUser(user.id);
                            }}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {startIdx + 1}-{Math.min(startIdx + usersPerPage, filtered.length)} of {filtered.length}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setUsersPage(Math.max(0, usersPage - 1))}
                          disabled={usersPage === 0}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                        >
                          ← Prev
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-900 dark:text-white">
                          Page {usersPage + 1} of {totalPages}
                        </span>
                        <button
                          onClick={() => setUsersPage(Math.min(totalPages - 1, usersPage + 1))}
                          disabled={usersPage === totalPages - 1}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* TAB: Locations */}
        {activeTab === 'locations' && (
          <div>
            <SectionHeader title="Location Management" icon="📍" description={`${database.locations.length} total locations`} />
            
            {/* Search & Filter */}
            <div className="mb-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by name or city..."
                  value={locationsSearchTerm}
                  onChange={(e) => {
                    setLocationsSearchTerm(e.target.value);
                    setLocationsPage(0);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={locationsPerPage}
                  onChange={(e) => {
                    setLocationsPerPage(Number(e.target.value));
                    setLocationsPage(0);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="12">12 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="999999">Show all</option>
                </select>
              </div>
            </div>

            {/* Filtered Locations */}
            {(() => {
              const filtered = database.locations.filter(l => 
                l.name.toLowerCase().includes(locationsSearchTerm.toLowerCase()) ||
                l.city.toLowerCase().includes(locationsSearchTerm.toLowerCase()) ||
                l.sports?.some((s: string) => s.toLowerCase().includes(locationsSearchTerm.toLowerCase()))
              );
              
              const startIdx = locationsPage * locationsPerPage;
              const paged = filtered.slice(startIdx, startIdx + locationsPerPage);
              const totalPages = Math.ceil(filtered.length / locationsPerPage);

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {paged.map((location: any) => (
                      <div key={location.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">{location.name}</h3>
                        <div className="space-y-2 text-sm mb-4">
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Type:</span> {location.type}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">City:</span> {location.city}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Sports:</span> {location.sports?.join(', ') || 'N/A'}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Rating:</span> {location.rating?.toFixed(1) || 'N/A'} ⭐
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleViewLocation(location)}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditLocation(location)}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${location.name}?`)) handleDeleteLocation(location.id);
                            }}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {startIdx + 1}-{Math.min(startIdx + locationsPerPage, filtered.length)} of {filtered.length}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setLocationsPage(Math.max(0, locationsPage - 1))}
                          disabled={locationsPage === 0}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                        >
                          ← Prev
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-900 dark:text-white">
                          Page {locationsPage + 1} of {totalPages}
                        </span>
                        <button
                          onClick={() => setLocationsPage(Math.min(totalPages - 1, locationsPage + 1))}
                          disabled={locationsPage === totalPages - 1}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* TAB: Matches */}
        {activeTab === 'matches' && (
          <div>
            <SectionHeader title="Match Management" icon="🏆" description={`${database.matches.length} total matches`} />
            
            {/* Search & Filter */}
            <div className="mb-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by sport or type..."
                  value={matchesSearchTerm}
                  onChange={(e) => {
                    setMatchesSearchTerm(e.target.value);
                    setMatchesPage(0);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={matchesStatusFilter}
                  onChange={(e) => {
                    setMatchesStatusFilter(e.target.value as any);
                    setMatchesPage(0);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  value={matchesPerPage}
                  onChange={(e) => {
                    setMatchesPerPage(Number(e.target.value));
                    setMatchesPage(0);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="12">12 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="999999">Show all</option>
                </select>
              </div>
            </div>

            {/* Filtered Matches */}
            {(() => {
              let filtered = database.matches.filter(m => 
                m.sport.toLowerCase().includes(matchesSearchTerm.toLowerCase()) ||
                m.type.toLowerCase().includes(matchesSearchTerm.toLowerCase()) ||
                m.mode.toLowerCase().includes(matchesSearchTerm.toLowerCase())
              );
              
              if (matchesStatusFilter !== 'all') {
                filtered = filtered.filter(m => m.status === matchesStatusFilter);
              }
              
              const startIdx = matchesPage * matchesPerPage;
              const paged = filtered.slice(startIdx, startIdx + matchesPerPage);
              const totalPages = Math.ceil(filtered.length / matchesPerPage);

              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {paged.map((match: any) => (
                      <div key={match.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{match.sport} • {match.type}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{match.mode}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            match.status === 'Completed'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100'
                              : match.status === 'InProgress'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                          }`}>
                            {match.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{new Date(match.date).toLocaleDateString()}</p>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleViewMatch(match)}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditMatch(match)}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete match ${match.id}?`)) handleDeleteMatch(match.id);
                            }}
                            className="flex-1 min-w-[50px] text-sm px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {startIdx + 1}-{Math.min(startIdx + matchesPerPage, filtered.length)} of {filtered.length}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setMatchesPage(Math.max(0, matchesPage - 1))}
                          disabled={matchesPage === 0}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                        >
                          ← Prev
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-900 dark:text-white">
                          Page {matchesPage + 1} of {totalPages}
                        </span>
                        <button
                          onClick={() => setMatchesPage(Math.min(totalPages - 1, matchesPage + 1))}
                          disabled={matchesPage === totalPages - 1}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* TAB: Events */}
        {activeTab === 'events' && (
          <div>
            <SectionHeader title="Event Management" icon="📅" description={`${database.events.length} total events`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {database.events.slice(0, 12).map((event: any) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.type}</p>
                  <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            {database.events.length > 12 && (
              <div className="mt-6 p-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                Showing 12 of {database.events.length} events
              </div>
            )}
          </div>
        )}

        {/* TAB: XP & Levels */}
        {activeTab === 'xp' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <AdminXPTab users={database.users} onUpdate={loadData} />
          </div>
        )}

        {/* TAB: Badges */}
        {activeTab === 'badges' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <AdminBadgesTab users={database.users} onUpdate={loadData} />
          </div>
        )}

        {/* TAB: Storage */}
        {activeTab === 'storage' && (
          <div className="space-y-6">
            <SectionHeader title="LocalStorage Inspector" icon="💾" description="View and manage localStorage data" />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-3">Current Storage Keys: {Object.keys(localStorage).filter(k => k.startsWith('athlee_')).length}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {Object.keys(localStorage)
                      .filter(k => k.startsWith('athlee_'))
                      .map((key) => (
                        <div key={key} className="text-xs font-mono text-blue-800 dark:text-blue-200 bg-white dark:bg-gray-700 p-2 rounded border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                          <span className="truncate">{key}</span>
                          <button
                            onClick={() => {
                              localStorage.removeItem(key);
                              loadData();
                            }}
                            className="ml-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors flex-shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Storage Summary</p>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>Total keys: <strong>{Object.keys(localStorage).length}</strong></p>
                    <p>Athlee keys: <strong>{Object.keys(localStorage).filter(k => k.startsWith('athlee_')).length}</strong></p>
                    <p>Estimated size: <strong>{(JSON.stringify(localStorage).length / 1024).toFixed(2)} KB</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            
            {/* User Detail View */}
            {detailType === 'user' && selectedUser && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedUser.firstName || selectedUser.username || 'User'} {selectedUser.lastName || ''}
                  </h2>
                  <button
                    onClick={closeDetailModal}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{selectedUser.email}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Account Type</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{selectedUser.accountType}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Status</p>
                    <p className="font-semibold text-green-600 dark:text-green-400 text-sm">Active</p>
                  </div>
                </div>

                {/* Stats */}
                {selectedUser.accountType === 'Player' && (() => {
                  const stats = userStatsService.getUserStats(selectedUser.id);
                  return (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">📊 Player Statistics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Level</p>
                          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats?.level || 1}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{stats?.rankTitle || 'Rookie'}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Total XP</p>
                          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{(stats?.totalXP || 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">Matches Played</p>
                          <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats?.totalMatches || 0}</p>
                          <p className="text-xs text-green-600 dark:text-green-400">{(stats?.careerWinPercentage || 0) * 100 | 0}% WR</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Wins / Losses</p>
                          <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats?.totalWins || 0} / {stats?.totalLosses || 0}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Social Stats */}
                {selectedUser.accountType === 'Player' && (() => {
                  const followers = followerService.getFollowerCount(selectedUser.id);
                  const following = followerService.getFollowingCount(selectedUser.id);
                  return (
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">🤝 Social</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Followers</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{followers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Following</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{following}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">MVP Count</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStatsService.getUserStats(selectedUser.id)?.mvpCount || 0}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Location Detail View */}
            {detailType === 'location' && selectedLocation && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedLocation.name}</h2>
                  <button
                    onClick={closeDetailModal}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                {/* Location Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">City</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedLocation.city}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Type</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedLocation.locationType || 'Public'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Rating</p>
                    <p className="font-semibold text-yellow-600">{selectedLocation.rating?.toFixed(1) || 'N/A'} ⭐</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Matches</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedLocation.totalMatches || 0}</p>
                  </div>
                </div>

                {/* Sports Available */}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">🎾 Sports</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.sports?.map((sport: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 rounded-full text-sm font-medium">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Address & Description */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Address</p>
                    <p className="text-gray-900 dark:text-white">{selectedLocation.address || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Description</p>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{selectedLocation.description || 'No description available'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Match Detail View */}
            {detailType === 'match' && selectedMatch && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedMatch.sport} • {selectedMatch.type} ({selectedMatch.mode})
                  </h2>
                  <button
                    onClick={closeDetailModal}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                  >
                    ✕
                  </button>
                </div>

                {/* Match Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Status</p>
                    <p className={`font-semibold text-sm ${
                      selectedMatch.status === 'Completed' ? 'text-green-600' :
                      selectedMatch.status === 'InProgress' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {selectedMatch.status}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{new Date(selectedMatch.date).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Team Size</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedMatch.teamSize?.label || '5v5'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Privacy</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">{selectedMatch.privacy}</p>
                  </div>
                </div>

                {/* Teams & Players */}
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">👥 Teams</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedMatch.teams?.map((team: Team, teamIdx: number) => (
                      <div key={teamIdx} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{team.name}</h4>
                        <div className="space-y-2">
                          {team.players?.map((player: MatchPlayer, pIdx: number) => {
                            const playerStats = player.userId ? userStatsService.getUserStats(player.userId) : null;
                            return (
                              <div key={pIdx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-600/30 rounded text-sm">
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{player.name}</p>
                                  {player.position && <p className="text-xs text-gray-600 dark:text-gray-400">{player.position}</p>}
                                </div>
                                {playerStats && (
                                  <div className="text-right text-xs">
                                    <p className="text-gray-600 dark:text-gray-300">Lv {playerStats.level} ({playerStats.careerWinPercentage * 100 | 0}% WR)</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score */}
                {selectedMatch.score && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">📊 Score</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedMatch.teams?.map((team: Team, idx: number) => (
                        <div key={idx} className="text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400">{team.name}</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {selectedMatch.score?.teamScores?.[idx] || 0}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeDetailModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {formType === 'user' && (database?.users?.find(u => u.id === editingUser?.id) ? 'Edit User' : 'Create User')}
              {formType === 'location' && (database?.locations?.find(l => l.id === editingLocation?.id) ? 'Edit Location' : 'Create Location')}
              {formType === 'match' && (database?.matches?.find(m => m.id === editingMatch?.id) ? 'Edit Match' : 'Create Match')}
            </h3>

            {/* User Editor */}
            {formType === 'user' && editingUser && (
              <AdminUserEditor user={editingUser} onChange={setEditingUser} />
            )}

            {/* Location Editor */}
            {formType === 'location' && editingLocation && (
              <AdminLocationEditor location={editingLocation} onChange={setEditingLocation} />
            )}

            {/* Match Editor - Generic for now */}
            {formType === 'match' && editingMatch && (
              <div className="space-y-4">
                {Object.entries(editingMatch).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{key}</label>
                    <input
                      type={key.includes('At') || key === 'date' ? 'datetime-local' : 'text'}
                      value={typeof value === 'object' ? JSON.stringify(value) : String(value || '')}
                      onChange={(e) => setEditingMatch({ ...editingMatch, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={closeForm}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (formType === 'user') handleSaveUser();
                  else if (formType === 'location') handleSaveLocation();
                  else if (formType === 'match') handleSaveMatch();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Reset All Data?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This will clear all mock data and start fresh. You'll need to log in again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearEcosystem}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
