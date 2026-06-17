/**
 * Comprehensive User Editor Component
 * 
 * Enhanced form for editing user profiles with type-specific inputs
 */

import React, { useState } from 'react';

interface AdminUserEditorProps {
  user: any;
  onChange: (user: any) => void;
}

export const AdminUserEditor: React.FC<AdminUserEditorProps> = ({ user, onChange }) => {
  const isPlayer = user.accountType === 'Player';
  const isBusiness = user.accountType === 'Business';

  const handleFieldChange = (field: string, value: any) => {
    onChange({ ...user, [field]: value });
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...user, [field]: items });
  };

  return (
    <div className="space-y-6">
      {/* Account Info Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Account Info</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={user.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Account Type</label>
            <select
              value={user.accountType || 'Player'}
              onChange={(e) => handleFieldChange('accountType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="Player">Player</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {isPlayer && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  value={user.username || ''}
                  onChange={(e) => handleFieldChange('username', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                  placeholder="@username"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Sport</label>
                <select
                  value={user.primarySport || ''}
                  onChange={(e) => handleFieldChange('primarySport', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Sport</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Badminton">Badminton</option>
                </select>
              </div>
            </>
          )}

          {isBusiness && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                <input
                  type="text"
                  value={user.businessName || ''}
                  onChange={(e) => handleFieldChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
                <select
                  value={user.businessType || ''}
                  onChange={(e) => handleFieldChange('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Type</option>
                  <option value="Arena">Arena</option>
                  <option value="Court">Court</option>
                  <option value="Gym">Gym</option>
                  <option value="Club">Club</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Player Profile Section */}
      {isPlayer && (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Player Profile</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                type="text"
                value={user.firstName || ''}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                type="text"
                value={user.lastName || ''}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
              <input
                type="number"
                value={user.age || ''}
                onChange={(e) => handleFieldChange('age', parseInt(e.target.value) || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Level</label>
              <select
                value={user.skillLevel || 'Intermediate'}
                onChange={(e) => handleFieldChange('skillLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
              <input
                type="text"
                value={user.city || ''}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea
                value={user.bio || ''}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sports (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(user.sports) ? user.sports.join(', ') : ''}
                onChange={(e) => handleArrayChange('sports', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
                placeholder="Basketball, Soccer, Tennis"
              />
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Privacy</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={user.isPublicStats !== false}
              onChange={(e) => handleFieldChange('isPublicStats', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Public Stats</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={user.isPublicBadges !== false}
              onChange={(e) => handleFieldChange('isPublicBadges', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Public Badges</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={user.isPublicPosts !== false}
              onChange={(e) => handleFieldChange('isPublicPosts', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Public Posts</span>
          </label>
        </div>
      </div>

      {/* Metadata */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Metadata</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">User ID</label>
            <input
              type="text"
              value={user.id || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-500 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Created</label>
            <input
              type="datetime-local"
              value={user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 16) : ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-500 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
