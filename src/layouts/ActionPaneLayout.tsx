import { useSelector } from "react-redux";

import type { RootState } from "../store/store.ts";

import ActionPanelDeleteButton from "../components/actionpanel/ActionPanelDeleteButton.tsx";
import ActionPanelToggleButton from "../components/actionpanel/ActionPanelToggleButton.tsx";

function ActionPanelLayout() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const selectedNote = useSelector((state: RootState) => state.ui.selectedNote);

  const note = notes.find((note) => note.id === selectedNote);

  if (!note) return null;

  return (
    <div className="flex flex-col gap-3 px-3 py-4">
      <ActionPanelToggleButton note={note} />

      <ActionPanelDeleteButton note={note} />
    </div>
  );
}

export default ActionPanelLayout;
