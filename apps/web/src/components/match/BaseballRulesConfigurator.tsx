import React, { useState, useEffect } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { BaseballMatchRules } from '@/lib/match-types';
import { BASEBALL_PRESETS } from '@/lib/mockBaseballRulePresets';

interface BaseballRulesConfiguratorProps {
  onNext?: () => void;
  onBack?: () => void;
}

export const BaseballRulesConfigurator: React.FC<BaseballRulesConfiguratorProps> = ({ onNext }) => {
  const { session, setRules } = useMatchSetupStore();
  
  const [rules, setLocalRules] = useState<BaseballMatchRules>(
    (session.rules as unknown as BaseballMatchRules) || {
      presetName: 'Custom',
      innings: 9,
      designatedHitter: true,
      extraInningsFormat: 'standard',
    }
  );

  useEffect(() => {
    setRules(rules);
  }, [rules, setRules]);

  const handleApplyPreset = (presetName: string) => {
    const preset = BASEBALL_PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setLocalRules(preset.rules as unknown as BaseballMatchRules);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Baseball Rules</h2>
        <p className="text-gray-600">Configure match rules or select a preset</p>
      </div>

      {/* Preset Selector */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Preset</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BASEBALL_PRESETS.map((preset) => (
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
        {/* Innings */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Number of Innings
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[6, 7, 9].map((innings) => (
              <button
                key={innings}
                onClick={() => setLocalRules({ ...rules, innings })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  rules.innings === innings
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{innings} Innings</div>
              </button>
            ))}
          </div>
        </div>

        {/* Designated Hitter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Designated Hitter (DH)
          </label>
          <div className="flex gap-3">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                onClick={() => setLocalRules({ ...rules, designatedHitter: value })}
                className={`px-6 py-3 rounded-lg border-2 transition-all ${
                  rules.designatedHitter === value
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{value ? 'Yes' : 'No'}</div>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Designated hitter bats in place of pitcher</p>
        </div>

        {/* Mercy Rule */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Mercy Rule
          </label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="mercyRule"
                checked={!rules.mercyRule}
                onChange={() => setLocalRules({ ...rules, mercyRule: undefined })}
                className="w-4 h-4"
              />
              <div>
                <div className="font-semibold text-gray-900">No Mercy Rule</div>
                <div className="text-sm text-gray-600">Game continues to full innings</div>
              </div>
            </label>
            
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="mercyRule"
                checked={!!rules.mercyRule}
                onChange={() => setLocalRules({ 
                  ...rules, 
                  mercyRule: { runDifference: 10, afterInning: 5 }
                })}
                className="w-4 h-4"
              />
              <div>
                <div className="font-semibold text-gray-900">Enable Mercy Rule</div>
                <div className="text-sm text-gray-600">Game ends if lead ≥ 10 runs after 5 innings</div>
              </div>
            </label>
          </div>
        </div>

        {/* Extra Innings Format */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Extra Innings Format
          </label>
          <div className="space-y-2">
            {[
              { value: 'standard' as const, label: 'Standard', desc: 'Regular inning play' },
              { value: 'runnerOnSecond' as const, label: 'Runner on 2nd', desc: 'Start with runner on second base (MLB 2020+)' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="extraInnings"
                  checked={rules.extraInningsFormat === option.value}
                  onChange={() => setLocalRules({ 
                    ...rules, 
                    extraInningsFormat: option.value
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
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Current Rules Summary</h4>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Preset: <span className="font-semibold">{rules.presetName}</span></p>
          <p>• Format: {rules.innings} innings</p>
          <p>• Designated Hitter: {rules.designatedHitter ? 'Yes' : 'No'}</p>
          <p>• Mercy Rule: {rules.mercyRule ? `${rules.mercyRule.runDifference}+ runs after inning ${rules.mercyRule.afterInning}` : 'Disabled'}</p>
          <p>• Extra Innings: {rules.extraInningsFormat === 'runnerOnSecond' ? 'Runner on 2nd' : 'Standard'}</p>
        </div>
      </div>
    </div>
  );
};
