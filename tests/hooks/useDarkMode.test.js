import { act, renderHook } from "@testing-library/react";
import { useDarkMode } from "../../src/hooks/useDarkMode";

describe("Test in useDarkMode", () => {
  beforeEach(() => {
    // Simulate window.matchMedia in test environment
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === "(prefers-color-scheme: dark)",
      };
    });

    jest.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    // Restores window.matchMedia to its original implementation after each test
    window.matchMedia.mockRestore();
  });

  test("should set the dark mode theme in the html element", () => {
    const { result } = renderHook(() => useDarkMode());

    const htmlElement = document.querySelector("html");

    expect(htmlElement.getAttribute("data-theme")).toBe(
      result.current.darkMode ? "dark" : "light"
    );
  });

  test("should switch between dark and light mode", () => {
    const { result } = renderHook(() => useDarkMode());
    const { switchMode } = result.current;

    expect(result.current.darkMode).toBe(true);

    act(() => {
      switchMode();
    });

    expect(result.current.darkMode).toBe(false);
  });

  test("should use the stored value in localStorage for dark mode", () => {
    localStorage.setItem("darkMode", "true");
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);

    localStorage.setItem("darkMode", "false");
    const { result: result2 } = renderHook(() => useDarkMode());
    expect(result2.current.darkMode).toBe(false);
  });

  test("should update the stored value in localStorage when dark mode is switched", () => {
    localStorage.setItem("darkMode", "false");
    const { result } = renderHook(() => useDarkMode());
    const { switchMode } = result.current;

    expect(result.current.darkMode).toBe(false);

    act(() => switchMode());

    expect(localStorage.getItem("darkMode")).toBe("true");
  });
});
