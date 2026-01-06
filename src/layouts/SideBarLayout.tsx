import { useDispatch, useSelector } from "react-redux";

import {
  resetFilters,
  setArchivedView,
  setSearchFilter,
  setSelectedTag,
} from "../store/filterSlice.ts";
import type { RootState } from "../store/store.ts";

import Logo from "../components/Logo.tsx";
import SideBarNotesButton from "../components/sidebar/SideBarNotesButton.tsx";
import SideBarTags from "../components/sidebar/SideBarTags.tsx";

function SideBarLayout() {
  const notes = useSelector((state: RootState) => state.notes.notes);

  const isArchivedView = useSelector(
    (state: RootState) => state.filter.isArchivedView,
  );
  const selectedTag = useSelector(
    (state: RootState) => state.filter.selectedTag,
  );
  const searchFilter = useSelector(
    (state: RootState) => state.filter.searchFilter,
  );

  const dispatch = useDispatch();

  function handleNotesViewChange({ targetView }: { targetView: boolean }) {
    if (isArchivedView === targetView) {
      dispatch(resetFilters());
    } else {
      dispatch(setArchivedView(targetView));

      const tagsInNotes = [
        ...new Set(
          notes
            .filter((n) => (targetView ? n.isArchived : !n.isArchived))
            .flatMap((n) => n.tags),
        ),
      ];
      dispatch(
        setSelectedTag(tagsInNotes.includes(selectedTag) ? selectedTag : ""),
      );

      dispatch(setSearchFilter(searchFilter));
    }
  }

  return (
    <div className="border-r-surface grid h-screen grid-rows-[auto_auto_1fr] gap-2 border-r py-4 pl-6">
      <Logo />

      <div className="border-b-surface grid grid-rows-2 gap-1 border-b py-2 pr-6">
        <SideBarNotesButton
          archive={false}
          isArchivedView={isArchivedView}
          selectedTag={selectedTag}
          iconId="icon-all-notes"
          label="All Notes"
          onClick={() => handleNotesViewChange({ targetView: false })}
        />

        <SideBarNotesButton
          archive={true}
          isArchivedView={isArchivedView}
          selectedTag={selectedTag}
          iconId="icon-archive-notes"
          label="Archived Notes"
          onClick={() => handleNotesViewChange({ targetView: true })}
        />
      </div>

      <SideBarTags />
    </div>
  );
}

export default SideBarLayout;
