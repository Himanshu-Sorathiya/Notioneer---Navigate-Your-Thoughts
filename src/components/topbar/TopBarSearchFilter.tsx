import { useStore } from "@tanstack/react-store";

import { filterStore, setSearchFilter } from "../../store/filter.ts";
import { uiStore } from "../../store/ui.ts";

import Icon from "../Icon.tsx";

function TopBarSearchFilter() {
  const searchFilter = useStore(filterStore, (state) => state.searchFilter);

  const isDirty = useStore(uiStore, (state) => state.isDirty);
  const isCreatingNewNote = useStore(
    uiStore,
    (state) => state.isCreatingNewNote,
  );

  return (
    <div className="relative min-w-sm">
      <input
        type="text"
        placeholder="Search by Title, Tags and Content..."
        className={`bg-base peer focus:border-strong focus:text-strong w-full rounded-md border border-gray-500 py-3 pr-4 pl-12 text-sm text-gray-400 transition-all duration-150 outline-none disabled:cursor-not-allowed ${searchFilter ? "text-strong" : ""} `}
        disabled={isDirty || isCreatingNewNote}
        value={searchFilter}
        onChange={(e) => setSearchFilter({ searchFilter: e.target.value })}
      />

      <Icon
        id="icon-search"
        className={`peer-focus:text-strong absolute top-0 bottom-0 left-3 my-auto h-6 w-6 text-gray-400 peer-disabled:cursor-not-allowed ${searchFilter ? "text-strong" : ""}`}
      ></Icon>
    </div>
  );
}

export default TopBarSearchFilter;
