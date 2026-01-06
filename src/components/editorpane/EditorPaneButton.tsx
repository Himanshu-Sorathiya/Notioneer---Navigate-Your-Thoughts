function EditorPaneButton({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <button
      className={`bg-main text-strong cursor-pointer rounded-lg px-4 py-2 text-center transition-all duration-150 hover:bg-[#2547d0] ${className}`}
    >
      {label}
    </button>
  );
}

export default EditorPaneButton;
