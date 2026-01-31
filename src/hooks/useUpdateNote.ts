import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNoteApi } from "../services/apiNotes.ts";

function useUpdateNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: updateNoteApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
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
