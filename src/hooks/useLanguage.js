import { useEffect, useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(window.navigator.language);
  }, []);

  return language;
};
