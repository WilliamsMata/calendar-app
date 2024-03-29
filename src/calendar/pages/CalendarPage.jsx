import { Suspense, useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";

import {
  CalendarEventBox,
  CalendarModal,
  Navbar,
  FabAddNew,
  FabDelete,
} from "../";
import {
  getMessageEN,
  getMessageES,
  isUserDeviceInSpanish,
  localizer,
} from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  //* HOOKS
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, clearActiveEvent, startLoadingEvents } =
    useCalendarStore();

  useEffect(() => {
    startLoadingEvents();
  }, []);

  //* EVENTS
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.bgColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    clearActiveEvent();
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const onNavigate = () => {
    clearActiveEvent();
  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        culture={isUserDeviceInSpanish ? "es" : ""}
        messages={isUserDeviceInSpanish ? getMessageES() : getMessageEN()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        onNavigate={onNavigate}
        style={{ height: "calc(100vh - 4rem)" }}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  );
};
