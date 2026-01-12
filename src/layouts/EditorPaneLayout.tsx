import { selectDraftNoteId } from "../store/notesSlice.ts";

import { useAppSelector } from "../hooks/hooks.ts";

import EditorPaneActions from "../components/editorpane/EditorPaneActions.tsx";
import EditorPaneContent from "../components/editorpane/EditorPaneContent.tsx";
import EditorPaneHeader from "../components/editorpane/EditorPaneHeader.tsx";

function EditorPaneLayout() {
  const draftNoteId = useAppSelector(selectDraftNoteId);

  return (
    <div className="border-x-surface flex h-full flex-col gap-2 border-x p-5">
      {draftNoteId && (
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
