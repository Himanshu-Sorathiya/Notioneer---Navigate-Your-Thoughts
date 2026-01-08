function EditorPaneButton({
  label,
  className,
  disabled,
  onClick,
}: {
  label: string;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`bg-main text-strong cursor-pointer rounded-lg px-4 py-2 text-center transition-all duration-150 hover:bg-[#2547d0] disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default EditorPaneButton;
