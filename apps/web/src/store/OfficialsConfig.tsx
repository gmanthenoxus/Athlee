'use client';

import { MatchOfficials } from '@/lib/match-types';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';

interface OfficialsConfigProps {
  officials?: MatchOfficials;
  onOfficialsChange: (officials: MatchOfficials) => void;
}

/**
 * OfficialsConfig - Configure match officials (referees, recorders)
 * @deprecated Use OfficialsStep component instead
 */
export function OfficialsConfig({ officials, onOfficialsChange }: OfficialsConfigProps) {
  const [refereeName, setRefereeName] = useState('');

  const currentOfficials = officials || { referees: [], primaryRecorder: 'current-user', secondaryRecorders: [] };

  const addReferee = () => {
    if (refereeName.trim()) {
      onOfficialsChange({
        ...currentOfficials,
        referees: [...currentOfficials.referees, refereeName]
      });
      setRefereeName('');
    }
  };

  const removeReferee = (index: number) => {
    onOfficialsChange({
      ...currentOfficials,
      referees: currentOfficials.referees.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 bg-white border border-gray-200 rounded-lg p-6">
      {/* Referees */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Referees
        </label>
        <div className="space-y-2 mb-3">
          {currentOfficials.referees.map((referee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <span className="text-sm text-gray-900">{referee}</span>
              <button
                onClick={() => removeReferee(index)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={refereeName}
            onChange={(e) => setRefereeName(e.target.value)}
            placeholder="Referee name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addReferee()}
          />
          <button
            onClick={addReferee}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Note: Use the OfficialsStep component for a better experience with user search.
      </p>
    </div>
  );
}
