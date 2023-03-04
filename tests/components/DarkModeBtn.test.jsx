import { fireEvent, render, screen } from "@testing-library/react";
import { DarkModeBtn } from "../../src/components/DarkModeBtn";
import { useDarkMode } from "../../src/hooks/useDarkMode";

const mockSwitchMode = jest.fn();
jest.mock("../../src/hooks/useDarkMode");

describe("Test in <DarkModeBtn />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show the component correctly", () => {
    useDarkMode.mockReturnValue({
      darkMode: false,
      switchMode: mockSwitchMode,
    });

    render(<DarkModeBtn />);
    const img = screen.getByRole("img");

    expect(screen.getByRole("button")).toBeTruthy();
    expect(img.alt).toBe("dark mode");
  });

  test("when button clicked should call switchMode", () => {
    useDarkMode.mockReturnValue({
      darkMode: true,
      switchMode: mockSwitchMode,
    });

    render(<DarkModeBtn />);
    const img = screen.getByRole("img");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(img.alt).toBe("light mode");
    expect(mockSwitchMode).toHaveBeenCalled();
  });
});
