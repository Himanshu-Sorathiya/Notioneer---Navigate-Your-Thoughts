import { memo } from "react";

import {
  selectIsNoteSelected,
  setDraftNote,
  setSelectedNote,
} from "../../store/notesSlice.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

import type { Note } from "../../types/note.ts";

const NotesListNote = memo(({ note }: { note: Note }) => {
  const isNoteSelected = useAppSelector((state) =>
    selectIsNoteSelected(state, note),
  );

  const dispatch = useAppDispatch();

  const handleSelectNote = () => {
    if (isNoteSelected) return;

    dispatch(setIsCreatingNewNote(false));
    dispatch(setIsDirty(false));

    dispatch(setDraftNote(note));
    dispatch(setSelectedNote(note));

    dispatch(incrementEditorResetKey());
  };

  return (
    <div
      className={`border-b-focus border-b pb-0.5 ${isNoteSelected ? "bg-focus" : ""}`}
      onClick={handleSelectNote}
    >
      <div className="hover:bg-focus flex cursor-pointer flex-col gap-2 rounded-lg px-4 py-2">
        <h2 className="font-bold">{note.title || "Untitled Note"}</h2>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 text-xs">
            {note.tags.map((tag) => (
              <span key={tag} className="bg-mark rounded-md px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm">{note.updated_at}</p>
      </div>
    </div>
  );
});

export default NotesListNote;
