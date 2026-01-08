import type { Note } from "../../types/note.ts";

function ReadingPaneContent({ note }: { note: Note }) {
  return (
    <div className="text-strong thin-scrollbar -mx-5 flex-1 overflow-y-auto px-5 whitespace-pre-wrap">
      {note?.content}
    </div>
  );
}

export default ReadingPaneContent;
