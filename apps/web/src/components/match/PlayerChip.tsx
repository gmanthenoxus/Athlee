import React, { useState } from 'react';
import { MatchPlayer } from '@/lib/match-types';
import { getPlayerAvatar } from '@/lib/mockUsers';

interface PlayerChipProps {
  player: MatchPlayer;
  onRemove: () => void;
  onUpdate: (updates: Partial<MatchPlayer>) => void;
  isSubstitute?: boolean;
  competitiveMode?: boolean;
}

const getPositionInitial = (position?: string): string => {
  const initials: Record<string, string> = {
    'Guard': 'G',
    'Forward': 'F',
    'Center': 'C',
    'Other': 'O',
  };
  return position ? initials[position] || 'O' : '';
};

/**
 * PlayerChip Component
 * Displays a player in a team with options to edit/remove
 */
export default function PlayerChip(props: PlayerChipProps): React.ReactElement {
  const { player, onRemove, onUpdate, isSubstitute = false, competitiveMode = false } =
    props;

  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({
    jerseyNo: player.jerseyNo || '',
    position: player.position || '',
    isCaptain: player.isCaptain || false,
  });

  const handleSaveEdit = () => {
    onUpdate({
      jerseyNo: editData.jerseyNo || undefined,
      position: editData.position || undefined,
      isCaptain: editData.isCaptain,
    });
    setShowEditForm(false);
  };

  const avatarInitials = getPlayerAvatar(player);

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg bg-white border border-gray-200 transition-all ${
        isSubstitute ? 'opacity-75' : ''
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
        {avatarInitials}
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium text-gray-900 truncate flex-1">{player.name}</p>
          {competitiveMode && player.jerseyNo && (
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
              #{player.jerseyNo}
            </span>
          )}
          {competitiveMode && player.position && (
            <span className="text-xs font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
              {getPositionInitial(player.position)}
            </span>
          )}
          {player.isCaptain && (
            <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">C</span>
          )}
        </div>
        {!player.claimed && (
          <p className="text-xs text-amber-600 font-medium mt-1">Guest Player</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-1">
        <button
          onClick={() => setShowEditForm(true)}
          className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="Edit player details"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={onRemove}
          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Remove player"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div
            className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900">Edit Player</h3>

            <div className="space-y-3">
              {/* Jersey Number */}
              {competitiveMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jersey Number
                  </label>
                  <input
                    type="text"
                    value={editData.jerseyNo}
                    onChange={(e) =>
                      setEditData({ ...editData, jerseyNo: e.target.value })
                    }
                    placeholder="e.g., 23"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Position */}
              {competitiveMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['Guard', 'Forward', 'Center', 'Other'].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setEditData({ ...editData, position: pos })}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                          editData.position === pos
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pos[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Captain Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="captain"
                  checked={editData.isCaptain}
                  onChange={(e) =>
                    setEditData({ ...editData, isCaptain: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <label htmlFor="captain" className="text-sm font-medium text-gray-700">
                  Make Captain
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowEditForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
