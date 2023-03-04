import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));

describe("Test in <AppRouter />", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Simula window.matchMedia en el entorno de prueba
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
    }));
  });

  afterEach(() => {
    // Restaura window.matchMedia a su implementación original después de cada prueba
    window.matchMedia.mockRestore();
  });

  test("should show loading screen and call checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(<AppRouter />);

    expect(container).toMatchSnapshot();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("should show login if status is not-authenticated", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/auth2/something"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Log in")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("should show the calendar if status is authenticated", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    screen.debug();

    expect(screen.getByText("Calendar Page")).toBeTruthy();
  });
});
