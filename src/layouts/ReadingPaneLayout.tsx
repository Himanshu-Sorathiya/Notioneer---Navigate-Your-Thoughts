import { selectSelectedNote } from "../store/notesSlice.ts";

import { useAppSelector } from "../hooks/hooks.ts";

import ReadingPaneContent from "../components/readingpane/ReadingPaneContent.tsx";
import ReadingPaneHeader from "../components/readingpane/ReadingPaneHeader.tsx";

function ReadingPaneLayout() {
  const selectedNote = useAppSelector(selectSelectedNote);

  if (!selectedNote)
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
