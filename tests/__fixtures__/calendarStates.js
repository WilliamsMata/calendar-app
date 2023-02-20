export const events = [
  {
    id: "1",
    start: new Date("2023-02-21 00:00:00"),
    end: new Date("2023-02-22 00:00:00"),
    title: "My sister's birthday",
    notes: "I need to buy a present",
  },
  {
    id: "2",
    start: new Date("2023-06-29 00:00:00"),
    end: new Date("2023-06-30 00:00:00"),
    title: "My mom's birthday",
    notes: "I need to buy a present",
  },
];

export const initialState = {
  isLoadingEvents: true,
  isSavingEvent: false,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  isSavingEvent: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  isSavingEvent: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
