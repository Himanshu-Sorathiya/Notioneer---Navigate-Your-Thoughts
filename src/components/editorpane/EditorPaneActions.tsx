import { useStore } from "@tanstack/react-store";

import {
  useAddNoteMutation,
  useUpdateNoteMutation,
} from "../../store/features/api/apiSlice.ts";

import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
  uiStore,
} from "../../store/ui.ts";

import EditorPaneButton from "./EditorPaneButton.tsx";

import {
  notesStore,
  setDraftNote,
  setSelectedNote,
} from "../../store/notes.ts";
import type { Note } from "../../types/note.ts";

function EditorPaneActions() {
  const selectedNote = useStore(notesStore, (state) => state.selectedNote);
  const draftNote = useStore(notesStore, (state) => state.draftNote);

  const isCreatingNewNote = useStore(
    uiStore,
    (state) => state.isCreatingNewNote,
  );
  const isDirty = useStore(uiStore, (state) => state.isDirty);

  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const handleSave = async () => {
    if (!draftNote) return;

    const noteToSave: Note = {
      ...draftNote,
      updated_at: new Date().toISOString(),
    };

    try {
      let savedNote: Note;

      if (isCreatingNewNote) {
        savedNote = await addNote(noteToSave).unwrap();
      } else {
        await updateNote(noteToSave).unwrap();
        savedNote = noteToSave;
      }

      setIsCreatingNewNote({ isCreatingNewNote: false });
      setIsDirty({ isDirty: false });
      incrementEditorResetKey();

      setSelectedNote({ selectedNote: savedNote });
      setDraftNote({ draftNote: savedNote });
    } catch (error) {}
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
