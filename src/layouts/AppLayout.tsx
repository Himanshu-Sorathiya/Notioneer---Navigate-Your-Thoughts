import { useIsMutating } from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";
import { Toaster } from "react-hot-toast";

import ActionPanelLayout from "./ActionPaneLayout.tsx";
import EditorPaneLayout from "./EditorPaneLayout.tsx";
import ModalLayout from "./ModalLayout.tsx";
import NotesListLayout from "./NotesListLayout.tsx";
import SideBarLayout from "./SideBarLayout.tsx";
import TopBarLayout from "./TopBarLayout.tsx";

import { filterStore } from "../store/filter.ts";
import { modalStore } from "../store/modal.ts";
import { notesStore } from "../store/notes.ts";

import { useNotes } from "../hooks/useNotes.ts";

import FlowLoader from "../components/FlowLoader.tsx";
import ArchiveNoteModal from "../components/modals/ArchiveNoteModal.tsx";
import DeleteNoteModal from "../components/modals/DeleteNoteModal.tsx";
import DiscardChangesModal from "../components/modals/DiscardChangesModal.tsx";

function AppLayout() {
  const { notesStatus } = useNotes();

  const selectedNote = useStore(notesStore, (state) => state.selectedNote);

  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);

  const id = useStore(modalStore, (state) => state.id);
  const note = useStore(modalStore, (state) => state.data);

  const mutatingCount = useIsMutating();

  return (
    <div className="bg-base text-strong font-inter relative grid h-screen w-screen grid-cols-[4fr_20fr] overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1d23",
            color: "#f3f5f8",
            border: "1px solid #335cff",
            padding: "12px 16px",
            fontSize: "14px",
            borderRadius: "8px",
            width: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          },
          success: {
            iconTheme: {
              primary: "#335cff",
              secondary: "#f3f5f8",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4b4b",
              secondary: "#f3f5f8",
            },
          },
        }}
      />

      {id &&
        ["confirm_archive", "confirm_delete", "discard_changes"].includes(
          id,
        ) && (
          <ModalLayout>
            {id === "confirm_archive" && selectedNote && (
              <ArchiveNoteModal
                note={selectedNote}
                isArchived={isArchivedView}
              />
            )}

            {id === "confirm_delete" && selectedNote && (
              <DeleteNoteModal note={selectedNote} />
            )}

            {id === "discard_changes" && selectedNote && (
              <DiscardChangesModal note={note} />
            )}
          </ModalLayout>
        )}

      <SideBarLayout />

      <div className="grid grid-cols-[5fr_11fr_4fr] grid-rows-[auto_minmax(0,1fr)] overflow-hidden pr-6">
        <TopBarLayout />

        <NotesListLayout />

        <EditorPaneLayout />

        <ActionPanelLayout />
      </div>

      {mutatingCount > 0 && (
        <div className="absolute inset-0 z-60 cursor-wait" />
      )}

      {notesStatus === "pending" && <FlowLoader />}
    </div>
  );
}

export default AppLayout;
