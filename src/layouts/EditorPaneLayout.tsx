import EditorPaneActions from "../components/editorpane/EditorPaneActions.tsx";
import EditorPaneContent from "../components/editorpane/EditorPaneContent.tsx";
import EditorPaneHeader from "../components/editorpane/EditorPaneHeader.tsx";

function EditorPaneLayout() {
  return (
    <div className="border-x-surface flex h-full flex-col gap-2 border-x p-5">
      <EditorPaneHeader />

      <EditorPaneContent />

      <EditorPaneActions />
    </div>
  );
}

export default EditorPaneLayout;
