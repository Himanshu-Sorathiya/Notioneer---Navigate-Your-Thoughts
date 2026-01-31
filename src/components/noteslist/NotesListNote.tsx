import { memo } from "react";

import { useStore } from "@tanstack/react-store";

import {
  notesStore,
  setDraftNote,
  setSelectedNote,
} from "../../store/notes.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
  uiStore,
} from "../../store/ui.ts";

import type { Note } from "../../types/note.ts";

const NotesListNote = memo(({ note }: { note: Note }) => {
  const isNoteSelected = useStore(
    notesStore,
    (state) => state.selectedNote?.id === note.id,
  );

  const isDirty = useStore(uiStore, (state) => state.isDirty);

  const handleSelectNote = () => {
    if (isNoteSelected || isDirty) return;

    setIsCreatingNewNote({ isCreatingNewNote: false });
    setIsDirty({ isDirty: false });
    incrementEditorResetKey();

    setDraftNote({ draftNote: note });
    setSelectedNote({ selectedNote: note });
  };

  return (
    <div
      className={`border-b-focus border-b pb-0.5 ${isNoteSelected ? "bg-focus" : ""}`}
      onClick={handleSelectNote}
    >
      <div
        className={`hover:bg-focus flex flex-col gap-2 rounded-lg px-4 py-2 ${isDirty ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
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
