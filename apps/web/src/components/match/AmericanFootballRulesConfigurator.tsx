import React, { useState, useEffect } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { AmericanFootballMatchRules } from '@/lib/match-types';
import { FOOTBALL_PRESETS } from '@/lib/mockFootballRulePresets';

interface AmericanFootballRulesConfiguratorProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const AmericanFootballRulesConfigurator: React.FC<AmericanFootballRulesConfiguratorProps> = ({ onNext }) => {
  const { session, setRules } = useMatchSetupStore();
  
  const [rules, setLocalRules] = useState<AmericanFootballMatchRules>(
    (session.rules as unknown as AmericanFootballMatchRules) || {
      presetName: 'Custom',
      quarterDuration: 12,
      quarters: 4,
      overtimeFormat: 'suddenDeath',
      twoPointConversion: true,
      timeoutsPerHalf: 3,
    }
  );

  useEffect(() => {
    setRules(rules);
  }, [rules, setRules]);

  const handleApplyPreset = (presetName: string) => {
    const preset = FOOTBALL_PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setLocalRules(preset.rules as unknown as AmericanFootballMatchRules);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">American Football Rules</h2>
        <p className="text-gray-600">Configure match rules or select a preset</p>
      </div>

      {/* Preset Selector */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Preset</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FOOTBALL_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleApplyPreset(preset.name)}
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
      </div>

      {/* Rule Configuration */}
      <div className="space-y-6">
        {/* Quarter Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Quarter Duration (minutes)
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[12, 15, 10].map((duration) => (
              <button
                key={duration}
                onClick={() => setLocalRules({ ...rules, quarterDuration: duration })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  rules.quarterDuration === duration
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{duration} min</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeouts Per Half */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Timeouts Per Half
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((timeouts) => (
              <button
                key={timeouts}
                onClick={() => setLocalRules({ ...rules, timeoutsPerHalf: timeouts })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  rules.timeoutsPerHalf === timeouts
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{timeouts}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Two-Point Conversion */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Two-Point Conversion Allowed
          </label>
          <div className="flex gap-3">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setLocalRules({ ...rules, twoPointConversion: value })}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  rules.twoPointConversion === value
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{value ? 'Yes' : 'No'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Overtime Format */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Overtime Format
          </label>
          <div className="space-y-2">
            {[
              { value: 'suddenDeath', label: 'Sudden Death', desc: 'First to score wins' },
              { value: 'college', label: 'College OT', desc: 'Team alternates possessions from 25-yard line' },
              { value: 'none', label: 'No Overtime', desc: 'Game ends in tie' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="overtime"
                  checked={rules.overtimeFormat === option.value}
                  onChange={() => setLocalRules({ 
                    ...rules, 
                    overtimeFormat: option.value as any
                  })}
                  className="w-4 h-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Quarter Count Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Quarters:</span> Fixed at 4 quarters per regulation game
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Current Rules Summary</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Preset: <span className="font-semibold">{rules.presetName}</span></p>
          <p>• Game: 4 quarters × {rules.quarterDuration} minutes ({rules.quarterDuration * 4} min total)</p>
          <p>• Timeouts: {rules.timeoutsPerHalf} per half ({rules.timeoutsPerHalf * 2} total)</p>
          <p>• Two-Point Conversion: {rules.twoPointConversion ? 'Allowed' : 'Not allowed'}</p>
          <p>• Overtime: {
            rules.overtimeFormat === 'suddenDeath' ? 'Sudden Death' :
            rules.overtimeFormat === 'college' ? 'College Format' :
            'No Overtime'
          }</p>
        </div>
      </div>
    </div>
  );
};
