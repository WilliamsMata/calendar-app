const language = window.navigator.language || "es";

export const isUserDeviceInSpanish = language.substring(0, 2) === "es";
