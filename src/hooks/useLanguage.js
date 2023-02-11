import { useEffect, useMemo, useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(window.navigator.language);
  }, []);

  const isSpanish = useMemo(() => {
    return language.substring(0, 2) === "es";
  }, [language]);

  return {
    language,
    isSpanish,
  };
};
