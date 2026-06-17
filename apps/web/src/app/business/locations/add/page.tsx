'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { locationService } from '@/lib/locationService';
import { chatService } from '@/lib/chatService';
import { useAuth } from '@/hooks/useAuth';
import { Location, LocationType, SportType, Amenity } from '@/lib/location-types';

/**
 * AddLocationPage - Multi-step form to add a new location
 * Steps: 1) Basic Info 2) Address 3) Amenities 4) Hours 5) Pricing 6) Verification
 */
export default function AddLocationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sports: [] as SportType[],
    type: LocationType.Business as LocationType,
    address: '',
    coordinates: { lat: 40.7128, lng: -74.006 },
    description: '',
    amenities: [] as Amenity[],
    hours: '08:00-22:00',
    capacity: 100,
    price: 25,
    image: 'https://via.placeholder.com/400x300?text=New+Location',
    isPrivate: false
  });

  if (user?.accountType !== 'Business') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">🔒 Business Only</p>
          <p className="text-gray-600 mb-6">Only business accounts can create locations</p>
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && formData.sports.length > 0;
      case 2:
        return formData.address.trim() !== '';
      case 3:
        return true; // Amenities optional
      case 4:
        return formData.hours.trim() !== '';
      case 5:
        return true; // Pricing optional
      case 6:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsCreating(true);
    try {
      // Create location
      const newLocation: Partial<Location> = {
        name: formData.name,
        sports: formData.sports,
        type: formData.type,
        address: formData.address,
        coordinates: formData.coordinates,
        description: formData.description,
        amenities: formData.amenities,
        hours: formData.hours,
        capacity: formData.capacity,
        images: [formData.image],
        ownerId: user.id,
        verified: true // Auto-verify business locations
      };

      const created = locationService.createLocation(newLocation);

      // Auto-create chat room for community locations
      if (created.type === LocationType.Community) {
        const chatRoom = chatService.getOrCreateChatRoom(created.id, created.name);
        // Add creator as first member and moderator
        chatService.addMember(chatRoom.id, user.id);
      }

      router.push('/business/locations');
    } catch (error) {
      console.error('Failed to create location:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSport = (sport: SportType) => {
    updateFormData(
      'sports',
      formData.sports.includes(sport)
        ? formData.sports.filter((s) => s !== sport)
        : [...formData.sports, sport]
    );
  };

  const toggleAmenity = (amenity: Amenity) => {
    updateFormData(
      'amenities',
      formData.amenities.includes(amenity)
        ? formData.amenities.filter((a) => a !== amenity)
        : [...formData.amenities, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/business/locations" className="text-gray-600 hover:text-gray-900">
                ← Back
              </Link>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Athlee
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Location</h1>
          <p className="text-gray-600 mb-6">Step {step} of 6</p>

          <div className="flex gap-2 h-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-colors ${
                  i + 1 <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Sections */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Location Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="e.g., Downtown Basketball Arena"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Location Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.values(LocationType).map((type) => (
                    <button
                      key={type}
                      onClick={() => updateFormData('type', type)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.type === type
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {type === LocationType.Business && '🏢'}
                      {type === LocationType.Community && '👥'}
                      {type === LocationType.Private && '🔒'}
                      <div className="text-sm font-medium mt-2">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sports Multi-Select */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Sports Offered *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.values(SportType).map((sport) => (
                    <button
                      key={sport}
                      onClick={() => toggleSport(sport)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                        formData.sports.includes(sport)
                          ? 'border-blue-600 bg-blue-100 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe your location..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Location Address</h2>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Street address, city, state, zip"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">📍 Map picker coming soon (using mock coordinates for now)</p>
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => updateFormData('capacity', parseInt(e.target.value))}
                  min={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Amenities */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>

              <div className="grid grid-cols-2 gap-3">
                {Object.values(Amenity).map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      formData.amenities.includes(amenity)
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <p className="text-lg mb-1">{getAmenityIcon(amenity)}</p>
                    <p className="text-sm font-medium text-gray-900">{amenity}</p>
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  Selected: <span className="font-bold">{formData.amenities.length}</span> amenities
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Hours */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Hours of Operation</h2>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Operating Hours *</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => updateFormData('hours', e.target.value)}
                  placeholder="e.g., 08:00-22:00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">Format: HH:MM-HH:MM (24-hour)</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">💡 Example: 6:00-23:00 (6 AM to 11 PM)</p>
              </div>
            </div>
          )}

          {/* Step 5: Pricing */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Pricing (Optional)</h2>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Price per Hour</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">$</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => updateFormData('price', parseInt(e.target.value))}
                    min={0}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-700">📝 Note: Pricing is for future payment processing. Currently all bookings are free.</p>
              </div>
            </div>
          )}

          {/* Step 6: Verification */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Review & Create</h2>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold">NAME</p>
                  <p className="text-lg font-bold text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">TYPE</p>
                  <p className="text-lg font-bold text-gray-900">{formData.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">SPORTS</p>
                  <p className="text-lg font-bold text-gray-900">{formData.sports.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">ADDRESS</p>
                  <p className="text-lg font-bold text-gray-900">{formData.address}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">CAPACITY</p>
                  <p className="text-lg font-bold text-gray-900">{formData.capacity} people</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">HOURS</p>
                  <p className="text-lg font-bold text-gray-900">{formData.hours}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">AMENITIES</p>
                  <p className="text-lg font-bold text-gray-900">{formData.amenities.length} selected</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  ✓ Your location will be verified and listed immediately. 
                  {formData.type === LocationType.Community && ' A chat room will be auto-created!'}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                ← Back
              </button>
            )}
            {step < 6 ? (
              <button
                onClick={handleNext}
                disabled={!validateStep()}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isCreating}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : '✓ Create Location'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getAmenityIcon(amenity: Amenity): string {
  const icons: Record<Amenity, string> = {
    [Amenity.Parking]: '🅿️',
    [Amenity.Showers]: '🚿',
    [Amenity.ChangingRooms]: '👕',
    [Amenity.Restrooms]: '🚽',
    [Amenity.Seating]: '🪑',
    [Amenity.Lighting]: '💡',
    [Amenity.Snacks]: '🍔',
    [Amenity.WiFi]: '📶',
    [Amenity.Scoreboard]: '📊'
  };
  return icons[amenity] || '✓';
}
