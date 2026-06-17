'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  adminName?: string;
  accountType: 'Player' | 'Business' | 'Visitor';
  age?: number;
  gender?: string;
  primarySport?: string;
  city?: string;
  country?: string;
  businessType?: string;
  region?: string;
  isPublicStats?: boolean;
  isPublicBadges?: boolean;
  isPublicPosts?: boolean;
  createdAt?: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { user: currentUser, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'about'>('profile');

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Get current user data
    const userData = JSON.parse(localStorage.getItem(`athlee_user_${currentUser.id}`) || '{}');
    setUser(userData);
    setFormData(userData);
  }, [currentUser, router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Update user in localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem(`athlee_user_${user.id}`, JSON.stringify(updatedUser));

      // Also update in the users list
      const users = JSON.parse(localStorage.getItem('athlee_users') || '[]');
      const updatedUsers = users.map((u: User) =>
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('athlee_users', JSON.stringify(updatedUsers));

      setSaveMessage('✓ Profile saved successfully!');
      setUser(updatedUser);
      
      setTimeout(() => {
        router.push(`/profile/${user.id}`);
      }, 1000);
    } catch (error) {
      setSaveMessage('✗ Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <Link href={`/profile/${user.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              ← Back to Profile
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">⚙️ Profile Settings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-semibold border-b-2 transition ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Profile
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 px-6 py-4 font-semibold border-b-2 transition ${
                activeTab === 'about'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              ℹ️ About
            </button>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`px-8 py-4 border-b ${
              saveMessage.includes('✓')
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}>
              {saveMessage}
            </div>
          )}

          <div className="p-8 space-y-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">📋 Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier visible on your profile (@username)</p>
                </div>
              </div>
            </div>

            {/* Player-Specific Fields */}
            {user.accountType === 'Player' && (
              <>
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">⚽ Player Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName || ''}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="First name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName || ''}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Last name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                        <input
                          type="number"
                          value={formData.age || ''}
                          onChange={(e) => handleInputChange('age', parseInt(e.target.value) || undefined)}
                          placeholder="Age"
                          min="13"
                          max="120"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                        <select
                          value={formData.gender || ''}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Primary Sport</label>
                      <input
                        type="text"
                        value={formData.primarySport || ''}
                        onChange={(e) => handleInputChange('primarySport', e.target.value)}
                        placeholder="e.g., Football, Basketball"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city || ''}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          value={formData.country || ''}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="Country"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings for Player */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">🔒 Privacy Settings</h2>
                  <div className="space-y-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublicStats !== false}
                        onChange={(e) => handleInputChange('isPublicStats', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        <span className="font-semibold">Public Stats</span>
                        <p className="text-sm text-gray-500">Allow others to see your statistics and achievements</p>
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublicBadges !== false}
                        onChange={(e) => handleInputChange('isPublicBadges', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        <span className="font-semibold">Public Badges</span>
                        <p className="text-sm text-gray-500">Allow others to see your badges and certifications</p>
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublicPosts !== false}
                        onChange={(e) => handleInputChange('isPublicPosts', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        <span className="font-semibold">Public Posts</span>
                        <p className="text-sm text-gray-500">Allow others to see your posts and activity</p>
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Business-Specific Fields */}
            {user.accountType === 'Business' && (
              <>
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">🏢 Business Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        value={formData.businessName || ''}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Business name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Admin Name</label>
                        <input
                          type="text"
                          value={formData.adminName || ''}
                          onChange={(e) => handleInputChange('adminName', e.target.value)}
                          placeholder="Admin name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Business Type</label>
                        <input
                          type="text"
                          value={formData.businessType || ''}
                          onChange={(e) => handleInputChange('businessType', e.target.value)}
                          placeholder="e.g., Stadium, Training Center"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Region</label>
                        <input
                          type="text"
                          value={formData.region || ''}
                          onChange={(e) => handleInputChange('region', e.target.value)}
                          placeholder="Region"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          value={formData.country || ''}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="Country"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings for Business */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">🔒 Privacy Settings</h2>
                  <div className="space-y-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublicPosts !== false}
                        onChange={(e) => handleInputChange('isPublicPosts', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        <span className="font-semibold">Public Posts</span>
                        <p className="text-sm text-gray-500">Allow others to see your posts and announcements</p>
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublicBadges !== false}
                        onChange={(e) => handleInputChange('isPublicBadges', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        <span className="font-semibold">Public Bookings</span>
                        <p className="text-sm text-gray-500">Allow others to see your bookings information</p>
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Account Actions */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">🔐 Account Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium transition border border-red-200"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="border-t border-gray-200 pt-8 flex gap-4">
              <Link
                href={`/profile/${user.id}`}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition text-center"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? '💾 Saving...' : '💾 Save Changes'}
              </button>
            </div>
              </>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <>
              <div className="space-y-8">
                {/* Email and Username */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">📧 Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</p>
                      <p className="text-lg text-gray-900 font-medium">{user?.email}</p>
                    </div>
                    {user?.username && (
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username</p>
                        <p className="text-lg text-gray-900 font-medium">@{user.username}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Player-Specific About */}
                {user?.accountType === 'Player' && (
                  <>
                    <div className="border-t border-gray-200 pt-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">⚽ Player Details</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Age</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.age}y</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gender</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.gender}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sport</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.primarySport}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">📍 Location</h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.city}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Country</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.country}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Business-Specific About */}
                {user?.accountType === 'Business' && (
                  <>
                    <div className="border-t border-gray-200 pt-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">🏢 Business Details</h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Type</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.businessType}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Name</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.adminName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">📍 Location</h2>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Region</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.region}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Country</p>
                          <p className="text-lg text-gray-900 font-medium">{user?.country}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Account Type */}
                <div className="border-t border-gray-200 pt-8">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Type</p>
                  <div className="inline-block">
                    <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      user?.accountType === 'Player'
                        ? 'bg-blue-100 text-blue-700'
                        : user?.accountType === 'Business'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user?.accountType}
                    </span>
                  </div>
                </div>

                {/* Member Since */}
                <div className="border-t border-gray-200 pt-8">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Member Since</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(user?.createdAt || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium transition border border-red-200"
                >
                  🚪 Logout
                </button>
              </div>

              {/* Back Button */}
              <div className="border-t border-gray-200 pt-8">
                <Link
                  href={`/profile/${user?.id}`}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition text-center block"
                >
                  ← Back to Profile
                </Link>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

