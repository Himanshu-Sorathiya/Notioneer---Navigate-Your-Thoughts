import { useStore } from "@tanstack/react-store";

import {
  filterStore,
  resetFilters,
  setArchivedView,
  setSelectedTag,
} from "../../store/filter.ts";
import { uiStore } from "../../store/ui.ts";

import { useTagsByArchiveStatus } from "../../hooks/useTagsByArchiveStatus.ts";

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
  const { tags: targetViewTags } = useTagsByArchiveStatus(archive);

  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);
  const selectedTag = useStore(filterStore, (state) => state.selectedTag);

  const isDirty = useStore(uiStore, (state) => state.isDirty);

  const isActiveView = isArchivedView === archive;

  function handleNotesViewChange() {
    if (isActiveView) {
      resetFilters();

      return;
    }

    if (archive === true && isDirty === true) return;

    setArchivedView({ archivedView: archive });
    if (selectedTag && !targetViewTags.includes(selectedTag)) {
      setSelectedTag({ selectedTag: "" });
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
