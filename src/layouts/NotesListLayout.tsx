import useNotes from "../hooks/useNotes.ts";

import NotesListNewNoteButton from "../components/noteslist/NotesListNewNoteButton.tsx";
import NotesListNote from "../components/noteslist/NotesListNote.tsx";
import NotesListNoteSkeleton from "../components/noteslist/NotesListNoteSkeleton.tsx";

function NotesListLayout() {
  const { notes, notesStatus, notesFetchStatus, notesError } = useNotes();
  console.log(notes, notesStatus, notesFetchStatus, notesError);

  // TODO
  // const orderedNotes = useAppSelector(selectFilteredAndOrderedNotes);

  // const selectedNoteId = useStore(
  //   notesStore,
  //   (state) => state.selectedNote?.id,
  // );

  // const isCreatingNewNote = useStore(
  //   uiStore,
  //   (state) => state.isCreatingNewNote,
  // );

  // TODO
  // useEffect(() => {
  //   if (isCreatingNewNote === true || isLoading === true || isFetching === true)
  //     return;

  //   if (orderedNotes.length === 0) {
  //     if (selectedNoteId) {
  //       setSelectedNote({ selectedNote: null });
  //       setDraftNote({ draftNote: null });

  //       incrementEditorResetKey();
  //     }

  //     return;
  //   }

  //   const exists = orderedNotes.some((n) => n.id === selectedNoteId);

  //   if (!exists) {
  //     if (selectedNoteId) return;

  //     setSelectedNote({ selectedNote: orderedNotes[0] });
  //     setDraftNote({ draftNote: orderedNotes[0] });

  //     incrementEditorResetKey();
  //   }
  // }, [
  //   orderedNotes.length,
  //   selectedNoteId,
  //   isCreatingNewNote,
  //   isLoading,
  //   dispatch,
  // ]);

  return (
    <div className="thin-scrollbar flex flex-col gap-1 overflow-y-auto px-3 py-4 [scrollbar-gutter:stable]">
      <NotesListNewNoteButton />

      {notesStatus === "pending"
        ? [...Array(5)].map((_, i) => <NotesListNoteSkeleton key={i} />)
        : // : orderedNotes.map((note) => (
          notes.map((note) => <NotesListNote key={note.id} note={note} />)}
    </div>
  );
}

export default NotesListLayout;
