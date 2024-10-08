# Hello Week - Core

## Overview

This is a lightweight and customizable calendar utility library designed to manage dates, weeks, and calendar options for a variety of applications.

It includes functions to handle selected, highlighted, and disabled dates, with configuration options for locales, date formats, and week start preferences.

## Installation

```bash
npm install @hello-week/core
```

## Usage

```ts
import { Calendar } from "@hello-week/core";

const calendar = new Calendar({
  lang: "en-US",
  highlightedToday: true,
  selectedDates: [new Date()],
  disabledPastDates: true,
});

calendar.setMonth(3); // Set the calendar to April
console.log(calendar.getDays()); // Get the days of April
console.log(calendar.getWeekDays()); // Get the weekdays starting from Monday
```

## Types

### `DateOrArrayDates`

Represents either a single date or a range of dates:

```ts
export type DateOrArrayDates = (Date | [Date, Date])[];
```

### `HighlightedDates<T>`

Defines highlighted dates and additional metadata:

```ts
export interface HighlightedDates<T> {
  days: DateOrArrayDates;
  data?: T;
}
```

### `CalendarOptions<T>`

Options for customizing the calendar:

```ts
export interface CalendarOptions<T> {
  defaultDate?: Date;
  lang?: Intl.LocalesArgument;
  formatDate?: Intl.DateTimeFormatOptions;
  weekStart?: WeekdaysValues;
  selectedDates?: DateOrArrayDates;
  highlightedDates?: HighlightedDates<T>[];
  disabledDates?: DateOrArrayDates;
  disabledPastDates?: boolean;
  disabledDaysOfWeek?: WeekdaysValues[];
  minDate?: Date;
  maxDate?: Date;
  locked?: boolean;
  highlightedToday?: boolean;
}
```

### `DayOptions<T>`

Represents a single day's details:

```ts
export interface DayOptions<T> {
  date: Date;
  dateFormatted: string;
  dateObject: {
    day: string;
    month: string;
    year: string;
    weekday: string;
  };
  attributes: {
    weekend: boolean;
    today: boolean;
    selected: boolean;
    highlighted: boolean;
    startRange: boolean;
    inRange: boolean;
    endRange: boolean;
    locked: boolean;
    disabled: boolean;
    siblingMonthDays: boolean;
  };
  details?: T;
}
```

## Methods

| Name                                                                   | Description                                               |
| ---------------------------------------------------------------------- | --------------------------------------------------------- |
| `setOptions(prev: CalendarOptions<T>) => CalendarOptions<T>)`          | Modify or update calendar options. |
| `setMonth(month: number)`                                              | Set the current month (0 = January, 11 = December).       |
| `setYear(year: number)`                                                | Set the current year.                                     |
| `prevMonth()`                                                          | Navigate to the previous month.                           |
| `nextMonth()`                                                          | Navigate to the next month.                               |
| `prevYear()`                                                           | Navigate to the previous year.                            |
| `nextYear()`                                                           | Navigate to the next year.                                |
| `setDate(date: Date)`                                                  | Set the calendar to a specific date.                      |
| `getWeekDays()`                                                        | Returns the week days in the current locale.              |
| `getDays()`                                                            | Returns the days in the current month as DayOptions<T>[]. |
| `getToday(options?: { format?: Intl.DateTimeFormatOptions })`          | Get today's date formatted as a string.                   |
| `getMonth(options?: { format?: Intl.DateTimeFormatOptions["month"] })` | Get the current month name.                               |
| `getYear(options?: { format?: Intl.DateTimeFormatOptions["year"] })`   | Get the current year.                                     |
| `getDaysHighlight()`                                                   | Retrieve the highlighted dates.                           |
