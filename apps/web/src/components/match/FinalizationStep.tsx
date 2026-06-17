'use client';

import React, { useState } from 'react';
import { Match, MatchMode, MatchRules, AllMatchRules, MatchOfficials } from '@/lib/match-types';
import { Location } from '@/lib/location-types';
import { InfoIcon, AlertCircle } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { TeamSummary } from './TeamSummary';

interface FinalizationStepProps {
  match: Partial<Match>;
  location?: Location;
  rules?: AllMatchRules;
  officials?: MatchOfficials;
  schedule?: Date | null;
  privacy?: 'public' | 'private' | 'invite';
  mode?: MatchMode;
  onScheduleChange: (schedule: Date | null) => void;
  onPrivacyChange: (privacy: 'public' | 'private' | 'invite') => void;
  onEditStep?: (step: number) => void;
}

/**
 * FinalizationStep - Final review, schedule, and privacy settings (Step 7)
 * Displays comprehensive match summary with edit options for each section
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Format schedule date
  const scheduleDate = schedule ? new Date(schedule) : null;
  const scheduleDateStr = scheduleDate 
    ? scheduleDate.toISOString().split('T')[0]
    : '';
  const scheduleTimeStr = scheduleDate
    ? scheduleDate.toISOString().split('T')[1].substring(0, 5)
    : '';

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (dateStr) {
      const date = new Date(dateStr);
      if (scheduleTimeStr) {
        const [hours, minutes] = scheduleTimeStr.split(':');
        date.setHours(parseInt(hours), parseInt(minutes));
      } else {
        date.setHours(18, 0); // Default to 6 PM if no time set
      }
      onScheduleChange(date);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeStr = e.target.value;
    if (timeStr && schedule) {
      const [hours, minutes] = timeStr.split(':');
      const newDate = new Date(schedule);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onScheduleChange(newDate);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Create Match</h2>
        <p className="text-gray-600 mt-1">Confirm all details before creating your match</p>
      </div>

      {/* MATCH SUMMARY PANELS */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Match Summary</h3>

        {/* Sport Card */}
        <SummaryCard
          title="Sport"
          icon="🏀"
          onEdit={() => onEditStep?.(0)}
        >
          <div className="space-y-2">
            <p className="font-medium text-gray-900">{match.sport}</p>
          </div>
        </SummaryCard>

        {/* Type Card */}
        <SummaryCard
          title="Match Configuration"
          icon="📋"
          onEdit={() => onEditStep?.(1)}
        >
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">{match.type}</span>
              {match.mode && <span className="text-gray-600"> · {match.mode}</span>}
            </p>
            {match.teamSize && (
              <p className="text-sm text-gray-600">
                Team Size: <span className="font-medium">{match.teamSize.label}</span>
              </p>
            )}
          </div>
        </SummaryCard>

        {/* Location Card */}
        {location && (
          <SummaryCard
            title="Location"
            icon="📍"
            onEdit={() => onEditStep?.(2)}
          >
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{location.name}</p>
              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
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
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{rules.presetName}</p>
              <div className="text-xs text-gray-600 space-y-1">
                {/* Display basketball-specific rules if available */}
                {('shotClock' in rules) && <p>• Shot clock: {rules.shotClock}s</p>}
                {('pointsInside' in rules) && <p>• Points inside: {rules.pointsInside}pt · Outside: {rules.pointsOutside}pt</p>}
                {('personalFoulLimit' in rules) && rules.personalFoulLimit && (
                  <p>• Personal fouls: {rules.personalFoulLimit}</p>
                )}
                {/* Display volleyball-specific rules if available */}
                {('setsToWin' in rules) && <p>• Sets to win: {rules.setsToWin}</p>}
                {('pointsPerSet' in rules) && <p>• Points per set: {rules.pointsPerSet}</p>}
                {/* Display baseball-specific rules if available */}
                {('innings' in rules) && <p>• Innings: {rules.innings}</p>}
                {/* Display football-specific rules if available */}
                {('quarterDuration' in rules) && <p>• Quarter duration: {rules.quarterDuration}min</p>}
              </div>
            </div>
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
              <div className="space-y-2">
                {officials.referees && officials.referees.length > 0 && (
                  <p className="text-sm">
                    <span className="font-medium">Referees:</span>
                    {officials.referees.map((ref, idx) => (
                      <span key={idx}>
                        {idx > 0 ? ', ' : ' '}
                        {ref}
                      </span>
                    ))}
                  </p>
                )}
                {officials.primaryRecorder && (
                  <p className="text-sm">
                    <span className="font-medium">Primary Recorder:</span> {officials.primaryRecorder}
                  </p>
                )}
              </div>
            )}
          </SummaryCard>
        )}
      </div>

      {/* SCHEDULING OPTIONS */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Schedule</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              checked={isLive}
              onChange={() => onScheduleChange(null)}
              className="w-4 h-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Play Now</p>
              <p className="text-xs text-gray-600">Start match immediately</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              checked={!isLive}
              onChange={() => onScheduleChange(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))}
              className="w-4 h-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Schedule for Later</p>
              <p className="text-xs text-gray-600">Pick date and time</p>
            </div>
          </label>
        </div>

        {!isLive && (
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
              <input
                type="date"
                value={scheduleDateStr}
                onChange={handleScheduleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Time</label>
              <input
                type="time"
                value={scheduleTimeStr}
                onChange={handleTimeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>
        )}
      </div>

      {/* PRIVACY OPTIONS */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Privacy</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              checked={privacy === 'public'}
              onChange={() => onPrivacyChange('public')}
              className="w-4 h-4 mt-1 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Public</p>
              <p className="text-xs text-gray-600">Anyone can see and join this match</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              checked={privacy === 'invite'}
              onChange={() => onPrivacyChange('invite')}
              className="w-4 h-4 mt-1 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Invite Only</p>
              <p className="text-xs text-gray-600">Only invited players can join</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              checked={privacy === 'private'}
              onChange={() => onPrivacyChange('private')}
              className="w-4 h-4 mt-1 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Private</p>
              <p className="text-xs text-gray-600">Only you and invited participants</p>
            </div>
          </label>
        </div>
      </div>

      {/* Mode Info Box */}
      {mode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              {mode === MatchMode.Competitive ? 'Competitive Mode' : 'Casual Mode'}
            </p>
            <p className="text-xs text-blue-800 mt-1">
              {mode === MatchMode.Competitive
                ? 'This match requires jersey numbers and stricter rule enforcement'
                : 'This is a casual match with minimal validation'}
            </p>
          </div>
        </div>
      )}

      {/* Validation Warning */}
      {(!match.teams || match.teams.length === 0 || !location) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Incomplete Match</p>
            <p className="text-xs text-amber-800 mt-1">
              Please complete all required sections before creating the match.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

