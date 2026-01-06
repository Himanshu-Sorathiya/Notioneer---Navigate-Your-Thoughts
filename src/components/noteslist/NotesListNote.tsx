import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store/store.ts";
import { setMode, setSelectedNote } from "../../store/uiSlice.ts";

import type { Note } from "../../types/note.ts";

function NotesListNewNote({ note }: { note: Note }) {
  const selectedNote = useSelector((state: RootState) => state.ui.selectedNote);
  const mode = useSelector((state: RootState) => state.ui.mode);

  const dispatch = useDispatch();

  return (
    <div
      className={`border-b-focus border-b pb-0.5 ${note.id === selectedNote ? "bg-focus" : ""}`}
      onClick={() => {
        if (mode === "edit") dispatch(setMode("read"));

        dispatch(setSelectedNote(note.id));
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

export default NotesListNewNote;
