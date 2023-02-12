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

export const getFormMessageES = () => {
  return {
    titleForm: {
      newEvent: "Nuevo evento",
      editEvent: "Editar evento",
    },
    dateStart: {
      label: "Fecha y hora de inicio",
      placeholder: "Fecha de inicio",
    },
    dateEnd: {
      label: "Fecha y hora final",
      placeholder: "Fecha final",
    },
    eventTitle: {
      label: "Titulo",
      placeholder: "Titulo del evento",
      altLabel: "Una descripción corta",
    },
    note: {
      placeholder: "Notas",
      altLabel: "Información adicional",
    },
    colorLabel: "Escoge un color",
    button: "Guardar",
  };
};

export const getFormMessageEN = () => {
  return {
    titleForm: {
      newEvent: "New event",
      editEvent: "Edit event",
    },
    dateStart: {
      label: "Start date and time",
      placeholder: "Start date",
    },
    dateEnd: {
      label: "End date and time",
      placeholder: "End date",
    },
    eventTitle: {
      label: "Title",
      placeholder: "Event title",
      altLabel: "Short description",
    },
    note: {
      placeholder: "Notes",
      altLabel: "Additional information",
    },
    colorLabel: "Pick a color",
    button: "Save",
  };
};

export const getSweetModalMessageES = () => {
  return {
    error: {
      title: "Fechas incorrectas",
      text: "Revisar las fechas ingresadas",
    },
  };
};

export const getSweetModalMessageEN = () => {
  return {
    error: {
      title: "Incorrect Dates",
      text: "Please check the dates entered",
    },
  };
};

export const getDeleteSweetModalMessageEN = () => {
  return {
    question: {
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      cancelBtn: "No, cancel!",
      confirmBtn: "Yes, Delete it!",
    },
    cancelled: {
      title: "Cancelled",
      text: "Your event is safe :)",
    },
    deleted: {
      title: "Deleted!",
      text: "Your event has been deleted.",
    },
  };
};

export const getDeleteSweetModalMessageES = () => {
  return {
    question: {
      title: "Estás seguro?",
      text: "No podrás revertir esta acción!",
      cancelBtn: "No, cancelar!",
      confirmBtn: "Si, eliminar!",
    },
    cancelled: {
      title: "Cancelado",
      text: "Tu evento está a salvo :)",
    },
    deleted: {
      title: "Eliminado!",
      text: "Tu evento ha sido eliminado.",
    },
  };
};

export const getSavedEventModalMessageES = () => {
  return "Guardado correctamente";
};

export const getSavedEventModalMessageEN = () => {
  return "Saved successfully";
};
