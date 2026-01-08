import { useDispatch, useSelector } from "react-redux";

import { resetFilters, setArchivedView } from "../../store/filterSlice.ts";
import { setDraftNote, setSelectedNote } from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/uiSlice.ts";

import Icon from "../Icon.tsx";

import type { Note } from "../../types/note.ts";

function NotesListNewNoteButton() {
  const isDirty = useSelector((state: RootState) => state.ui.isDirty);

  const dispatch = useDispatch();

  return (
    <button
      className="bg-main mb-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg px-4 py-2 text-center transition-all duration-150 hover:bg-[#2547d0] disabled:cursor-not-allowed"
      disabled={isDirty}
      onClick={() => {
        dispatch(setIsCreatingNewNote(true));
        dispatch(setIsDirty(false));

        dispatch(setArchivedView(false));
        dispatch(resetFilters());

        const newNote: Note = {
          id: Date.now(),
          title: "",
          tags: [],
          content: "",
          lastEdited: "",
          isArchived: false,
        };
        dispatch(setDraftNote(newNote));
        dispatch(setSelectedNote(null));

        dispatch(incrementEditorResetKey());
      }}
    >
      <Icon id="icon-plus" className="size-5"></Icon>

      <span>Create new Note</span>
    </button>
  );
}

export default NotesListNewNoteButton;
