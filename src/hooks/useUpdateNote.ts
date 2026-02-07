import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateNoteApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useUpdateNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["notes", "update"],
    mutationFn: updateNoteApi,
    onMutate: ({}) => {
      toast.loading("Mapping out your thoughts...", { id: "note-action" });
    },
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes"], (oldNotes: Note[]) => {
        return oldNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        );
      });

      toast.success("Note updated successfully. Keep your journey organized!", {
        id: "note-action",
      });
    },
    onError: () => {
      toast.error(
        "Whoops! Something went wrong while updating the note. Give it another shot and let’s get you back on track!",
        {
          id: "note-action",
        },
      );
    },
  });

  return {
    updatedNote: data,
    updateNoteStatus: status,
    updateNoteError: error,
    updateNote: mutate,
  };
}

export { useUpdateNote };
