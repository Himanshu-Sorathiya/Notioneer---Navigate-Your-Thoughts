import { useDispatch } from "react-redux";

import { setCurrentNote } from "../../store/notesSlice.ts";
import { setMode } from "../../store/uiSlice.ts";

import type { Note } from "../../types/note.ts";

function ReadingPaneContent({ note }: { note: Note }) {
  const dispatch = useDispatch();

  return (
    <div
      className="text-strong thin-scrollbar -mx-5 flex-1 overflow-y-auto px-5 whitespace-pre-wrap"
      onClick={() => {
        dispatch(setMode("edit"));

        dispatch(setCurrentNote(note));
      }}
    >
      {note?.content}
    </div>
  );
}

export default ReadingPaneContent;
