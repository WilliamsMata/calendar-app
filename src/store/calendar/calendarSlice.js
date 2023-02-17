import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    isSavingEvent: false,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;

      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
      state.isSavingEvent = false;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
      state.isSavingEvent = false;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onClearActiveEvent: (state) => {
      state.activeEvent = null;
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
      state.isSavingEvent = false;
    },
    toggleSavingEvent: (state) => {
      state.isSavingEvent = !state.isSavingEvent;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onLoadEvents,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onClearActiveEvent,
  onLogoutCalendar,
  toggleSavingEvent,
} = calendarSlice.actions;
