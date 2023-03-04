import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { SignUpPage } from "../../../src/auth/pages/SignUpPage";
import { useAuthStore } from "../../../src/hooks";

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

const mockStartRegister = jest.fn();
jest.mock("../../../src/hooks/useAuthStore");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

describe("Test in <SignUpPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should show the component correctly", () => {
    useAuthStore.mockReturnValue({
      startRegister: mockStartRegister,
      errorMessage: undefined,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Create a new account")).toBeTruthy();
  });

  test("startRegister should be called when submitting the form", () => {
    useAuthStore.mockReturnValue({
      startRegister: mockStartRegister,
      errorMessage: undefined,
    });

    const name = "Williams";
    const email = "williams.rm99@gmail.com";
    const password = "newPassword";
    const password2 = "newPassword";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    const nameField = screen.getByRole("textbox", { name: "Your name" });
    fireEvent.change(nameField, {
      target: { name: "registerName", value: name },
    });

    const emailField = screen.getByRole("textbox", { name: "Your email" });
    fireEvent.change(emailField, {
      target: { name: "registerEmail", value: email },
    });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, {
      target: { name: "registerPassword", value: password },
    });

    const passwordField2 = screen.getByLabelText("Confirm password");
    fireEvent.change(passwordField2, {
      target: { name: "registerPassword2", value: password2 },
    });

    const signUpBtn = screen.getByRole("button");
    fireEvent.click(signUpBtn);

    expect(mockStartRegister).toHaveBeenCalledWith({ name, email, password });
  });
});
