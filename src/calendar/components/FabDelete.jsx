import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const onDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      id="delete-btn"
      onClick={onDelete}
      className={`btn-error btn-circle btn-lg btn fixed left-4 bottom-4 transition hover:brightness-105 lg:left-8 lg:bottom-6 ${
        hasEventSelected ? "" : "hidden"
      } ${isDateModalOpen ? "hidden" : ""}`}
    >
      <img src="trash.svg" alt="delete button" className="h-8 w-8 transition" />
    </button>
  );
};
