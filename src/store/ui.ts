import { Store } from "@tanstack/react-store";

interface uiState {
  mode: "read" | "edit";
  isCreatingNewNote: boolean;
  isDirty: boolean;
  editorResetKey: number;
}

const initialState: uiState = {
  mode: "edit",
  isCreatingNewNote: false,
  isDirty: false,
  editorResetKey: 0,
};

const uiStore = new Store<uiState>(initialState);

function setMode({ mode }: { mode: "read" | "edit" }) {
  uiStore.setState((state) => ({
    ...state,
    mode,
  }));
}
function setIsCreatingNewNote({
  isCreatingNewNote,
}: {
  isCreatingNewNote: boolean;
}) {
  uiStore.setState((state) => ({
    ...state,
    isCreatingNewNote,
  }));
}

function setIsDirty({ isDirty }: { isDirty: boolean }) {
  uiStore.setState((state) => ({
    ...state,
    isDirty,
  }));
}

function incrementEditorResetKey() {
  uiStore.setState((state) => ({
    ...state,
    editorResetKey: state.editorResetKey + 1,
  }));
}

function resetUiState() {
  uiStore.setState((state) => ({
    ...state,
    mode: initialState.mode,
    isCreatingNewNote: initialState.isCreatingNewNote,
    isDirty: initialState.isDirty,
  }));
}

export {
  incrementEditorResetKey,
  resetUiState,
  setIsCreatingNewNote,
  setIsDirty,
  setMode,
  uiStore,
};
