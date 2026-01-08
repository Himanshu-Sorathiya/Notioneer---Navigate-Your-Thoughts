import { useDispatch, useSelector } from "react-redux";

import {
  addNote,
  setDraftNote,
  setSelectedNote,
  updateNote,
} from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/uiSlice.ts";

import EditorPaneButton from "./EditorPaneButton.tsx";

import type { Note } from "../../types/note.ts";

function EditorPaneActions() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote,
  );
  const draftNote = useSelector((state: RootState) => state.notes.draftNote);

  const isDirty = useSelector((state: RootState) => state.ui.isDirty);

  const dispatch = useDispatch();

  return (
    <div className="border-t-surface flex justify-end gap-2 border-t pt-3">
      <EditorPaneButton
        label="Save"
        className="bg-main hover:bg-[#2547d0]"
        disabled={!isDirty}
        onClick={() => {
          if (!selectedNote || !draftNote) return;

          const noteToSave: Note = {
            ...draftNote,
            lastEdited: new Date().toISOString(),
          };

          if (notes.some((n) => n.id === draftNote.id)) {
            dispatch(updateNote(noteToSave));
          } else {
            dispatch(addNote(noteToSave));
          }

          dispatch(setIsCreatingNewNote(false));
          dispatch(setIsDirty(false));

          dispatch(setSelectedNote(noteToSave));
          dispatch(setDraftNote(noteToSave));

          dispatch(incrementEditorResetKey());
        }}
      />

      <EditorPaneButton
        label="Cancel"
        className="bg-muted hover:bg-focus"
        disabled={!isDirty}
        onClick={() => {
          dispatch(setIsCreatingNewNote(false));
          dispatch(setIsDirty(false));

          dispatch(setSelectedNote(selectedNote));
          dispatch(setDraftNote(selectedNote));

          dispatch(incrementEditorResetKey());
        }}
      />
    </div>
  );
}

export default EditorPaneActions;
