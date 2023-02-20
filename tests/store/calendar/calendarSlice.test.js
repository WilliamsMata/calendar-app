import {
  calendarSlice,
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
  toggleSavingEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../__fixtures__/calendarStates";

describe("Test in calendarSlice.js", () => {
  test("should return default state", () => {
    const state = calendarSlice.getInitialState();

    expect(state).toStrictEqual(initialState);
  });

  test("onSetActiveEvent should active the event", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toStrictEqual(events[0]);
  });

  test("onLoadEvents should set the events", () => {
    let state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toStrictEqual(events);

    state = calendarSlice.reducer(state, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });

  test("onAddNewEvent should add the event", () => {
    const newEvent = {
      id: "3",
      start: new Date("2023-04-07 00:00:00"),
      end: new Date("2023-04-08 00:00:00"),
      title: "My dad's birthday",
      notes: "I need to buy a present",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toStrictEqual([...events, newEvent]);
  });

  test("onUpdateEvent should update the event", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2023-02-21 00:00:00"),
      end: new Date("2023-02-22 00:00:00"),
      title: "My sister's birthday updated",
      notes: "I need to buy a present and a cake",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent should delete the active event", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onDeleteEvent()
    );

    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onClearActiveEvent should clean the active event", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onClearActiveEvent()
    );

    expect(state.activeEvent).toBe(null);
  });

  test("onLogoutCalendar should clean the state", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onLogoutCalendar()
    );

    expect(state).toStrictEqual(initialState);
  });

  test("toggleSavingEvent should toggle isSavingEvent", () => {
    let state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      toggleSavingEvent()
    );
    expect(state.isSavingEvent).toBeTruthy();

    state = calendarSlice.reducer(state, toggleSavingEvent());
    expect(state.isSavingEvent).toBeFalsy();
  });
});
