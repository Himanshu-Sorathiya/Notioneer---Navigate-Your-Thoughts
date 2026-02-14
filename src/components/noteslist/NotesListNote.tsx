import { memo } from "react";

import { useStore } from "@tanstack/react-store";

import { openModal } from "../../store/modal.ts";
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

const NotesListNote = memo(({ note, index }: { note: Note; index: number }) => {
  const isNoteSelected = useStore(
    notesStore,
    (state) => state.selectedNote?.id === note.id,
  );

  const isDirty = useStore(uiStore, (state) => state.isDirty);

  const handleSelectNote = () => {
    if (isNoteSelected) return;

    if (isDirty) {
      openModal("discard_changes", note);

      return;
    }

    setIsCreatingNewNote({ isCreatingNewNote: false });
    setIsDirty({ isDirty: false });
    incrementEditorResetKey();

    setSelectedNote({ selectedNote: note });
    setDraftNote({ draftNote: note });
  };

  return (
    <button
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`border-b-focus w-full translate-y-0 cursor-pointer border-b pb-0.5 text-left opacity-100 transition-all duration-300 starting:translate-y-2 starting:opacity-0 ${isNoteSelected ? "bg-focus" : ""}`}
      onClick={handleSelectNote}
    >
      <div className="hover:bg-focus flex flex-col gap-2 rounded-lg px-4 py-2">
        <h2 className="line-clamp-2 font-bold text-pretty wrap-break-word">
          {note.title || "Untitled Note"}
        </h2>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 text-xs">
            {note.tags.map((tag) => (
              <span key={tag} className="bg-mark rounded-md px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(note.updated_at))}
        </p>
      </div>
    </button>
  );
});

export default NotesListNote;
