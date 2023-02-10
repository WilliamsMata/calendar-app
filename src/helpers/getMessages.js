export const getMessageES = () => {
  return {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total) => `+ Ver más (${total})`,
  };
};

export const getMessageEN = () => {
  return {
    previous: "<",
    next: ">",
  };
};

export const getLoginMessageES = () => {
  return {
    title: "Inicia sesión",
    email: "Correo electrónico",
    password: "Contraseña",
    button: "Iniciar sesión",
    text: "No tienes una cuenta? - ",
    link: "Crear cuenta",
  };
};

export const getLoginMessageEN = () => {
  return {
    title: "Log in",
    email: "Your email",
    password: "Password",
    button: "Sign in",
    text: "Don’t have an account yet? - ",
    link: "Sign Up",
  };
};

export const getSingUpMessageES = () => {
  return {
    title: "Registrate",
    name: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    button: "Crear cuenta",
    text: "Ya tienes una cuenta? - ",
    link: "Iniciar sesión",
  };
};

export const getSignUpMessageEN = () => {
  return {
    title: "Create a new account",
    name: "Your name",
    email: "Your email",
    password: "Password",
    button: "Sign up",
    text: "Do you have an account? - ",
    link: "Login",
  };
};
