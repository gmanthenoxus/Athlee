import React from 'react';
import { View, Text } from 'react-native';
import { Team } from '@/lib/match-types';

interface TeamSummaryProps {
  teams: Team[];
  collapsible?: boolean;
}

/**
 * Component for displaying team composition with player lists (React Native)
 */
export function TeamSummary({ teams, collapsible = false }: TeamSummaryProps) {
  return (
    <View style={{ gap: 12 }}>
      {teams.map((team) => (
        <View
          key={team.id}
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            padding: 12
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8
            }}
          >
            <Text style={{ fontWeight: '500', color: '#111827' }}>
              {team.name}
            </Text>
            <View
              style={{
                backgroundColor: '#dbeafe',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#1e40af' }}>
                {team.players.length} player{team.players.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <View>
            {team.players.slice(0, collapsible ? 3 : undefined).map((player, idx) => (
              <View
                key={player.id || idx}
                style={{
                  paddingVertical: 4,
                  paddingLeft: 8
                }}
              >
                <Text style={{ fontSize: 13, color: '#374151' }}>
                  • {player.name}
                  {player.jerseyNo && (
                    <Text style={{ fontSize: 12, color: '#6b7280' }}> #{player.jerseyNo}</Text>
                  )}
                </Text>
              </View>
            ))}
            {collapsible && team.players.length > 3 && (
              <Text style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic', paddingTop: 4 }}>
                +{team.players.length - 3} more
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
