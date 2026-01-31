import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNoteApi } from "../services/apiNotes.ts";

function useCreateNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: createNoteApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
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
