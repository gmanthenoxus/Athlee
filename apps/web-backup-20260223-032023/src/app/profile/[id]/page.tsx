'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessLocations } from '@/components/Location';
import { createProfileStorage, ProfileService } from '@athlehub/shared';
import type { Profile, PlayerProfile, MockFollowerUser } from '@athlehub/shared';

// Settings Modal Component
function SettingsModal({ isOpen, onClose, profile, onPrivacyToggle, isOwnProfile }: {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onPrivacyToggle: (field: 'isPublicStats' | 'isPublicBadges' | 'isPublicPosts') => void;
  isOwnProfile: boolean;
}) {
  if (!isOpen) return null;

  const isPlayerProfile = profile?.accountType === 'Player';
  const playerProfile = isPlayerProfile ? (profile as PlayerProfile) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!isOwnProfile && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                You are viewing someone else's profile. Settings can only be edited on your own profile.
              </p>
            </div>
          )}

          {/* Privacy Settings */}
          {playerProfile && isOwnProfile && (
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wide">Privacy Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 p-3 rounded-lg transition">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Public Stats</span>
                  <input
                    type="checkbox"
                    checked={playerProfile.isPublicStats}
                    onChange={() => onPrivacyToggle('isPublicStats')}
                    className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 p-3 rounded-lg transition">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Public Badges</span>
                  <input
                    type="checkbox"
                    checked={playerProfile.isPublicBadges}
                    onChange={() => onPrivacyToggle('isPublicBadges')}
                    className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 p-3 rounded-lg transition">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Public Posts</span>
                  <input
                    type="checkbox"
                    checked={playerProfile.isPublicPosts}
                    onChange={() => onPrivacyToggle('isPublicPosts')}
                    className="w-5 h-5 rounded cursor-pointer accent-blue-600"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Additional Settings Section */}
          {isOwnProfile && (
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wide">Account</h3>
              <button className="w-full text-left px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition text-sm">
                Change Password
              </button>
              <button className="w-full text-left px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition text-sm">
                Linked Accounts
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

const storage = createProfileStorage();
const profileService = new ProfileService(storage);

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const userId = params.id as string;
  const isOwnProfile = user?.id === userId;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState<MockFollowerUser[]>([]);
  const [following, setFollowing] = useState<MockFollowerUser[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedProfile = await profileService.getProfile(userId);
        if (!loadedProfile) {
          setError('Profile not found');
          setIsLoading(false);
          return;
        }

        setProfile(loadedProfile);

        // Load followers and following
        const [followersData, followingData] = await Promise.all([
          profileService.getFollowers(userId),
          profileService.getFollowing(userId),
        ]);

        setFollowers(followersData);
        setFollowing(followingData);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const handlePrivacyToggle = async (field: 'isPublicStats' | 'isPublicBadges' | 'isPublicPosts') => {
    if (!profile || profile.accountType !== 'Player' || !isOwnProfile) return;

    try {
      const updatedProfile = await profileService.updateProfile(userId, {
        [field]: !(profile as PlayerProfile)[field],
      });
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Failed to update privacy setting:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-zinc-600 dark:text-zinc-400">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">{error || 'Profile not found'}</div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isPlayerProfile = profile.accountType === 'Player';
  const playerProfile = isPlayerProfile ? (profile as PlayerProfile) : null;

  // Get display name and initials for avatar
  const displayName = playerProfile?.username || (profile as any).businessName || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-8">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            <div className="flex items-start justify-between gap-6 -mt-16 mb-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-zinc-900 shadow-lg">
                {initials}
              </div>

              {/* Header Actions */}
              <div className="flex gap-3 mt-4">
                {isOwnProfile && (
                  <>
                    <button
                      onClick={() => router.push('/profile/edit')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setSettingsOpen(true)}
                      className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{displayName}</h1>
                {playerProfile && (
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-bold">
                    {playerProfile.primarySport}
                  </span>
                )}
              </div>

              {playerProfile?.bio && (
                <p className="text-zinc-700 dark:text-zinc-300 text-lg mb-3 leading-relaxed">{playerProfile.bio}</p>
              )}

              {playerProfile?.locationTag && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{playerProfile.locationTag}</span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">{followers.length}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">{following.length}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Following</div>
              </div>
              {playerProfile && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">{playerProfile.xp || 0}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">XP</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Stats Section */}
        {playerProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Match Stats */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Match Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Matches Played</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{playerProfile.matchesPlayed || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Wins</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{playerProfile.wins || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Win Rate</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {playerProfile.matchesPlayed > 0
                      ? `${Math.round((playerProfile.wins / playerProfile.matchesPlayed) * 100)}%`
                      : '0%'}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Achievements</h2>
              {playerProfile.badges && playerProfile.badges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {playerProfile.badges.map((badge, idx) => (
                    <span key={idx} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400">No badges yet. Keep playing!</p>
              )}
            </div>
          </div>
        )}

        {/* Business Locations */}
        {!isPlayerProfile && user && (
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <BusinessLocations userId={userId} />
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        profile={profile}
        onPrivacyToggle={handlePrivacyToggle}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
