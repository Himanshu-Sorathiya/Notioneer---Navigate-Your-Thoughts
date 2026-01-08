import { setSelectedTag } from "../../store/filterSlice.ts";

import Icon from "../Icon.tsx";

function SideBarTag({
  tag,
  selectedTag,
  isDirty,
  dispatch,
}: {
  tag: string;
  selectedTag: string;
  isDirty: boolean;
  dispatch: any;
}) {
  return (
    <button
      className={`hover:bg-focus flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 break-all transition-all duration-150 disabled:cursor-not-allowed ${selectedTag === tag ? "bg-focus text-main" : ""}`}
      disabled={isDirty}
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
    </button>
  );
}

export default SideBarTag;
