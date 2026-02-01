import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNoteApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useCreateNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["notes", "create"],
    mutationFn: createNoteApi,

    onSuccess: (newNote) => {
      queryClient.setQueryData(["notes"], (oldNotes: Note[] | undefined) => {
        const existingNotes = oldNotes || [];

        return [newNote, ...existingNotes];
      });
    },
  });

  return {
    createdNote: data,
    createNoteStatus: status,
    createNoteError: error,
    createNote: mutate,
  };
}

export { useCreateNote };
