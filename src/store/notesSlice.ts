import { createSlice } from "@reduxjs/toolkit";

import type { Note } from "../types/note.ts";

import { notes } from "../constants/data.ts";

interface NoteState {
  notes: Note[];
  selectedNote: Note | null;
  draftNote: Note | null;
}

const initialState: NoteState = {
  notes: [...notes].sort(
    (a, b) =>
      new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  ),
  selectedNote: null,
  draftNote: null,
};

const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote(state, action) {
      state.notes.push(action.payload);

      state.notes.sort(
        (a, b) =>
          new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
      );
    },

    updateNote(state, action) {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        } else {
          return note;
        }
      });

      state.notes.sort(
        (a, b) =>
          new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
      );
    },

    deleteNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    toggleArchive(state, action) {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload) {
          return { ...note, isArchived: !note.isArchived };
        } else {
          return note;
        }
      });
    },

    setSelectedNote(state, action) {
      state.selectedNote = action.payload;
    },

    setDraftNote(state, action) {
      state.draftNote = action.payload;
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  toggleArchive,
  setSelectedNote,
  setDraftNote,
} = notesSlice.actions;
export default notesSlice.reducer;
