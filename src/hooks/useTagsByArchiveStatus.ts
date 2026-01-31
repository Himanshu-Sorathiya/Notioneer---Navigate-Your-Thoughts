import { useMemo } from "react";

import { useNotes } from "./useNotes.ts";

function useTagsByArchiveStatus(isArchived: boolean) {
  const { notes, notesStatus } = useNotes();

  const tags = useMemo(() => {
    return Array.from(
      new Set(
        notes
          .filter((note) => note.is_archived === isArchived)
          .flatMap((note) => note.tags),
      ),
    );
  }, [notes, isArchived]);

  return { tags, notesStatus };
}

export { useTagsByArchiveStatus };
