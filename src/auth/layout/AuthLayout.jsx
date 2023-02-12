import { Outlet } from "react-router-dom";
import { useDarkMode, useLanguage } from "../../hooks";

export const AuthLayout = () => {
  const { darkMode, switchMode } = useDarkMode();
  const { isSpanish } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="flex items-center justify-center gap-2">
        <img src="../calendar.svg" alt="calendar image" className="h-8 w-8" />
        <h1>Calendar.io</h1>
      </div>

      <div className="w-full max-w-[25rem] space-y-4 rounded-lg bg-base-100 p-6 drop-shadow-md sm:p-8 md:space-y-6">
        <Outlet />
      </div>

      <a
        href="https://github.com/WilliamsMata/calendar-app"
        target="_blank"
        className="link-primary link"
      >
        {isSpanish ? "Código fuente" : "Source Code"}
      </a>

      <button
        className="btn-circle btn fixed right-4 top-4"
        onClick={switchMode}
      >
        {darkMode ? (
          <img src="../sun.svg" alt="light mode" className="h-6 w-6" />
        ) : (
          <img src="../moon.svg" alt="dark mode" className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};
