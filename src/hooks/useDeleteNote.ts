import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useDeleteNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["notes"],
    mutationFn: deleteNoteApi,

    onSuccess: (_, { noteId }) => {
      queryClient.setQueryData(["notes"], (oldNotes: Note[] | undefined) => {
        return oldNotes?.filter((note) => note.id !== noteId);
      });
    },
  });

  return {
    deletedNote: data,
    deleteNoteStatus: status,
    deleteNoteError: error,
    deleteNote: mutate,
  };
}

export { useDeleteNote };
