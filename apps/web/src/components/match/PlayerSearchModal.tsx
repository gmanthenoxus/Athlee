import React, { useState, useMemo } from 'react';
import { PlayerSuggestion } from '@/lib/match-types';
import { getPlayerAvatar } from '@/lib/mockUsers';

interface PlayerSearchModalProps {
  suggestions: PlayerSuggestion[];
  onSelectPlayer: (player: PlayerSuggestion) => void;
  onClose: () => void;
}

/**
 * PlayerSearchModal Component
 * Modal for searching and selecting from available players
 */
export default function PlayerSearchModal(
  props: PlayerSearchModalProps
): React.ReactElement {
  const { suggestions, onSelectPlayer, onClose } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter suggestions based on search and category
  const filteredSuggestions = useMemo(() => {
    let results = [...suggestions];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          (s.userId && s.userId.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter((s) => s.category === selectedCategory);
    }

    return results;
  }, [suggestions, searchQuery, selectedCategory]);

  // Get unique categories
  const categories = Array.from(new Set(suggestions.map((s) => s.category)));

  // Get category display info
  const getCategoryInfo = (category: string) => {
    const icons = {
      friend: '👥',
      regular: '⭐',
      sport: '⚽',
      nearby: '📍',
      suggested: '💡',
    };
    const names = {
      friend: 'Friends',
      regular: 'Location Regulars',
      sport: 'Same Sport',
      nearby: 'Nearby',
      suggested: 'Suggested',
    };
    return {
      icon: (icons as any)[category] || '•',
      name: (names as any)[category] || category,
    };
  };

  const handleSelectPlayer = (player: PlayerSuggestion) => {
    onSelectPlayer(player);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Player</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Players
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or username..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => {
                  const info = getCategoryInfo(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{info.icon}</span>
                      {info.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Player List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredSuggestions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  {suggestions.length === 0
                    ? 'No players available'
                    : 'No players match your search'}
                </p>
              </div>
            ) : (
              filteredSuggestions.map((player) => {
                const info = getCategoryInfo(player.category);
                return (
                  <button
                    key={player.id}
                    onClick={() => handleSelectPlayer(player)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {getPlayerAvatar(player)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                          {info.icon} {info.name}
                        </span>
                        {player.isFriend && (
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                            Friend
                          </span>
                        )}
                        {player.isRegular && (
                          <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
                            {player.recentMatches} matches
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Score Indicator */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs text-gray-600 font-medium">
                        Score: {player.rankingScore}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
