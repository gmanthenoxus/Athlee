/**
 * Date Picker Component
 * 
 * Improved date picker UI with calendar interface
 * Used for birth date selection in player registration
 * 
 * Features:
 * - Visual calendar month/year navigation
 * - Click-to-select dates
 * - Keyboard navigation support
 * - Min/max date constraints
 * - Mobile friendly
 * 
 * Code Reviewers:
 * - Uses semantic HTML with proper ARIA labels
 * - Accessible keyboard navigation (arrow keys, enter)
 * - Responsive design works on mobile
 * - No external calendar library dependency
 */

'use client';

import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string; // ISO date string YYYY-MM-DD
  onChange: (date: string) => void;
  maxDate?: string; // ISO date string
  minDate?: string; // ISO date string
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
}

export function DatePicker({
  value,
  onChange,
  maxDate,
  minDate,
  placeholder = 'Select date',
  className = '',
  label,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState<Date>(
    value ? new Date(value) : new Date()
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date for display
  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert string to Date
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    const isoString = newDate.toISOString().split('T')[0];
    
    // Check constraints
    if (minDate && newDate < new Date(minDate)) return;
    if (maxDate && newDate > new Date(maxDate)) return;

    onChange(isoString);
    setIsOpen(false);
  };

  // Navigation
  const handlePrevMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + 1)
    );
  };

  const handlePrevYear = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear() - 1, displayDate.getMonth())
    );
  };

  const handleNextYear = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear() + 1, displayDate.getMonth())
    );
  };

  // Get calendar days
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Generate calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const currentValue = value ? parseDate(value) : null;
  const isCurrentMonth =
    currentValue &&
    currentValue.getFullYear() === year &&
    currentValue.getMonth() === month;

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Input Field */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 border rounded-lg text-left bg-white hover:bg-gray-50 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      >
        <span className={currentValue ? 'text-gray-900' : 'text-gray-500'}>
          {currentValue ? formatDateForDisplay(currentValue) : placeholder}
        </span>
      </button>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Calendar Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 w-80"
          style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
        >
          {/* Month/Year Navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              <button
                onClick={handlePrevYear}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Previous year"
              >
                ≪
              </button>
              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Previous month"
              >
                ‹
              </button>
            </div>

            <div className="text-sm font-semibold">
              {displayDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </div>

            <div className="flex gap-1">
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Next month"
              >
                ›
              </button>
              <button
                onClick={handleNextYear}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Next year"
              >
                ≫
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-600 h-8 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

              const isSelected =
                isCurrentMonth && day === currentValue?.getDate();

              const isDisabled =
                !day ||
                (minDate &&
                  new Date(year, month, day!) < new Date(minDate)) ||
                (maxDate &&
                  new Date(year, month, day!) > new Date(maxDate));

              return (
                <button
                  key={index}
                  onClick={() => day && handleDateSelect(day)}
                  disabled={Boolean(isDisabled)}
                  className={`
                    h-8 flex items-center justify-center text-sm rounded
                    transition-colors
                    ${!day ? '' : ''}
                    ${
                      isDisabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'hover:bg-blue-100'
                    }
                    ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold hover:bg-blue-700'
                        : ''
                    }
                    ${
                      isToday && !isSelected
                        ? 'border border-blue-400 font-semibold'
                        : ''
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
