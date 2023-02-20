import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../__fixtures__/authState";
import { testUserCredentials } from "../../__fixtures__/testUser";

describe("Test in authSlice", () => {
  test("should return default state", () => {
    expect(authSlice.getInitialState()).toStrictEqual(initialState);
  });

  test("should perform a login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toStrictEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("should perform a logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toStrictEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("should perform a logout with an error message", () => {
    const errorMessage = "Incorrect credentials";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toStrictEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("should clear message error", () => {
    const errorMessage = "Incorrect credentials";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });

  test("should change the state to checking", () => {
    const state = authSlice.reducer(authenticatedState, onChecking());

    expect(state).toStrictEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
    });
  });
});
