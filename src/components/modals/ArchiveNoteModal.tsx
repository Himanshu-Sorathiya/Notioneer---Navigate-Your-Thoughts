import { useStore } from "@tanstack/react-store";

import { filterStore } from "../../store/filter.ts";
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

import { useUpdateNote } from "../../hooks/useUpdateNote.ts";

import CancelButton from "../buttons/CancelButton.tsx";
import ConfirmButton from "../buttons/ConfirmButton.tsx";
import FormSpinner from "../FormSpinner.tsx";
import ModalDescription from "../ModalDescription.tsx";
import ModalHeader from "../ModalHeader.tsx";

function ArchiveNoteModal() {
  const { updateNote, updateNoteStatus } = useUpdateNote();

  const selectedNote = useStore(notesStore, (state) => state.selectedNote);

  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);

  const handleToggle = async () => {
    if (!selectedNote?.id) return;

    updateNote(
      {
        noteId: selectedNote.id,
        updates: {
          ...("is_archived" in selectedNote && {
            is_archived: !selectedNote.is_archived,
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
    selectedNote!.title.length > 15
      ? `${selectedNote!.title.slice(0, 15)}...`
      : selectedNote!.title;

  const modalTitle = isArchivedView
    ? `Unarchive "${titlePreview}" Note?`
    : `Archive "${titlePreview}" Note?`;

  const description = isArchivedView
    ? "Ready to bring this note back? Unarchiving will return it to your main notes list so you can access it easily in Notioneer!"
    : "Ready to tuck this note away? Archiving will move it out of your main view, keeping your workspace clean and focused with Notioneer!";

  const confirmLabel = isArchivedView ? "Yes, Unarchive" : "Yes, Archive";

  return (
    <div className="relative flex min-w-lg flex-col gap-3 p-6 backdrop-blur-xs">
      {updateNoteStatus === "pending" && <FormSpinner />}

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
