import { useIsMutating } from "@tanstack/react-query";

import ActionPanelLayout from "./ActionPaneLayout.tsx";
import EditorPaneLayout from "./EditorPaneLayout.tsx";
import NotesListLayout from "./NotesListLayout.tsx";
import SideBarLayout from "./SideBarLayout.tsx";
import TopBarLayout from "./TopBarLayout.tsx";

function AppLayout() {
  const mutatingCount = useIsMutating();

  return (
    <div className="bg-base text-strong font-inter relative grid h-screen w-screen grid-cols-[4fr_20fr] overflow-hidden">
      <SideBarLayout />

      <div className="grid grid-cols-[5fr_11fr_4fr] grid-rows-[auto_minmax(0,1fr)] overflow-hidden pr-6">
        <TopBarLayout />

        <NotesListLayout />

        <EditorPaneLayout />

        <ActionPanelLayout />
      </div>

      {mutatingCount > 0 && (
        <div className="absolute inset-0 z-60 cursor-wait" />
      )}
    </div>
  );
}

export default AppLayout;
