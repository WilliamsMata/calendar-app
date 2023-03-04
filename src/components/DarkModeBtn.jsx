import { useDarkMode } from "../hooks";
import sunSvg from "../assets/sun.svg";
import moonSvg from "../assets/moon.svg";

export const DarkModeBtn = ({ className = "" }) => {
  const { darkMode, switchMode } = useDarkMode();

  return (
    <button className={`btn-circle btn ${className}`} onClick={switchMode}>
      {darkMode ? (
        <img src={sunSvg} alt="light mode" className="h-6 w-6" />
      ) : (
        <img src={moonSvg} alt="dark mode" className="h-6 w-6" />
      )}
    </button>
  );
};
