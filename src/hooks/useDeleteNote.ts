import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteApi } from "../services/apiNotes.ts";

function useDeleteNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: deleteNoteApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
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
