import { useEffect, useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(window.navigator.language);
  }, []);

  const isSpanish = language.substring(0, 2) === "es";

  return {
    language: language,
    isSpanish,
  };
};
