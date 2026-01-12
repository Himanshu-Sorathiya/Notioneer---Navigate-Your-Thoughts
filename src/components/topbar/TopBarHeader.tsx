import {
  selectIsArchivedView,
  selectSelectedTag,
} from "../../store/filterSlice.ts";

import { useAppSelector } from "../../hooks/hooks.ts";

function TopBarHeader() {
  const isArchivedView = useAppSelector(selectIsArchivedView);
  const selectedTag = useAppSelector(selectSelectedTag);

  const viewType = isArchivedView ? "Archived" : "All";

  const header = selectedTag
    ? `${viewType} Notes tagged: ${selectedTag}`
    : `${viewType} Notes`;

  return <h1 className="max-w-md text-2xl font-bold break-all">{header}</h1>;
}

export default TopBarHeader;
