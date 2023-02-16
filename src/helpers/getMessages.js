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
    error: {
      errorTitle: "Error en la autenticación",
      errorText: "Credenciales incorrectas",
    },
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
    error: {
      errorTitle: "Authentication failed",
      errorText: "Incorrect credentials",
    },
  };
};

export const getSingUpMessageES = () => {
  return {
    title: "Registrate",
    name: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    repeatPassword: "Confirmar contraseña",
    button: "Crear cuenta",
    text: "Ya tienes una cuenta? - ",
    link: "Iniciar sesión",
    error: {
      samePassword: {
        title: "Error en registro",
        text: "Las contraseñas no son iguales",
      },
    },
  };
};

export const getSignUpMessageEN = () => {
  return {
    title: "Create a new account",
    name: "Your name",
    email: "Your email",
    password: "Password",
    repeatPassword: "Confirm password",
    button: "Sign up",
    text: "Do you have an account? - ",
    link: "Login",
    error: {
      samePassword: {
        title: "Sign in error",
        text: "Password are not the same",
      },
    },
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
  return {
    savedMsg: "Guardado correctamente",
    errorMsg: {
      title: "Error al guardar",
      text: "No tienes los privilegios para editar este evento",
    },
  };
};

export const getSavedEventModalMessageEN = () => {
  return {
    savedMsg: "Saved successfully",
    errorMsg: {
      title: "Failed to save",
      text: "You do not have the privileges to edit this event",
    },
  };
};
