import { Outlet } from "react-router-dom";
import { useDarkMode } from "../../hooks";

export const AuthLayout = ({ children }) => {
  const { darkMode, switchMode } = useDarkMode();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-[25rem] space-y-4 rounded-lg bg-base-100 p-6 drop-shadow-md sm:p-8 md:space-y-6">
        <Outlet />
      </div>

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
