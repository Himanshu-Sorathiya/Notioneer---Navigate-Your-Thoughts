import { memo } from "react";

import { useStore } from "@tanstack/react-store";

import { filterStore, setSelectedTag } from "../../store/filter.ts";
import { uiStore } from "../../store/ui.ts";

import Icon from "../Icon.tsx";

const SideBarTag = memo(({ tag, index }: { tag: string; index: number }) => {
  const isTagActive = useStore(
    filterStore,
    (state) => state.selectedTag === tag,
  );

  const isDirty = useStore(uiStore, (state) => state.isDirty);
  const isCreatingNewNote = useStore(
    uiStore,
    (state) => state.isCreatingNewNote,
  );

  return (
    <button
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`translate-y-0 cursor-pointer opacity-100 transition-all duration-300 disabled:cursor-not-allowed starting:translate-y-2 starting:opacity-0 ${isTagActive ? "bg-focus text-main" : ""}`}
      disabled={isDirty || isCreatingNewNote}
      onClick={() => {
        setSelectedTag({ selectedTag: isTagActive ? "" : tag });
      }}
    >
      <div className="hover:bg-focus flex items-center gap-2 rounded-md px-3 py-2 break-all transition-all duration-150">
        <Icon id="icon-tag" className="size-5"></Icon>

        <span>{tag}</span>
      </div>
    </button>
  );
});

export default SideBarTag;
