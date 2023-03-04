import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/calendar/components/Navbar";
import { useAuthStore } from "../../../src/hooks/useAuthStore";

jest.mock("../../../src/hooks/useAuthStore");

jest.mock("../../../src/components/DarkModeBtn", () => ({
  DarkModeBtn: () => <button>DarkModeBtn</button>,
}));

describe("Test in <Navbar />", () => {
  const mockStartLogout = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should show the component correctly", () => {
    useAuthStore.mockReturnValue({
      startLogout: mockStartLogout,
      user: { name: "Williams" },
    });

    render(<Navbar />);

    expect(screen.getByText("Williams")).toBeTruthy();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  test("should call startLogout when click the button logout", () => {
    useAuthStore.mockReturnValue({
      startLogout: mockStartLogout,
      user: { name: "Williams" },
    });

    render(<Navbar />);

    const logoutBtn = screen.getByLabelText("logout-btn");
    fireEvent.click(logoutBtn);

    expect(mockStartLogout).toHaveBeenCalled();
  });
});
