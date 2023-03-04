import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { startOfDay } from "date-fns";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  getEnvVariables,
  getFormMessageEN,
  getFormMessageES,
  isUserDeviceInSpanish,
} from "../../helpers";
import { useCalendarModal } from "../../hooks";
import { CloseModalBtn } from "./CloseModalBtn";
import { useSelector } from "react-redux";
import { LoaderSpinnerIcon } from "./LoaderSpinnerIcon";

registerLocale("es", es);

if (getEnvVariables().VITE_MODE !== "test") {
  Modal.setAppElement("#root");
}

const { titleForm, dateStart, dateEnd, eventTitle, note, colorLabel, button } =
  isUserDeviceInSpanish ? getFormMessageES() : getFormMessageEN();

export const CalendarModal = () => {
  const { isSavingEvent } = useSelector((state) => state.calendar);

  const {
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
  } = useCalendarModal();

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
              minDate={startOfDay(new Date())}
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "start")}
              className="input-bordered input w-full"
              dateFormat="Pp"
              showTimeSelect
              locale={isUserDeviceInSpanish ? "es" : null}
              timeCaption={isUserDeviceInSpanish ? "Hora" : "Time"}
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
              locale={isUserDeviceInSpanish ? "es" : null}
              timeCaption={isUserDeviceInSpanish ? "Hora" : "Time"}
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
            <div className="mx-1 flex items-center justify-between gap-4">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`h-8 w-16 cursor-pointer rounded-lg border ${
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
            className="btn-outline btn-info btn-block btn mt-2 disabled:bg-base-300"
            disabled={isSavingEvent}
          >
            {isSavingEvent ? (
              <LoaderSpinnerIcon />
            ) : (
              <>
                <img
                  src="./icons/save.svg"
                  alt="save logo"
                  className="mr-4 h-6 w-6 transition"
                />
                <span className="tracking-wider">{button}</span>
              </>
            )}
          </button>
        </div>
      </form>

      <CloseModalBtn />
    </Modal>
  );
};
