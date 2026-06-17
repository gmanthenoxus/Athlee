import React, { useState } from 'react';

interface NewPlayerFormProps {
  onCreatePlayer: (name: string, options?: { position?: string; jerseyNo?: string }) => void;
  onClose: () => void;
  competitiveMode?: boolean;
}

/**
 * NewPlayerForm Component
 * Form for creating new temporary/guest players
 */
export default function NewPlayerForm(
  props: NewPlayerFormProps
): React.ReactElement {
  const { onCreatePlayer, onClose, competitiveMode = false } = props;

  const [formData, setFormData] = useState({
    name: '',
    jerseyNo: '',
    position: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onCreatePlayer(formData.name.trim(), {
      jerseyNo: formData.jerseyNo || undefined,
      position: formData.position || undefined,
    });

    // Reset form
    setFormData({ name: '', jerseyNo: '', position: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Player</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Player Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Player Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter player name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>

          {/* Jersey Number (Competitive Mode) */}
          {competitiveMode && (
            <div>
              <label htmlFor="jersey" className="block text-sm font-medium text-gray-700 mb-1">
                Jersey Number
              </label>
              <input
                type="text"
                id="jersey"
                value={formData.jerseyNo}
                onChange={(e) =>
                  setFormData({ ...formData, jerseyNo: e.target.value })
                }
                placeholder="e.g., 23"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Position (Competitive Mode) */}
          {competitiveMode && (
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[{ label: 'Guard', value: 'Guard' }, { label: 'Forward', value: 'Forward' }, { label: 'Center', value: 'Center' }, { label: 'Other', value: 'Other' }].map((pos) => (
                      <button
                        key={pos.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, position: pos.value })}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                          formData.position === pos.value
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pos.label[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
            ℹ This player will be added as a guest and can be claimed later.
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
