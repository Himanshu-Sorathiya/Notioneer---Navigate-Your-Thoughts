import { useSelector } from "react-redux";

import type { RootState } from "../store/store.ts";

import ReadingPaneContent from "../components/readingpane/ReadingPaneContent.tsx";
import ReadingPaneHeader from "../components/readingpane/ReadingPaneHeader.tsx";

function ReadingPaneLayout() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote,
  );

  const note = notes.find((note) => note.id === selectedNote?.id);

  if (!note)
    return (
      <div className="border-x-surface flex flex-col gap-2 border-x p-5"></div>
    );

  return (
    <div className="border-x-surface flex h-full flex-col gap-2 border-x p-5">
      <ReadingPaneHeader note={note} />

      <ReadingPaneContent note={note} />
    </div>
  );
}

export default ReadingPaneLayout;
