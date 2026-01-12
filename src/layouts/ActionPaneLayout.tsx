import { useAppSelector } from "../hooks/hooks.ts";

import ActionPanelDeleteButton from "../components/actionpanel/ActionPanelDeleteButton.tsx";
import ActionPanelToggleButton from "../components/actionpanel/ActionPanelToggleButton.tsx";
import { selectSelectedNoteId } from "../store/notesSlice.ts";

function ActionPanelLayout() {
  const selectedNoteId = useAppSelector(selectSelectedNoteId);

  if (!selectedNoteId) return null;

  return (
    <div className="flex flex-col gap-3 px-3 py-4">
      <ActionPanelToggleButton />

      <ActionPanelDeleteButton />
    </div>
  );
}

export default ActionPanelLayout;
