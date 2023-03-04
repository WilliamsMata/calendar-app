import { fireEvent, render, screen } from "@testing-library/react";
import { CloseModalBtn } from "../../../src/calendar/components/CloseModalBtn";
import { useCalendarModal } from "../../../src/hooks/useCalendarModal";

jest.mock("../../../src/hooks/useCalendarModal");

describe("Test in <CloseModalBtn />", () => {
  const mockOnCloseModal = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should show the component correctly", () => {
    useCalendarModal.mockReturnValue({ onCloseModal: mockOnCloseModal });
    const { container } = render(<CloseModalBtn />);

    expect(container).toMatchSnapshot();
  });

  test("should call onCloseModal when clicked", () => {
    useCalendarModal.mockReturnValue({ onCloseModal: mockOnCloseModal });
    render(<CloseModalBtn />);

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(mockOnCloseModal).toHaveBeenCalled();
  });
});
