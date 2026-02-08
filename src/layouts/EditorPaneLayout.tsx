import { useIsMutating } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { notesStore } from "../store/notes.ts";

import { useNotes } from "../hooks/useNotes.ts";

import EditorPaneActions from "../components/editorpane/EditorPaneActions.tsx";
import EditorPaneContent from "../components/editorpane/EditorPaneContent.tsx";
import EditorPaneContentSkeleton from "../components/editorpane/EditorPaneContentSkeleton.tsx";
import EditorPaneEmptyState from "../components/editorpane/EditorPaneEmptyState.tsx";
import EditorPaneHeader from "../components/editorpane/EditorPaneHeader.tsx";
import EditorPaneHeaderSkeleton from "../components/editorpane/EditorPaneHeaderSkeleton.tsx";
import FlowLoader from "../components/FlowLoader.tsx";

function EditorPaneLayout() {
  const { notesStatus } = useNotes();

  const mutatingCount = useIsMutating();

  const draftNoteId = useStore(notesStore, (state) => state.draftNote?.id);

  return (
    <div className="border-x-surface relative flex h-full flex-col gap-2 overflow-hidden border-x p-5">
      {mutatingCount > 0 && <FlowLoader />}

      {notesStatus === "pending" ? (
        <>
          <EditorPaneHeaderSkeleton />
          <EditorPaneContentSkeleton />
        </>
      ) : draftNoteId ? (
        <>
          <EditorPaneHeader />
          <EditorPaneContent />
          <EditorPaneActions />
        </>
      ) : (
        <EditorPaneEmptyState />
      )}
    </div>
  );
}

export default EditorPaneLayout;
