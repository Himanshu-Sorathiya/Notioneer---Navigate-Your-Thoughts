import { closeModal } from "../../store/modal.ts";
import { setDraftNote, setSelectedNote } from "../../store/notes.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/ui.ts";

import { useDeleteNote } from "../../hooks/useDeleteNote.ts";

import CancelButton from "../buttons/CancelButton.tsx";
import ConfirmButton from "../buttons/ConfirmButton.tsx";
import ModalDescription from "../ModalDescription.tsx";
import ModalHeader from "../ModalHeader.tsx";

import type { Note } from "../../types/note.ts";

function DeleteNoteModal({ note }: { note: Note }) {
  const { deleteNote } = useDeleteNote();

  const handleDelete = async () => {
    if (!note.id) return;

    deleteNote(
      { noteId: note.id },
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
    note?.title.length > 15 ? `${note?.title.slice(0, 15)}...` : note?.title;

  return (
    <div className="flex min-w-lg flex-col gap-3">
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
