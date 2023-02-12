import { addDays, startOfDay } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onAddNewClick = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: startOfDay(new Date()),
      end: startOfDay(addDays(new Date(), 1)),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Williams",
      },
    });
    openDateModal();
  };

  return (
    <button
      id="add-new-btn"
      onClick={onAddNewClick}
      className="btn-info btn-circle btn-lg btn fixed right-4 bottom-4 transition hover:brightness-105 lg:right-8 lg:bottom-6"
    >
      <img src="add.svg" alt="add button" className="h-8 w-8 transition" />
    </button>
  );
};
