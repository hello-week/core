import { useDateTime } from "../../index";
// Utilities
import { dateFormatter, isDateAfter, isDateBefore, isSameDate } from "@hello-week/utilities";
import { renderHook } from "@testing-library/react";

// Mock the utility functions
jest.mock("@hello-week/utilities", () => ({
  dateFormatter: jest.fn(),
  isDateAfter: jest.fn(),
  isDateBefore: jest.fn(),
  isSameDate: jest.fn(),
}));

describe("useDateTime hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should format the current date using the provided locale", () => {
    const locale = "en-US";
    const { result } = renderHook(() => useDateTime({ locale }));

    // Mock implementation of dateFormatter
    (dateFormatter as jest.Mock).mockImplementation(
      ({ date, locale }) => `${date.toISOString()} - ${locale}`,
    );

    const formattedDate = result.current.formatDate(new Date("2024-10-09"));

    expect(formattedDate).toBe("2024-10-09T00:00:00.000Z - en-US");
    expect(dateFormatter).toHaveBeenCalledWith({
      date: new Date("2024-10-09"),
      locale: "en-US",
      options: undefined,
    });
  });

  it("should create a date object and allow manipulation", () => {
    const { result } = renderHook(() => useDateTime({ locale: "en-US" }));

    const dateObj = result.current.createDate("2024-10-09");

    expect(dateObj.currentDate().toISOString()).toBe(new Date("2024-10-09").toISOString());

    // Add days
    const newDateObj = dateObj.add(5, "days");
    expect(newDateObj.currentDate().getDate()).toBe(14);

    // Subtract days
    const subtractedDateObj = newDateObj.subtract(2, "days");
    expect(subtractedDateObj.currentDate().getDate()).toBe(12);
  });

  it("should compare dates correctly using comparison methods", () => {
    const { result } = renderHook(() => useDateTime({ locale: "en-US" }));

    const dateObj = result.current.createDate("2024-10-09");

    (isSameDate as jest.Mock).mockReturnValue(true);
    (isDateBefore as jest.Mock).mockReturnValue(false);
    (isDateAfter as jest.Mock).mockReturnValue(true);

    expect(dateObj.isSameDay(new Date("2024-10-09"))).toBe(true);
    expect(dateObj.isBefore(new Date("2024-10-08"))).toBe(false);
    expect(dateObj.isAfter(new Date("2024-10-08"))).toBe(true);

    expect(isSameDate).toHaveBeenCalledWith(new Date("2024-10-09"), new Date("2024-10-09"));
    expect(isDateBefore).toHaveBeenCalledWith(new Date("2024-10-09"), new Date("2024-10-08"));
    expect(isDateAfter).toHaveBeenCalledWith(new Date("2024-10-09"), new Date("2024-10-08"));
  });

  it("should negate comparison methods correctly", () => {
    const { result } = renderHook(() => useDateTime({ locale: "en-US" }));

    const dateObj = result.current.createDate("2024-10-09");

    (isSameDate as jest.Mock).mockReturnValue(false);
    (isDateBefore as jest.Mock).mockReturnValue(true);
    (isDateAfter as jest.Mock).mockReturnValue(false);

    expect(dateObj.not.isSameDay(new Date("2024-10-09"))).toBe(true);
    expect(dateObj.not.isBefore(new Date("2024-10-08"))).toBe(false);
    expect(dateObj.not.isAfter(new Date("2024-10-08"))).toBe(true);
  });

  it("should format the date as ISO string", () => {
    const { result } = renderHook(() => useDateTime({ locale: "en-US" }));

    const dateObj = result.current.createDate("2024-10-09");
    expect(dateObj.formatAsISO()).toBe("2024-10-09");
  });
});
