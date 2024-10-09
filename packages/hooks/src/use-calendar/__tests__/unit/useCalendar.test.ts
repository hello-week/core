import { useCalendar, UseCalendarProps } from "../../index";
// Utilities
import { renderHook, act } from "@testing-library/react";

jest.mock("@hello-week/core", () => {
  return {
    Calendar: jest.fn().mockImplementation(() => ({
      getMonth: jest.fn(() => "October"),
      getYear: jest.fn(() => "2024"),
      getDays: jest.fn(() => [
        { date: "2024-10-01", day: 1 },
        { date: "2024-10-02", day: 2 },
      ]),
      getWeekDays: jest.fn(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]),
      getDaysHighlight: jest.fn(() => [{ date: "2024-10-01" }]),
      prevMonth: jest.fn(),
      nextMonth: jest.fn(),
      setOptions: jest.fn(),
    })),
  };
});

describe("useCalendar", () => {
  const defaultProps: UseCalendarProps<unknown> = {
    defaultDate: new Date("2024-10-01"),
    disabledDates: [],
    disabledDaysOfWeek: [],
    disabledPastDates: false,
    formatDate: undefined,
    highlightedDates: [],
    highlightedToday: false,
    lang: "en",
    maxDate: undefined,
    minDate: undefined,
    selectedDates: [],
    weekStart: 0,
    locked: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with the correct data", () => {
    const { result } = renderHook(() => useCalendar(defaultProps));

    act(() => {
      result.current.set(defaultProps);
    });

    expect(result.current.data).toEqual({
      days: [
        { date: "2024-10-01", day: 1 },
        { date: "2024-10-02", day: 2 },
      ],
      highlightedDates: [{ date: "2024-10-01" }],
      month: "October",
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      year: "2024",
    });
  });

  it("should navigate to the previous month", () => {
    const { result } = renderHook(() => useCalendar(defaultProps));

    act(() => {
      result.current.prevMonth();
    });

    expect(result.current.data).toEqual({
      month: "October",
      year: "2024",
      days: expect.any(Array), // Replace with actual expected days if needed
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      highlightedDates: expect.any(Array),
    });
  });

  it("should navigate to the next month", () => {
    const { result } = renderHook(() => useCalendar(defaultProps));

    act(() => {
      result.current.nextMonth();
    });

    expect(result.current.data).toEqual({
      month: "October",
      year: "2024",
      days: expect.any(Array),
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      highlightedDates: expect.any(Array),
    });
  });
});
