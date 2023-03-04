import { render, screen } from "@testing-library/react";
import { CalendarEventBox } from "../../../src/calendar/components/CalendarEventBox";

describe("Test in <CalendarEventBox />", () => {
  test("should show the component correctly", () => {
    const event = {
      title: "Event title",
      user: {
        name: "User Name",
      },
    };
    render(<CalendarEventBox event={event} />);

    expect(screen.getByText(event.title)).toBeTruthy();
    expect(screen.getByText(`- ${event.user.name}`)).toBeTruthy();
  });
});
