import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onClearActiveEvent,
  onLoadEvents,
} from "../store";

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
    //Todo: Llegar al backend

    // All good
    if (calendarEvent._id) {
      // Updating
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creating
      const { data } = await calendarApi.post("/events", calendarEvent);
      console.log({ data });

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    }
  };

  const startDeletingEvent = async () => {
    //Todo: Llegar al backend

    dispatch(onDeleteEvent());
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
