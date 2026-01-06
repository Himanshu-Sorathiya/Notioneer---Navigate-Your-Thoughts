import EditorPaneButton from "./EditorPaneButton.tsx";

function EditorPaneActions() {
  return (
    <div className="border-t-surface flex justify-end gap-2 border-t pt-3">
      <EditorPaneButton label="Save" className="bg-main hover:bg-[#2547d0]" />

      <EditorPaneButton label="Cancel" className="bg-muted hover:bg-focus" />
    </div>
  );
}

export default EditorPaneActions;
