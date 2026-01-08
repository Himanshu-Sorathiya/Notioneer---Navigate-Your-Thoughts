import { createSlice } from "@reduxjs/toolkit";

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

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },

    setIsCreatingNewNote(state, action) {
      state.isCreatingNewNote = action.payload;
    },

    setIsDirty(state, action) {
      state.isDirty = action.payload;
    },

    incrementEditorResetKey(state) {
      state.editorResetKey += 1;
    },
  },
});

export const {
  setMode,
  setIsCreatingNewNote,
  setIsDirty,
  incrementEditorResetKey,
} = uiSlice.actions;
export default uiSlice.reducer;
