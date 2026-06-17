'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { followerService } from '@/lib/followerService';
import { useEffect, useState } from 'react';
import { use } from 'react';

interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  accountType: 'Player' | 'Business' | 'Visitor';
  createdAt: string;
  [key: string]: any;
}

export default function FollowersPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [followers, setFollowers] = useState<User[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { id: userId } = use(params);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    try {
      // Load profile user
      const users = JSON.parse(localStorage.getItem('athlee_users') || '[]');
      const user = users.find((u: User) => u.id === userId);
      setProfileUser(user);

      // Load followers using followerService
      const followerIds = followerService.getFollowers(userId);
      const followerUsers = users.filter((u: User) => followerIds.includes(u.id));
      setFollowers(followerUsers);
    } catch (error) {
      console.error('Failed to load followers:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading followers...</p>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
          <Link href="/users" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  const getDisplayName = (user: User) => {
    if (user.username) return `@${user.username}`;
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    if (user.businessName) return user.businessName;
    return user.email;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/profile/${userId}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block">
            ← Back to Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            👥 Followers of {getDisplayName(profileUser)}
          </h1>
          <p className="text-gray-600 mt-1">{followers.length} follower{followers.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {followers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {followers.map((follower) => (
              <Link key={follower.id} href={`/profile/${follower.id}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
                  {/* Header with Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      follower.accountType === 'Player'
                        ? 'bg-blue-100 text-blue-700'
                        : follower.accountType === 'Business'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {follower.accountType}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 transition">
                    {getDisplayName(follower)}
                  </h3>

                  {/* Secondary Info */}
                  <p className="text-sm text-gray-600 mb-4">
                    {follower.firstName && follower.lastName
                      ? `${follower.firstName} ${follower.lastName}`
                      : follower.businessName || follower.email}
                  </p>

                  {/* Account Type Info */}
                  <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-200">
                    {follower.accountType === 'Player' && follower.primarySport && (
                      <div className="flex items-center gap-2">
                        <span>⚽</span>
                        <span className="text-gray-600">{follower.primarySport}</span>
                      </div>
                    )}
                    {follower.accountType === 'Business' && follower.businessType && (
                      <div className="flex items-center gap-2">
                        <span>🏢</span>
                        <span className="text-gray-600">{follower.businessType}</span>
                      </div>
                    )}
                    {follower.city && (
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="text-gray-600">{follower.city}, {follower.country}</span>
                      </div>
                    )}
                    {follower.region && (
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="text-gray-600">{follower.region}, {follower.country}</span>
                      </div>
                    )}
                  </div>

                  {/* Join Date */}
                  <p className="text-xs text-gray-500">
                    Joined {new Date(follower.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-lg text-gray-600">No followers yet</p>
            <p className="text-sm text-gray-500 mt-2">When people follow this user, they'll appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
