import { useSelector } from "react-redux";

import type { RootState } from "../../store/store.ts";

import SideBarTag from "./SideBarTag.tsx";

function SideBarTags() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const isArchivedView = useSelector(
    (state: RootState) => state.filter.isArchivedView,
  );

  const tags = [
    ...new Set(
      notes
        .filter((note) => note.isArchived === isArchivedView)
        .flatMap((note) => note.tags),
    ),
  ];

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <span className="text-[1rem] text-gray-500">Tags</span>

      <div className="thin-scrollbar flex h-full flex-col gap-1 overflow-y-auto pr-3">
        {tags.map((tag) => (
          <SideBarTag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}

export default SideBarTags;
