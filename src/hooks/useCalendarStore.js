import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

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

  return {
    //* Properties
    activeEvent,
    events,

    //* Methods
    setActiveEvent,
    startSavingEvent,
  };
};
