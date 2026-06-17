import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput
} from 'react-native';
import { Match, MatchMode, MatchRules, MatchOfficials } from '@/lib/match-types';
import { Location } from '@/lib/location-types';
import { SummaryCard } from './SummaryCard';
import { TeamSummary } from './TeamSummary';

interface FinalizationStepProps {
  match: Partial<Match>;
  location?: Location;
  rules?: MatchRules;
  officials?: MatchOfficials;
  schedule?: Date | null;
  privacy?: 'public' | 'private' | 'invite';
  mode?: MatchMode;
  onScheduleChange: (schedule: Date | null) => void;
  onPrivacyChange: (privacy: 'public' | 'private' | 'invite') => void;
  onEditStep?: (step: number) => void;
}

/**
 * FinalizationStep - Final review, schedule, and privacy settings (Step 6/7)
 * React Native version for mobile app
 */
export function FinalizationStep({
  match,
  location,
  rules,
  officials,
  schedule,
  privacy,
  mode,
  onScheduleChange,
  onPrivacyChange,
  onEditStep
}: FinalizationStepProps) {
  const isLive = schedule === null;
  const [selectedScheduleType, setSelectedScheduleType] = useState<'now' | 'later'>(isLive ? 'now' : 'later');
  const [selectedPrivacy, setSelectedPrivacy] = useState<'public' | 'private' | 'invite'>(privacy || 'public');

  const handleScheduleTypeChange = (type: 'now' | 'later') => {
    setSelectedScheduleType(type);
    if (type === 'now') {
      onScheduleChange(null);
    } else {
      // Default to tomorrow at 6 PM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18, 0, 0, 0);
      onScheduleChange(tomorrow);
    }
  };

  const handlePrivacyChange = (privacySetting: 'public' | 'private' | 'invite') => {
    setSelectedPrivacy(privacySetting);
    onPrivacyChange(privacySetting);
  };

  const isIncomplete = !match.teams || match.teams.length === 0 || !location;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ padding: 16 }}>
        {/* Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 4 }}>
            Review & Create Match
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            Confirm all details before creating your match
          </Text>
        </View>

        {/* MATCH SUMMARY SECTION */}
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
          Match Summary
        </Text>

        {/* Sport Card */}
        <SummaryCard
          title="Sport"
          icon="🏀"
          onEdit={() => onEditStep?.(0)}
        >
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
            {match.sport}
          </Text>
        </SummaryCard>

        {/* Match Configuration Card */}
        <SummaryCard
          title="Match Configuration"
          icon="📋"
          onEdit={() => onEditStep?.(1)}
        >
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 14, color: '#374151' }}>
              <Text style={{ fontWeight: '500' }}>{match.type}</Text>
              {match.mode && <Text style={{ color: '#6b7280' }}> · {match.mode}</Text>}
            </Text>
            {match.teamSize && (
              <Text style={{ fontSize: 13, color: '#6b7280' }}>
                Team Size: <Text style={{ fontWeight: '500' }}>{match.teamSize.label}</Text>
              </Text>
            )}
          </View>
        </SummaryCard>

        {/* Location Card */}
        {location && (
          <SummaryCard
            title="Location"
            icon="📍"
            onEdit={() => onEditStep?.(2)}
          >
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                {location.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>
                {location.address}
              </Text>
            </View>
          </SummaryCard>
        )}

        {/* Teams Card */}
        <SummaryCard
          title="Teams"
          icon="👥"
          onEdit={() => onEditStep?.(3)}
          isEmpty={!match.teams || match.teams.length === 0}
        >
          <TeamSummary teams={match.teams || []} collapsible={true} />
        </SummaryCard>

        {/* Rules Card */}
        <SummaryCard
          title="Rules"
          icon="⚙️"
          onEdit={() => onEditStep?.(4)}
          isEmpty={!rules}
        >
          {rules && (
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                {rules.presetName}
              </Text>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  • Shot clock: {rules.shotClock}s
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  • Points inside: {rules.pointsInside}pt · Outside: {rules.pointsOutside}pt
                </Text>
                {rules.personalFoulLimit && (
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>
                    • Personal fouls: {rules.personalFoulLimit}
                  </Text>
                )}
              </View>
            </View>
          )}
        </SummaryCard>

        {/* Officials Card (Competitive mode only) */}
        {mode === MatchMode.Competitive && (
          <SummaryCard
            title="Officials"
            icon="👨‍⚖️"
            onEdit={() => onEditStep?.(5)}
            isEmpty={!officials}
          >
            {officials && (
              <View style={{ gap: 8 }}>
                {officials.referees && officials.referees.length > 0 && (
                  <Text style={{ fontSize: 12, color: '#374151' }}>
                    <Text style={{ fontWeight: '500' }}>Referees: </Text>
                    {officials.referees.join(', ')}
                  </Text>
                )}
                {officials.primaryRecorder && (
                  <Text style={{ fontSize: 12, color: '#374151' }}>
                    <Text style={{ fontWeight: '500' }}>Primary Recorder: </Text>
                    {officials.primaryRecorder}
                  </Text>
                )}
              </View>
            )}
          </SummaryCard>
        )}

        {/* SCHEDULING SECTION */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb'
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
            Schedule
          </Text>

          {/* Schedule Options */}
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => handleScheduleTypeChange('now')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: selectedScheduleType === 'now' ? '#eff6ff' : '#f3f4f6'
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selectedScheduleType === 'now' ? '#2563eb' : '#9ca3af',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12
                }}
              >
                {selectedScheduleType === 'now' && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2563eb'
                    }}
                  />
                )}
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                  Play Now
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  Start match immediately
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleScheduleTypeChange('later')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: selectedScheduleType === 'later' ? '#eff6ff' : '#f3f4f6'
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selectedScheduleType === 'later' ? '#2563eb' : '#9ca3af',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12
                }}
              >
                {selectedScheduleType === 'later' && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2563eb'
                    }}
                  />
                )}
              </View>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                  Schedule for Later
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  Pick date and time
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRIVACY SECTION */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb'
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
            Privacy
          </Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={() => handlePrivacyChange('public')}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: selectedPrivacy === 'public' ? '#eff6ff' : '#f3f4f6'
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selectedPrivacy === 'public' ? '#2563eb' : '#9ca3af',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  marginTop: 2
                }}
              >
                {selectedPrivacy === 'public' && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2563eb'
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                  Public
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  Anyone can see and join this match
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePrivacyChange('invite')}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: selectedPrivacy === 'invite' ? '#eff6ff' : '#f3f4f6'
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selectedPrivacy === 'invite' ? '#2563eb' : '#9ca3af',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  marginTop: 2
                }}
              >
                {selectedPrivacy === 'invite' && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2563eb'
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                  Invite Only
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  Only invited players can join
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePrivacyChange('private')}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: selectedPrivacy === 'private' ? '#eff6ff' : '#f3f4f6'
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: selectedPrivacy === 'private' ? '#2563eb' : '#9ca3af',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  marginTop: 2
                }}
              >
                {selectedPrivacy === 'private' && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2563eb'
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>
                  Private
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  Only you and invited participants
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mode Info */}
        {mode && (
          <View
            style={{
              backgroundColor: '#dbeafe',
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#93c5fd',
              marginTop: 16
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#1e3a8a', marginBottom: 4 }}>
              {mode === MatchMode.Competitive ? 'Competitive Mode' : 'Casual Mode'}
            </Text>
            <Text style={{ fontSize: 12, color: '#1e40af' }}>
              {mode === MatchMode.Competitive
                ? 'This match requires jersey numbers and stricter rule enforcement'
                : 'This is a casual match with minimal validation'}
            </Text>
          </View>
        )}

        {/* Incompleteness Warning */}
        {isIncomplete && (
          <View
            style={{
              backgroundColor: '#fef3c7',
              borderRadius: 12,
              padding: 12,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#fcd34d'
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#92400e', marginBottom: 4 }}>
              Incomplete Match
            </Text>
            <Text style={{ fontSize: 12, color: '#b45309' }}>
              Please complete all required sections before creating the match.
            </Text>
          </View>
        )}

        {/* Spacer for bottom button */}
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}
