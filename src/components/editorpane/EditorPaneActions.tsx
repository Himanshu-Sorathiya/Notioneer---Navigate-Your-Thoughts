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

    const onSaveSuccess = (savedNote: Note) => {
      setIsCreatingNewNote({ isCreatingNewNote: false });
      setIsDirty({ isDirty: false });

      setSelectedNote({ selectedNote: savedNote });
      setDraftNote({ draftNote: savedNote });

      incrementEditorResetKey();
    };

    if (isCreatingNewNote) {
      createNote(
        { note: draftNote },
        {
          onSuccess: onSaveSuccess,
        },
      );
    } else {
      updateNote(
        {
          noteId: draftNote.id,
          updates: {
            ...("title" in draftNote && { title: draftNote.title }),
            ...("tags" in draftNote && { tags: draftNote.tags }),
            ...("content" in draftNote && { content: draftNote.content }),
          },
        },
        {
          onSuccess: onSaveSuccess,
        },
      );
    }
  };

  const handleCancel = () => {
    setIsCreatingNewNote({ isCreatingNewNote: false });
    setIsDirty({ isDirty: false });

    setSelectedNote({ selectedNote: selectedNote });
    setDraftNote({ draftNote: selectedNote });

    incrementEditorResetKey();
  };

  return (
    <div className="border-t-surface flex justify-end gap-2 border-t pt-3">
      <EditorPaneButton
        label="Save"
        className="bg-main disabled:bg-main hover:bg-[#2547d0]"
        disabled={!isDirty}
        onClick={handleSave}
      />

      <EditorPaneButton
        label="Cancel"
        className="bg-muted hover:bg-focus disabled:bg-muted"
        disabled={!isDirty && !isCreatingNewNote}
        onClick={handleCancel}
      />
    </div>
  );
}

export default EditorPaneActions;
