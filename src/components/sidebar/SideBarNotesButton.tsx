import {
  resetFilters,
  selectIsArchivedView,
  selectSelectedTag,
  setArchivedView,
  setSelectedTag,
} from "../../store/filterSlice.ts";
import { selectTagsByArchiveStatus } from "../../store/notesSlice.ts";
import { selectIsDirty } from "../../store/uiSlice.ts";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";

import Icon from "../Icon.tsx";

function SideBarNotesButton({
  archive,
  iconId,
  label,
}: {
  archive: boolean;
  iconId: string;
  label: string;
}) {
  const isArchivedView = useAppSelector(selectIsArchivedView);
  const selectedTag = useAppSelector(selectSelectedTag);
  const isDirty = useAppSelector(selectIsDirty);

  const targetViewTags = useAppSelector((state) =>
    selectTagsByArchiveStatus(state, archive),
  );

  const dispatch = useAppDispatch();

  const isActiveView = isArchivedView === archive;

  function handleNotesViewChange() {
    if (isActiveView) {
      dispatch(resetFilters());

      return;
    }

    if (archive === true && isDirty === true) return;

    dispatch(setArchivedView(archive));

    if (selectedTag && !targetViewTags.includes(selectedTag)) {
      dispatch(setSelectedTag(""));
    }
  }

  const activeClass = isActiveView
    ? !selectedTag
      ? "bg-focus text-main"
      : "text-main"
    : "";

  return (
    <button
      className={`hover:bg-focus group text-strong flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-all duration-150 disabled:cursor-not-allowed ${activeClass}`}
      disabled={archive === true && isDirty === true}
      onClick={handleNotesViewChange}
    >
      <Icon
        id={iconId}
        className={`group-hover:text-main size-5 transition-all duration-150 ${isActiveView ? "text-main" : ""}`}
      ></Icon>

      <span>{label}</span>
    </button>
  );
}

export default SideBarNotesButton;
