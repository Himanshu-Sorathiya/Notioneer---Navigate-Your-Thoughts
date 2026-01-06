import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setCurrentNote } from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";

function EditorPaneContent() {
  const currentNote = useSelector(
    (state: RootState) => state.notes.currentNote,
  );

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && currentNote) {
      ref.current.textContent = currentNote.content;
    }
  }, [currentNote?.id]);

  return (
    <div
      ref={ref}
      className={`text-strong thin-scrollbar relative -mx-5 flex-1 overflow-y-auto rounded-sm px-5 whitespace-pre-wrap ${
        !currentNote?.content
          ? "before:pointer-events-none before:absolute before:text-gray-400 before:content-[attr(data-placeholder)] before:select-none"
          : ""
      }`}
      data-placeholder="Start writing your note here..."
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={(e) =>
        dispatch(
          setCurrentNote({
            ...currentNote,
            content: e.currentTarget.textContent || "",
          }),
        )
      }
    ></div>
  );
}

export default EditorPaneContent;
