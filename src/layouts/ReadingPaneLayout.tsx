import { useStore } from "@tanstack/react-store";

import { notesStore } from "../store/notes.ts";

import ReadingPaneContent from "../components/readingpane/ReadingPaneContent.tsx";
import ReadingPaneHeader from "../components/readingpane/ReadingPaneHeader.tsx";

function ReadingPaneLayout() {
  const selectedNoteId = useStore(
    notesStore,
    (state) => state.selectedNote?.id,
  );

  if (!selectedNoteId)
    return (
      <div className="border-x-surface flex flex-col gap-2 border-x p-5"></div>
    );

  return (
    <div className="border-x-surface flex h-full flex-col gap-2 border-x p-5">
      <ReadingPaneHeader />

      <ReadingPaneContent />
    </div>
  );
}

export default ReadingPaneLayout;
