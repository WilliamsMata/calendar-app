import { fireEvent, render, screen } from "@testing-library/react";
import { FabAddNew } from "../../../src/calendar/components/FabAddNew";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { useUiStore } from "../../../src/hooks/useUiStore";

jest.mock("../../../src/hooks/useUiStore");
jest.mock("../../../src/hooks/useCalendarStore");

describe("Test in <FabAddNew />", () => {
  const mockOpenDateModal = jest.fn();
  const mockSetActiveEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should show the component correctly", () => {
    useUiStore.mockReturnValue({ openDateModal: mockOpenDateModal });
    useCalendarStore.mockReturnValue({ setActiveEvent: mockSetActiveEvent });

    const { container } = render(<FabAddNew />);

    expect(container).toMatchSnapshot();
  });

  test("should call openDateModal and setActiveEvent when clicked", () => {
    useUiStore.mockReturnValue({ openDateModal: mockOpenDateModal });
    useCalendarStore.mockReturnValue({ setActiveEvent: mockSetActiveEvent });

    render(<FabAddNew />);

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(mockOpenDateModal).toHaveBeenCalled();
    expect(mockSetActiveEvent).toHaveBeenCalledWith({
      title: "",
      notes: "",
      start: expect.any(Date),
      end: expect.any(Date),
      bgColor: "#661ae6",
      user: {
        _id: expect.any(String),
        name: expect.any(String),
      },
    });
  });
});
