/**
 * Followers Network Management Tab
 * 
 * Manage user follower relationships and network analysis
 * - User network cards with follower counts
 * - Follow/unfollow management
 * - Network statistics and insights
 * - Mutual connection detection
 */

import React, { useState, useMemo } from 'react';
import { followerService } from '@/lib/followerService';

interface AdminFollowersNetworkTabProps {
  users: any[];
  onUpdate?: () => void;
}

interface NetworkUser {
  id: string;
  name: string;
  email: string;
  accountType: string;
  avatar?: string;
  followerCount: number;
  followingCount: number;
  mutualCount: number;
}

export const AdminFollowersNetworkTab: React.FC<AdminFollowersNetworkTabProps> = ({ 
  users, 
  onUpdate 
}) => {
  const [viewMode, setViewMode] = useState<'users' | 'stats' | 'connections'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'followers' | 'following' | 'name' | 'mutuals'>('followers');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [expandedRelations, setExpandedRelations] = useState<string | null>(null);

  // Get network data for all users
  const networkUsers = useMemo(() => {
    return users
      .map((user) => {
        const followers = followerService.getFollowers(user.id);
        const following = followerService.getFollowing(user.id);
        const mutuals = followerService.getMutualFollows(user.id);

        return {
          id: user.id,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
          email: user.email,
          accountType: user.accountType || 'Player',
          avatar: user.avatar,
          followerCount: followers.length,
          followingCount: following.length,
          mutualCount: mutuals.length,
        };
      })
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'followers':
            return b.followerCount - a.followerCount;
          case 'following':
            return b.followingCount - a.followingCount;
          case 'mutuals':
            return b.mutualCount - a.mutualCount;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [users, searchTerm, sortBy]);

  // Network statistics
  const networkStats = useMemo(() => {
    let totalFollows = 0;
    let totalMutuals = 0;
    let maxFollowers = 0;
    let minFollowers = Infinity;
    let maxFollowing = 0;
    let topFollowedUsers: NetworkUser[] = [];

    networkUsers.forEach((user) => {
      totalFollows += user.followerCount;
      totalMutuals += user.mutualCount;
      maxFollowers = Math.max(maxFollowers, user.followerCount);
      minFollowers = Math.min(minFollowers, user.followerCount);
      maxFollowing = Math.max(maxFollowing, user.followingCount);
    });

    // Top 5 most followed users
    topFollowedUsers = [...networkUsers].sort((a, b) => b.followerCount - a.followerCount).slice(0, 5);

    return {
      totalUsers: networkUsers.length,
      totalFollows,
      totalMutuals,
      avgFollowers: networkUsers.length > 0 ? (totalFollows / networkUsers.length).toFixed(1) : 0,
      avgFollowing: networkUsers.length > 0 ? 
        (networkUsers.reduce((sum, u) => sum + u.followingCount, 0) / networkUsers.length).toFixed(1) : 0,
      maxFollowers,
      minFollowers: minFollowers === Infinity ? 0 : minFollowers,
      maxFollowing,
      networkDensity: networkUsers.length > 1 
        ? ((totalFollows / (networkUsers.length * (networkUsers.length - 1))) * 100).toFixed(1)
        : 0,
      topFollowedUsers,
      usersWithoutFollowers: networkUsers.filter(u => u.followerCount === 0).length,
      usersNotFollowing: networkUsers.filter(u => u.followingCount === 0).length,
    };
  }, [networkUsers]);

  // Get mutual connections for a user
  const getMutualConnections = (userId: string) => {
    const mutuals = followerService.getMutualFollows(userId);
    return mutuals
      .map(mutualId => networkUsers.find(u => u.id === mutualId))
      .filter(Boolean) as NetworkUser[];
  };

  // Handle follow action
  const handleFollow = (followerId: string, followingId: string) => {
    try {
      followerService.followUser(followerId, followingId);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  // Handle unfollow action
  const handleUnfollow = (followerId: string, followingId: string) => {
    try {
      followerService.unfollowUser(followerId, followingId);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  // StatBox component
  const StatBox = ({ label, value, icon, trend }: any) => (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{value}</p>
      {trend && <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">{trend}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setViewMode('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'users'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>👥</span> Users
        </button>
        <button
          onClick={() => setViewMode('stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'stats'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>📊</span> Network Stats
        </button>
        <button
          onClick={() => setViewMode('connections')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'connections'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          <span>🔗</span> Connections
        </button>
      </div>

      {/* VIEW: Users Network */}
      {viewMode === 'users' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex gap-2 flex-wrap">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
              {(['followers', 'following', 'mutuals', 'name'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    sortBy === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {networkUsers.map((user) => {
              const isFollowing = followerService.isFollowing(selectedUserId || users[0]?.id, user.id);
              const followers = followerService.getFollowers(user.id);

              return (
                <div
                  key={user.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedUserId(user.id)}
                >
                  {/* User Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        user.accountType === 'Player'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100'
                      }`}>
                        {user.accountType}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.followerCount}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{user.followingCount}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{user.mutualCount}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Mutuals</p>
                    </div>
                  </div>

                  {/* Followers List Preview */}
                  {followers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Followed by:</p>
                      <div className="flex flex-wrap gap-1">
                        {followers.slice(0, 3).map((followerId) => {
                          const follower = users.find(u => u.id === followerId);
                          return (
                            <span
                              key={followerId}
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1"
                              title={follower?.email}
                            >
                              {(follower?.firstName || follower?.email?.split('@')[0] || 'User').substring(0, 8)}
                            </span>
                          );
                        })}
                        {followers.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1">
                            +{followers.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedRelations(expandedRelations === user.id ? null : user.id);
                      }}
                      className="flex-1 text-sm px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      👁️ View
                    </button>
                  </div>

                  {/* Expanded Relations */}
                  {expandedRelations === user.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Followers:</p>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {followers.length > 0 ? (
                            followers.map((followerId) => {
                              const follower = users.find(u => u.id === followerId);
                              return (
                                <div key={followerId} className="text-xs text-gray-600 dark:text-gray-400 flex justify-between items-center">
                                  <span>{follower?.email?.split('@')[0]}</span>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-gray-500">No followers</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW: Network Statistics */}
      {viewMode === 'stats' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBox
              label="Total Users"
              value={networkStats.totalUsers}
              icon="👥"
              trend={`${users.length} total`}
            />
            <StatBox
              label="Total Follows"
              value={networkStats.totalFollows}
              icon="🔗"
              trend={`Avg: ${networkStats.avgFollowers}/user`}
            />
            <StatBox
              label="Mutual Connections"
              value={networkStats.totalMutuals}
              icon="🤝"
              trend="Two-way follows"
            />
            <StatBox
              label="Network Density"
              value={`${networkStats.networkDensity}%`}
              icon="📊"
              trend="Connectivity measure"
            />
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Follower Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Follower Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Max Followers</span>
                    <span className="font-bold text-gray-900 dark:text-white">{networkStats.maxFollowers}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: networkStats.maxFollowers > 0 ? '100%' : '0%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Followers</span>
                    <span className="font-bold text-gray-900 dark:text-white">{networkStats.avgFollowers}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: networkStats.maxFollowers > 0 ? `${(Number(networkStats.avgFollowers) / networkStats.maxFollowers) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Min Followers</span>
                    <span className="font-bold text-gray-900 dark:text-white">{networkStats.minFollowers}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: networkStats.maxFollowers > 0 ? `${(networkStats.minFollowers / networkStats.maxFollowers) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Network Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Network Insights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Users with no followers</span>
                  <span className="font-bold text-gray-900 dark:text-white">{networkStats.usersWithoutFollowers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Users not following anyone</span>
                  <span className="font-bold text-gray-900 dark:text-white">{networkStats.usersNotFollowing}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Avg following per user</span>
                  <span className="font-bold text-gray-900 dark:text-white">{networkStats.avgFollowing}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Max following</span>
                  <span className="font-bold text-gray-900 dark:text-white">{networkStats.maxFollowing}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Followed Users */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🌟 Top 5 Most Followed</h3>
            <div className="space-y-2">
              {networkStats.topFollowedUsers.map((user, idx) => {
                const followersList = followerService.getFollowers(user.id);
                return (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">#{idx + 1}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{user.followerCount}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">followers</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: Connections */}
      {viewMode === 'connections' && (
        <div className="space-y-6">
          {/* User Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Select user to view connections:
            </label>
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(e.target.value || null)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Choose a user...</option>
              {networkUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Connection Details */}
          {selectedUserId && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Followers */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">👥 Followers ({followerService.getFollowerCount(selectedUserId)})</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {followerService.getFollowers(selectedUserId).map((followerId) => {
                    const follower = users.find(u => u.id === followerId);
                    return (
                      <div key={followerId} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-700">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {(follower?.firstName || '') ? `${follower.firstName} ${follower.lastName || ''}` : follower?.email}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{follower?.email}</p>
                        </div>
                        <button
                          onClick={() => handleUnfollow(followerId, selectedUserId)}
                          className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          Unfollow
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Following */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4">🔄 Following ({followerService.getFollowingCount(selectedUserId)})</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {followerService.getFollowing(selectedUserId).map((followingId) => {
                    const following = users.find(u => u.id === followingId);
                    return (
                      <div key={followingId} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-700">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {(following?.firstName || '') ? `${following.firstName} ${following.lastName || ''}` : following?.email}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{following?.email}</p>
                        </div>
                        <button
                          onClick={() => handleUnfollow(selectedUserId, followingId)}
                          className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          Unfollow
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mutual */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-purple-200 dark:border-purple-700">
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4">🤝 Mutual Connections ({followerService.getMutualFollows(selectedUserId).length})</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getMutualConnections(selectedUserId).map((mutual) => (
                    <div key={mutual.id} className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{mutual.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{mutual.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
