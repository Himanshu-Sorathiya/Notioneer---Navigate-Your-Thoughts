import { useDispatch, useSelector } from "react-redux";

import { setCurrentNote } from "../../store/notesSlice.ts";
import type { RootState } from "../../store/store.ts";

import Icon from "../Icon.tsx";

function EditorPaneHeader() {
  const currentNote = useSelector(
    (state: RootState) => state.notes.currentNote,
  );

  const dispatch = useDispatch();

  return (
    <div className="border-b-surface flex flex-col gap-3 border-b pb-3">
      <input
        className="focus:outline-strong -m-1.5 rounded-sm p-1.5 text-2xl font-bold transition-all duration-150 focus:outline-1"
        value={currentNote?.title || ""}
        onChange={(e) =>
          dispatch(setCurrentNote({ ...currentNote, title: e.target.value }))
        }
        placeholder="Enter note title here"
      ></input>

      <div className="grid grid-cols-[1fr_4fr] gap-2">
        <div className="flex items-center gap-1.5">
          <Icon id="icon-tag" className="size-5"></Icon>

          <span className="text-gray-300">Tags</span>
        </div>

        <input
          className="focus:outline-strong -m-1.5 rounded-sm p-1.5 font-semibold transition-all duration-150 focus:outline-1"
          value={currentNote?.tags?.join(", ") || ""}
          onChange={(e) =>
            dispatch(
              setCurrentNote({
                ...currentNote,
                tags: e.target.value.split(", "),
              }),
            )
          }
          placeholder="Enter tags, comma separated (e.g., Work, Ideas)"
        ></input>
      </div>
    </div>
  );
}

export default EditorPaneHeader;
