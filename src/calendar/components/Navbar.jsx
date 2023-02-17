import { isUserDeviceInSpanish } from "../../helpers";
import { useAuthStore, useDarkMode } from "../../hooks";

export const Navbar = () => {
  const { darkMode, switchMode } = useDarkMode();
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar bg-base-100">
      <div className="flex flex-1 items-center pl-2">
        <img
          src="./icons/calendar.svg"
          alt="calendar image"
          className="h-8 w-8"
        />
        <p className="px-2 text-xl normal-case">{user.name}</p>
      </div>

      <div className="flex gap-4">
        <button className="btn-circle btn" onClick={switchMode}>
          {darkMode ? (
            <img src="./icons/sun.svg" alt="light mode" className="h-6 w-6" />
          ) : (
            <img src="./icons/moon.svg" alt="dark mode" className="h-6 w-6" />
          )}
        </button>

        <button
          onClick={startLogout}
          id="logout-btn"
          className="btn-outline btn-error btn gap-2"
        >
          <img
            src="./icons/logout.svg"
            alt="logout btn"
            className="h-6 w-6 transition"
          />
          {isUserDeviceInSpanish ? "Salir" : "Logout"}
        </button>
      </div>
    </div>
  );
};
