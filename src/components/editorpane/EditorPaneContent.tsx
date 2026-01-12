import { useEffect, useRef } from "react";

import {
  selectDraftNoteContent,
  updateDraftField,
} from "../../store/notesSlice.ts";
import { selectEditorResetKey, setIsDirty } from "../../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

function EditorPaneContent() {
  const draftNoteContent = useAppSelector(selectDraftNoteContent);

  const editorResetKey = useAppSelector(selectEditorResetKey);

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = draftNoteContent;
    }
  }, [editorResetKey]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText || "";

    const cleanValue = value.trim() === "" ? "" : value;

    dispatch(updateDraftField({ field: "content", value: cleanValue }));

    dispatch(setIsDirty(true));
  };

  return (
    <div
      ref={ref}
      className={`text-strong thin-scrollbar placeholder-logic relative -mx-5 flex-1 overflow-y-auto rounded-sm px-5 whitespace-pre-wrap outline-none before:pointer-events-none before:absolute before:text-gray-400 before:content-[attr(data-placeholder)] before:select-none ${!draftNoteContent ? "is-empty" : ""}`}
      data-placeholder="Start writing your note here..."
      contentEditable={true}
      suppressContentEditableWarning={true}
      onInput={handleInput}
    ></div>
  );
}

export default EditorPaneContent;
