import { Suspense, lazy, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AuthLayout } from "../auth";
import { CheckingAuthSpinner } from "../components";
import { useAuthStore } from "../hooks";

const LoginPage = lazy(() =>
  import("../auth/pages/LoginPage").then((module) => {
    return { default: module.LoginPage };
  })
);

const SignUpPage = lazy(() =>
  import("../auth/pages/SignUpPage").then((module) => {
    return { default: module.SignUpPage };
  })
);

const CalendarPage = lazy(() =>
  import("../calendar/pages/CalendarPage").then((module) => {
    return { default: module.CalendarPage };
  })
);

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <CheckingAuthSpinner />;
  }

  return (
    <Suspense fallback={<CheckingAuthSpinner />}>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/auth/" element={<AuthLayout />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignUpPage />} />
            </Route>
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
};
