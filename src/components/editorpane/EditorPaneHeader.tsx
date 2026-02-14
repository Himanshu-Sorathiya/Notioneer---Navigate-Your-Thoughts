import { useStore } from "@tanstack/react-store";

import { notesStore, updateDraftField } from "../../store/notes.ts";
import { setIsDirty, uiStore } from "../../store/ui.ts";

import Icon from "../Icon.tsx";

function EditorPaneHeader() {
  const draftNoteId = useStore(notesStore, (state) => state.draftNote?.id);
  const draftNoteTitle = useStore(
    notesStore,
    (state) => state.draftNote?.title,
  );
  const draftNoteTags = useStore(notesStore, (state) => state.draftNote?.tags);
  const draftNoteUpdatedAt = useStore(
    notesStore,
    (state) => state.draftNote?.updated_at,
  );

  const isCreatingNewNote = useStore(
    uiStore,
    (state) => state.isCreatingNewNote,
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!draftNoteId) return;

    updateDraftField({ field: "title", value: e.target.value });

    setIsDirty({ isDirty: true });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!draftNoteId) return;

    const newTags = e.target.value.split(",").map((tag) => tag.trim());
    updateDraftField({ field: "tags", value: newTags });

    setIsDirty({ isDirty: true });
  };

  return (
    <div
      key={draftNoteId}
      className="border-b-surface flex translate-y-0 flex-col gap-3 border-b pb-3 opacity-100 transition-all duration-300 starting:translate-y-2 starting:opacity-0"
    >
      <input
        className="focus:outline-strong -m-1.5 rounded-sm p-1.5 text-2xl font-bold transition-all duration-150 focus:outline-1"
        value={draftNoteTitle || ""}
        onChange={handleTitleChange}
        placeholder="Enter note title here"
      ></input>

      <div className="grid grid-cols-[1fr_4fr] gap-2">
        <div className="flex items-center gap-1.5">
          <Icon id="icon-tag" className="size-5"></Icon>

          <span className="text-gray-300">Tags</span>
        </div>

        <input
          className="focus:outline-strong -m-1.5 rounded-sm p-1.5 font-semibold transition-all duration-150 focus:outline-1"
          value={(draftNoteTags || []).join(", ")}
          onChange={handleTagsChange}
          placeholder="Enter tags, comma separated (e.g., Work, Ideas)"
        ></input>
      </div>

      {!isCreatingNewNote && (
        <div className="grid grid-cols-[1fr_4fr] gap-2">
          <div className="flex items-center gap-1.5">
            <Icon id="icon-clock" className="size-5"></Icon>

            <span className="text-gray-300">Last Edited</span>
          </div>

          <span className="font-semibold">
            {draftNoteUpdatedAt &&
              new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(new Date(draftNoteUpdatedAt))}
          </span>
        </div>
      )}
    </div>
  );
}

export default EditorPaneHeader;
