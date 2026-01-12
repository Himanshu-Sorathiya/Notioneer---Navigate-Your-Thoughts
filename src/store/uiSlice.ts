import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store.ts";

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
    setMode(state, action: PayloadAction<"read" | "edit">) {
      state.mode = action.payload;
    },

    setIsCreatingNewNote(state, action: PayloadAction<boolean>) {
      state.isCreatingNewNote = action.payload;
    },

    setIsDirty(state, action: PayloadAction<boolean>) {
      state.isDirty = action.payload;
    },

    incrementEditorResetKey(state) {
      state.editorResetKey += 1;
    },

    resetUiState(state) {
      state.mode = initialState.mode;
      state.isCreatingNewNote = initialState.isCreatingNewNote;
      state.isDirty = initialState.isDirty;
    },
  },
});

const selectMode = (state: RootState) => state.ui.mode;
const selectIsCreatingNewNote = (state: RootState) =>
  state.ui.isCreatingNewNote;
const selectIsDirty = (state: RootState) => state.ui.isDirty;
const selectEditorResetKey = (state: RootState) => state.ui.editorResetKey;

export {
  selectEditorResetKey,
  selectIsCreatingNewNote,
  selectIsDirty,
  selectMode,
};
export const {
  setMode,
  setIsCreatingNewNote,
  setIsDirty,
  incrementEditorResetKey,
} = uiSlice.actions;
export default uiSlice.reducer;
