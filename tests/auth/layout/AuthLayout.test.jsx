import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { notAuthenticatedState } from "../../../../08-journal-app/test/fixtures/authFixtures";
import { AuthLayout } from "../../../src/auth/layout/AuthLayout";
import { useDarkMode } from "../../../src/hooks/useDarkMode";
import { authSlice } from "../../../src/store";

jest.mock("../../../src/hooks/useDarkMode");

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Test in <AuthLayout />", () => {
  test("should show the page correctly", () => {
    useDarkMode.mockReturnValue({
      darkMode: true,
      switchMode: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthLayout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.findByText("Calendar.io")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
