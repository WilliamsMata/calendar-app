import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage, SignUpPage, AuthLayout } from "../auth";
import { CalendarPage } from "../calendar";

const authStatus = "not-authenticated";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {authStatus === "not-authenticated" ? (
        <>
          <Route path="/auth/" element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
          </Route>
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />}></Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </>
  )
);
