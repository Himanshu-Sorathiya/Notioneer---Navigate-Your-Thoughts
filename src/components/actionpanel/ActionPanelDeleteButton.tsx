import {
  deleteNote,
  selectSelectedNoteId,
  setSelectedNote,
} from "../../store/notesSlice.ts";
import { incrementEditorResetKey, setIsDirty } from "../../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

import Icon from "../Icon.tsx";

function ActionPanelButton() {
  const selectedNoteId = useAppSelector(selectSelectedNoteId);

  const dispatch = useAppDispatch();

  if (!selectedNoteId) return null;

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 transition-all duration-150"
      onClick={() => {
        dispatch(deleteNote(selectedNoteId));

        dispatch(setSelectedNote(null));

        dispatch(setIsDirty(false));

        dispatch(incrementEditorResetKey());
      }}
    >
      <Icon id="icon-trash" className="size-5"></Icon>

      <span>Delete Note</span>
    </button>
  );
}

export default ActionPanelButton;
