import { useStore } from "@tanstack/react-store";

import { openModal } from "../../store/modal.ts";
import { notesStore } from "../../store/notes.ts";

import Icon from "../Icon.tsx";

function ActionPanelToggleButton() {
  const selectedNote = useStore(notesStore, (state) => state.selectedNote);

  if (!selectedNote) return null;

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 opacity-100 transition-all duration-150 starting:opacity-0"
      onClick={() => openModal("confirm_archive")}
    >
      <Icon
        id={`${selectedNote.is_archived === false ? "icon-archive-notes" : "icon-unarchive-notes"}`}
        className="size-5"
      ></Icon>

      <span>
        {selectedNote.is_archived ? "Unarchive Note" : "Archive Note"}
      </span>
    </button>
  );
}

export default ActionPanelToggleButton;
