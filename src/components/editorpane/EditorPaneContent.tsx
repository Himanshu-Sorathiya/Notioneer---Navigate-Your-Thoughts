import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setDraftNote } from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";
import { setIsDirty } from "../../store/uiSlice.ts";

function EditorPaneContent() {
  const draftNote = useSelector((state: RootState) => state.notes.draftNote);

  const editorResetKey = useSelector(
    (state: RootState) => state.ui.editorResetKey,
  );

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && draftNote) {
      ref.current.textContent = draftNote.content;
    }
  }, [editorResetKey]);

  return (
    <div
      ref={ref}
      className={`text-strong thin-scrollbar relative -mx-5 flex-1 overflow-y-auto rounded-sm px-5 whitespace-pre-wrap ${
        !draftNote?.content
          ? "before:pointer-events-none before:absolute before:text-gray-400 before:content-[attr(data-placeholder)] before:select-none"
          : ""
      }`}
      data-placeholder="Start writing your note here..."
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={(e) => {
        dispatch(
          setDraftNote({
            ...draftNote,
            content: e.currentTarget.textContent || "",
          }),
        );

        dispatch(setIsDirty(true));
      }}
    ></div>
  );
}

export default EditorPaneContent;
