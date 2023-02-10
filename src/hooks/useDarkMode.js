import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(undefined);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      htmlElement.setAttribute("data-theme", "dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      htmlElement.setAttribute("data-theme", "light");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  const switchMode = () => {
    setDarkMode(!darkMode);
  };

  return {
    darkMode,
    switchMode,
  };
};
