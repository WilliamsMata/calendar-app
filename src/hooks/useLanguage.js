import { useMemo } from "react";

export const useLanguage = () => {
  const language = window.navigator.language || "es";

  const isSpanish = useMemo(() => {
    return language.substring(0, 2) === "es";
  }, [language]);

  return {
    language,
    isSpanish,
  };
};
