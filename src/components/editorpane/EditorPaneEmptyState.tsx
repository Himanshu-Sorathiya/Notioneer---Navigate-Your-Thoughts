import { useStore } from "@tanstack/react-store";

import { filterStore } from "../../store/filter.ts";

import Icon from "../Icon.tsx";

function EditorPaneEmptyState() {
  const selectedTag = useStore(filterStore, (state) => state.selectedTag);
  const searchFilter = useStore(filterStore, (state) => state.searchFilter);

  const isFiltering = !!selectedTag || searchFilter.trim() !== "";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <Icon id="icon-empty-note" className="size-32 opacity-15" />

      <h2 className="text-2xl font-bold tracking-tight">
        {isFiltering ? "No discoveries found" : "A blank map awaits"}
      </h2>

      <p className="mt-2 max-w-[320px] text-sm leading-relaxed opacity-40">
        {isFiltering
          ? "Adjust your filters to reveal hidden notes or clear them to find your way back."
          : "Your journal is currently blank. Scribe your first discovery to begin the journey."}
      </p>
    </div>
  );
}

export default EditorPaneEmptyState;
