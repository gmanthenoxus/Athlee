import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { PlayerSuggestion } from '@/lib/match-types';
import { getPlayerAvatar } from '@/lib/mockUsers';

interface PlayerSearchModalProps {
  suggestions: PlayerSuggestion[];
  onSelectPlayer: (player: PlayerSuggestion) => void;
  onClose: () => void;
}

/**
 * PlayerSearchModal Component (Mobile - React Native)
 * Modal for searching and selecting from available players
 */
export default function PlayerSearchModal(
  props: PlayerSearchModalProps
): React.ReactElement {
  const { suggestions, onSelectPlayer, onClose } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter suggestions
  const filteredSuggestions = useMemo(() => {
    let results = [...suggestions];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          (s.userId && s.userId.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      results = results.filter((s) => s.category === selectedCategory);
    }

    return results;
  }, [suggestions, searchQuery, selectedCategory]);

  const categories = Array.from(new Set(suggestions.map((s) => s.category)));

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

  const renderPlayer = ({ item }: { item: PlayerSuggestion }) => {
    const info = getCategoryInfo(item.category);
    return (
      <Pressable
        style={({ pressed }) => [
          styles.playerItem,
          pressed && styles.playerItemPressed,
        ]}
        onPress={() => handleSelectPlayer(item)}
      >
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getPlayerAvatar(item)}</Text>
        </View>

        {/* Info */}
        <View style={styles.playerInfo}>
          <Text style={styles.playerName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>{info.icon}</Text>
              <Text style={styles.badgeText}>{info.name}</Text>
            </View>
            {item.isFriend && (
              <View style={[styles.badge, styles.friendBadge]}>
                <Text style={styles.friendBadgeText}>Friend</Text>
              </View>
            )}
            {item.isRegular && (
              <View style={[styles.badge, styles.regularBadge]}>
                <Text style={styles.regularBadgeText}>
                  {item.recentMatches} matches
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{item.rankingScore}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <Modal transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Add Player</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Filter */}
        {categories.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            <Pressable
              style={[
                styles.categoryButton,
                selectedCategory === null && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === null && styles.categoryButtonTextActive,
                ]}
              >
                All
              </Text>
            </Pressable>
            {categories.map((cat) => {
              const info = getCategoryInfo(cat);
              return (
                <Pressable
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === cat && styles.categoryButtonTextActive,
                    ]}
                  >
                    {info.icon} {info.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        {/* Players List */}
        {filteredSuggestions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {suggestions.length === 0
                ? 'No players available'
                : 'No players match your search'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredSuggestions}
            renderItem={renderPlayer}
            keyExtractor={(item) => item.id}
            style={styles.playersList}
            contentContainerStyle={styles.playersListContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable style={styles.closeFooterButton} onPress={onClose}>
            <Text style={styles.closeFooterButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  categoriesContainer: {
    maxHeight: 48,
    marginVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  playersList: {
    flex: 1,
  },
  playersListContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  playerItemPressed: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  avatarText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  playerInfo: {
    flex: 1,
    minWidth: 0,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  badgeIcon: {
    fontSize: 11,
  },
  badgeText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  friendBadge: {
    backgroundColor: '#F3E8FF',
  },
  friendBadgeText: {
    fontSize: 11,
    color: '#7C3AED',
    fontWeight: '500',
  },
  regularBadge: {
    backgroundColor: '#FEF3C7',
  },
  regularBadgeText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '500',
  },
  scoreContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
    flexShrink: 0,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  closeFooterButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
  },
  closeFooterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});
