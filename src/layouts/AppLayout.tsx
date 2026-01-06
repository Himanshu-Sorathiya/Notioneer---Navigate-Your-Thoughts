import { useSelector } from "react-redux";

import ActionPanelLayout from "./ActionPaneLayout.tsx";
import EditorPaneLayout from "./EditorPaneLayout.tsx";
import NotesListLayout from "./NotesListLayout.tsx";
import ReadingPaneLayout from "./ReadingPaneLayout.tsx";
import SideBarLayout from "./SideBarLayout.tsx";
import TopBarLayout from "./TopBarLayout.tsx";

import type { RootState } from "../store/store.ts";

function AppLayout() {
  const mode = useSelector((state: RootState) => state.ui.mode);

  return (
    <div className="bg-base text-strong font-inter grid h-screen w-screen grid-cols-[4fr_20fr] overflow-hidden">
      <SideBarLayout />

      <div className="grid grid-cols-[5fr_11fr_4fr] grid-rows-[auto_minmax(0,1fr)] overflow-hidden pr-6">
        <TopBarLayout />

        <NotesListLayout />

        {mode === "read" ? <ReadingPaneLayout /> : <EditorPaneLayout />}

        <ActionPanelLayout />
      </div>
    </div>
  );
}

export default AppLayout;
