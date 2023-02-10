import { useDarkMode, useLanguage } from "../../hooks";

export const Navbar = () => {
  const { darkMode, switchMode } = useDarkMode();
  const language = useLanguage();

  return (
    <div className="navbar bg-base-100">
      <div className="flex flex-1 items-center pl-2">
        <img src="calendar.svg" alt="calendar image" className="h-8 w-8" />
        <p className="px-2 text-xl normal-case">Williams</p>
      </div>

      <div className="flex gap-4">
        <button className="btn-circle btn" onClick={switchMode}>
          {darkMode ? (
            <img src="sun.svg" alt="light mode" className="h-6 w-6" />
          ) : (
            <img src="moon.svg" alt="dark mode" className="h-6 w-6" />
          )}
        </button>

        <button id="logout-btn" className="btn-outline btn-error btn gap-2">
          <img src="logout.svg" alt="logout btn" className="h-6 w-6" />
          {language === "es" ? "Salir" : "Logout"}
        </button>
      </div>
    </div>
  );
};
