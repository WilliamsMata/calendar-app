import { addHours } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";

import { getFormMessageEN, getFormMessageES } from "../../helpers";
import { useLanguage } from "../../hooks";
import "react-datepicker/dist/react-datepicker.css";

import es from "date-fns/locale/es";
registerLocale("es", es);

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Williams",
    notes: "Mata",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

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

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      className="mx-2 w-full max-w-[30rem] rounded-lg bg-base-100 p-4 outline-none"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>{titleForm}</h1>
      <form className="container form-control w-full">
        <div className="border-b-2 border-base-200 pb-4">
          <div>
            <label className="label">{dateStart.label}</label>
            <DatePicker
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
              className="input-bordered input w-full"
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
