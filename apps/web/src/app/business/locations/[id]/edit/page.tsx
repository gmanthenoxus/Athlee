'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { locationService } from '@/lib/locationService';
import { useAuth } from '@/hooks/useAuth';
import { Location, LocationType, SportType, Amenity } from '@/lib/location-types';

interface EditLocationPageProps {
  params: Promise<{ id: string }>;
}

/**
 * EditLocationPage - Multi-step form to edit an existing location
 * Same structure as AddLocationPage but with pre-populated data
 */
export default function EditLocationPage({ params }: EditLocationPageProps) {
  const router = useRouter();
  const { id: locationId } = React.use(params);
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
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
    image: 'https://via.placeholder.com/400x300?text=Location'
  });

  // Load location data on mount
  useEffect(() => {
    const loaded = locationService.getLocationById(locationId);
    if (!loaded) {
      router.push('/business/locations');
      return;
    }

    if (loaded.ownerId !== user?.id) {
      router.push('/business/locations');
      return;
    }

    setLocation(loaded);
    setFormData({
      name: loaded.name,
      sports: loaded.sports,
      type: loaded.type,
      address: loaded.address,
      coordinates: loaded.coordinates,
      description: loaded.description || '',
      amenities: loaded.amenities || [],
      hours: loaded.hours,
      capacity: loaded.capacity || 100,
      price: 25, // Mock pricing
      image: loaded.images?.[0] || 'https://via.placeholder.com/400x300?text=Location'
    });
    setIsLoading(false);
  }, [locationId, user?.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-bold text-gray-900">Loading location...</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">Location Not Found</p>
          <Link href="/business/locations" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Back to Dashboard
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
        return true;
      case 4:
        return formData.hours.trim() !== '';
      case 5:
        return true;
      case 6:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      const updated: Partial<Location> = {
        name: formData.name,
        sports: formData.sports,
        type: formData.type,
        address: formData.address,
        coordinates: formData.coordinates,
        description: formData.description,
        amenities: formData.amenities,
        hours: formData.hours,
        capacity: formData.capacity
      };

      locationService.updateLocation(locationId, updated);
      router.push('/business/locations');
    } catch (error) {
      console.error('Failed to update location:', error);
    } finally {
      setIsUpdating(false);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Location</h1>
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

              {/* Type (Read-only for edit) */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Location Type (Cannot Change)</label>
                <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 text-gray-900 font-bold">
                  {formData.type}
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

          {/* Step 5: Pricing (Read-only for now) */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-700">
                  📝 Pricing management coming soon. Currently set to free for all users.
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Review & Save */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Review & Save</h2>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold">NAME</p>
                  <p className="text-lg font-bold text-gray-900">{formData.name}</p>
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
                <p className="text-sm text-green-700">✓ Your changes will be saved immediately.</p>
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
                disabled={isUpdating}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Saving...' : '✓ Save Changes'}
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
