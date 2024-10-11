import { useState, useEffect, useCallback, useRef } from "react";
// Calendar
import {
  Calendar,
  type DayOptions,
  type HighlightedDates,
  type CalendarOptions,
} from "@hello-week/core";

interface UseCalendarData<T> {
  /** The current month being displayed. */
  month: string;
  /** The current year being displayed. */
  year: string;
  /** The array of day objects for the current month. */
  days: DayOptions<T>[];
  /** The array of weekday names for display. */
  weekDays: string[];
  /** An array of highlighted dates. */
  highlightedDates: HighlightedDates<T>[];
}

export interface UseCalendar<T> {
  /**
   * Calendar data including the month, year, days, weekdays, and highlighted dates.
   * Can be `undefined` if the data has not been initialized yet.
   */
  data?: UseCalendarData<T> | undefined;
  /** Navigates to the previous month. */
  prevMonth: () => void;
  /**  Navigates to the next month. */
  nextMonth: () => void;
  /** Navigates to the previous year. */
  prevYear: () => void;
  /**  Navigates to the next year. */
  nextYear: () => void;
  /**
   * Sets the calendar options.
   * @param options - The options to configure the calendar.
   */
  set: (options: CalendarOptions<T>) => void;
}

/**
 * Hook that provides calendar functionality with various configurable options.
 *
 * @template T - The type of the highlighted dates object used in the calendar.
 *
 * @param {Object} props - The properties to configure the calendar.
 * @returns {UseCalendar<T>} - An object containing the state and functions to interact with the calendar.
 *
 * @example
 * ```ts
 * const { prevMonth, nextMonth, data, set } = useCalendar({
 *   defaultDate: new Date(),
 *   disabledDates: [new Date(2024, 0, 1), new Date(2024, 11, 25)], // Disable New Year's and Christmas
 *   weekStart: 1, // Week starts on Monday
 *   locked: false, // Calendar is interactive
 * });
 *
 * // Set option
 * set({ minDate: new Date() });
 * ```
 */
export function useCalendar<T>(options?: CalendarOptions<T>): UseCalendar<T> {
  // A ref to store the `Calendar` instance, which provides the calendar logic and methods.
  const calendarRef = useRef<Calendar<T>>();

  // State to hold the calendar data such as the month, year, days, weekdays, and highlighted dates.
  // Initially undefined until the data is fetched or initialized.
  const [data, setData] = useState<UseCalendarData<T>>();

  // Define a callback function to update the calendar data using useCallback for memoization.
  // This function will be called when you need to refresh the calendar data.
  const updateData = useCallback(() => {
    // Access the current instance of the calendar from the ref.
    const calendar = calendarRef.current;

    // If the calendar reference is not available, exit the function early.
    if (!calendar) {
      return;
    }

    // Update the data state with the current month, year, days, week days, and highlighted dates from the calendar instance.
    setData({
      month: calendar.getMonth({ format: "long" }), // Get the current month formatted as a long string (e.g., "January").
      year: calendar.getYear(), // Get the current year.
      days: calendar.getDays(), // Retrieve the array of days for the current month.
      weekDays: calendar.getWeekDays(), // Get the names of the weekdays.
      highlightedDates: calendar.getDaysHighlight(), // Get the dates that are highlighted for special display.
    });
  }, []);

  useEffect(() => {
    calendarRef.current = new Calendar<T>(options);

    updateData();

    () => setData(undefined);
  }, [options, updateData]);

  // Define a callback function to set options on the calendar instance.
  // The function accepts an object of options and merges it with the previous options.
  const set = useCallback(
    (ops: CalendarOptions<T>) => {
      // Update the calendar options using the setOptions method on the calendar reference.
      calendarRef.current?.setOptions((prev) => ({
        ...prev,
        ...ops,
      }));

      // Call updateData to refresh the calendar data after setting new options.
      updateData();
    },
    [updateData],
  );

  // Define a callback function to navigate to the previous month.
  const prevMonth = useCallback(() => {
    // Call the prevMonth method on the calendar reference to navigate back a month.
    calendarRef.current?.prevMonth();
    // Call updateData to refresh the calendar data after changing the month.
    updateData();
  }, [updateData]);

  // Define a callback function to navigate to the next month.
  const nextMonth = useCallback(() => {
    // Call the nextMonth method on the calendar reference to navigate forward a month.
    calendarRef.current?.nextMonth();
    // Call updateData to refresh the calendar data after changing the month.
    updateData();
  }, [updateData]);

  // Define a callback function to navigate to the previous year.
  const prevYear = useCallback(() => {
    // Call the prevYear method on the calendar reference to navigate back a year.
    calendarRef.current?.prevYear();
    // Call updateData to refresh the calendar data after changing the year.
    updateData();
  }, [updateData]);

  // Define a callback function to navigate to the next year.
  const nextYear = useCallback(() => {
    // Call the nextYear method on the calendar reference to navigate forward a year.
    calendarRef.current?.nextYear();
    // Call updateData to refresh the calendar data after changing the year.
    updateData();
  }, [updateData]);

  return {
    data,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    set,
  };
}
