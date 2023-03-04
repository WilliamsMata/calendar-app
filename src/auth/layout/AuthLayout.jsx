import { Outlet } from "react-router-dom";
import { DarkModeBtn } from "../../components";
import { isUserDeviceInSpanish } from "../../helpers";
import { useDarkMode } from "../../hooks";

export const AuthLayout = () => {
  const { darkMode, switchMode } = useDarkMode();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="flex items-center justify-center gap-2">
        <img
          src="../icons/calendar.svg"
          alt="calendar image"
          className="h-8 w-8"
        />
        <h1>Calendar.io</h1>
      </div>

      <div className="w-full max-w-[25rem] space-y-4 rounded-lg bg-base-100 p-6 drop-shadow-md ">
        <Outlet />
      </div>

      <a
        href="https://github.com/WilliamsMata/calendar-app"
        target="_blank"
        className="link-primary link"
      >
        {isUserDeviceInSpanish ? "Código fuente" : "Source Code"}
      </a>

      <DarkModeBtn className="fixed right-4 top-4" />
    </div>
  );
};
