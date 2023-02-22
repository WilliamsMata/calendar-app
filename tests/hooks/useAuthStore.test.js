import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../__fixtures__/authState";
import { testUserCredentials } from "../__fixtures__/testUser";

describe("Test in useAuthStore.js", () => {
  const getMockStore = (initialState) => {
    return configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
      preloadedState: {
        auth: { ...initialState },
      },
    });
  };

  test("should return default values", () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toStrictEqual({
      status: "checking",
      isChecking: true,
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin should perform the login correctly", async () => {
    localStorage.clear();

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user, isChecking } = result.current;
    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid,
      },
      isChecking: false,
    });

    expect(localStorage.getItem("token")).toStrictEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toStrictEqual(
      expect.any(String)
    );
  });

  test("startLogin should fail the authentication", async () => {
    localStorage.clear();

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "algo@google.com",
        password: "incorrect-password",
      });
    });

    const { errorMessage, status, user, isChecking } = result.current;
    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: "Incorrect credentials",
      status: "not-authenticated",
      user: {},
      isChecking: false,
    });
    expect(localStorage.getItem("token")).toBe(null);

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });
});
