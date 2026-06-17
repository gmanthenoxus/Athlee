'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { locationService } from '@/lib/locationService';
import { chatService } from '@/lib/chatService';
import { useAuth } from '@/hooks/useAuth';
import { Location, LocationType, SportType } from '@/lib/location-types';

/**
 * CommunityCourtCreationPage - Simplified form to create a community court
 * Automatically creates a location with Community type and chat room
 */
export default function CommunityCourtCreationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sports: [] as SportType[],
    address: '',
    description: ''
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">🔒 Sign In Required</p>
          <p className="text-gray-600 mb-6">Please sign in to create a community court</p>
          <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.sports.length === 0 || !formData.address.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCreating(true);
    try {
      // Create location with Community type
      const newLocation: Partial<Location> = {
        name: formData.name,
        sports: formData.sports,
        type: LocationType.Community,
        address: formData.address,
        description: formData.description,
        coordinates: { lat: 40.7128, lng: -74.006 },
        amenities: [],
        hours: '06:00-23:00',
        capacity: 50,
        images: ['https://via.placeholder.com/400x300?text=Community+Court'],
        ownerId: user.id,
        verified: true
      };

      const created = locationService.createLocation(newLocation);

      // Auto-create chat room for community
      const chatRoom = chatService.getOrCreateChatRoom(created.id, `${created.name} Community Chat`);
      
      // Add creator as moderator
      chatService.addMember(chatRoom.id, user.id);

      // Redirect to the new location
      router.push(`/locations/${created.id}`);
    } catch (error) {
      console.error('Failed to create community court:', error);
      alert('Failed to create community court. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const toggleSport = (sport: SportType) => {
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/locations" className="text-gray-600 hover:text-gray-900">
                ← Back
              </Link>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Athlee
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-5xl mb-4">👥</p>
          <h1 className="text-4xl font-bold mb-4">Create a Community Court</h1>
          <p className="text-lg text-purple-100">
            Bring your community together. Create a shared space for your favorite sport.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Court Name */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Court Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Central Park Basketball Court"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This will be the name of your community court</p>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address, city, state, zip"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Help others find your court</p>
            </div>

            {/* Sports */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Sports *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.values(SportType).map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => toggleSport(sport)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      formData.sports.includes(sport)
                        ? 'border-purple-600 bg-purple-100 text-purple-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Select at least one sport</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about your community court. What makes it special?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Info Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-3">
              <p className="font-bold text-purple-900">✓ What happens next?</p>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✓ Your court will be listed immediately</li>
                <li>✓ A private chat room will be created for your community</li>
                <li>✓ You'll be set as the moderator</li>
                <li>✓ When 10+ members join, a moderator election will be held</li>
                <li>✓ The community can then vote on rules and guidelines</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Link
                href="/locations"
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isCreating}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : '✓ Create Community Court'}
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="font-bold text-gray-900 mb-2">Who can create a community court?</p>
            <p className="text-gray-600">Any registered user can create a community court for their favorite sport!</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="font-bold text-gray-900 mb-2">Can I edit the court after creating it?</p>
            <p className="text-gray-600">Yes! As the creator/moderator, you can edit all details at any time.</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="font-bold text-gray-900 mb-2">What's a moderator?</p>
            <p className="text-gray-600">The moderator manages the community, approves check-ins, and helps set guidelines. When 10+ members join, the community votes on moderators!</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="font-bold text-gray-900 mb-2">Can I delete my community court?</p>
            <p className="text-gray-600">Yes, as the creator/moderator you can delete the court anytime. This will notify all members.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
