import { useQuery } from "@tanstack/react-query";

import { getNotes } from "../services/apiNotes.ts";

import type { Note } from "../types/note.ts";

function useNotes() {
  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return {
    notes: data,
    notesStatus: status,
    notesFetchStatus: fetchStatus,
    notesError: error,
  };
}

export default useNotes;
