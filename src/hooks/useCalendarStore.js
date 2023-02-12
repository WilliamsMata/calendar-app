import { useDispatch, useSelector } from "react-redux";
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
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
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
