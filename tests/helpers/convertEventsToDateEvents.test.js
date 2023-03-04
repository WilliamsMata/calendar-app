import { parseISO } from "date-fns";
import { convertEventsToDateEvents } from "../../src/helpers/convertEventsToDateEvents";

describe("Test in convertEventsToDateEvents", () => {
  test("should convert event dates to Date objects", () => {
    const events = [
      {
        title: "Event 1",
        start: "2022-02-22T12:00:00.000Z",
        end: "2022-02-22T14:00:00.000Z",
      },
      {
        title: "Event 2",
        start: "2022-02-23T09:00:00.000Z",
        end: "2022-02-23T12:00:00.000Z",
      },
    ];

    const expectedEvents = [
      {
        title: "Event 1",
        start: new Date("2022-02-22T12:00:00.000Z"),
        end: new Date("2022-02-22T14:00:00.000Z"),
      },
      {
        title: "Event 2",
        start: new Date("2022-02-23T09:00:00.000Z"),
        end: new Date("2022-02-23T12:00:00.000Z"),
      },
    ];

    const convertedEvents = convertEventsToDateEvents(events);

    expect(convertedEvents).toEqual(expectedEvents);
  });

  test("should return an empty array if no events are provided", () => {
    const convertedEvents = convertEventsToDateEvents();

    expect(convertedEvents).toEqual([]);
  });
});
