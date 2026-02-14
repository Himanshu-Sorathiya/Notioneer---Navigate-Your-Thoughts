import Icon from "../Icon.tsx";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:bg-muted absolute top-4 right-4 size-8 cursor-pointer rounded-full p-1 transition-all duration-75"
    >
      <Icon id="icon-close" className="text-strong size-6" />
    </button>
  );
}

export default CloseButton;
