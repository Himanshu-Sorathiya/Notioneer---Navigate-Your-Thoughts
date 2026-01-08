import { useDispatch } from "react-redux";

import { deleteNote, setSelectedNote } from "../../store/notesSlice.ts";
import { incrementEditorResetKey } from "../../store/uiSlice.ts";

import Icon from "../Icon.tsx";

import type { Note } from "../../types/note.ts";

function ActionPanelButton({ note }: { note: Note }) {
  const dispatch = useDispatch();

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 transition-all duration-150"
      onClick={() => {
        dispatch(deleteNote(note.id));

        dispatch(setSelectedNote(null));

        dispatch(incrementEditorResetKey());
      }}
    >
      <Icon id="icon-trash" className="size-5"></Icon>

      <span>Delete Note</span>
    </button>
  );
}

export default ActionPanelButton;
