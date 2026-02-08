import { useStore } from "@tanstack/react-store";

import { filterStore } from "../../store/filter.ts";

import { useTagsByArchiveStatus } from "../../hooks/useTagsByArchiveStatus.ts";

import SideBarTag from "./SideBarTag.tsx";
import SidebarTagsEmptyState from "./SideBarTagsEmptyState.tsx";
import SidebarTagSkeleton from "./SidebarTagSkeleton.tsx";

function SideBarTags() {
  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);

  const { tags: tagsByArchiveStatus, notesStatus } =
    useTagsByArchiveStatus(isArchivedView);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <span className="text-[1rem] text-gray-500">Tags</span>

      <div className="thin-scrollbar flex h-full flex-col gap-1 overflow-y-auto pr-3 [scrollbar-gutter:stable]">
        {notesStatus === "pending" ? (
          [...Array(7)].map((_, i) => <SidebarTagSkeleton key={i} />)
        ) : tagsByArchiveStatus.length > 0 ? (
          tagsByArchiveStatus.map((tag) => <SideBarTag key={tag} tag={tag} />)
        ) : (
          <SidebarTagsEmptyState />
        )}
      </div>
    </div>
  );
}

export default SideBarTags;
