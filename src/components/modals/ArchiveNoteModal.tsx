import { closeModal } from "../../store/modal.ts";
import { setDraftNote, setSelectedNote } from "../../store/notes.ts";
import {
  incrementEditorResetKey,
  setIsCreatingNewNote,
  setIsDirty,
} from "../../store/ui.ts";

import { useUpdateNote } from "../../hooks/useUpdateNote.ts";

import CancelButton from "../buttons/CancelButton.tsx";
import ConfirmButton from "../buttons/ConfirmButton.tsx";
import ModalDescription from "../ModalDescription.tsx";
import ModalHeader from "../ModalHeader.tsx";

import type { Note } from "../../types/note.ts";

function ArchiveNoteModal({
  note,
  isArchived,
}: {
  note: Note;
  isArchived: boolean;
}) {
  const { updateNote } = useUpdateNote();

  const handleToggle = async () => {
    if (!note) return;

    updateNote(
      {
        noteId: note.id,
        updates: {
          ...("is_archived" in note && {
            is_archived: !note.is_archived,
          }),
        },
      },
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

  const titlePreview =
    note?.title.length > 15 ? `${note.title.slice(0, 15)}...` : note?.title;

  const modalTitle = isArchived
    ? `Unarchive "${titlePreview}"?`
    : `Archive "${titlePreview}"?`;

  const description = isArchived
    ? "Ready to bring this note back? Unarchiving will return it to your main notes list so you can access it easily in Notioneer!"
    : "Ready to tuck this note away? Archiving will move it out of your main view, keeping your workspace clean and focused with Notioneer!";

  const confirmLabel = isArchived ? "Yes, Unarchive" : "Yes, Archive";

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title={modalTitle} />

      <ModalDescription description={description} />

      <div className="border-t-mark flex justify-end gap-2 border-t pt-3">
        <ConfirmButton label={confirmLabel} onClick={handleToggle} />

        <CancelButton label="Cancel" onClick={closeModal} />
      </div>
    </div>
  );
}

export default ArchiveNoteModal;
