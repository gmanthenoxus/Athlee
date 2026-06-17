/**
 * Comprehensive Location Editor Component
 * 
 * Enhanced form for editing location details with specialized inputs
 */

import React from 'react';

interface AdminLocationEditorProps {
  location: any;
  onChange: (location: any) => void;
}

export const AdminLocationEditor: React.FC<AdminLocationEditorProps> = ({ location, onChange }) => {
  const handleFieldChange = (field: string, value: any) => {
    onChange({ ...location, [field]: value });
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...location, [field]: items });
  };

  const handleCoordinatesChange = (field: 'lat' | 'lng', value: string) => {
    const num = parseFloat(value) || 0;
    onChange({
      ...location,
      coordinates: {
        ...location.coordinates,
        [field]: num
      }
    });
  };

  const SPORTS = ['Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Badminton'];
  const AMENITIES = [
    'Parking',
    'Restrooms',
    'Water Fountain',
    'Locker Room',
    'Equipment Rental',
    'WiFi',
    'Food Court',
    'Lighting'
  ];

  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Basic Info</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Location Name</label>
            <input
              type="text"
              value={location.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={location.type || 'Community'}
              onChange={(e) => handleFieldChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="Community">Community</option>
              <option value="Business">Business</option>
              <option value="University">University</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
            <input
              type="number"
              value={location.capacity || ''}
              onChange={(e) => handleFieldChange('capacity', parseInt(e.target.value) || null)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Hours</label>
            <input
              type="text"
              value={location.hours || ''}
              onChange={(e) => handleFieldChange('hours', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
              placeholder="08:00-22:00"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Verified</label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={location.verified || false}
                onChange={(e) => handleFieldChange('verified', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">✓ Verified</span>
            </label>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Location Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <input
              type="text"
              value={location.address || ''}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Latitude</label>
            <input
              type="number"
              step="0.0001"
              value={location.coordinates?.lat || ''}
              onChange={(e) => handleCoordinatesChange('lat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Longitude</label>
            <input
              type="number"
              step="0.0001"
              value={location.coordinates?.lng || ''}
              onChange={(e) => handleCoordinatesChange('lng', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={location.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Sports & Amenities */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sports & Amenities</h4>

        {/* Sports */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Sports Offered</label>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <label key={sport} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={location.sports?.includes(sport) || false}
                  onChange={(e) => {
                    const sports = location.sports || [];
                    if (e.target.checked) {
                      handleFieldChange('sports', [...sports, sport]);
                    } else {
                      handleFieldChange('sports', sports.filter((s: string) => s !== sport));
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{sport}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Amenities Available</label>
          <div className="grid grid-cols-2 gap-2">
            {AMENITIES.map((amenity) => (
              <label key={amenity} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={location.amenities?.includes(amenity) || false}
                  onChange={(e) => {
                    const amenities = location.amenities || [];
                    if (e.target.checked) {
                      handleFieldChange('amenities', [...amenities, amenity]);
                    } else {
                      handleFieldChange('amenities', amenities.filter((a: string) => a !== amenity));
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Metadata</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Location ID</label>
            <input
              type="text"
              value={location.id || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-500 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Created</label>
            <input
              type="datetime-local"
              value={location.createdAt ? new Date(location.createdAt).toISOString().slice(0, 16) : ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-500 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {location.ownerId && (
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Owner ID</label>
              <input
                type="text"
                value={location.ownerId}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-gray-500 bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
