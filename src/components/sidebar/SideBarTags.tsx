import { useStore } from "@tanstack/react-store";

import { selectTagsByArchiveStatus } from "../../store/features/api/apiSelector.ts";
import { useGetNotesQuery } from "../../store/features/api/apiSlice.ts";

import { filterStore } from "../../store/filter.ts";

import { useAppSelector } from "../../hooks/hooks.ts";

import SideBarTag from "./SideBarTag.tsx";
import SidebarTagSkeleton from "./SidebarTagSkeleton.tsx";

function SideBarTags() {
  const isArchivedView = useStore(filterStore, (state) => state.isArchivedView);

  const { isLoading } = useGetNotesQuery();

  const tagsByArchiveStatus = useAppSelector((state) =>
    selectTagsByArchiveStatus(state, isArchivedView),
  );

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <span className="text-[1rem] text-gray-500">Tags</span>

      <div className="thin-scrollbar flex h-full flex-col gap-1 overflow-y-auto pr-3 [scrollbar-gutter:stable]">
        {isLoading
          ? [...Array(7)].map((_, i) => <SidebarTagSkeleton key={i} />)
          : tagsByArchiveStatus.map((tag) => (
              <SideBarTag key={tag} tag={tag} />
            ))}
      </div>
    </div>
  );
}

export default SideBarTags;
