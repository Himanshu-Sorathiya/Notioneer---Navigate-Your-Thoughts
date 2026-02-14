import { useIsMutating } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { modalStore } from "../store/modal.ts";
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

  const id = useStore(modalStore, (state) => state.id);

  const draftNoteId = useStore(notesStore, (state) => state.draftNote?.id);

  const isMutating = mutatingCount > 0 && !id;

  return (
    <div className="border-x-surface relative flex h-full flex-col gap-2 overflow-hidden border-x p-5">
      {isMutating && <FlowLoader />}

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
