import { useEffect } from "react";

import { useStore } from "@tanstack/react-store";

import { notesStore, setDraftNote, setSelectedNote } from "../store/notes.ts";
import { incrementEditorResetKey, uiStore } from "../store/ui.ts";

import type { Note } from "../types/note.ts";

function useAutoSelect({
  orderedNotes,
  notesStatus,
}: {
  orderedNotes: Note[];
  notesStatus: string;
}) {
  const selectedNoteId = useStore(
    notesStore,
    (state) => state.selectedNote?.id,
  );

  const isCreatingNewNote = useStore(
    uiStore,
    (state) => state.isCreatingNewNote,
  );

  useEffect(() => {
    if (isCreatingNewNote === true || notesStatus === "pending") return;

    if (orderedNotes.length === 0) {
      if (selectedNoteId) {
        setSelectedNote({ selectedNote: null });
        setDraftNote({ draftNote: null });

        incrementEditorResetKey();
      }

      return;
    }

    const exists = orderedNotes.some((n) => n.id === selectedNoteId);

    if (!exists) {
      setSelectedNote({ selectedNote: orderedNotes[0] });
      setDraftNote({ draftNote: orderedNotes[0] });

      incrementEditorResetKey();
    }
  }, [orderedNotes, selectedNoteId, isCreatingNewNote, notesStatus]);
}

export { useAutoSelect };
