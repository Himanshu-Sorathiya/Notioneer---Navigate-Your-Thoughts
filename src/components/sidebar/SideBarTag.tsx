import { useStore } from "@tanstack/react-store";

import { filterStore, setSelectedTag } from "../../store/filter.ts";
import { uiStore } from "../../store/ui.ts";

import Icon from "../Icon.tsx";

function SideBarTag({ tag }: { tag: string }) {
  const isTagActive = useStore(
    filterStore,
    (state) => state.selectedTag === tag,
  );

  const isDirty = useStore(uiStore, (state) => state.isDirty);

  return (
    <button
      className={`hover:bg-focus flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 break-all transition-all duration-150 disabled:cursor-not-allowed ${isTagActive ? "bg-focus text-main" : ""}`}
      disabled={isDirty}
      onClick={() => {
        setSelectedTag({ selectedTag: isTagActive ? "" : tag });
      }}
    >
      <Icon id="icon-tag" className="size-5"></Icon>

      <span>{tag}</span>
    </button>
  );
}

export default SideBarTag;
