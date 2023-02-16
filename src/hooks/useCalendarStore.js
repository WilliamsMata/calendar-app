import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onClearActiveEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
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
    startSavingEvent,
    startDeletingEvent,
    clearActiveEvent,
  };
};
