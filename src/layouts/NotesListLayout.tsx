import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setDraftNote, setSelectedNote } from "../store/notesSlice.ts";
import type { RootState } from "../store/store.ts";
import { incrementEditorResetKey } from "../store/uiSlice.ts";

import NotesListNewNoteButton from "../components/noteslist/NotesListNewNoteButton.tsx";
import NotesListNote from "../components/noteslist/NotesListNote.tsx";

function NotesListLayout() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const isArchivedView = useSelector(
    (state: RootState) => state.filter.isArchivedView,
  );
  const selectedTag = useSelector(
    (state: RootState) => state.filter.selectedTag,
  );
  const searchFilter = useSelector(
    (state: RootState) => state.filter.searchFilter,
  );

  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote,
  );
  const isCreatingNewNote = useSelector(
    (state: RootState) => state.ui.isCreatingNewNote,
  );

  const dispatch = useDispatch();

  const filteredNotes = notes
    .filter((note) => note.isArchived === isArchivedView)
    .filter(
      (note) =>
        !selectedTag || note.tags.some((tag) => tag.includes(selectedTag)),
    )
    .filter((note) => {
      if (!searchFilter) return true;

      const query = searchFilter.toLowerCase();

      return (
        note.title.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        note.content.toLowerCase().includes(query)
      );
    });

  const orderedNotes = searchFilter
    ? [
        ...filteredNotes.filter((n) =>
          n.title.toLowerCase().includes(searchFilter.toLowerCase()),
        ),
        ...filteredNotes.filter(
          (n) =>
            !n.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
            n.tags.some((tag) =>
              tag.toLowerCase().includes(searchFilter.toLowerCase()),
            ),
        ),
        ...filteredNotes.filter(
          (n) =>
            !n.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
            !n.tags.some((tag) =>
              tag.toLowerCase().includes(searchFilter.toLowerCase()),
            ) &&
            n.content.toLowerCase().includes(searchFilter.toLowerCase()),
        ),
      ]
    : filteredNotes;

  useEffect(() => {
    if (isCreatingNewNote === true) return;

    if (orderedNotes.length === 0) {
      dispatch(setSelectedNote(null));
      dispatch(setDraftNote(null));

      dispatch(incrementEditorResetKey());

      return;
    }

    const exists = orderedNotes.some((n) => n.id === selectedNote?.id);

    if (!exists) {
      dispatch(setSelectedNote(orderedNotes[0]));
      dispatch(setDraftNote(orderedNotes[0]));

      dispatch(incrementEditorResetKey());
    }
  }, [orderedNotes, selectedNote]);

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
