import { useEffect } from "react";

import {
  selectFilteredAndOrderedNotes,
  selectSelectedNoteId,
  setDraftNote,
  setSelectedNote,
} from "../store/notesSlice.ts";
import {
  incrementEditorResetKey,
  selectIsCreatingNewNote,
} from "../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";

import NotesListNewNoteButton from "../components/noteslist/NotesListNewNoteButton.tsx";
import NotesListNote from "../components/noteslist/NotesListNote.tsx";

function NotesListLayout() {
  const orderedNotes = useAppSelector(selectFilteredAndOrderedNotes);
  const selectedNoteId = useAppSelector(selectSelectedNoteId);

  const isCreatingNewNote = useAppSelector(selectIsCreatingNewNote);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCreatingNewNote === true) return;

    if (orderedNotes.length === 0) {
      if (selectedNoteId) {
        dispatch(setSelectedNote(null));
        dispatch(setDraftNote(null));

        dispatch(incrementEditorResetKey());
      }

      return;
    }

    const exists = orderedNotes.some((n) => n.id === selectedNoteId);

    if (!exists) {
      dispatch(setSelectedNote(orderedNotes[0]));
      dispatch(setDraftNote(orderedNotes[0]));

      dispatch(incrementEditorResetKey());
    }
  }, [orderedNotes.length, selectedNoteId, isCreatingNewNote, dispatch]);

  return (
    <div className="thin-scrollbar flex flex-col gap-1 overflow-y-auto px-3 py-4">
      <NotesListNewNoteButton />

      {orderedNotes.map((note) => {
        return <NotesListNote key={note.id} note={note} />;
      })}
    </div>
  );
}

export default NotesListLayout;
