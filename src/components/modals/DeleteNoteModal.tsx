import { useStore } from "@tanstack/react-store";

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

import { useDeleteNote } from "../../hooks/useDeleteNote.ts";

import CancelButton from "../buttons/CancelButton.tsx";
import ConfirmButton from "../buttons/ConfirmButton.tsx";
import FormSpinner from "../FormSpinner.tsx";
import ModalDescription from "../ModalDescription.tsx";
import ModalHeader from "../ModalHeader.tsx";

function DeleteNoteModal() {
  const { deleteNote, deleteNoteStatus } = useDeleteNote();

  const selectedNoteId = useStore(
    notesStore,
    (state) => state.selectedNote?.id,
  );
  const selectedNoteTitle = useStore(
    notesStore,
    (state) => state.selectedNote?.title,
  );

  const handleDelete = async () => {
    if (!selectedNoteId) return;

    deleteNote(
      { noteId: selectedNoteId },
      {
        onSuccess: () => {
          setSelectedNote({ selectedNote: null });
          setDraftNote({ draftNote: null });

          setIsCreatingNewNote({ isCreatingNewNote: false });
          setIsDirty({ isDirty: false });
          incrementEditorResetKey();
        },
        onSettled: () => {
          closeModal();
        },
      },
    );
  };

  const modalTitle =
    selectedNoteTitle!.length > 15
      ? `${selectedNoteTitle!.slice(0, 15)}...`
      : selectedNoteTitle!;

  return (
    <div className="flex min-w-lg flex-col gap-3 p-6">
      {deleteNoteStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Delete "${modalTitle}" Note?`} />

      <ModalDescription description="Want to clean up your workspace? Deleting this note will remove it permanently from your collection in Notioneer!" />

      <div className="border-t-mark flex justify-end gap-2 border-t pt-3">
        <ConfirmButton label="Yes, Delete" onClick={handleDelete} />

        <CancelButton label="Cancel" onClick={closeModal} />
      </div>
    </div>
  );
}

export default DeleteNoteModal;
