import Swal from "sweetalert2";
import { isUserDeviceInSpanish } from "../../helpers";
import {
  getDeleteSweetModalMessageEN,
  getDeleteSweetModalMessageES,
} from "../../helpers/getMessages";
import { useCalendarStore, useUiStore } from "../../hooks";

const swalButtons = Swal.mixin({
  customClass: {
    confirmButton:
      "btn btn-info min-w-[5rem] mx-2 transition hover:brightness-110",
    cancelButton:
      "btn btn-error min-w-[5rem] mx-2 transition hover:brightness-110",
  },
  buttonsStyling: false,
});

const { question, cancelled } = isUserDeviceInSpanish
  ? getDeleteSweetModalMessageES()
  : getDeleteSweetModalMessageEN();

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected, clearActiveEvent } =
    useCalendarStore();

  const onDelete = async () => {
    const result = await swalButtons.fire({
      title: question.title,
      text: question.text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: question.confirmBtn,
      cancelButtonText: question.cancelBtn,
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await startDeletingEvent();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalButtons.fire(cancelled.title, cancelled.text, "error");
    }

    clearActiveEvent();
  };

  return (
    <button
      id="delete-btn"
      onClick={onDelete}
      className={`btn-error btn-circle btn-lg btn fixed left-4 bottom-4 transition hover:brightness-105 lg:left-8 lg:bottom-6 ${
        hasEventSelected ? "" : "hidden"
      } ${isDateModalOpen ? "hidden" : ""}`}
    >
      <img
        src="./icons/trash.svg"
        alt="delete button"
        className="h-8 w-8 transition"
      />
    </button>
  );
};
