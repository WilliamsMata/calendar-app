import { useEffect, useMemo, useState } from "react";
import { addDays, differenceInSeconds, startOfDay } from "date-fns";
import Swal from "sweetalert2";

import { useCalendarStore, useLanguage, useUiStore } from "./";
import {
  getSavedEventModalMessageEN,
  getSavedEventModalMessageES,
  getSweetModalMessageEN,
  getSweetModalMessageES,
} from "../helpers";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const useCalendarModal = () => {
  const colors = [
    "#661ae6",
    "#3abff8",
    "#1fb2a5",
    "#fbbd23",
    "#f87272",
    "#d926aa",
  ];

  //* HOOKS
  const { isSpanish } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { activeEvent, startSavingEvent, clearActiveEvent } =
    useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: startOfDay(new Date()),
    end: startOfDay(addDays(new Date(), 1)),
    bgColor: colors[0],
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "" : "input-error";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  //* EVENTS
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // changing: start || end
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    setFormSubmitted(false);
    closeDateModal();
    clearActiveEvent();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const { error } = isSpanish
      ? getSweetModalMessageES()
      : getSweetModalMessageEN();

    const savedModalMessage = isSpanish
      ? getSavedEventModalMessageES()
      : getSavedEventModalMessageEN();

    const timeDifference = differenceInSeconds(
      formValues.end,
      formValues.start
    );

    if (isNaN(timeDifference) || timeDifference <= 0) {
      Swal.fire({
        title: error.title,
        text: error.text,
        icon: "error",
        buttonsStyling: false,
        width: "35rem",
        customClass: {
          confirmButton: "btn btn-outline btn-error",
        },
      });
      document.querySelector("#date-end").classList.add("input-error");
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);

    closeDateModal();
    clearActiveEvent();
    setFormSubmitted(false);
    Toast.fire({
      icon: "success",
      title: savedModalMessage,
    });
  };

  const handleColorClick = (color) => {
    setFormValues({
      ...formValues,
      bgColor: color,
    });
  };

  return {
    //* Properties
    formValues,
    isDateModalOpen,
    titleClass,
    activeEvent,
    colors,

    //* Methods
    onInputChange,
    onDateChange,
    onCloseModal,
    onSubmit,
    handleColorClick,
  };
};
