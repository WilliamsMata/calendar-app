import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
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

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent, clearActiveEvent } =
    useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "Williams",
    notes: "Mata",
    start: new Date(),
    end: addHours(new Date(), 2),
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

  const { isSpanish } = useLanguage();
  const { titleForm, dateStart, dateEnd, eventTitle, note, button } = isSpanish
    ? getFormMessageES()
    : getFormMessageEN();

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const onCloseModal = () => {
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
    Toast.fire({
      icon: "success",
      title: savedModalMessage,
    });
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      className="mx-2 w-full max-w-[30rem] rounded-lg bg-base-100 p-4 outline-none"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>{titleForm}</h1>
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

          <button
            id="save-btn"
            type="submit"
            className="btn-outline btn-info btn-block btn"
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
    </Modal>
  );
};
