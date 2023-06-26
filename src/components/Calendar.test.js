import React from "react";
import { render, screen } from "@testing-library/react";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  test("renders calendar header with correct month and year", () => {
    render(<Calendar date={"01/07/2023"} />);

    const headerElement = screen.getByText("July 2023");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders days of the week correctly", () => {
    render(<Calendar date={"03/10/2023"} />);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach(day => {
      const dayElement = screen.getByText(day);
      expect(dayElement).toBeInTheDocument();
    });
  });

  test("highlights the specified date", () => {
    render(<Calendar date={"15/07/2023"} />);
    const highlightedDateElement = screen.getByText("15");
    expect(highlightedDateElement).toHaveClass("highlighted");
  });

  test("does not highlight other dates", () => {
    render(<Calendar date={"15/07/2023"} />);

    const otherDateElements = screen.queryAllByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "div" &&
        element.classList.contains("calendar-day") &&
        !element.classList.contains("highlighted")
      );
    });
    expect(otherDateElements).toHaveLength(38);
  });

  test("renders empty placeholders for days before the starting day", () => {
    render(<Calendar date={"01/07/2023"} />);
    const emptyPlaceholders = screen.queryAllByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "div" &&
        element.classList.contains("calendar-day") &&
        element.classList.contains("empty")
      );
    });
    expect(emptyPlaceholders).toHaveLength(2);
  });
});
