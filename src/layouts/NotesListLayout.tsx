import { useIsMutating } from "@tanstack/react-query";

import { useAutoSelect } from "../hooks/useAutoSelect.ts";
import { useOrderedNotes } from "../hooks/useOrderedNotes.ts";

import NotesListNewNoteButton from "../components/noteslist/NotesListNewNoteButton.tsx";
import NotesListNote from "../components/noteslist/NotesListNote.tsx";
import NotesListNoteSkeleton from "../components/noteslist/NotesListNoteSkeleton.tsx";

function NotesListLayout() {
  const { orderedNotes, notesStatus } = useOrderedNotes();

  const isCreating = useIsMutating({ mutationKey: ["notes", "create"] });

  useAutoSelect({ orderedNotes, notesStatus });

  return (
    <div className="thin-scrollbar flex flex-col gap-1 overflow-y-auto px-3 py-4 [scrollbar-gutter:stable]">
      <NotesListNewNoteButton />

      {!!isCreating && <NotesListNoteSkeleton />}

      {notesStatus === "pending"
        ? [...Array(5)].map((_, i) => <NotesListNoteSkeleton key={i} />)
        : orderedNotes.map((note) => (
            <NotesListNote key={note.id} note={note} />
          ))}
    </div>
  );
}

export default NotesListLayout;
