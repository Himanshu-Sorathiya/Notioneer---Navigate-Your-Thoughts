import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteNoteApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useDeleteNote() {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["notes", "delete"],
    mutationFn: deleteNoteApi,

    onMutate: ({}) => {
      toast.loading("Clearing the path...", { id: "note-action" });
    },
    onSuccess: (_, { noteId }) => {
      queryClient.setQueryData(["notes"], (oldNotes: Note[] | undefined) => {
        return oldNotes?.filter((note) => note.id !== noteId);
      });

      toast.success("Note removed. Mental map realigned!", {
        id: "note-action",
      });
    },
    onError: () => {
      toast.error(
        "Whoops! Couldn’t delete the note. Give it another shot and let’s get you back on track!",
        {
          id: "note-action",
        },
      );
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
