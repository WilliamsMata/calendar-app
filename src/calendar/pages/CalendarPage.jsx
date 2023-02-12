import { useState } from "react";
import { Calendar } from "react-big-calendar";

import { CalendarEventBox, CalendarModal, Navbar } from "../";
import { getMessageEN, getMessageES, localizer } from "../../helpers";
import { useCalendarStore, useLanguage, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { isSpanish } = useLanguage();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
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
    console.log({ click: event });
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
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
        culture={isSpanish ? "es" : ""}
        messages={isSpanish ? getMessageES() : getMessageEN()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        style={{ height: "calc(100vh - 4rem)" }}
      />

      <CalendarModal />
    </>
  );
};
