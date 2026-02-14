import { useStore } from "@tanstack/react-store";

import { openModal } from "../../store/modal.ts";
import { notesStore } from "../../store/notes.ts";

import Icon from "../Icon.tsx";

function ActionPanelButton() {
  const selectedNoteId = useStore(
    notesStore,
    (state) => state.selectedNote?.id,
  );

  if (!selectedNoteId) return null;

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 opacity-100 transition-all duration-300 starting:opacity-0"
      onClick={() => openModal("confirm_delete")}
    >
      <Icon id="icon-trash" className="size-5"></Icon>

      <span>Delete Note</span>
    </button>
  );
}

export default ActionPanelButton;
