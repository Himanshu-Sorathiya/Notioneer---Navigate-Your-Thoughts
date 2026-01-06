import { useSelector } from "react-redux";

import type { RootState } from "../../store/store.ts";

function TopBarHeader() {
  const isArchivedView = useSelector(
    (state: RootState) => state.filter.isArchivedView,
  );
  const selectedTag = useSelector(
    (state: RootState) => state.filter.selectedTag,
  );

  const header = selectedTag
    ? `${isArchivedView === false ? "All" : "Archived"} Notes tagged: ${selectedTag}`
    : isArchivedView === false
      ? "All Notes"
      : "Archived Notes";

  return (
    <span className="max-w-md text-2xl font-bold break-all">{header}</span>
  );
}

export default TopBarHeader;
