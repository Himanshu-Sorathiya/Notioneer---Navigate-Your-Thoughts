import { useSelector } from "react-redux";

import type { RootState } from "../store/store.ts";

import { notes } from "../constants/data.ts";

function EditorPaneLayout() {
  const selectedNote = useSelector((state: RootState) => state.ui.selectedNote);

  const note = notes.find((note) => note.id === selectedNote);

  if (!note)
    return (
      <div className="border-x-surface flex flex-col gap-2 border-x p-5"></div>
    );

  return (
    <div className="border-x-surface flex h-full flex-col gap-2 border-x p-5">
      <div className="border-b-surface flex flex-col gap-3 border-b pb-3">
        <div className="text-2xl font-bold">{note?.title}</div>

        <div className="grid grid-cols-[1fr_4fr] gap-2">
          <span className="text-gray-300">Tags</span>

          <span className="font-semibold">{note?.tags.join(", ")}</span>
        </div>

        <div className="grid grid-cols-[1fr_4fr] gap-2">
          <span className="text-gray-300">Last Edited</span>

          <span className="font-semibold">{note?.lastEdited}</span>
        </div>
      </div>

      <div className="text-strong thin-scrollbar -mx-5 flex-1 overflow-y-auto px-5 whitespace-pre-wrap">
        {note?.content}
      </div>

      <div className="border-t-surface flex justify-end gap-2 border-t pt-3">
        <button className="bg-main text-strong cursor-pointer rounded-lg px-4 py-2 text-center transition-all duration-150 hover:bg-[#2547d0]">
          Save
        </button>

        <button className="bg-muted hover:bg-focus cursor-pointer rounded-lg px-4 py-2 text-center transition-all duration-150">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditorPaneLayout;
