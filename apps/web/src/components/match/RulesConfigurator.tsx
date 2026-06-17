import React, { useState, useEffect } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { getRulePresetsBySport } from '@/lib/mockRulePresets';
import { MatchRules, AllMatchRules } from '@/lib/match-types';
import { SportType } from '@/lib/location-types';
import { VolleyballRulesConfigurator } from './VolleyballRulesConfigurator';
import { BaseballRulesConfigurator } from './BaseballRulesConfigurator';
import { AmericanFootballRulesConfigurator } from './AmericanFootballRulesConfigurator';

interface RulesConfiguratorProps {
  sport?: SportType;
}

type TabType = 'timing' | 'scoring' | 'fouls' | 'violations' | 'gameplay';

/**
 * RulesConfigurator - Dispatcher component that routes to sport-specific rule configurators
 * Handles 8 different sports with sport-specific rule interfaces
 */
export default function RulesConfigurator(props: RulesConfiguratorProps): React.ReactElement {
  const { sport = SportType.Basketball } = props;

  // Dispatch to sport-specific configurators
  switch (sport) {
    case SportType.Volleyball:
      return <VolleyballRulesConfigurator />;
    case SportType.Baseball:
      return <BaseballRulesConfigurator />;
    case SportType.American_Football:
      return <AmericanFootballRulesConfigurator />;
    case SportType.Basketball:
    case SportType.Soccer:
    case SportType.Tennis:
    case SportType.Badminton:
    case SportType.Pickleball:
    default:
      // Fall back to generic component for other sports (to be implemented)
      return <GenericRulesConfigurator sport={sport} />;
  }
}

/**
 * GenericRulesConfigurator - Fallback for sports not yet with custom UI
 * Uses preset selection and basic customization
 */
