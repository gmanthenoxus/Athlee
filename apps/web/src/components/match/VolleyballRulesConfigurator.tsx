import React, { useState, useEffect } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { VolleyballMatchRules } from '@/lib/match-types';
import { VOLLEYBALL_PRESETS } from '@/lib/mockVolleyballRulePresets';

interface VolleyballRulesConfiguratorProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const VolleyballRulesConfigurator: React.FC<VolleyballRulesConfiguratorProps> = ({ onNext }) => {
  const { session, setRules } = useMatchSetupStore();
  
  const [rules, setLocalRules] = useState<VolleyballMatchRules>(
    (session.rules as unknown as VolleyballMatchRules) || {
      presetName: 'Custom',
      setsToWin: 2,
      pointsPerSet: 25,
      winByTwo: true,
      rallyScoring: true,
      liberoAllowed: true,
    }
  );

  useEffect(() => {
    setRules(rules);
  }, [rules, setRules]);

  const handleApplyPreset = (presetName: string) => {
    const preset = VOLLEYBALL_PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setLocalRules(preset.rules as unknown as VolleyballMatchRules);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Volleyball Rules</h2>
        <p className="text-gray-600">Configure match rules or select a preset</p>
      </div>

      {/* Preset Selector */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Preset</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VOLLEYBALL_PRESETS.map((preset) => (
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
        {/* Sets to Win */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Sets to Win
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[2, 3, 5].map((num) => (
              <button
                key={num}
                onClick={() => setLocalRules({ ...rules, setsToWin: num })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  rules.setsToWin === num
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{num === 2 ? 'Best of 3' : num === 3 ? 'Best of 5' : 'Best of 9'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Points Per Set */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Points Per Set
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[15, 21, 25].map((points) => (
              <button
                key={points}
                onClick={() => setLocalRules({ ...rules, pointsPerSet: points })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  rules.pointsPerSet === points
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{points}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Win By Two */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Win by 2 Points
          </label>
          <div className="flex gap-3">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setLocalRules({ ...rules, winByTwo: value })}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  rules.winByTwo === value
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{value ? 'Yes' : 'No'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Libero Allowed */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Libero Allowed
          </label>
          <div className="flex gap-3">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setLocalRules({ ...rules, liberoAllowed: value })}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  rules.liberoAllowed === value
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{value ? 'Yes' : 'No'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Rally Scoring Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Rally Scoring:</span> Always enabled. Points awarded on every rally regardless of who served.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Current Rules Summary</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Preset: <span className="font-semibold">{rules.presetName}</span></p>
          <p>• Format: Best of {rules.setsToWin * 2 - 1} sets to {rules.pointsPerSet} points</p>
          <p>• Win by 2: {rules.winByTwo ? 'Yes' : 'No'}</p>
          <p>• Libero: {rules.liberoAllowed ? 'Allowed' : 'Not allowed'}</p>
        </div>
      </div>
    </div>
  );
};
