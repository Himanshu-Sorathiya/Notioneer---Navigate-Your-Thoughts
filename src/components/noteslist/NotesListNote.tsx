import { useDispatch, useSelector } from "react-redux";

import { setDraftNote, setSelectedNote } from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/uiSlice.ts";

import type { Note } from "../../types/note.ts";

function NotesListNote({ note }: { note: Note }) {
  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote,
  );

  const dispatch = useDispatch();

  return (
    <div
      className={`border-b-focus border-b pb-0.5 ${note.id === selectedNote?.id ? "bg-focus" : ""}`}
      onClick={() => {
        dispatch(setIsCreatingNewNote(false));
        dispatch(setIsDirty(false));

        dispatch(setDraftNote(note));
        dispatch(setSelectedNote(note));

        dispatch(incrementEditorResetKey());
      }}
    >
      <div
        key={note.id}
        className="hover:bg-focus flex cursor-pointer flex-col gap-2 rounded-lg px-4 py-2"
      >
        <h2 className="font-bold">{note.title}</h2>

        <p className="flex flex-wrap gap-1 text-xs">
          {note.tags.map((tag) => (
            <span key={tag} className="bg-mark rounded-md px-1.5 py-1">
              {tag}
            </span>
          ))}
        </p>

        <p className="text-sm">{note.lastEdited}</p>
      </div>
    </div>
  );
}

export default NotesListNote;
