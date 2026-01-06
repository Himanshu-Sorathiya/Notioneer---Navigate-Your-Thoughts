import Icon from "../Icon.tsx";

function SideBarNotesButton({
  archive,
  isArchivedView,
  selectedTag,
  iconId,
  label,
  onClick,
}: {
  archive: boolean;
  isArchivedView: boolean;
  selectedTag: string;
  iconId: string;
  label: string;
  onClick: () => void;
}) {
  const getButtonClass = (archived: boolean) =>
    `${
      isArchivedView === archived && !selectedTag
        ? "bg-focus text-main"
        : isArchivedView === archived && selectedTag
          ? "text-main"
          : ""
    }`;

  return (
    <button
      className={`hover:bg-focus group text-strong flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-all duration-150 ${getButtonClass(archive)}`}
      onClick={onClick}
    >
      <Icon
        id={iconId}
        className={`group-hover:text-main size-5 transition-all duration-150 ${isArchivedView === archive ? "text-main" : ""}`}
      ></Icon>

      <span>{label}</span>
    </button>
  );
}

export default SideBarNotesButton;
