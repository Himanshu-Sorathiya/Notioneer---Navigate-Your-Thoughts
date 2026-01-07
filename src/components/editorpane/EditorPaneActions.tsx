import { useDispatch, useSelector } from "react-redux";

import { addNote, setCurrentNote, updateNote } from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";
import { setMode, setSelectedNote } from "../../store/uiSlice.ts";

import EditorPaneButton from "./EditorPaneButton.tsx";

function EditorPaneActions() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const currentNote = useSelector(
    (state: RootState) => state.notes.currentNote,
  );

  const dispatch = useDispatch();

  return (
    <div className="border-t-surface flex justify-end gap-2 border-t pt-3">
      <EditorPaneButton
        onClick={() => {
          if (!currentNote) return;

          const noteToSave = {
            ...currentNote,
            lastEdited: new Date().toISOString(),
          };

          if (notes.some((n) => n.id === currentNote.id)) {
            dispatch(updateNote(noteToSave));
          } else {
            dispatch(addNote(noteToSave));
          }

          dispatch(setSelectedNote(currentNote.id));
          dispatch(setMode("read"));
          dispatch(setCurrentNote(null));
        }}
        label="Save"
        className="bg-main hover:bg-[#2547d0]"
      />

      <EditorPaneButton
        label="Cancel"
        className="bg-muted hover:bg-focus"
        onClick={() => {
          dispatch(setMode("read"));
          dispatch(setCurrentNote(null));
        }}
      />
    </div>
  );
}

export default EditorPaneActions;
