import { useIsMutating } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { filterStore } from "../store/filter.ts";

import { useAutoSelect } from "../hooks/useAutoSelect.ts";
import { useOrderedNotes } from "../hooks/useOrderedNotes.ts";

import NotesListEmptyState from "../components/noteslist/NotesListEmptyState.tsx";
import NotesListNewNoteButton from "../components/noteslist/NotesListNewNoteButton.tsx";
import NotesListNote from "../components/noteslist/NotesListNote.tsx";
import NotesListNoteSkeleton from "../components/noteslist/NotesListNoteSkeleton.tsx";

function NotesListLayout() {
  const { orderedNotes, notesStatus } = useOrderedNotes();

  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);

  const isCreating = useIsMutating({ mutationKey: ["notes", "create"] });

  useAutoSelect({ orderedNotes, notesStatus });

  return (
    <div className="thin-scrollbar flex flex-col gap-1 overflow-y-auto px-3 py-4 [scrollbar-gutter:stable]">
      {!isArchivedView && <NotesListNewNoteButton />}

      {notesStatus !== "pending" && orderedNotes.length === 0 && (
        <NotesListEmptyState />
      )}

      {!!isCreating && <NotesListNoteSkeleton />}

      {notesStatus === "pending"
        ? [...Array(5)].map((_, i) => <NotesListNoteSkeleton key={i} />)
        : orderedNotes.map((note, index) => (
            <NotesListNote key={note.id} note={note} index={index} />
          ))}
    </div>
  );
}

export default NotesListLayout;
