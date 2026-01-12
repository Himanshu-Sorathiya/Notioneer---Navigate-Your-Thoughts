import Logo from "../components/Logo.tsx";
import SideBarNotesButton from "../components/sidebar/SideBarNotesButton.tsx";
import SideBarTags from "../components/sidebar/SideBarTags.tsx";

function SideBarLayout() {
  return (
    <div className="border-r-surface grid h-screen grid-rows-[auto_auto_1fr] gap-2 border-r py-4 pl-6">
      <Logo />

      <div className="border-b-surface grid grid-rows-2 gap-1 border-b py-2 pr-6">
        <SideBarNotesButton
          archive={false}
          iconId="icon-all-notes"
          label="All Notes"
        />

        <SideBarNotesButton
          archive={true}
          iconId="icon-archive-notes"
          label="Archived Notes"
        />
      </div>

      <SideBarTags />
    </div>
  );
}

export default SideBarLayout;
