import { createSlice } from "@reduxjs/toolkit";

interface uiState {
  selectedNote: null | number;
  mode: "read" | "edit";
}

const initialState: uiState = {
  selectedNote: null,
  mode: "read",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },

    setMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { setSelectedNote, setMode } = uiSlice.actions;
export default uiSlice.reducer;
