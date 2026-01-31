import { useStore } from "@tanstack/react-store";

import {
  notesStore,
  setDraftNote,
  setSelectedNote,
} from "../../store/notes.ts";
import { incrementEditorResetKey, setIsDirty } from "../../store/ui.ts";

import { useUpdateNote } from "../../hooks/useUpdateNote.ts";

import Icon from "../Icon.tsx";

function ActionPanelToggleButton() {
  const selectedNote = useStore(notesStore, (state) => state.selectedNote);

  const { updateNote } = useUpdateNote();

  const handleToggle = async () => {
    if (!selectedNote) return;

    updateNote({
      noteId: selectedNote.id,
      updates: {
        ...("is_archived" in selectedNote && {
          is_archived: !selectedNote.is_archived,
        }),
      },
    });

    setSelectedNote({ selectedNote: null });
    setDraftNote({ draftNote: null });

    setIsDirty({ isDirty: false });
    incrementEditorResetKey();
  };

  if (!selectedNote) return null;

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 transition-all duration-150"
      onClick={handleToggle}
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
