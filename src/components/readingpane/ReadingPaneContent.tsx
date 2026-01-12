import { selectSelectedNote } from "../../store/notesSlice.ts";

import { useAppSelector } from "../../hooks/hooks.ts";

function ReadingPaneContent() {
  const selectedNote = useAppSelector(selectSelectedNote);

  if (!selectedNote) return null;

  return (
    <div className="text-strong thin-scrollbar -mx-5 flex-1 overflow-y-auto px-5 whitespace-pre-wrap">
      {selectedNote.content}
    </div>
  );
}

export default ReadingPaneContent;
