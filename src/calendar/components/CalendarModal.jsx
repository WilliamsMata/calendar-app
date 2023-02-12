import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  getFormMessageEN,
  getFormMessageES,
  getSavedEventModalMessageEN,
  getSavedEventModalMessageES,
  getSweetModalMessageEN,
  getSweetModalMessageES,
} from "../../helpers";
import { useCalendarStore, useLanguage, useUiStore } from "../../hooks";

registerLocale("es", es);

Modal.setAppElement("#root");

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

const colors = [
  "#661ae6",
  "#3abff8",
  "#1fb2a5",
  "#fbbd23",
  "#f87272",
  "#d926aa",
];

export const CalendarModal = () => {
  //* HOOKS
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { activeEvent, startSavingEvent, clearActiveEvent } =
    useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const { isSpanish } = useLanguage();
  const {
    titleForm,
    dateStart,
    dateEnd,
    eventTitle,
    note,
    colorLabel,
    button,
  } = isSpanish ? getFormMessageES() : getFormMessageEN();

  const [formValues, setFormValues] = useState({
    title: "Williams",
    notes: "Mata",
    start: new Date(),
    end: addHours(new Date(), 2),
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
    Toast.fire({
      icon: "success",
      title: savedModalMessage,
    });
    setFormSubmitted(false);
  };

  const handleColorClick = (color) => {
    setFormValues({
      ...formValues,
      bgColor: color,
    });
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      className="relative mx-2 w-full max-w-[30rem] rounded-lg bg-base-100 p-4 outline-none"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>{activeEvent?._id ? titleForm.editEvent : titleForm.newEvent}</h1>

      <form className="container form-control w-full" onSubmit={onSubmit}>
        <div className="border-b-2 border-base-200 pb-4">
          <div>
            <label className="label">{dateStart.label}</label>
            <DatePicker
              id="date-start"
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "start")}
              className="input-bordered input w-full"
              dateFormat="Pp"
              showTimeSelect
              locale={isSpanish ? "es" : null}
              timeCaption={isSpanish ? "Hora" : "Time"}
            />
          </div>

          <div>
            <label className="label">{dateEnd.label}</label>
            <DatePicker
              id="date-end"
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChange(event, "end")}
              className="input-bordered input w-full"
              dateFormat="Pp"
              showTimeSelect
              locale={isSpanish ? "es" : null}
              timeCaption={isSpanish ? "Hora" : "Time"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="event-title" className="label">
              {eventTitle.label}
            </label>
            <input
              id="event-title"
              type="text"
              className={`input-bordered input w-full ${titleClass}`}
              placeholder={eventTitle.placeholder}
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
            <label
              htmlFor="event-title"
              id="emailHelp"
              className="label-text-alt"
            >
              {eventTitle.altLabel}
            </label>
          </div>

          <div>
            <textarea
              id="note-description"
              type="text"
              className="textarea-bordered textarea w-full resize-none"
              placeholder={note.placeholder}
              rows="3"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            />
            <label
              htmlFor="note-description"
              id="emailHelp"
              className="label-text-alt"
            >
              {note.altLabel}
            </label>
          </div>

          <div>
            <label className="label">{colorLabel}</label>
            <div className="mx-2 flex items-center justify-between gap-4">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`h-8 w-16 cursor-pointer rounded-md border ${
                    formValues.bgColor === color
                      ? `outline outline-2 outline-offset-2`
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                />
              ))}
            </div>
          </div>

          <button
            id="save-btn"
            type="submit"
            className="btn-outline btn-info btn-block btn mt-2"
          >
            <img
              src="save.svg"
              alt="save logo"
              className="mr-4 h-6 w-6 transition"
            />
            <span className="tracking-wider">{button}</span>
          </button>
        </div>
      </form>

      <button
        className="btn-outline btn-circle btn absolute top-5 right-4"
        onClick={onCloseModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </Modal>
  );
};
