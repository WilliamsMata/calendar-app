import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../__fixtures__/authState";
import { testUserCredentials } from "../__fixtures__/testUser";
import { calendarApi } from "../../src/api";

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

describe("Test in useAuthStore.js", () => {
  beforeEach(() => localStorage.clear());

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

  test("startRegister should create an user", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "63f38213db9a72273c698cad",
        name: "Test User",
        token: "SOME-TOKEN",
      },
    });

    await act(async () => {
      await result.current.startRegister({
        email: "testuser@google.com",
        password: "123456789",
        name: "Test User",
      });
    });

    const { errorMessage, status, user, isChecking } = result.current;
    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "63f38213db9a72273c698cad" },
      isChecking: false,
    });

    spy.mockRestore();
  });

  test("startRegister should fail when the user is already exist", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user, isChecking } = result.current;
    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: "The mail is already in use",
      status: "not-authenticated",
      user: {},
      isChecking: false,
    });
  });

  test("checkAuthToken should fail if there is no token in localStorage", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user, isChecking } = result.current;
    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
      isChecking: false,
    });
  });

  test("checkAuthToken should authenticate the user if there is a token in localStorage", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user, isChecking } = result.current;
    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "63f38213db9a72273c698cad" },
      isChecking: false,
    });
  });

  test("checkAuthToken should perform a logout if the token have been expired", async () => {
    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2YzODIxM2RiOWE3MjI3M2M2OThjYWQiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjc2OTkyNzkyLCJleHAiOjE2NzY5OTk5OTJ9.1rUdBi62TY1-WHMC-8QXTmHZIKyELq7hYtaQnhE1MDk";
    localStorage.setItem("token", expiredToken);

    const mockStore = getMockStore({ ...authenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user, isChecking } = result.current;
    console.log({ errorMessage, status, user, isChecking });

    expect({ errorMessage, status, user, isChecking }).toStrictEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
      isChecking: false,
    });
  });
});
