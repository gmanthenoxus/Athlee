'use client';

import { MatchType, MatchMode } from '@/lib/match-types';
import { SportType } from '@/lib/location-types';
import { sportConfigService } from '@/lib/sportConfigService';

interface MatchTypePickerProps {
  sport?: SportType;
  selectedType?: MatchType;
  selectedMode?: MatchMode;
  onSelectType: (type: MatchType) => void;
  onSelectMode: (mode: MatchMode) => void;
}

const typeDescriptions: Record<MatchType, string> = {
  [MatchType.Single]: 'One-off match with final score',
  [MatchType.SetBased]: 'Multiple sets (tennis, volleyball)',
  [MatchType.Tournament]: 'Tournament bracket (coming soon)',
  [MatchType.Rotational]: 'Rotating players (coming soon)'
};

const typeIcons: Record<MatchType, string> = {
  [MatchType.Single]: '🎯',
  [MatchType.SetBased]: '📊',
  [MatchType.Tournament]: '🏆',
  [MatchType.Rotational]: '🔄'
};

/**
 * MatchTypePicker - Select match type and mode
 * Sport-aware component that shows enabled match types for the selected sport
 */
export function MatchTypePicker({
  sport,
  selectedType,
  selectedMode,
  onSelectType,
  onSelectMode
}: MatchTypePickerProps) {
  // Get enabled match types for the selected sport
  const sportConfig = sport ? sportConfigService.getConfig(sport) : null;
  const enabledMatchTypes = sportConfig?.matchTypes || [];
  
  // Get list of disabled types for this sport
  const disabledTypes = enabledMatchTypes
    .filter(mt => mt.enabled === false)
    .map(mt => mt.type);
  
  // Get list of enabled types for this sport (if sport has specific config)
  const enabledTypesList = enabledMatchTypes
    .filter(mt => mt.enabled !== false)
    .map(mt => mt.type);

  return (
    <div className="space-y-8">
      {/* Match Type */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Match Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(MatchType).map((type) => {
            // Disable if explicitly marked as disabled in sport config
            const isExplicitlyDisabled = disabledTypes.includes(type);
            // Or if sport is selected and this type is not in enabled list
            const isNotInSportConfig = sport && enabledTypesList.length > 0 && !enabledTypesList.includes(type);
            const isDisabled = isExplicitlyDisabled || isNotInSportConfig;
            
            return (
              <button
                key={type}
                onClick={() => !isDisabled && onSelectType(type)}
                disabled={isDisabled === true}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedType === type
                    ? 'border-blue-600 bg-blue-50'
                    : isDisabled
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-2">{typeIcons[type]}</div>
                <div className="font-bold text-gray-900">{type}</div>
                <div className="text-xs text-gray-600 mt-2">{typeDescriptions[type]}</div>
                {isDisabled && <div className="text-xs text-gray-500 mt-2">Coming soon</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Match Mode */}
      {selectedType && !disabledTypes.includes(selectedType) && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Match Mode</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.values(MatchMode).map((mode) => (
              <button
                key={mode}
                onClick={() => onSelectMode(mode)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMode === mode
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="text-sm font-bold text-gray-900">
                  {mode === MatchMode.Casual ? '🎉' : '🏆'} {mode}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {mode === MatchMode.Casual
                    ? 'Simple logging, no validation'
                    : 'Jersey numbers required'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
