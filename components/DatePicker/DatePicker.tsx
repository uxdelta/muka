import React, { useState, useCallback, useMemo } from 'react';
import './DatePicker.css';

export interface DatePickerProps {
  /** Currently selected date */
  value?: Date | null;

  /** Called when date selection changes */
  onChange?: (date: Date | null) => void;

  /** Minimum selectable date */
  minDate?: Date;

  /** Maximum selectable date */
  maxDate?: Date;

  /** Disabled state */
  disabled?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Locale for formatting (defaults to nl-NL) */
  locale?: string;

  /** Additional CSS classes */
  className?: string;

  /** Accessible label for the datepicker */
  'aria-label'?: string;
}

const DAYS_IN_WEEK = 7;
const MONTHS_NL = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december'
];
const WEEKDAYS_NL = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return false;
  if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return false;
  return true;
}

/**
 * DatePicker Component
 *
 * Calendar component for selecting a single date.
 *
 * Features:
 * - Month/year navigation
 * - Today indicator
 * - Min/max date constraints
 * - Dutch locale by default (nl-NL)
 *
 * Sizes: sm, md, lg
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value = null,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  size = 'md',
  locale = 'nl-NL',
  className = '',
  'aria-label': ariaLabel = 'Selecteer een datum',
  ...props
}) => {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => value || today);

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  // Get month name based on locale
  const monthName = locale.startsWith('nl')
    ? MONTHS_NL[currentMonth]
    : viewDate.toLocaleDateString(locale, { month: 'long' });

  const weekdays = locale.startsWith('nl')
    ? WEEKDAYS_NL
    : Array.from({ length: 7 }, (_, i) => {
        const d = new Date(2024, 0, i + 1); // Jan 1 2024 is Monday
        return d.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2);
      });

  // Calculate days to display
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Get day of week (0 = Sunday, adjust for Monday start)
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Convert to Monday = 0

    const daysInMonth = lastDayOfMonth.getDate();
    const totalCells = Math.ceil((startDay + daysInMonth) / DAYS_IN_WEEK) * DAYS_IN_WEEK;

    const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isDisabled: boolean }> = [];

    for (let i = 0; i < totalCells; i++) {
      const dayOffset = i - startDay;
      const date = new Date(currentYear, currentMonth, dayOffset + 1);
      const isCurrentMonth = date.getMonth() === currentMonth;
      const isToday = isSameDay(date, today);
      const isSelected = value ? isSameDay(date, value) : false;
      const isDisabled = disabled || !isDateInRange(date, minDate, maxDate);

      days.push({ date, isCurrentMonth, isToday, isSelected, isDisabled });
    }

    return days;
  }, [currentYear, currentMonth, value, today, disabled, minDate, maxDate]);

  const goToPreviousMonth = useCallback(() => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  }, [currentYear, currentMonth]);

  const goToNextMonth = useCallback(() => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  }, [currentYear, currentMonth]);

  const handleDayClick = useCallback(
    (date: Date, isDisabled: boolean) => {
      if (isDisabled) return;
      onChange?.(date);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, date: Date, isDisabled: boolean) => {
      if (isDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange?.(date);
      }
    },
    [onChange]
  );

  const pickerClasses = [
    'muka-datepicker',
    `muka-datepicker--${size}`,
    disabled && 'muka-datepicker--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={pickerClasses}
      role="application"
      aria-label={ariaLabel}
      {...props}
    >
      {/* Header with navigation */}
      <div className="muka-datepicker__header">
        <button
          type="button"
          className="muka-datepicker__nav-button"
          onClick={goToPreviousMonth}
          disabled={disabled}
          aria-label="Vorige maand"
        >
          <ChevronLeft />
        </button>
        <span className="muka-datepicker__title">
          {monthName} {currentYear}
        </span>
        <button
          type="button"
          className="muka-datepicker__nav-button"
          onClick={goToNextMonth}
          disabled={disabled}
          aria-label="Volgende maand"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="muka-datepicker__weekdays" role="row">
        {weekdays.map((day, i) => (
          <div key={i} className="muka-datepicker__weekday" role="columnheader">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="muka-datepicker__grid" role="grid">
        {calendarDays.map(({ date, isCurrentMonth, isToday, isSelected, isDisabled }, i) => (
          <button
            key={i}
            type="button"
            className={[
              'muka-datepicker__day',
              !isCurrentMonth && 'muka-datepicker__day--outside',
              isToday && 'muka-datepicker__day--today',
              isSelected && 'muka-datepicker__day--selected',
              isDisabled && 'muka-datepicker__day--disabled',
            ].filter(Boolean).join(' ')}
            onClick={() => handleDayClick(date, isDisabled)}
            onKeyDown={(e) => handleKeyDown(e, date, isDisabled)}
            disabled={isDisabled}
            tabIndex={isSelected || (i === 0 && !value) ? 0 : -1}
            aria-selected={isSelected}
            aria-current={isToday ? 'date' : undefined}
            aria-label={date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
