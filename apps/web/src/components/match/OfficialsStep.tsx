'use client';

import React, { useState } from 'react';
import { useMatchSetupStore } from '@/store/matchSetupStore';
import { profileService, UserSearchResult } from '@/lib/profileService';
import { MatchMode } from '@/lib/match-types';
import { X, Search, Users, User } from 'lucide-react';

interface OfficialsStepProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

/**
 * Card component for displaying assigned officials
 */
const AssignedPersonCard: React.FC<{
  userId: string;
  userName?: string;
  userUsername?: string;
  onRemove: () => void;
  isPrimaryRecorder?: boolean;
}> = ({ userId, userName, userUsername, onRemove, isPrimaryRecorder }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
          {userName?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-gray-900 truncate">{userName}</p>
          <p className="text-xs text-gray-500 truncate">@{userUsername}</p>
        </div>
        {isPrimaryRecorder && (
          <span className="ml-2 px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full whitespace-nowrap">
            Primary
          </span>
        )}
      </div>
      <button
        onClick={onRemove}
        className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
        aria-label="Remove person"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};

/**
 * Modal component for searching and selecting users
 */
const UserSearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (userId: string) => void;
  excludeUserIds?: string[];
  title?: string;
}> = ({ isOpen, onClose, onSelect, excludeUserIds = [], title = 'Select User' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = profileService.searchUsers(query).filter(
        (user) => !excludeUserIds.includes(user.userId)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelect = (userId: string) => {
    onSelect(userId);
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
      <div className="w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="space-y-2">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <button
                key={user.userId}
                onClick={() => handleSelect(user.userId)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </button>
            ))
          ) : searchQuery.trim().length > 0 ? (
            <p className="text-center py-8 text-gray-500 text-sm">No users found</p>
          ) : (
            <p className="text-center py-8 text-gray-500 text-sm">
              Start typing to search for users
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Role section component for organizing officials by role
 */
const RoleSection: React.FC<{
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onAdd?: () => void;
  addButtonLabel?: string;
  showAddButton?: boolean;
}> = ({
  title,
  description,
  icon,
  children,
  onAdd,
  addButtonLabel = 'Add',
  showAddButton = false,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 mt-1">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-3">{children}</div>

      {showAddButton && onAdd && (
        <button
          onClick={onAdd}
          className="mt-4 w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          + {addButtonLabel}
        </button>
      )}
    </div>
  );
};

/**
 * Primary recorder selector component
 */
const PrimaryRecorderSelector: React.FC<{
  primaryRecorderId: string;
  onChangeRecorder: () => void;
}> = ({ primaryRecorderId, onChangeRecorder }) => {
  const profile = profileService.getUserById(primaryRecorderId);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-purple-50 rounded-lg border border-purple-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
          {profile?.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-sm text-gray-900">{profile?.name}</p>
          <p className="text-xs text-gray-500">@{profile?.username}</p>
        </div>
      </div>
      <button
        onClick={onChangeRecorder}
        className="px-3 py-1 text-sm font-medium text-purple-700 hover:bg-purple-100 rounded transition-colors"
      >
        Change
      </button>
    </div>
  );
};

/**
 * OfficialsStep - Step 6 of the Match Setup Wizard
 * Allows assignment of referees and stat recorders for competitive matches
 */
export const OfficialsStep: React.FC<OfficialsStepProps> = ({
  onNext = () => {},
  onBack = () => {},
  onSkip = () => {},
}) => {
  const {
    session,
    addReferee,
    removeReferee,
    setPrimaryRecorder,
    setOfficials,
  } = useMatchSetupStore();

  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [searchContext, setSearchContext] = useState<'referees' | 'recorder'>('referees');

  const officials = session.officials || {
    referees: [],
    primaryRecorder: session.userId || 'current-user',
    secondaryRecorders: [],
  };

  // Initialize officials if not set
  React.useEffect(() => {
    if (!session.officials) {
      setOfficials({
        referees: [],
        primaryRecorder: session.userId || 'current-user',
        secondaryRecorders: [],
      });
    }
  }, []);

  const handleAddReferee = () => {
    setSearchContext('referees');
    setIsUserSearchOpen(true);
  };

  const handleAddPrimaryRecorder = () => {
    setSearchContext('recorder');
    setIsUserSearchOpen(true);
  };

  const handleSelectUser = (userId: string) => {
    if (searchContext === 'referees') {
      addReferee(userId);
    } else if (searchContext === 'recorder') {
      setPrimaryRecorder(userId);
    }
  };

  const refereeProfiles = profileService.getUsersByIds(officials.referees);
  const primaryRecorderProfile = profileService.getUserById(officials.primaryRecorder);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Officials & Recording</h2>
        <p className="text-gray-600">
          Assign referees and stat recorders for this match
        </p>
      </div>

      {/* Referees Section */}
      <div className="mb-6">
        <RoleSection
          title="Referees"
          description="Assign 1-3 referees for this match"
          icon={<Users className="w-5 h-5" />}
          onAdd={handleAddReferee}
          addButtonLabel="Add Referee"
          showAddButton={officials.referees.length < 3}
        >
          {refereeProfiles.length > 0 ? (
            <div className="space-y-2">
              {refereeProfiles.map((profile) => (
                <AssignedPersonCard
                  key={profile.userId}
                  userId={profile.userId}
                  userName={profile.name}
                  userUsername={profile.username}
                  onRemove={() => removeReferee(profile.userId)}
                />
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500 text-sm">
              No referees assigned yet. Click "Add Referee" to get started.
            </div>
          )}
        </RoleSection>
      </div>

      {/* Stat Recorders Section */}
      <div className="mb-8">
        <RoleSection
          title="Stat Recorder"
          description="Primary stat recorder for official match records"
          icon={<User className="w-5 h-5" />}
        >
          {primaryRecorderProfile ? (
            <PrimaryRecorderSelector
              primaryRecorderId={officials.primaryRecorder}
              onChangeRecorder={handleAddPrimaryRecorder}
            />
          ) : (
            <div className="py-4 text-center text-gray-500 text-sm">
              No primary recorder assigned
            </div>
          )}
        </RoleSection>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>

        <button
          onClick={onSkip}
          className="px-4 py-2 text-gray-600 text-sm hover:text-gray-900 font-medium underline"
        >
          Skip
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* User Search Modal */}
      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={() => setIsUserSearchOpen(false)}
        onSelect={handleSelectUser}
        excludeUserIds={[...officials.referees, officials.primaryRecorder]}
        title={searchContext === 'referees' ? 'Add Referee' : 'Change Stat Recorder'}
      />
    </div>
  );
};
