import { Event, EventType } from './location-types';

/**
 * EventService handles event management at locations
 * Data is persisted in localStorage under the "athlee_events" key
 */
class EventService {
  private readonly STORAGE_KEY = 'athlee_events';

  /**
   * Get all events from storage
   */
  private getAllEvents(): Event[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save events to storage
   */
  private saveEvents(events: Event[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Failed to save events:', error);
    }
  }

  /**
   * Get all events for a location
   */
  public getEvents(locationId: string): Event[] {
    return this.getAllEvents().filter((event) => event.locationId === locationId);
  }

  /**
   * Get upcoming events for a location (next 30 days)
   */
  public getUpcomingEvents(locationId: string): Event[] {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return this.getEvents(locationId).filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= now && eventDate <= thirtyDaysFromNow;
    });
  }

  /**
   * Get a single event by ID
   */
  public getEventById(eventId: string): Event | null {
    return this.getAllEvents().find((event) => event.id === eventId) || null;
  }

  /**
   * Create a new event
   */
  public createEvent(locationId: string, eventData: Partial<Event>): Event {
    const events = this.getAllEvents();

    const newEvent: Event = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      locationId,
      title: eventData.title || 'New Event',
      type: eventData.type || EventType.OpenPlay,
      date: eventData.date || new Date().toISOString(),
      time: eventData.time || '14:00',
      maxParticipants: eventData.maxParticipants || 16,
      registeredUsers: [],
      price: eventData.price,
      description: eventData.description || '',
      createdAt: new Date().toISOString()
    };

    events.push(newEvent);
    this.saveEvents(events);

    return newEvent;
  }

  /**
   * Register a user for an event
   */
  public registerForEvent(eventId: string, userId: string): Event | null {
    const events = this.getAllEvents();
    const event = events.find((e) => e.id === eventId);

    if (!event) return null;
    if (event.registeredUsers.includes(userId)) return event; // Already registered
    if (event.registeredUsers.length >= event.maxParticipants) return null; // Event full

    event.registeredUsers.push(userId);
    this.saveEvents(events);

    return event;
  }

  /**
   * Unregister a user from an event
   */
  public unregisterFromEvent(eventId: string, userId: string): Event | null {
    const events = this.getAllEvents();
    const event = events.find((e) => e.id === eventId);

    if (!event) return null;

    event.registeredUsers = event.registeredUsers.filter((u) => u !== userId);
    this.saveEvents(events);

    return event;
  }

  /**
   * Get all events a user is registered for
   */
  public getUserEvents(userId: string): Event[] {
    return this.getAllEvents().filter((event) => event.registeredUsers.includes(userId));
  }

  /**
   * Delete an event
   */
  public deleteEvent(eventId: string): boolean {
    const events = this.getAllEvents();
    const filtered = events.filter((e) => e.id !== eventId);

    if (filtered.length === events.length) return false;

    this.saveEvents(filtered);
    return true;
  }
}

export const eventService = new EventService();
