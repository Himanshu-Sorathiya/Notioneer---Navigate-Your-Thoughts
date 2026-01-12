import { resetFilters, setArchivedView } from "../../store/filterSlice.ts";
import { setDraftNote, setSelectedNote } from "../../store/notesSlice.ts";
import {
  incrementEditorResetKey,
  selectIsDirty,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

import Icon from "../Icon.tsx";

import type { Note } from "../../types/note.ts";

const createEmptyNote = (): Note => ({
  id: crypto.randomUUID(),
  title: "",
  tags: [],
  content: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_archived: false,
});

function NotesListNewNoteButton() {
  const isDirty = useAppSelector(selectIsDirty);

  const dispatch = useAppDispatch();

  function handleCreateNote() {
    dispatch(setIsCreatingNewNote(true));
    dispatch(setIsDirty(false));
    dispatch(incrementEditorResetKey());

    dispatch(setArchivedView(false));
    dispatch(resetFilters());

    dispatch(setSelectedNote(null));
    dispatch(setDraftNote(createEmptyNote()));
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
