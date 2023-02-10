import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";

import { Navbar } from "../";
import { getMessageEN, getMessageES, localizer } from "../../helpers";
import { useLanguage } from "../../hooks";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar la torta",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Williams",
    },
  },
];

export const CalendarPage = () => {
  const language = useLanguage();

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });

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

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture={language.substring(0, 2) === "es" ? "es" : ""}
        messages={
          language.substring(0, 2) === "es" ? getMessageES() : getMessageEN()
        }
        style={{ height: "calc(100vh - 4rem)" }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
