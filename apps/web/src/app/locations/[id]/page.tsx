'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { locationService } from '@/lib/locationService';
import { eventService } from '@/lib/eventService';
import { bookingService } from '@/lib/bookingService';
import { chatService } from '@/lib/chatService';
import { useAuth } from '@/hooks/useAuth';
import { useLocationStore } from '@/store/locationStore';
import { Location, LocationType, SportType, Amenity } from '@/lib/location-types';

interface LocationDetailPageProps {
  params: Promise<{ id: string }>;
}

type TabType = 'overview' | 'active' | 'events' | 'bookings' | 'chat';

/**
 * LocationDetail Page - Shows detailed information about a location with multiple tabs
 */
export default function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { id: locationId } = React.use(params);
  const { user } = useAuth();
  const store = useLocationStore();

  const [location, setLocation] = useState<Location | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // Initialize and load location
  useEffect(() => {
    locationService.initializeMockData();
    loadLocation();
  }, [locationId]);

  const loadLocation = () => {
    setIsLoading(true);
    try {
      const loc = locationService.getLocationById(locationId);
      if (loc) {
        setLocation(loc);
      }
    } catch (error) {
      console.error('Failed to load location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async (status: 'here_to_play' | 'just_watching') => {
    if (!user) return;

    setIsCheckingIn(true);
    try {
      locationService.checkIn(user.id, locationId, status);
      store.addCheckIn(user.id, locationId, status, new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString());
      loadLocation(); // Reload to show updated active players
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    if (!user) return;

    try {
      locationService.checkOut(user.id, locationId);
      store.removeCheckIn(user.id);
      loadLocation(); // Reload to update active players
    } catch (error) {
      console.error('Check-out failed:', error);
    }
  };

  if (isLoading || !location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading location...</p>
      </div>
    );
  }

  // Check if user is checked in
  const userCheckIn = user ? store.getCheckInStatus(user.id) : null;
  const isUserCheckedIn = userCheckIn?.locationId === locationId;
  const isBusinessOwner = !!(user && location.ownerId === user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/locations" className="text-gray-600 hover:text-gray-900">
                ← Back
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{location.name}</h1>
                <p className="text-xs text-gray-500">📍 {location.address}</p>
              </div>
            </div>
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Athlee
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden">
        <img
          src={location.images[0] || 'https://via.placeholder.com/1200x400?text=Location+Hero'}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay with title */}
        <div className="absolute inset-0 bg-black/30 flex items-end">
          <div className="w-full p-6">
            <div className="flex items-center gap-3 mb-2">
              {location.verified && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ✓ Verified
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                location.type === LocationType.Business
                  ? 'bg-blue-500'
                  : location.type === LocationType.Community
                    ? 'bg-green-500'
                    : 'bg-purple-500'
              }`}>
                {location.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Info Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold">SPORTS</p>
              <div className="flex gap-1 mt-1">
                {location.sports.map((sport) => (
                  <span key={sport} className="text-lg" title={sport}>
                    {getSportIcon(sport)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">CAPACITY</p>
              <p className="text-lg font-bold text-gray-900">{location.capacity || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">ACTIVE NOW</p>
              <p className="text-lg font-bold text-blue-600">{location.activePlayers?.length || 0}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">HOURS</p>
              <p className="text-sm font-medium text-gray-900">{location.hours}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">STATUS</p>
              <p className="text-sm font-bold text-green-600">🟢 Open</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-36 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'active', 'events', 'bookings', 'chat'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={`px-2 py-4 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && '📋 Overview'}
                {tab === 'active' && '👥 Active'}
                {tab === 'events' && '🎯 Events'}
                {tab === 'bookings' && '📅 Bookings'}
                {tab === 'chat' && '💬 Chat'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tab Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <OverviewTabContent location={location} />
            )}
            {activeTab === 'active' && (
              <ActiveTabContent
                location={location}
                user={user}
                isUserCheckedIn={isUserCheckedIn}
                isCheckingIn={isCheckingIn}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
            )}
            {activeTab === 'events' && (
              <EventsTabContent location={location} user={user} />
            )}
            {activeTab === 'bookings' && (
              <BookingsTabContent location={location} isBusinessOwner={isBusinessOwner} />
            )}
            {activeTab === 'chat' && (
              <ChatTabContent location={location} user={user} />
            )}
          </div>

          {/* Right Column - Sticky CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-60">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>

              {/* Check-in Button */}
              {user && location.type !== LocationType.Private && (
                <div className="mb-4 space-y-2">
                  {!isUserCheckedIn ? (
                    <>
                      <button
                        onClick={() => handleCheckIn('here_to_play')}
                        disabled={isCheckingIn}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        🏀 Here to Play
                      </button>
                      <button
                        onClick={() => handleCheckIn('just_watching')}
                        disabled={isCheckingIn}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        👀 Just Watching
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleCheckOut}
                      disabled={isCheckingIn}
                      className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      ✓ Check Out
                    </button>
                  )}
                </div>
              )}

              {/* Location Details */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1">ADDRESS</p>
                  <p className="text-sm text-gray-900">{location.address}</p>
                </div>

                {location.amenities.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-2">AMENITIES</p>
                    <div className="flex flex-wrap gap-2">
                      {location.amenities.map((amenity) => (
                        <span key={amenity} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {getAmenityIcon(amenity)} {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500 font-bold mb-2">SHARE</p>
                  <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-200 transition-colors">
                    📤 Share Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components

function OverviewTabContent({ location }: { location: Location }) {
  return (
    <div className="space-y-8">
      {/* Description */}
      {location.description && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{location.description}</p>
        </div>
      )}

      {/* Amenities */}
      {location.amenities.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {location.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl">{getAmenityIcon(amenity)}</span>
                <span className="text-sm text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hours */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Hours</h2>
        <p className="text-lg font-medium text-gray-900">{location.hours}</p>
      </div>
    </div>
  );
}

function ActiveTabContent({
  location,
  user,
  isUserCheckedIn,
  isCheckingIn,
  onCheckIn,
  onCheckOut
}: {
  location: Location;
  user: any;
  isUserCheckedIn: boolean;
  isCheckingIn: boolean;
  onCheckIn: (status: 'here_to_play' | 'just_watching') => void;
  onCheckOut: () => void;
}) {
  const activePlayers = location.activePlayers || [];

  return (
    <div className="space-y-6">
      {/* Check-in Status */}
      {user && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Status</h2>
          {!isUserCheckedIn ? (
            <div className="space-y-2">
              <p className="text-gray-600 mb-4">Let others know you're here!</p>
              <button
                onClick={() => onCheckIn('here_to_play')}
                disabled={isCheckingIn}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 mb-2"
              >
                🏀 Check In - Here to Play
              </button>
              <button
                onClick={() => onCheckIn('just_watching')}
                disabled={isCheckingIn}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                👀 Check In - Just Watching
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium mb-3">✓ You are checked in (expires in 2 hours)</p>
              <button
                onClick={onCheckOut}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                ✓ Check Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Players List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          👥 Active Now ({activePlayers.length})
        </h2>
        {activePlayers.length > 0 ? (
          <div className="space-y-3">
            {activePlayers.map((playerId) => (
              <div key={playerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-white text-sm font-bold flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Player {playerId}</p>
                    <p className="text-xs text-gray-500">🟢 Active</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Want to play?
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">No one here right now</p>
        )}
      </div>
    </div>
  );
}

function EventsTabContent({ location, user }: { location: Location; user: any }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const locationEvents = eventService.getUpcomingEvents(location.id);
    setEvents(locationEvents);
  }, [location.id]);

  return (
    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.type}</p>
              </div>
              <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-200">
              <div>
                <p className="text-xs text-gray-500 font-bold">DATE & TIME</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(event.date).toLocaleDateString()} @ {event.time}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">SPOTS AVAILABLE</p>
                <p className="text-sm font-medium text-gray-900">
                  {event.maxParticipants - event.registeredUsers.length} / {event.maxParticipants}
                </p>
              </div>
            </div>

            {event.description && (
              <p className="text-sm text-gray-700 mb-4">{event.description}</p>
            )}

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Register Now
            </button>
          </div>
        ))
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500">No upcoming events</p>
        </div>
      )}
    </div>
  );
}

function BookingsTabContent({ location, isBusinessOwner }: { location: Location; isBusinessOwner: boolean }) {
  const [bookings, setBookings] = useState<any[]>([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const locationBookings = bookingService.getBookingsByDate(location.id, today);
    setBookings(locationBookings.filter((b) => b.status !== 'cancelled'));
  }, [location.id]);

  return (
    <div className="space-y-4">
      {isBusinessOwner ? (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Bookings</h2>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{booking.startTime} - {booking.endTime}</p>
                    <p className="text-sm text-gray-600">Booked by: Player {booking.userId}</p>
                  </div>
                  <span className="text-green-600 font-bold">✓ {booking.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bookings today</p>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-lg font-bold text-gray-900 mb-2">Book a Court</p>
          <p className="text-gray-600 mb-6">Select a time slot to reserve this court</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>
      )}
    </div>
  );
}

function ChatTabContent({ location, user }: { location: Location; user: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoom, setChatRoom] = useState<any>(null);

  useEffect(() => {
    if (location.type === LocationType.Community) {
      const room = chatService.getOrCreateChatRoom(location.id, location.name);
      setChatRoom(room);
      setMessages(chatService.getMessages(room.id));
    }
  }, [location]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !chatRoom) return;

    chatService.sendMessage(chatRoom.id, user.id, newMessage);
    setMessages(chatService.getMessages(chatRoom.id));
    setNewMessage('');
  };

  if (location.type !== LocationType.Community) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-lg text-gray-600">💬 Chat is only available for community courts</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-96">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-900">Player {msg.userId}</p>
                <p className="text-sm text-gray-700 mt-1">{msg.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        )}
      </div>

      {/* Message Input */}
      {user && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Utility Functions

function getSportIcon(sport: SportType): string {
  const icons: Record<SportType, string> = {
    [SportType.Basketball]: '🏀',
    [SportType.Soccer]: '⚽',
    [SportType.Tennis]: '🎾',
    [SportType.Badminton]: '🏸',
    [SportType.Baseball]: '⚾',
    [SportType.Volleyball]: '🏐',
    [SportType.Pickleball]: '🏓',
    [SportType.American_Football]: '🏈'
  };
  return icons[sport] || '⭕';
}

function getAmenityIcon(amenity: Amenity): string {
  const icons: Record<Amenity, string> = {
    [Amenity.Parking]: '🅿️',
    [Amenity.Showers]: '🚿',
    [Amenity.ChangingRooms]: '👕',
    [Amenity.Restrooms]: '🚽',
    [Amenity.Seating]: '🪑',
    [Amenity.Lighting]: '💡',
    [Amenity.Snacks]: '🍔',
    [Amenity.WiFi]: '📶',
    [Amenity.Scoreboard]: '📊'
  };
  return icons[amenity] || '✓';
}

function getEventTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    'Tournament': '🏆',
    'League': '🎯',
    'Open Play': '🏃'
  };
  return icons[type] || '🎯';
}