function GenericRulesConfigurator({ sport }: { sport: SportType }): React.ReactElement {
  const { session, setRules } = useMatchSetupStore();

  const [currentTab, setCurrentTab] = useState<TabType>('timing');
  const [rules, setLocalRules] = useState<MatchRules>((session.rules as MatchRules) || {
    presetName: 'Custom',
    gameFormat: 'timed',
    periodStructure: 'quarters',
    periodDuration: 10,
    overtimeFormat: '5min',
    shotClock: '24',
    pointsInside: 2,
    pointsOutside: 3,
    freeThrowValue: 1,
    personalFoulLimit: '5',
    teamFoulLimit: '4perQtr',
    bonusAfter: '5',
    technicalFoulValue: '1ftPos',
    flagrantFoulPenalty: '2ftPos',
    backcourt: '8',
    threeSecondViolation: 'both',
    goaltendingAllowed: true,
    travelingCalled: true,
    doubleDribbleCalled: true,
    timeoutStructure: 'fiba',
    substitutions: 'unlimited',
    shotClockResetAfter: 'made',
    jumpBallRule: 'alternating',
    houseRules: []
  });

  const [presets] = useState(getRulePresetsBySport(sport));
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Update local rules in store
  useEffect(() => {
    setRules(rules);
  }, [rules, setRules]);

  const handleUpdateField = (field: keyof MatchRules, value: any) => {
    setLocalRules((prev) => ({
      ...prev,
      [field]: value
    }));
    setValidationErrors([]);
  };

  const applyPreset = (presetName: string) => {
    const preset = presets.find((p) => p.name === presetName);
    if (preset) {
      setLocalRules(preset.rules);
      setValidationErrors([]);
    }
  };

  const resetToPreset = () => {
    const preset = presets.find((p) => p.name === rules.presetName);
    if (preset) {
      setLocalRules(preset.rules);
    }
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'timing', label: 'Timing', icon: '⏱️' },
    { id: 'scoring', label: 'Scoring', icon: '🎯' },
    { id: 'fouls', label: 'Fouls', icon: '🚫' },
    { id: 'violations', label: 'Violations', icon: '⚠️' },
    { id: 'gameplay', label: 'Gameplay', icon: '🏀' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configure Rules</h2>
        <p className="text-gray-600">Customize the match rules or select a preset</p>
      </div>

      {/* Preset Selector */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Preset</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.name)}
              className={`p-3 rounded-lg transition-all ${
                rules.presetName === preset.name
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-400'
              }`}
              title={preset.description}
            >
              <div className="font-semibold text-sm">{preset.name}</div>
            </button>
          ))}
        </div>
        <button
          onClick={resetToPreset}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Reset to {rules.presetName}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                currentTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          {validationErrors.map((error, i) => (
            <p key={i} className="text-sm text-red-700">
              • {error}
            </p>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div className="mb-8">
        {/* TIMING TAB */}
        {currentTab === 'timing' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Game Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['timed', 'firstTo', 'untimed'] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => handleUpdateField('gameFormat', format)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      rules.gameFormat === format
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold capitalize">{format}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* TIMED Format Fields */}
            {rules.gameFormat === 'timed' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Period Structure
                  </label>
                  <select
                    value={rules.periodStructure || 'quarters'}
                    onChange={(e) => handleUpdateField('periodStructure', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="quarters">Quarters</option>
                    <option value="halves">Halves</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Period Duration (minutes)
                  </label>
                  <select
                    value={rules.periodDuration || 10}
                    onChange={(e) => handleUpdateField('periodDuration', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {[8, 10, 12, 15, 20].map((val) => (
                      <option key={val} value={val}>
                        {val} minutes
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Overtime Format
                  </label>
                  <select
                    value={rules.overtimeFormat || '5min'}
                    onChange={(e) => handleUpdateField('overtimeFormat', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value="5min">5 minutes</option>
                    <option value="7min">7 minutes</option>
                    <option value="10min">10 minutes</option>
                  </select>
                </div>
              </>
            )}

            {/* FIRST TO Format Fields */}
            {rules.gameFormat === 'firstTo' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Winning Score
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[11, 15, 21, 25, 30].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleUpdateField('winningScore', val)}
                        className={`p-2 rounded-lg border-2 ${
                          rules.winningScore === val
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={rules.winningScore || 21}
                    onChange={(e) => handleUpdateField('winningScore', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Or enter custom score"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="winByTwo"
                    checked={rules.winByTwo || false}
                    onChange={(e) => handleUpdateField('winByTwo', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="winByTwo" className="text-sm font-medium text-gray-900">
                    Win by 2 Points
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Overtime Limit (points, 0 = none)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={rules.overtimeLimit || 0}
                    onChange={(e) => handleUpdateField('overtimeLimit', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* SCORING TAB */}
        {currentTab === 'scoring' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Shot Clock
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {['none', '12', '24', '30', '35'].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleUpdateField('shotClock', val)}
                    className={`p-2 rounded-lg border-2 ${
                      rules.shotClock === val
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {val === 'none' ? 'None' : `${val}s`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Scoring Points</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600">Inside</label>
                  <select
                    value={rules.pointsInside || 2}
                    onChange={(e) => handleUpdateField('pointsInside', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value={1}>1 point</option>
                    <option value={2}>2 points</option>
                    <option value={3}>3 points</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Outside</label>
                  <select
                    value={rules.pointsOutside || 3}
                    onChange={(e) => handleUpdateField('pointsOutside', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value={1}>1 point</option>
                    <option value={2}>2 points</option>
                    <option value={3}>3 points</option>
                    <option value={4}>4 points</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600">Free Throw</label>
                  <select
                    value={rules.freeThrowValue || 1}
                    onChange={(e) =>
                      handleUpdateField('freeThrowValue', e.target.value === 'none' ? 'none' : parseInt(e.target.value))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value={1}>1 point</option>
                    <option value={2}>2 points</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Shot Clock Reset After
              </label>
              <select
                value={rules.shotClockResetAfter || 'made'}
                onChange={(e) => handleUpdateField('shotClockResetAfter', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="made">Made Shot</option>
                <option value="rim">Rim Touch</option>
                <option value="none">Never</option>
              </select>
            </div>
          </div>
        )}

        {/* FOULS TAB */}
        {currentTab === 'fouls' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Personal Foul Limit
              </label>
              <select
                value={rules.personalFoulLimit || '5'}
                onChange={(e) => handleUpdateField('personalFoulLimit', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="4">4 fouls</option>
                <option value="5">5 fouls</option>
                <option value="6">6 fouls</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Team Foul Limit
              </label>
              <select
                value={rules.teamFoulLimit || '4perQtr'}
                onChange={(e) => handleUpdateField('teamFoulLimit', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="4perQtr">4 per quarter</option>
                <option value="5perQtr">5 per quarter</option>
                <option value="7perHalf">7 per half</option>
                <option value="5perHalf">5 per half</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Bonus After (Team Fouls)
              </label>
              <select
                value={rules.bonusAfter || '5'}
                onChange={(e) => handleUpdateField('bonusAfter', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="4">4 fouls</option>
                <option value="5">5 fouls</option>
                <option value="7">7 fouls</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Technical Foul Value
              </label>
              <select
                value={rules.technicalFoulValue || '1ftPos'}
                onChange={(e) => handleUpdateField('technicalFoulValue', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="1ftPos">1 FT + Possession</option>
                <option value="1ftOnly">1 FT Only</option>
                <option value="2ftPos">2 FT + Possession</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Flagrant Foul Penalty
              </label>
              <select
                value={rules.flagrantFoulPenalty || '2ftPos'}
                onChange={(e) => handleUpdateField('flagrantFoulPenalty', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="2ftPos">2 FT + Possession</option>
                <option value="ejection2ft">Ejection + 2 FT</option>
              </select>
            </div>
          </div>
        )}

        {/* VIOLATIONS TAB */}
        {currentTab === 'violations' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Backcourt Time</label>
              <select
                value={rules.backcourt || '8'}
                onChange={(e) => handleUpdateField('backcourt', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">Not Called</option>
                <option value="8">8 seconds</option>
                <option value="10">10 seconds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                3-Second Violation
              </label>
              <select
                value={rules.threeSecondViolation || 'both'}
                onChange={(e) => handleUpdateField('threeSecondViolation', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">Not Called</option>
                <option value="defensive3">Defensive Only</option>
                <option value="offensive3">Offensive Only</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="goaltending"
                checked={rules.goaltendingAllowed || false}
                onChange={(e) => handleUpdateField('goaltendingAllowed', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="goaltending" className="text-sm font-medium text-gray-900">
                Goaltending Allowed
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="traveling"
                checked={rules.travelingCalled || false}
                onChange={(e) => handleUpdateField('travelingCalled', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="traveling" className="text-sm font-medium text-gray-900">
                Traveling Called
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="doubleDribble"
                checked={rules.doubleDribbleCalled || false}
                onChange={(e) => handleUpdateField('doubleDribbleCalled', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="doubleDribble" className="text-sm font-medium text-gray-900">
                Double Dribble Called
              </label>
            </div>
          </div>
        )}

        {/* GAMEPLAY TAB */}
        {currentTab === 'gameplay' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Timeout Structure
              </label>
              <select
                value={rules.timeoutStructure || 'fiba'}
                onChange={(e) => handleUpdateField('timeoutStructure', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="fiba">FIBA</option>
                <option value="nba">NBA</option>
                <option value="ncaa">NCAA</option>
                <option value="hs">High School</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {rules.timeoutStructure === 'custom' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Timeouts per Half
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={rules.customTimeoutsPerHalf || 1}
                    onChange={(e) => handleUpdateField('customTimeoutsPerHalf', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Timeouts per OT
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={rules.customTimeoutsPerOT || 1}
                    onChange={(e) => handleUpdateField('customTimeoutsPerOT', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="carryOver"
                    checked={rules.customTimeoutsCanCarryOver || false}
                    onChange={(e) =>
                      handleUpdateField('customTimeoutsCanCarryOver', e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <label htmlFor="carryOver" className="text-sm font-medium text-gray-900">
                    Timeouts Can Carry Over
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Timeout Duration
                  </label>
                  <select
                    value={rules.customTimeoutDuration || '60'}
                    onChange={(e) => handleUpdateField('customTimeoutDuration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="75">75 seconds</option>
                    <option value="100">100 seconds (1:40)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Substitutions
              </label>
              <select
                value={rules.substitutions || 'unlimited'}
                onChange={(e) => handleUpdateField('substitutions', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="none">None</option>
                <option value="unlimited">Unlimited</option>
                <option value="limited7">Limited (7 per team)</option>
                <option value="limited10">Limited (10 per team)</option>
                <option value="hockey">Hockey Style</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Jump Ball Rule
              </label>
              <select
                value={rules.jumpBallRule || 'alternating'}
                onChange={(e) => handleUpdateField('jumpBallRule', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="tipoff">Tipoff</option>
                <option value="alternating">Alternating</option>
                <option value="alwaysJump">Always Jump</option>
              </select>
            </div>

            {rules.houseRules && rules.houseRules.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  House Rules (Location-Specific)
                </label>
                <div className="space-y-2">
                  {rules.houseRules.map((rule, i) => (
                    <div key={i} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-gray-700">• {rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
