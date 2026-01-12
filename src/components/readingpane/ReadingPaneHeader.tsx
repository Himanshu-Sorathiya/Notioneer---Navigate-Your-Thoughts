import { selectSelectedNote } from "../../store/notesSlice.ts";

import { useAppSelector } from "../../hooks/hooks.ts";

import Icon from "../Icon.tsx";

function ReadingPaneHeader() {
  const selectedNote = useAppSelector(selectSelectedNote);

  if (!selectedNote) return null;

  return (
    <div className="border-b-surface flex flex-col gap-3 border-b pb-3">
      <div className="text-2xl font-bold">{selectedNote.title}</div>

      <div className="grid grid-cols-[1fr_4fr] gap-2">
        <div className="flex items-center gap-1.5">
          <Icon id="icon-tag" className="size-5"></Icon>

          <span className="text-gray-300">Tags</span>
        </div>

        <span className="font-semibold">{selectedNote.tags.join(", ")}</span>
      </div>

      <div className="grid grid-cols-[1fr_4fr] gap-2">
        <div className="flex items-center gap-1.5">
          <Icon id="icon-clock" className="size-5"></Icon>

          <span className="text-gray-300">Last Edited</span>
        </div>

        <span className="font-semibold">{selectedNote.updated_at}</span>
      </div>
    </div>
  );
}

export default ReadingPaneHeader;
