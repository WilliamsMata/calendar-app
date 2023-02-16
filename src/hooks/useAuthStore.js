import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  getLoginMessageEN,
  getLoginMessageES,
  isUserDeviceInSpanish,
} from "../helpers";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
} from "../store";

const loginMessage = isUserDeviceInSpanish
  ? getLoginMessageES()
  : getLoginMessageEN();

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isChecking = status === "checking";

  //* LOGIN
  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(loginMessage.error.errorText));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  //* SIGNUP
  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      const { data } = error.response;

      dispatch(
        onLogout(
          data?.msg ||
            data?.errors?.name?.msg ||
            data?.errors?.email?.msg ||
            data?.errors?.password?.msg ||
            "Error al crear una nueva cuenta"
        )
      );

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    //* Properties
    status,
    isChecking,
    user,
    errorMessage,

    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
