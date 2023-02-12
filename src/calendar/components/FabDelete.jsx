import Swal from "sweetalert2";
import {
  getDeleteSweetModalMessageEN,
  getDeleteSweetModalMessageES,
} from "../../helpers/getMessages";
import { useCalendarStore, useLanguage, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isSpanish } = useLanguage();

  const { question, cancelled, deleted } = isSpanish
    ? getDeleteSweetModalMessageES()
    : getDeleteSweetModalMessageEN();

  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "btn btn-info min-w-[5rem] mx-2 transition hover:brightness-110",
      cancelButton:
        "btn btn-error min-w-[5rem] mx-2 transition hover:brightness-110",
    },
    buttonsStyling: false,
  });

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

      swalButtons.fire(deleted.title, deleted.text, "success");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalButtons.fire(cancelled.title, cancelled.text, "error");
    }
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
