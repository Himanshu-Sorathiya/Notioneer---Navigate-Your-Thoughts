import { useStore } from "@tanstack/react-store";

import { resetFilters } from "../../store/filter.ts";
import { closeModal } from "../../store/modal.ts";
import {
  notesStore,
  setDraftNote,
  setSelectedNote,
} from "../../store/notes.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/ui.ts";

import CancelButton from "../buttons/CancelButton.tsx";
import ConfirmButton from "../buttons/ConfirmButton.tsx";
import ModalDescription from "../ModalDescription.tsx";
import ModalHeader from "../ModalHeader.tsx";

import type { Note } from "../../types/note.ts";

import { createEmptyNote } from "../../utilities/noteUtils.ts";

function DiscardChangesModal({ note }: { note: Note | null }) {
  const selectedNote = useStore(notesStore, (state) => state.selectedNote);

  function handleDiscard() {
    setIsDirty({ isDirty: false });

    if (note) {
      setIsCreatingNewNote({ isCreatingNewNote: false });

      setSelectedNote({ selectedNote: note });
      setDraftNote({ draftNote: note });
    } else {
      setIsCreatingNewNote({ isCreatingNewNote: true });

      setSelectedNote({ selectedNote: null });
      setDraftNote({ draftNote: createEmptyNote() });

      resetFilters();
    }

    incrementEditorResetKey();

    closeModal();
  }

  const isNewNote = !note;
  const isReverting = note?.id === selectedNote?.id;

  const description = isNewNote
    ? "Are you sure you want to discard your changes? Starting a new note will lose your current unsaved progress."
    : isReverting
      ? "Are you sure you want to discard your changes? This will revert the note to its last saved state."
      : "Are you sure you want to discard your changes? Moving to another note will lose your unsaved progress.";

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title="Discard changes?" />

      <ModalDescription description={description} />

      <div className="border-t-mark flex justify-end gap-2 border-t pt-3">
        <ConfirmButton label="Yes, Discard" onClick={handleDiscard} />

        <CancelButton label="No, Keep Editing" onClick={closeModal} />
      </div>
    </div>
  );
}

export default DiscardChangesModal;
