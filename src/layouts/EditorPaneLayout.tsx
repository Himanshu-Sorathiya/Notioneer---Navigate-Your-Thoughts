import { useIsMutating } from "@tanstack/react-query";

import { useNotes } from "../hooks/useNotes.ts";

import EditorPaneActions from "../components/editorpane/EditorPaneActions.tsx";
import EditorPaneContent from "../components/editorpane/EditorPaneContent.tsx";
import EditorPaneContentSkeleton from "../components/editorpane/EditorPaneContentSkeleton.tsx";
import EditorPaneHeader from "../components/editorpane/EditorPaneHeader.tsx";
import EditorPaneHeaderSkeleton from "../components/editorpane/EditorPaneHeaderSkeleton.tsx";

function EditorPaneLayout() {
  const { notesStatus } = useNotes();

  const mutatingCount = useIsMutating();

  return (
    <div className="border-x-surface relative flex h-full flex-col gap-2 overflow-hidden border-x p-5">
      {mutatingCount > 0 && (
        <>
          <div className="bg-main animate-main-progress absolute top-0 left-0 z-50 h-1 delay-1000"></div>

          <div className="bg-main animate-entry-progress absolute top-0 left-[-25%] z-50 h-1"></div>
        </>
      )}

      {notesStatus === "pending" ? (
        <>
          <EditorPaneHeaderSkeleton />
          <EditorPaneContentSkeleton />
        </>
      ) : (
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
