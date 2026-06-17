'use client';

import { TeamSizeConfig, StatIntensity } from '@/lib/match-types';
import { SportType } from '@/lib/location-types';
import { sportConfigService } from '@/lib/sportConfigService';

interface TeamSizeStatsPickerProps {
  sport?: SportType;
  selectedTeamSize?: TeamSizeConfig;
  selectedStatIntensity?: StatIntensity;
  onSelectTeamSize: (teamSize: TeamSizeConfig) => void;
  onSelectStatIntensity: (intensity: StatIntensity) => void;
}

/**
 * TeamSizeStatsPicker - Configure team size and stat intensity
 */
export function TeamSizeStatsPicker({
  sport,
  selectedTeamSize,
  selectedStatIntensity,
  onSelectTeamSize,
  onSelectStatIntensity
}: TeamSizeStatsPickerProps) {
  if (!sport) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Please select a sport first
        </p>
      </div>
    );
  }

  // Get team size options for the selected sport
  const sportConfig = sportConfigService.getConfig(sport);
  const teamSizeOptions = sportConfig?.teamSizeOptions || [];
  const statIntensityOptions = sportConfig?.statIntensities || [
    StatIntensity.Basic,
    StatIntensity.Advanced
  ];

  return (
    <div className="space-y-6">
      {/* Team Size */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Team Size
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {teamSizeOptions.length > 0 ? (
            teamSizeOptions.map((size) => (
              <button
                key={size.label}
                onClick={() => onSelectTeamSize(size)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTeamSize?.label === size.label
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{size.label}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {size.playersPerTeam} players
                  {size.substitutes > 0 && ` + ${size.substitutes} subs`}
                </div>
              </button>
            ))
          ) : (
            <div className="col-span-full p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                No team size options available for {sport}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stat Intensity */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Stat Tracking Intensity
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {statIntensityOptions.map((intensity) => (
            <button
              key={intensity}
              onClick={() => onSelectStatIntensity(intensity)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedStatIntensity === intensity
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">{intensity}</div>
              <div className="text-xs text-gray-600 mt-1">
                {intensity === StatIntensity.Basic && 'Points only'}
                {intensity === StatIntensity.Advanced && 'Full stats'}
                {intensity === StatIntensity.Professional && 'Advanced + splits'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
