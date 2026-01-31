import { useQuery } from "@tanstack/react-query";

import { getNotesApi } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useNotes() {
  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: getNotesApi,
  });

  return {
    notes: data,
    notesStatus: status,
    notesFetchStatus: fetchStatus,
    notesError: error,
  };
}

export { useNotes };
