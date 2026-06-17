import { Booking } from './location-types';

/**
 * BookingService handles court/venue bookings
 * Data is persisted in localStorage under the "athlee_bookings" key
 */
class BookingService {
  private readonly STORAGE_KEY = 'athlee_bookings';

  /**
   * Get all bookings from storage
   */
  private getAllBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save bookings to storage
   */
  private saveBookings(bookings: Booking[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error('Failed to save bookings:', error);
    }
  }

  /**
   * Get all bookings for a location
   */
  public getBookings(locationId: string): Booking[] {
    return this.getAllBookings().filter((b) => b.locationId === locationId);
  }

  /**
   * Get bookings for a location on a specific date
   */
  public getBookingsByDate(locationId: string, date: string): Booking[] {
    return this.getBookings(locationId).filter((b) => b.date === date);
  }

  /**
   * Get available time slots for a location on a specific date
   * Returns array of available 30-minute slots
   */
  public getAvailableSlots(
    locationId: string,
    date: string,
    slotDuration: number = 30
  ): string[] {
    const bookings = this.getBookingsByDate(locationId, date);
    const slots: string[] = [];

    // Generate all possible 30-minute slots from 8:00 to 22:00
    for (let hour = 8; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        
        // Check if this slot conflicts with existing bookings
        const isAvailable = !bookings.some((b) => {
          const bookingStart = this.timeToMinutes(b.startTime);
          const bookingEnd = this.timeToMinutes(b.endTime);
          const slotStart = this.timeToMinutes(timeStr);
          const slotEnd = slotStart + slotDuration;

          return !(slotEnd <= bookingStart || slotStart >= bookingEnd);
        });

        if (isAvailable) {
          slots.push(timeStr);
        }
      }
    }

    return slots;
  }

  /**
   * Convert time string "HH:MM" to minutes since midnight
   */
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Create a new booking
   */
  public createBooking(bookingData: Partial<Booking>): Booking | null {
    const bookings = this.getAllBookings();

    // Validate no conflicts
    const date = bookingData.date || new Date().toISOString().split('T')[0];
    const startTime = bookingData.startTime || '14:00';
    const endTime = bookingData.endTime || '15:30';
    const locationId = bookingData.locationId || '';

    const conflicts = bookings.filter((b) => {
      if (b.locationId !== locationId || b.date !== date || b.status === 'cancelled') {
        return false;
      }

      const existingStart = this.timeToMinutes(b.startTime);
      const existingEnd = this.timeToMinutes(b.endTime);
      const newStart = this.timeToMinutes(startTime);
      const newEnd = this.timeToMinutes(endTime);

      return !(newEnd <= existingStart || newStart >= existingEnd);
    });

    if (conflicts.length > 0) return null; // Conflict detected

    const newBooking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      locationId: bookingData.locationId || '',
      userId: bookingData.userId || '',
      date,
      startTime,
      endTime,
      status: bookingData.status || 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    this.saveBookings(bookings);

    return newBooking;
  }

  /**
   * Get a single booking by ID
   */
  public getBookingById(bookingId: string): Booking | null {
    return this.getAllBookings().find((b) => b.id === bookingId) || null;
  }

  /**
   * Cancel a booking
   */
  public cancelBooking(bookingId: string): Booking | null {
    const bookings = this.getAllBookings();
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) return null;

    booking.status = 'cancelled';
    this.saveBookings(bookings);

    return booking;
  }

  /**
   * Get all bookings for a user
   */
  public getUserBookings(userId: string): Booking[] {
    return this.getAllBookings().filter(
      (b) => b.userId === userId && b.status !== 'cancelled'
    );
  }

  /**
   * Get upcoming bookings for a user
   */
  public getUpcomingUserBookings(userId: string): Booking[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getUserBookings(userId).filter((b) => b.date >= today);
  }
}

export const bookingService = new BookingService();
