import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import {
  getDeleteSweetModalMessageEN,
  getDeleteSweetModalMessageES,
  getSavedEventModalMessageEN,
  getSavedEventModalMessageES,
  isUserDeviceInSpanish,
} from "../helpers";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onClearActiveEvent,
  onLoadEvents,
} from "../store";

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

const swalButtons = Swal.mixin({
  customClass: {
    confirmButton:
      "btn btn-info min-w-[5rem] mx-2 transition hover:brightness-110",
    cancelButton:
      "btn btn-error min-w-[5rem] mx-2 transition hover:brightness-110",
  },
  buttonsStyling: false,
});

const { savedMsg, errorEditMsg, errorDeleteMsg } = isUserDeviceInSpanish
  ? getSavedEventModalMessageES()
  : getSavedEventModalMessageEN();

const { deleted } = isUserDeviceInSpanish
  ? getDeleteSweetModalMessageES()
  : getDeleteSweetModalMessageEN();

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Updating event
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));

        Toast.fire({
          icon: "success",
          title: savedMsg,
        });
        return;
      }

      // Creating event
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

      Toast.fire({
        icon: "success",
        title: savedMsg,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: errorEditMsg.title,
        text: errorEditMsg.text,
        icon: "error",
        buttonsStyling: false,
        width: "35rem",
        customClass: {
          confirmButton: "btn btn-error",
        },
      });
    }
  };

  const startDeletingEvent = async () => {
    //Todo: Llegar al backend
    try {
      await calendarApi.delete(`events/${activeEvent.id}`);

      dispatch(onDeleteEvent());
      swalButtons.fire(deleted.title, deleted.text, "success");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: errorDeleteMsg.title,
        text: errorDeleteMsg.text,
        icon: "error",
        buttonsStyling: false,
        width: "35rem",
        customClass: {
          confirmButton: "btn btn-error",
        },
      });
    }
  };

  const clearActiveEvent = () => {
    dispatch(onClearActiveEvent());
  };

  return {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent,
    startDeletingEvent,
    clearActiveEvent,
  };
};
