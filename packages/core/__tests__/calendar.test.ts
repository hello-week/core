import { Calendar, HighlightedDates } from "../index";

describe("Calendar", () => {
  let calendar: Calendar<unknown>;
  const defaultDate = new Date(2023, 0, 1); // January 1, 2023

  beforeEach(() => {
    calendar = new Calendar({ defaultDate });
  });

  it("should set default options on initialization", () => {
    expect(calendar.getToday()).toBe(
      new Date().toLocaleDateString("en-UK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
    expect(calendar.getMonth()).toBe("January");
    expect(calendar.getYear()).toBe("2023");
  });

  it("should update calendar options with setOptions", () => {
    calendar.setOptions({
      lang: "fr-FR",
      weekStart: 1,
      highlightedToday: false,
    });
    expect(calendar.getWeekDays()).toEqual([
      "lun.",
      "mar.",
      "mer.",
      "jeu.",
      "ven.",
      "sam.",
      "dim.",
    ]);
  });

  it("should navigate to previous and next months", () => {
    calendar.setMonth(5); // June
    calendar.prevMonth();
    expect(calendar.getMonth()).toBe("May");

    calendar.nextMonth();
    expect(calendar.getMonth()).toBe("June");
  });

  it("should navigate to previous and next years", () => {
    calendar.setYear(2022);
    calendar.nextYear();
    expect(calendar.getYear()).toBe("2023");

    calendar.prevYear();
    expect(calendar.getYear()).toBe("2022");
  });

  it("should get week days in specified language and format", () => {
    calendar.setOptions({ lang: "es-ES" });
    expect(calendar.getWeekDays()).toEqual([
      "dom",
      "lun",
      "mar",
      "mié",
      "jue",
      "vie",
      "sáb",
    ]);
  });

  it("should correctly set and retrieve highlighted dates", () => {
    const highlightDates: HighlightedDates<unknown>[] = [
      { days: [new Date(2023, 5, 1), [new Date(2023, 5, 3), new Date(2023, 5, 5)]] },
    ];

    calendar.setOptions({ highlightedDates: highlightDates });
    expect(calendar.getDaysHighlight()).toEqual(highlightDates);
  });

  it("should retrieve today’s date in specified format", () => {
    const today = new Date();
    const todayFormatted = today.toLocaleDateString("en-UK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    expect(calendar.getToday()).toBe(todayFormatted);
  });

  it("should retrieve days of the current month", () => {
    const days = calendar.getDays();
    expect(Array.isArray(days)).toBe(true);
    expect(days.length).toBeGreaterThan(0); // Assuming the month has days populated
    expect(days[0]).toHaveProperty("date"); // Each day should contain a date object
  });

  it("should set specific date and update the month", () => {
    const specificDate = new Date(2023, 10, 5); // November 5, 2023
    calendar.setDate(specificDate);
    expect(calendar.getMonth()).toBe("November");
    expect(calendar.getYear()).toBe("2023");
  });
});
