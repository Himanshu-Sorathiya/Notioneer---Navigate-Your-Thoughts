import { useStore } from "@tanstack/react-store";

import { resetFilters, setArchivedView } from "../../store/filter.ts";
import { setDraftNote, setSelectedNote } from "../../store/notes.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
  uiStore,
} from "../../store/ui.ts";

import Icon from "../Icon.tsx";

import type { Note } from "../../types/note.ts";

const createEmptyNote = (): Note => ({
  id: crypto.randomUUID(),
  title: "",
  tags: [],
  content: "",
  updated_at: new Date().toISOString(),
  is_archived: false,
});

function NotesListNewNoteButton() {
  const isDirty = useStore(uiStore, (state) => state.isDirty);

  function handleCreateNote() {
    setIsCreatingNewNote({ isCreatingNewNote: true });
    setIsDirty({ isDirty: false });
    incrementEditorResetKey();

    setArchivedView({ archivedView: false });
    resetFilters();

    setSelectedNote({ selectedNote: null });
    setDraftNote({ draftNote: createEmptyNote() });
  }

  return (
    <button
      className="bg-main mb-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg px-4 py-2 text-center transition-all duration-150 hover:bg-[#2547d0] disabled:cursor-not-allowed"
      disabled={isDirty}
      onClick={handleCreateNote}
    >
      <Icon id="icon-plus" className="size-5"></Icon>

      <span>Create new Note</span>
    </button>
  );
}

export default NotesListNewNoteButton;
