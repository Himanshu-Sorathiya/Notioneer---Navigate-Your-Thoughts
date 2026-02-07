import { useIsMutating } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import ActionPanelLayout from "./ActionPaneLayout.tsx";
import EditorPaneLayout from "./EditorPaneLayout.tsx";
import NotesListLayout from "./NotesListLayout.tsx";
import SideBarLayout from "./SideBarLayout.tsx";
import TopBarLayout from "./TopBarLayout.tsx";

function AppLayout() {
  const mutatingCount = useIsMutating();

  return (
    <div className="bg-base text-strong font-inter relative grid h-screen w-screen grid-cols-[4fr_20fr] overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1d23",
            color: "#f3f5f8",
            border: "1px solid #335cff",
            padding: "12px 16px",
            fontSize: "14px",
            borderRadius: "8px",
            width: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          },
          success: {
            iconTheme: {
              primary: "#335cff",
              secondary: "#f3f5f8",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4b4b",
              secondary: "#f3f5f8",
            },
          },
        }}
      />

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
