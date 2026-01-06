import { useDispatch } from "react-redux";

import { toggleArchive } from "../../store/notesSlice.ts";

import Icon from "../Icon.tsx";

import type { Note } from "../../types/note.ts";

function ActionPanelToggleButton({ note }: { note: Note }) {
  const dispatch = useDispatch();

  return (
    <button
      className="hover:text-main flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 text-center text-gray-300 transition-all duration-150"
      onClick={() => dispatch(toggleArchive(note.id))}
    >
      <Icon
        id={`${note?.isArchived === false ? "icon-archive-notes" : "icon-unarchive-notes"}`}
        className="size-5"
      ></Icon>

      <span>
        {note?.isArchived === false ? "Archive Note" : "Unarchive Note"}
      </span>
    </button>
  );
}

export default ActionPanelToggleButton;
