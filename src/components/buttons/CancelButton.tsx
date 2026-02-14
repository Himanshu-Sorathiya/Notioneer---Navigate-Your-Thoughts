function CancelButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-muted text-strong hover:bg-focus cursor-pointer rounded-md px-4 py-2 text-center text-lg font-medium transition-all duration-150"
    >
      {label}
    </button>
  );
}

export default CancelButton;
