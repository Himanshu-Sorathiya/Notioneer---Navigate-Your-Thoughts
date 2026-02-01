import { useEffect, useRef } from "react";

import { useStore } from "@tanstack/react-store";

import { notesStore, updateDraftField } from "../../store/notes.ts";
import { setIsDirty, uiStore } from "../../store/ui.ts";

function EditorPaneContent() {
  const draftNoteContent = useStore(
    notesStore,
    (state) => state.draftNote?.content,
  );

  const editorResetKey = useStore(uiStore, (state) => state.editorResetKey);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerText = draftNoteContent || "";
    }
  }, [editorResetKey]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText || "";

    const cleanValue = value.trim() === "" ? "" : value;

    updateDraftField({ field: "content", value: cleanValue });

    setIsDirty({ isDirty: true });
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
