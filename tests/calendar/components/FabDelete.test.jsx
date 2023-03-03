import { render, screen } from "@testing-library/react";

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useUiStore } from "../../../src/hooks/useUiStore";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useUiStore");
jest.mock("../../../src/hooks/useCalendarStore");

describe("Test in <FabDelete />", () => {
  test("Should display the component correctly", () => {
    useUiStore.mockReturnValue({ isDateModalOpen: false });
    useCalendarStore.mockReturnValue({ hasEventSelected: false });

    const { container } = render(<FabDelete />);
    const btn = screen.getByRole("button");

    expect(container).toMatchSnapshot();
    expect(btn.classList).toContain("hidden");
  });

  test("should show the button if there is a event selected", () => {
    useUiStore.mockReturnValue({ isDateModalOpen: false });
    useCalendarStore.mockReturnValue({ hasEventSelected: true });

    render(<FabDelete />);
    const btn = screen.getByRole("button");

    expect(btn.classList).not.toContain("hidden");
  });
});
