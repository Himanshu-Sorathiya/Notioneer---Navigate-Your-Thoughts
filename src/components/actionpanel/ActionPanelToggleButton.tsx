import {
  selectSelectedNoteArchiveStatus,
  selectSelectedNoteId,
  setSelectedNote,
  toggleArchive,
} from "../../store/notesSlice.ts";
import { incrementEditorResetKey, setIsDirty } from "../../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

import Icon from "../Icon.tsx";

function ActionPanelToggleButton() {
  const selectedNoteId = useAppSelector(selectSelectedNoteId);
  const selectedNoteArchiveStatus = useAppSelector(
    selectSelectedNoteArchiveStatus,
  );

  const dispatch = useAppDispatch();

  if (!selectedNoteId) return null;

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 transition-all duration-150"
      onClick={() => {
        dispatch(toggleArchive(selectedNoteId));

        dispatch(setSelectedNote(null));

        dispatch(setIsDirty(false));

        dispatch(incrementEditorResetKey());
      }}
    >
      <Icon
        id={`${selectedNoteArchiveStatus === false ? "icon-archive-notes" : "icon-unarchive-notes"}`}
        className="size-5"
      ></Icon>

      <span>
        {selectedNoteArchiveStatus ? "Unarchive Note" : "Archive Note"}
      </span>
    </button>
  );
}

export default ActionPanelToggleButton;
