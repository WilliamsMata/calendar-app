import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(undefined);
  const htmlElement = document.querySelector("html");
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    if (darkMode === undefined) {
      const storedDarkMode = localStorage.getItem("darkMode");
      if (storedDarkMode === "true") {
        setDarkMode(true);
      } else if (storedDarkMode === "false") {
        setDarkMode(false);
      } else {
        setDarkMode(isDarkMode);
      }
    } else {
      localStorage.setItem("darkMode", darkMode ? "true" : "false");
    }
    htmlElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const switchMode = () => {
    setDarkMode(!darkMode);
  };

  return {
    darkMode,
    switchMode,
  };
};
