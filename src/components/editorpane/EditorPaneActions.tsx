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

import { useCreateNote } from "../../hooks/useCreateNote.ts";
import { useUpdateNote } from "../../hooks/useUpdateNote.ts";

import EditorPaneButton from "./EditorPaneButton.tsx";

import type { Note } from "../../types/note.ts";

function EditorPaneActions() {
  const selectedNote = useStore(notesStore, (state) => state.selectedNote);
  const draftNote = useStore(notesStore, (state) => state.draftNote);

  const isCreatingNewNote = useStore(
    uiStore,
    (state) => state.isCreatingNewNote,
  );
  const isDirty = useStore(uiStore, (state) => state.isDirty);

  const { createNote } = useCreateNote();
  const { updateNote } = useUpdateNote();

  const handleSave = async () => {
    if (!draftNote) return;

    const noteToSave: Note = {
      ...draftNote,
      updated_at: new Date().toISOString(),
    };

    let savedNote: Note;

    if (isCreatingNewNote) {
      createNote({ note: noteToSave });
    } else {
      updateNote({
        noteId: noteToSave.id,
        updates: {
          ...("title" in noteToSave && { title: noteToSave.title }),
          ...("tags" in noteToSave && { tags: noteToSave.tags }),
          ...("content" in noteToSave && { content: noteToSave.content }),
        },
      });
    }

    setIsCreatingNewNote({ isCreatingNewNote: false });
    setIsDirty({ isDirty: false });
    incrementEditorResetKey();

    setSelectedNote({ selectedNote: savedNote });
    setDraftNote({ draftNote: savedNote });
  };

  const handleCancel = () => {
    setIsCreatingNewNote({ isCreatingNewNote: false });
    setIsDirty({ isDirty: false });
    incrementEditorResetKey();

    setSelectedNote({ selectedNote: selectedNote });
    setDraftNote({ draftNote: selectedNote });
  };

  return (
    <div className="border-t-surface flex justify-end gap-2 border-t pt-3">
      <EditorPaneButton
        label="Save"
        className="bg-main hover:bg-[#2547d0]"
        disabled={!isDirty}
        onClick={handleSave}
      />

      <EditorPaneButton
        label="Cancel"
        className="bg-muted hover:bg-focus"
        disabled={!isDirty}
        onClick={handleCancel}
      />
    </div>
  );
}

export default EditorPaneActions;
