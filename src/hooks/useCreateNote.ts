import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createNoteApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useCreateNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["notes", "create"],
    mutationFn: createNoteApi,

    onMutate: ({}) => {
      toast.loading("Scribing your discovery...", { id: "note-action" });
    },
    onSuccess: (newNote) => {
      queryClient.setQueryData(["notes"], (oldNotes: Note[] | undefined) => {
        const existingNotes = oldNotes || [];

        return [newNote, ...existingNotes];
      });

      toast.success(
        "Note successfully added to your expedition. Keep exploring!",
        {
          id: "note-action",
        },
      );
    },
    onError: () => {
      toast.error(
        "Whoops! Something went wrong while capturing your thought. Give it another shot and let's get you back on track!",
        {
          id: "note-action",
        },
      );
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
