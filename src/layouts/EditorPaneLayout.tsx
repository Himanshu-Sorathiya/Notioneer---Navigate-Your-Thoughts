import { useSelector } from "react-redux";

import type { RootState } from "../store/store.ts";

import EditorPaneActions from "../components/editorpane/EditorPaneActions.tsx";
import EditorPaneContent from "../components/editorpane/EditorPaneContent.tsx";
import EditorPaneHeader from "../components/editorpane/EditorPaneHeader.tsx";

function EditorPaneLayout() {
  const draftNote = useSelector(
    (state: RootState) => state.notes.draftNote,
  );

  return (
    <div className="border-x-surface flex h-full flex-col gap-2 border-x p-5">
      {draftNote && (
        <>
          <EditorPaneHeader />

          <EditorPaneContent />

          <EditorPaneActions />
        </>
      )}
    </div>
  );
}

export default EditorPaneLayout;
