import { useStore } from "@tanstack/react-store";

import { notesStore } from "../store/notes.ts";

import ActionPanelDeleteButton from "../components/actionpanel/ActionPanelDeleteButton.tsx";
import ActionPanelToggleButton from "../components/actionpanel/ActionPanelToggleButton.tsx";

function ActionPanelLayout() {
  const selectedNoteId = useStore(
    notesStore,
    (state) => state.selectedNote?.id,
  );

  if (!selectedNoteId) return null;

  return (
    <div className="flex flex-col gap-3 px-3 py-4">
      <ActionPanelToggleButton />

      <ActionPanelDeleteButton />
    </div>
  );
}

export default ActionPanelLayout;
