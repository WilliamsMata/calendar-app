import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { useAuthStore } from "../../../src/hooks/useAuthStore";
import { authSlice } from "../../../src/store";
import { notAuthenticatedState } from "../../__fixtures__/authState";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

const mockStartLogin = jest.fn();
jest.mock("../../../src/hooks/useAuthStore");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

describe("Test in <LoginPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should show the component correctly", () => {
    useAuthStore.mockReturnValue({
      startLogin: mockStartLogin,
      errorMessage: undefined,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Log in").length).toBeGreaterThanOrEqual(1);
  });

  test("startLogin should be called when submitting the form", () => {
    useAuthStore.mockReturnValue({
      startLogin: mockStartLogin,
      errorMessage: undefined,
    });

    const email = "williams.rm99@gmail.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Your email" });
    fireEvent.change(emailField, {
      target: { name: "loginEmail", value: email },
    });

    const passwordField = screen.getByLabelText("password");
    fireEvent.change(passwordField, {
      target: { name: "loginPassword", value: password },
    });

    const loginBtn = screen.getByLabelText("login-button");
    fireEvent.click(loginBtn);

    expect(mockStartLogin).toHaveBeenCalledWith({ email, password });
  });
});
