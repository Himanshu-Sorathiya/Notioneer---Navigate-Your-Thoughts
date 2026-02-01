import { useMemo } from "react";

import { useStore } from "@tanstack/react-store";

import { filterStore } from "../store/filter.ts";

import { useNotes } from "../hooks/useNotes.ts";

export function useOrderedNotes() {
  const { notes, notesStatus } = useNotes();

  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);
  const selectedTag = useStore(filterStore, (state) => state.selectedTag);
  const searchFilter = useStore(filterStore, (state) => state.searchFilter);

  const orderedNotes = useMemo(() => {
    const query = searchFilter.toLowerCase();

    let filtered = notes.filter((note) => {
      const matchesArchive = note.is_archived === isArchivedView;
      const matchesTag = !selectedTag || note.tags.includes(selectedTag);
      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some((t) => t.toLowerCase().includes(query));

      return matchesArchive && matchesTag && matchesSearch;
    });

    if (!query) {
      return [...filtered].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
    }

    return [...filtered].sort((a, b) => {
      const getScore = (n: typeof a) => {
        if (n.title.toLowerCase().includes(query)) return 2;
        if (n.tags.some((t) => t.toLowerCase().includes(query))) return 1;
        return 0;
      };

      const scoreA = getScore(a);
      const scoreB = getScore(b);

      return scoreA !== scoreB
        ? scoreB - scoreA
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [notes, isArchivedView, selectedTag, searchFilter]);

  return { orderedNotes, notesStatus };
}
