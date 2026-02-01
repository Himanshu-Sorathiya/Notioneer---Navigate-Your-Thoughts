import { useStore } from "@tanstack/react-store";

import {
  notesStore,
  setDraftNote,
  setSelectedNote,
} from "../../store/notes.ts";
import { incrementEditorResetKey, setIsDirty } from "../../store/ui.ts";

import { useDeleteNote } from "../../hooks/useDeleteNote.ts";

import Icon from "../Icon.tsx";

function ActionPanelButton() {
  const { deleteNote } = useDeleteNote();

  const selectedNoteId = useStore(
    notesStore,
    (state) => state.selectedNote?.id,
  );

  const handleDelete = async () => {
    if (!selectedNoteId) return;

    deleteNote(
      { noteId: selectedNoteId },
      {
        onSuccess: () => {
          setSelectedNote({ selectedNote: null });
          setDraftNote({ draftNote: null });

          setIsDirty({ isDirty: false });
          incrementEditorResetKey();
        },
      },
    );
  };

  if (!selectedNoteId) return null;

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 transition-all duration-150"
      onClick={handleDelete}
    >
      <Icon id="icon-trash" className="size-5"></Icon>

      <span>Delete Note</span>
    </button>
  );
}

export default ActionPanelButton;
