import { useDispatch, useSelector } from "react-redux";

import { setSelectedTag } from "../../store/filterSlice.ts";
import type { RootState } from "../../store/store.ts";

import Icon from "../Icon.tsx";

function SideBarTag({ tag }: { tag: string }) {
  const selectedTag = useSelector(
    (state: RootState) => state.filter.selectedTag,
  );

  const dispatch = useDispatch();

  return (
    <span
      className={`hover:bg-focus flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 break-all transition-all duration-150 ${selectedTag === tag ? "bg-focus text-main" : ""}`}
      onClick={() => {
        if (selectedTag === tag) {
          dispatch(setSelectedTag(""));
        } else {
          dispatch(setSelectedTag(tag));
        }
      }}
    >
      <Icon id="icon-tag" className="size-5"></Icon>

      <span>{tag}</span>
    </span>
  );
}

export default SideBarTag;
