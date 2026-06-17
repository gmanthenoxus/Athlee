/**
 * User Profile Page
 * 
 * Dynamic route to display user profiles by ID.
 * 
 * Features:
 * - Display user information (Player, Business, or Visitor)
 * - Edit profile for your own account
 * - View-only for other users' profiles
 * - Account type-specific information
 * - Enhanced UI with stats and badges
 * 
 * Code Reviewers:
 * - Dynamic route using [id] parameter with Promise unwrapping
 * - Fetches user data from localStorage (mock database)
 * - Different views based on account type and view permissions
 * - Edit mode only available for authenticated user's own profile
 */

'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { XPBar } from '@/components/xp/XPBar';
import { userStatsService } from '@/lib/userStatsService';
import { badgeAwardService } from '@/lib/badgeAwardService';
import { getBadgeById } from '@/lib/badgeCatalog';
import { followerService } from '@/lib/followerService';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { user: currentUser, isLoading } = useAuth();
  const [viewedUser, setViewedUser] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'badges' | 'stats' | 'awards' | 'locations' | 'bookings'>('posts');
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { id: userId } = use(params);

  // Load the viewed user's profile from localStorage with stats and badges
  useEffect(() => {
    if (!isLoading) {
      try {
        // Try to load from users array first
        const users = JSON.parse(localStorage.getItem('athlee_users') || '[]');
        let basicUser = users.find((u: any) => u.id === userId);

        // Fallback: if viewing own profile and not found in array, use currentUser
        if (!basicUser && currentUser?.id === userId) {
          basicUser = currentUser;
        }

        if (basicUser) {
          // Augment with stats and badges regardless of source
          const augmentedUser = loadUserWithStats(basicUser, userId);
          setViewedUser(augmentedUser);
          
          // Load follower data
          if (currentUser) {
            loadFollowerData(userId, currentUser.id);
          }
        } else {
          console.warn(`User not found: ${userId}`);
          setViewedUser(null);
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
        setViewedUser(null);
      }
      setProfileLoading(false);
    }
  }, [userId, isLoading, currentUser]);

  // Load follower data from followerService
  const loadFollowerData = (viewedUserId: string, currentUserId: string) => {
    try {
      // Use followerService which handles both old and new formats
      const userFollowers = followerService.getFollowers(viewedUserId);
      const userFollowing = followerService.getFollowing(viewedUserId);
      
      setFollowers(userFollowers);
      setFollowing(userFollowing);
      setIsFollowing(userFollowers.includes(currentUserId));
    } catch (error) {
      console.error('Failed to load follower data:', error);
      // Fallback to empty arrays
      setFollowers([]);
      setFollowing([]);
    }
  };

  // Load user stats and badges and merge with user data
  const loadUserWithStats = (basicUser: any, userId: string): any => {
    try {
      // Load stats record
      const statsKey = `athlee_user_stats_${userId}`;
      const statsRecord = JSON.parse(localStorage.getItem(statsKey) || '{}');

      // Load badges
      const earnedBadges = badgeAwardService.getUserEarnedBadges(userId);
      const badgeNames = earnedBadges
        .map((badge: any) => {
          const badgeData = getBadgeById(badge.badgeId);
          return badgeData?.name || badge.badgeId;
        })
        .filter((name: string) => name);

      // Load follower counts from followerService
      const followerCount = followerService.getFollowerCount(userId);
      const followingList = followerService.getFollowing(userId);

      // Merge all data together
      const augmentedUser = {
        ...basicUser,
        // Stats fields
        totalXP: statsRecord.totalXP || 0,
        level: statsRecord.level || 1,
        rankTitle: statsRecord.rankTitle || 'Rookie',
        totalMatches: statsRecord.totalMatches || 0,
        matchesPlayed: statsRecord.totalMatches || 0, // For UI compatibility
        totalWins: statsRecord.totalWins || 0,
        wins: statsRecord.totalWins || 0, // For UI compatibility
        careerWinPercentage: statsRecord.careerWinPercentage || 0,
        currentStreak: statsRecord.currentStreak || 0,
        longestStreak: statsRecord.longestStreak || 0,
        mvpCount: statsRecord.mvpCount || 0,
        sportStats: statsRecord.sportStats || {},
        recentMatches: statsRecord.recentMatches || [],
        recentlyPlayed: statsRecord.recentMatches || [],
        
        // Badge fields
        badges: badgeNames,
        earnedBadges: earnedBadges,
        
        // Follower fields (for reference - actual data loaded separately in state)
        followerCount,
        followingCount: followingList.length,
        
        // Rank for UI
        rank: statsRecord.rank || statsRecord.level || 1,
        xp: statsRecord.totalXP || 0,
        awards: [], // Placeholder - can be extended if awards data is added
      };

      return augmentedUser;
    } catch (error) {
      console.error('Failed to load user stats and badges:', error);
      // Return basic user with defaults if stats loading fails
      return {
        ...basicUser,
        totalXP: 0,
        level: 1,
        rankTitle: 'Rookie',
        totalMatches: 0,
        matchesPlayed: 0,
        totalWins: 0,
        wins: 0,
        careerWinPercentage: 0,
        currentStreak: 0,
        longestStreak: 0,
        mvpCount: 0,
        sportStats: {},
        recentMatches: [],
        recentlyPlayed: [],
        badges: [],
        earnedBadges: [],
        followerCount: 0,
        followingCount: 0,
        rank: 1,
        xp: 0,
        awards: [],
      };
    }
  };

  // Handle follow/unfollow action using followerService
  const handleFollowToggle = () => {
    if (!currentUser) return;

    try {
      if (isFollowing) {
        // Unfollow
        followerService.unfollowUser(currentUser.id, userId);
      } else {
        // Follow
        followerService.followUser(currentUser.id, userId);
      }

      // Reload follower data to reflect changes
      loadFollowerData(userId, currentUser.id);
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  // Check if content should be visible based on privacy settings
  const canViewStats = () => {
    if (isOwnProfile) return true; // Always see own profile
    return user?.isPublicStats !== false; // Default to public
  };

  const canViewBadges = () => {
    if (isOwnProfile) return true;
    return user?.isPublicBadges !== false;
  };

  const canViewPosts = () => {
    if (isOwnProfile) return true;
    return user?.isPublicPosts !== false;
  };

  if (isLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Authenticated</h2>
          <p className="text-gray-600 mb-8">Please log in to view profiles.</p>
          <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Show not found if profile doesn't exist
  if (!viewedUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-8">This user profile does not exist.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Check if this is the current user's profile
  const isOwnProfile = currentUser?.id === userId;
  // Always use viewedUser since it has augmented stats/badges/etc from loadUserWithStats()
  const user = viewedUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Athlee
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/users" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                  Users
                </Link>
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
                  Home
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/logout" className="text-red-600 hover:text-red-700 font-medium text-sm">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Content & Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header with Background */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Header Background Gradient */}
              <div className="h-32 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600"></div>

              {/* Profile Header Content */}
              <div className="relative -mt-24 px-6 pb-6">
                <div className="flex flex-col gap-4">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-end gap-4">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg flex-shrink-0">
                      {user.firstName?.[0]?.toUpperCase() || user.businessName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                    </div>

                    {/* Name and Title */}
                    <div className="pb-2">
                      {/* Username as primary (if available) */}
                      {user.username ? (
                        <>
                          <h1 className="text-2xl font-bold text-gray-900 mb-1">@{user.username}</h1>
                          <p className="text-sm text-gray-600">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.businessName || 'User'}
                          </p>
                        </>
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.businessName || user.email}
                        </h1>
                      )}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                      {user.accountType}
                    </span>
                    {user.primarySport && (
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {user.primarySport}
                      </span>
                    )}
                    {user.businessType && (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {user.businessType}
                      </span>
                    )}
                  </div>

                  {/* Action & Follower Buttons */}
                  <div className="flex gap-2 flex-wrap pt-2">
                    {isOwnProfile && (
                      <>
                        <Link
                          href="/profile/edit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm text-sm"
                        >
                          ⚙️ Settings
                        </Link>
                        <Link
                          href="/profile/match-history"
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors shadow-sm text-sm"
                        >
                          📊 Match History
                        </Link>
                        <Link
                          href="/leaderboards"
                          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-colors shadow-sm text-sm"
                        >
                          🏆 Leaderboards
                        </Link>
                      </>
                    )}
                    {!isOwnProfile && (
                      <button
                        onClick={handleFollowToggle}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
                          isFollowing
                            ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isFollowing ? '✓ Following' : '+ Follow'}
                      </button>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {user.age || user.accountType === 'Business' ? '✓' : '—'}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">
                        {new Date(user.createdAt).getFullYear()}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Member</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">
                        {user.lastLogin ? '🟢' : '🔴'}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">★</div>
                      <div className="text-xs text-gray-600 mt-1">Rating</div>
                    </div>
                  </div>

                  {/* Follower Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link href={`/profile/${userId}/followers`} className="text-center hover:opacity-75 transition">
                      <div className="text-lg font-bold text-gray-900">{followers.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Followers</div>
                    </Link>
                    <Link href={`/profile/${userId}/following`} className="text-center hover:opacity-75 transition">
                      <div className="text-lg font-bold text-gray-900">{following.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Following</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Bar - Player Only */}
            {user.accountType === 'Player' && (
              <div>
                <XPBar userId={user.id} />
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200 overflow-x-auto bg-white rounded-t-lg">
              {user.accountType === 'Player' && (
                <>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'posts'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📝 Posts
                  </button>
                  <button
                    onClick={() => setActiveTab('badges')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'badges'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🏅 Badges
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'stats'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📊 Stats
                  </button>
                  <button
                    onClick={() => setActiveTab('awards')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'awards'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🏆 Awards
                  </button>
                </>
              )}

              {user.accountType === 'Business' && (
                <>
                  <button
                    onClick={() => setActiveTab('locations')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'locations'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📍 Locations
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'bookings'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📅 Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === 'posts'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📝 Posts
                  </button>
                </>
              )}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden p-8 min-h-96">
              {!isOwnProfile && !canViewPosts() && activeTab === 'posts' ? (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-gray-600">🔒 Posts are Private</p>
                  <p className="text-gray-500 mt-2">This user has chosen to keep their posts private</p>
                </div>
              ) : !isOwnProfile && !canViewBadges() && (activeTab === 'badges' || activeTab === 'awards') ? (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-gray-600">🔒 Badges are Private</p>
                  <p className="text-gray-500 mt-2">This user has chosen to keep their badges private</p>
                </div>
              ) : !isOwnProfile && !canViewStats() && activeTab === 'stats' ? (
                <div className="text-center py-12">
                  <p className="text-xl font-bold text-gray-600">🔒 Stats are Private</p>
                  <p className="text-gray-500 mt-2">This user has chosen to keep their stats private</p>
                </div>
              ) : activeTab === 'stats' ? (
                // Stats Tab
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.accountType === 'Player' && (
                    <>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Match Stats</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Matches Played</span>
                            <span className="font-bold text-gray-900">{user.matchesPlayed || 0}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Wins</span>
                            <span className="font-bold text-gray-900">{user.wins || 0}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Win Rate</span>
                            <span className="font-bold text-gray-900">
                              {user.matchesPlayed > 0
                                ? `${Math.round((user.wins / user.matchesPlayed) * 100)}%`
                                : '0%'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
                        {user.badges && user.badges.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {user.badges.map((badge: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No badges yet. Keep playing!</p>
                        )}
                      </div>
                    </>
                  )}
                  {user.accountType === 'Business' && (
                    <div className="text-center py-12 col-span-2">
                      <p className="text-2xl font-bold text-gray-400">🚀 Coming Soon</p>
                      <p className="text-gray-500 mt-2">Business stats content is being prepared</p>
                    </div>
                  )}
                </div>
              ) : activeTab === 'badges' ? (
                // Badges Tab
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
                  {user.badges && user.badges.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.badges.map((badge: string, idx: number) => (
                        <span key={idx} className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No badges yet. Keep playing!</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-2xl font-bold text-gray-400">🚀 Coming Soon</p>
                  <p className="text-gray-500 mt-2">Content for this section is being prepared</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="space-y-6">
            {/* Ranking & XP Card */}
            {user.accountType === 'Player' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">📊 Ranking</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Rank</span>
                    <span className="text-2xl font-bold text-blue-600">#{user.rank || '—'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">XP</span>
                    <span className="text-2xl font-bold text-green-600">{user.xp || 0}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recently Played Card */}
            {user.accountType === 'Player' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Recently Played</h3>
                <div className="space-y-3">
                  {user.recentlyPlayed && user.recentlyPlayed.length > 0 ? (
                    user.recentlyPlayed.slice(0, 3).map((match: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{match.opponent || 'Match'}</p>
                        <p className="text-xs text-gray-600 mt-1">{match.date || 'Recently'}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No recent matches</p>
                  )}
                </div>
              </div>
            )}

            {/* Quick Stats Card */}
            {user.accountType === 'Player' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚽ Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Matches</span>
                    <span className="font-bold text-gray-900">{user.matchesPlayed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wins</span>
                    <span className="font-bold text-gray-900">{user.wins || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Win Rate</span>
                    <span className="font-bold text-green-600">
                      {user.matchesPlayed > 0
                        ? `${Math.round((user.wins / user.matchesPlayed) * 100)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Top Badges Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🏅 Top Badges</h3>
              <div className="space-y-2">
                {user.badges && user.badges.length > 0 ? (
                  user.badges.slice(0, 3).map((badge: string, idx: number) => (
                    <div key={idx} className="px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-semibold text-yellow-900">{badge}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No badges yet</p>
                )}
              </div>
            </div>

            {/* Awards Card */}
            {user.accountType === 'Player' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🏆 Awards</h3>
                <div className="space-y-2">
                  {user.awards && user.awards.length > 0 ? (
                    user.awards.slice(0, 3).map((award: string, idx: number) => (
                      <div key={idx} className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-sm font-semibold text-purple-900">{award}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No awards yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
