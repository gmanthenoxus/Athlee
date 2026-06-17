'use client';

import { MatchRules, ScoringSystem } from '@/lib/match-types';

interface RulesConfigProps {
  rules: MatchRules;
  onRulesChange: (rules: MatchRules) => void;
}

/**
 * RulesConfig - Configure basic match rules
 */
export function RulesConfig({ rules, onRulesChange }: RulesConfigProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure Rules</h2>

      <div className="space-y-6 bg-white border border-gray-200 rounded-lg p-6">
        {/* Scoring System */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Scoring System</label>
          <select
            value={rules.scoringSystem}
            onChange={(e) =>
              onRulesChange({
                ...rules,
                scoringSystem: e.target.value as ScoringSystem
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={ScoringSystem.Standard}>Standard (2pt, 3pt)</option>
            <option value={ScoringSystem.Streetball}>Streetball (1pt, 2pt)</option>
            <option value={ScoringSystem.PointBased}>Point Based</option>
            <option value={ScoringSystem.SetBased}>Set Based</option>
          </select>
        </div>

        {/* Points to Win */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Points to Win</label>
          <input
            type="number"
            min="1"
            max="100"
            value={rules.pointsToWin}
            onChange={(e) =>
              onRulesChange({
                ...rules,
                pointsToWin: parseInt(e.target.value)
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-600 mt-1">First team to reach this score wins</p>
        </div>

        {/* Win by Two */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="winByTwo"
            checked={rules.winByTwo}
            onChange={(e) =>
              onRulesChange({
                ...rules,
                winByTwo: e.target.checked
              })
            }
            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="winByTwo" className="text-sm font-bold text-gray-900">
            Must win by 2 points
          </label>
        </div>

        {/* Max Duration */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Max Duration (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="480"
            value={rules.maxDuration || 120}
            onChange={(e) =>
              onRulesChange({
                ...rules,
                maxDuration: parseInt(e.target.value)
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-600 mt-1">Approximate match duration</p>
        </div>

        {/* Custom Rules */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Custom Rules (Optional)</label>
          <textarea
            placeholder="e.g., House rules, special regulations..."
            value={rules.customRules || ''}
            onChange={(e) =>
              onRulesChange({
                ...rules,
                customRules: e.target.value
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Summary:</strong> First to {rules.pointsToWin} points
            {rules.winByTwo ? ', win by 2' : ''} • Max {rules.maxDuration} minutes
          </p>
        </div>
      </div>
    </div>
  );
}
