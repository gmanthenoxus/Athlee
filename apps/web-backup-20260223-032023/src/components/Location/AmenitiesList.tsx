'use client';

import { Amenity, AMENITIES } from '@athlehub/shared';
import { FC } from 'react';

interface AmenitiesListProps {
  amenities: Amenity[];
  maxDisplay?: number;
  className?: string;
}

/**
 * AmenitiesList component
 * Displays amenities in a formatted list
 */
export const AmenitiesList: FC<AmenitiesListProps> = ({ amenities, maxDisplay = 6, className = '' }) => {
  if (amenities.length === 0) {
    return <p className="text-gray-500 text-sm">No amenities listed</p>;
  }

  const displayAmenities = amenities.slice(0, maxDisplay);
  const remaining = Math.max(0, amenities.length - maxDisplay);

  return (
    <div className={`space-y-2 ${className}`}>
      <ul className="grid grid-cols-2 gap-2">
        {displayAmenities.map((amenity) => (
          <li key={amenity} className="flex items-center text-sm text-gray-700">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {amenity}
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">+{remaining}</span> more amenities
        </p>
      )}
    </div>
  );
};
