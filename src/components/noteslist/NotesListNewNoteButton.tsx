import { useDispatch } from "react-redux";

import { resetFilters, setArchivedView } from "../../store/filterSlice.ts";
import { setCurrentNote } from "../../store/notesSlice.ts";
import { setMode, setSelectedNote } from "../../store/uiSlice.ts";

import Icon from "../Icon.tsx";

import type { Note } from "../../types/note.ts";

function NotesListNewNoteButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-main mb-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg px-4 py-2 text-center transition-all duration-150 hover:bg-[#2547d0]"
      onClick={() => {
        dispatch(setMode("edit"));
        dispatch(setSelectedNote(null));

        dispatch(setArchivedView(false));
        dispatch(resetFilters());

        const newNote: Note = {
          id: Date.now(),
          title: "",
          tags: [],
          content: "",
          lastEdited: new Date().toISOString(),
          isArchived: false,
        };
        dispatch(setCurrentNote(newNote));
      }}
    >
      <Icon id="icon-plus" className="size-5"></Icon>

      <span>Create new Note</span>
    </button>
  );
}

export default NotesListNewNoteButton;
