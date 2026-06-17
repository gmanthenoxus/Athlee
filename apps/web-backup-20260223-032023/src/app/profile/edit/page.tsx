'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/contexts/ProfileContext';
import { SportType } from '@athlehub/shared';
import type { PlayerProfile } from '@athlehub/shared';

export default function EditProfilePage() {
  const { currentProfile, isLoading, updateProfile } = useProfile();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    primarySport: SportType.Basketball,
    locationTag: '',
    isPublicStats: true,
    isPublicBadges: true,
    isPublicPosts: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with profile data
  useEffect(() => {
    if (currentProfile && currentProfile.accountType === 'Player') {
      const profile = currentProfile as PlayerProfile;
      setFormData({
        username: profile.username,
        bio: profile.bio,
        primarySport: profile.primarySport,
        locationTag: profile.locationTag,
        isPublicStats: profile.isPublicStats,
        isPublicBadges: profile.isPublicBadges,
        isPublicPosts: profile.isPublicPosts,
      });
    }
  }, [currentProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      await updateProfile(formData);
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!currentProfile || currentProfile.accountType !== 'Player') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={2}
            maxLength={30}
          />
          <p className="text-sm text-zinc-500 mt-1">2-30 characters</p>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            maxLength={200}
          />
          <p className="text-sm text-zinc-500 mt-1">{formData.bio.length}/200 characters</p>
        </div>

        {/* Primary Sport */}
        <div>
          <label htmlFor="primarySport" className="block text-sm font-medium mb-2">
            Primary Sport
          </label>
          <select
            id="primarySport"
            value={formData.primarySport}
            onChange={(e) => setFormData({ ...formData, primarySport: e.target.value as SportType })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.values(SportType).map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        {/* Location Tag */}
        <div>
          <label htmlFor="locationTag" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="locationTag"
            value={formData.locationTag}
            onChange={(e) => setFormData({ ...formData, locationTag: e.target.value })}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={50}
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        {/* Privacy Settings */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <h2 className="text-lg font-bold mb-4">Privacy Settings</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-700 dark:text-zinc-300">Public Stats</span>
              <input
                type="checkbox"
                checked={formData.isPublicStats}
                onChange={(e) => setFormData({ ...formData, isPublicStats: e.target.checked })}
                className="w-5 h-5 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-700 dark:text-zinc-300">Public Badges</span>
              <input
                type="checkbox"
                checked={formData.isPublicBadges}
                onChange={(e) => setFormData({ ...formData, isPublicBadges: e.target.checked })}
                className="w-5 h-5 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-700 dark:text-zinc-300">Public Posts</span>
              <input
                type="checkbox"
                checked={formData.isPublicPosts}
                onChange={(e) => setFormData({ ...formData, isPublicPosts: e.target.checked })}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

