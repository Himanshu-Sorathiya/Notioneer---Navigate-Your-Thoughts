import TopBarHeader from "../components/topbar/TopBarHeader.tsx";
import TopBarSearchFilter from "../components/topbar/TopBarSearchFilter.tsx";

function TopBarLayout() {
  return (
    <div className="border-b-surface col-span-3 flex items-center justify-between border-b px-4 py-4">
      <TopBarHeader />

      <TopBarSearchFilter />
    </div>
  );
}

export default TopBarLayout;
