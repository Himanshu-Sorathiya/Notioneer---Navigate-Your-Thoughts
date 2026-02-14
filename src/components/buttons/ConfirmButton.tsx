function ConfirmButton({
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
      className="bg-main text-strong cursor-pointer rounded-md px-4 py-2 text-lg font-medium text-center transition-all duration-150 hover:bg-[#2547d0]"
    >
      {label}
    </button>
  );
}

export default ConfirmButton;
