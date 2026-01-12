import { selectIsArchivedView } from "../../store/filterSlice.ts";
import { selectTagsByArchiveStatus } from "../../store/notesSlice.ts";

import { useAppSelector } from "../../hooks/hooks.ts";

import SideBarTag from "./SideBarTag.tsx";

function SideBarTags() {
  const isArchivedView = useAppSelector(selectIsArchivedView);

  const tagsByArchiveStatus = useAppSelector((state) =>
    selectTagsByArchiveStatus(state, isArchivedView),
  );

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <span className="text-[1rem] text-gray-500">Tags</span>

      <div className="thin-scrollbar flex h-full flex-col gap-1 overflow-y-auto pr-3">
        {tagsByArchiveStatus.map((tag) => (
          <SideBarTag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}

export default SideBarTags;
