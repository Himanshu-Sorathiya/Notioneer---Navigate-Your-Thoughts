import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNoteApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useUpdateNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["notes"],
    mutationFn: updateNoteApi,

    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes"], (oldNotes: Note[]) => {
        return oldNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        );
      });
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
