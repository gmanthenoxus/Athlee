'use client';

import React, { useEffect } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { SportType } from '@/lib/location-types';
import { MatchTypeCard } from './MatchTypeCard';
import { SubtypeCard } from './SubtypeCard';
import { ModeToggle } from './ModeToggle';
import { TeamSizePicker } from './TeamSizePicker';
import { StatIntensityPicker } from './StatIntensityPicker';
import { BestOfPicker } from './BestOfPicker';
import { StepNavigation } from './StepNavigation';
import { MatchMode } from '@/lib/match-types';
import { sportConfigService } from '@/lib/sportConfigService';

interface MatchTypeConfiguratorProps {
  onNext?: () => void;
  onBack?: () => void;
}

/**
 * MatchTypeConfigurator - Step 2 of the Match Setup Wizard
 * Handles selection of match type, mode, team size, and stat intensity
 * 
 * NOTE: Navigation is handled by parent page, not internally
 */
export const MatchTypeConfigurator: React.FC<MatchTypeConfiguratorProps> = ({
  onNext = () => {},
  onBack = () => {},
}) => {
  const {
    session,
    setMatchTypeId,
    setSubtypeId,
    setMode,
    setTeamSize,
    setStatIntensity,
    setBestOf,
    getMatchTypes,
    getSubtypesForType,
    canProceedStep2,
  } = useMatchSetupStore();

  const { sport, matchTypeId, subtypeId, mode, teamSize, statIntensity, bestOf } =
    session;

  // Get match types for selected sport
  const matchTypes = sport ? getMatchTypes(sport) : [];
  const selectedMatchType = matchTypes.find((mt) => mt.id === matchTypeId);
  const subtypes = matchTypeId ? getSubtypesForType(sport!, matchTypeId) : [];
  const selectedSubtype = subtypeId
    ? subtypes.find((st) => st.id === subtypeId)
    : undefined;

  // Get team size options from sport config
  const sportConfig = sport ? sportConfigService.getConfig(sport) : null;
  const teamSizeOptions = sportConfig?.teamSizeOptions || [];
  const statIntensityOptions = sportConfig?.statIntensities || [];

  // Determine what fields are required based on selected type/subtype
  let requiresTeamSize = selectedMatchType?.requiresTeamSize || false;
  let requiresStatIntensity = selectedMatchType?.requiresStatIntensity || false;
  let requiresBestOf = false;
  let fixedTeamSize: string | undefined;

  if (selectedSubtype) {
    requiresTeamSize = selectedSubtype.requiresTeamSize;
    requiresStatIntensity = selectedSubtype.requiresStatIntensity;
    requiresBestOf = selectedSubtype.requiresBestOf || false;
    fixedTeamSize = selectedSubtype.fixedTeamSize;
  }

  // Pre-select defaults on mount
  useEffect(() => {
    if (sport && matchTypes.length > 0) {
      // Pre-select first enabled match type if not already selected
      if (!matchTypeId) {
        const enabledType = matchTypes.find((t) => t.enabled);
        if (enabledType) {
          setMatchTypeId(enabledType.id);
        }
      }

      // Pre-select default mode if not set
      if (!mode) {
        setMode(MatchMode.Casual);
      }
    }
  }, [sport, matchTypeId, mode, matchTypes, setMatchTypeId, setMode]);

  // Pre-select default team size and stat intensity when required fields change
  useEffect(() => {
    if (requiresTeamSize && !teamSize && !fixedTeamSize && teamSizeOptions.length > 0) {
      // Select default team size (usually first one)
      const defaultSize =
        selectedMatchType?.defaultTeamSize ||
        selectedSubtype?.fixedTeamSize ||
        teamSizeOptions[0]?.label;
      if (defaultSize) {
        const teamSizeConfig = teamSizeOptions.find((ts) => ts.label === defaultSize);
        if (teamSizeConfig) {
          setTeamSize(teamSizeConfig);
        }
      }
    }

    if (
      requiresStatIntensity &&
      !statIntensity &&
      statIntensityOptions.length > 0
    ) {
      // Select default stat intensity (usually Basic)
      const defaultIntensity =
        selectedMatchType?.defaultStatIntensity ||
        selectedSubtype?.defaultStatIntensity ||
        statIntensityOptions[0];
      if (defaultIntensity) {
        setStatIntensity(defaultIntensity);
      }
    }

    if (requiresBestOf && !bestOf) {
      // Set default best-of value
      const defaultBestOf =
        selectedSubtype?.defaultBestOf || 3;
      setBestOf(defaultBestOf);
    }
  }, [
    requiresTeamSize,
    requiresStatIntensity,
    requiresBestOf,
    teamSize,
    statIntensity,
    bestOf,
    fixedTeamSize,
    selectedMatchType,
    selectedSubtype,
    teamSizeOptions,
    statIntensityOptions,
    setTeamSize,
    setStatIntensity,
    setBestOf,
  ]);

  const canProceed = canProceedStep2();

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Match Configuration</h2>
        <p className="text-gray-600 text-sm mt-1">
          Define the structure and parameters of your match
        </p>
      </div>

      {/* Match Types */}
      <div>
        <label className="text-sm font-semibold block mb-3">Match Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {matchTypes.map((matchType) => (
            <MatchTypeCard
              key={matchType.id}
              config={matchType}
              isSelected={matchTypeId === matchType.id}
              onSelect={setMatchTypeId}
              hasSubtypes={!!(matchType.subtypes && matchType.subtypes.length > 0)}
            />
          ))}
        </div>
      </div>

      {/* Subtypes (if applicable) */}
      {subtypes.length > 0 && (
        <div>
          <label className="text-sm font-semibold block mb-3">
            {selectedMatchType?.name} - Variations
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subtypes.map((subtype) => (
              <SubtypeCard
                key={subtype.id}
                config={subtype}
                isSelected={subtypeId === subtype.id}
                onSelect={setSubtypeId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {(matchTypeId || subtypeId) && (
        <div className="border-t border-gray-200" />
      )}

      {/* Mode Toggle */}
      {matchTypeId || subtypeId ? (
        <ModeToggle
          selectedMode={mode}
          onSelectMode={setMode}
          disabled={false}
        />
      ) : null}

      {/* Team Size Picker */}
      {(matchTypeId || subtypeId) && (requiresTeamSize || fixedTeamSize) ? (
        <TeamSizePicker
          options={teamSizeOptions}
          selectedTeamSize={teamSize}
          onSelectTeamSize={setTeamSize}
          fixedSize={fixedTeamSize}
        />
      ) : null}

      {/* Stat Intensity Picker */}
      {(matchTypeId || subtypeId) && requiresStatIntensity ? (
        <StatIntensityPicker
          options={statIntensityOptions}
          selectedIntensity={statIntensity}
          onSelectIntensity={setStatIntensity}
        />
      ) : null}

      {/* Best-Of Picker */}
      {(matchTypeId || subtypeId) && requiresBestOf ? (
        <BestOfPicker
          selectedBestOf={bestOf}
          onSelectBestOf={setBestOf}
        />
      ) : null}

      {/* Validation Message */}
      {!canProceed && matchTypeId && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          ⚠️ Please complete all required fields to proceed
        </div>
      )}
    </div>
  );
};
