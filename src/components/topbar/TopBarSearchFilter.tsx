import { useDispatch, useSelector } from "react-redux";

import { setSearchFilter } from "../../store/filterSlice.ts";
import type { RootState } from "../../store/store.ts";

import Icon from "../Icon.tsx";

function TopBarSearchFilter() {
  const searchFilter = useSelector(
    (state: RootState) => state.filter.searchFilter,
  );

  const isDirty = useSelector((state: RootState) => state.ui.isDirty);

  const dispatch = useDispatch();

  return (
    <div className="relative min-w-sm">
      <input
        type="text"
        placeholder="Search by Title, Tags and Content..."
        className={`bg-base peer focus:border-strong focus:text-strong w-full rounded-md border border-gray-500 py-3 pr-4 pl-12 text-sm text-gray-400 transition-all duration-150 outline-none disabled:cursor-not-allowed ${searchFilter ? "text-strong" : ""} `}
        disabled={isDirty}
        value={searchFilter}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
      />

      <Icon
        id="icon-search"
        className={`peer-focus:text-strong absolute top-0 bottom-0 left-3 my-auto h-6 w-6 text-gray-400 peer-disabled:cursor-not-allowed ${searchFilter ? "text-strong" : ""}`}
      ></Icon>
    </div>
  );
}

export default TopBarSearchFilter;
