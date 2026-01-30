import { useStore } from "@tanstack/react-store";

import { filterStore } from "../../store/filter.ts";

function TopBarHeader() {
  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);
  const selectedTag = useStore(filterStore, (state) => state.selectedTag);

  const viewType = isArchivedView ? "Archived" : "All";

  const header = selectedTag
    ? `${viewType} Notes tagged: ${selectedTag}`
    : `${viewType} Notes`;

  return <h1 className="max-w-md text-2xl font-bold break-all">{header}</h1>;
}

export default TopBarHeader;
