import { useStore } from "@tanstack/react-store";

import { filterStore, resetFilters } from "../../store/filter.ts";

import Icon from "../Icon.tsx";

function NotesListEmptyState() {
  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);
  const selectedTag = useStore(filterStore, (state) => state.selectedTag);
  const searchFilter = useStore(filterStore, (state) => state.searchFilter);

  const hasSearch = searchFilter.trim() !== "";
  const hasTag = !!selectedTag;

  if (!hasSearch && !hasTag) {
    return (
      <div className="bg-focus flex w-full flex-col items-center justify-center gap-1 rounded-lg p-3 text-center">
        <Icon id="icon-empty-note" className="size-14 opacity-50" />

        <span className="w-5/6 text-xs leading-relaxed font-medium">
          {isArchivedView
            ? "Your archives are empty. No artifacts have been stowed away yet."
            : "Your expedition log is empty. Scribe your first discovery!"}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-focus flex w-full flex-col items-center justify-center gap-1 rounded-lg p-3 text-center">
      <Icon id="icon-empty-note" className="size-14 opacity-50" />

      <span className="w-5/6 text-xs leading-relaxed">
        {isArchivedView ? "No archived notes found" : "No discoveries found"}
        {hasSearch && (
          <>
            {" for "}
            <span className="font-bold">"{searchFilter}"</span>
          </>
        )}
        {hasTag && (
          <>
            {" tagged with "}
            <span className="font-bold">#{selectedTag}</span>
          </>
        )}
        {"."}
      </span>

      <button
        onClick={resetFilters}
        className="bg-mark hover:bg-mark/80 mt-3 cursor-pointer rounded-md px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-150"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default NotesListEmptyState;
