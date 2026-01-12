import {
  type PayloadAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import type { RootState } from "./store.ts";

import type { Note } from "../types/note.ts";

import { notes } from "../constants/data.ts";
import {
  selectIsArchivedView,
  selectSearchFilter,
  selectSelectedTag,
} from "./filterSlice.ts";

interface NoteState {
  notes: Note[];
  selectedNote: Note | null;
  draftNote: Note | null;
}

const sortByDate = (a: Note, b: Note) =>
  new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();

const initialState: NoteState = {
  notes: [...notes].sort(sortByDate),
  selectedNote: null,
  draftNote: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);

      state.notes.sort(sortByDate);
    },

    updateNote(state, action: PayloadAction<Note>) {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id,
      );

      if (index !== -1) {
        state.notes[index] = action.payload;

        state.notes.sort(sortByDate);
      }
    },

    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },

    toggleArchive(state, action: PayloadAction<string>) {
      const note = state.notes.find((n) => n.id === action.payload);

      if (note) {
        note.is_archived = !note.is_archived;
      }
    },

    updateDraftField(
      state,
      action: PayloadAction<{ field: keyof Note; value: any }>,
    ) {
      if (state.draftNote) {
        (state.draftNote as any)[action.payload.field] = action.payload.value;
      }
    },

    setSelectedNote(state, action: PayloadAction<Note | null>) {
      state.selectedNote = action.payload;
    },

    setDraftNote(state, action: PayloadAction<Note | null>) {
      state.draftNote = action.payload;
    },
  },
});

const selectNotes = (state: RootState) => state.notes.notes;
const selectSelectedNote = (state: RootState) => state.notes.selectedNote;
const selectDraftNote = (state: RootState) => state.notes.draftNote;
const selectIsNoteSelected = (state: RootState, note: Note) =>
  state.notes.selectedNote?.id === note.id;
const selectSelectedNoteId = (state: RootState) => state.notes.selectedNote?.id;
const selectSelectedNoteArchiveStatus = (state: RootState) =>
  state.notes.selectedNote?.is_archived;
const selectDraftNoteId = (state: RootState) => state.notes.draftNote?.id;
const selectDraftNoteTitle = (state: RootState) =>
  state.notes.draftNote?.title || "";
const selectDraftNoteTags = (state: RootState) =>
  state.notes.draftNote?.tags || [];
const selectDraftNoteUpdatedAt = (state: RootState) =>
  state.notes.draftNote?.updated_at;
const selectDraftNoteContent = (state: RootState) =>
  state.notes.draftNote?.content || "";
const selectTagsByArchiveStatus = createSelector(
  [selectNotes, (_state: RootState, isArchived: boolean) => isArchived],
  (notes, isArchivedView) => {
    return Array.from(
      new Set(
        notes
          .filter((note) => note.is_archived === isArchivedView)
          .flatMap((note) => note.tags),
      ),
    );
  },
);
const selectFilteredAndOrderedNotes = createSelector(
  [selectNotes, selectIsArchivedView, selectSelectedTag, selectSearchFilter],
  (notes, isArchivedView, selectedTag, searchFilter) => {
    const query = searchFilter.toLowerCase();

    let result = notes.filter((note) => {
      const matchesArchive = note.is_archived === isArchivedView;

      const matchesTag = !selectedTag || note.tags.includes(selectedTag);

      return matchesArchive && matchesTag;
    });

    if (query) {
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          note.content.toLowerCase().includes(query),
      );

      return [...result].sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query) ? 2 : 0;
        const bTitle = b.title.toLowerCase().includes(query) ? 2 : 0;
        if (aTitle !== bTitle) return bTitle - aTitle;

        const aTag = a.tags.some((t) => t.toLowerCase().includes(query))
          ? 1
          : 0;
        const bTag = b.tags.some((t) => t.toLowerCase().includes(query))
          ? 1
          : 0;
        return bTag - aTag;
      });
    }

    return result;
  },
);

export {
  selectDraftNote,
  selectDraftNoteContent,
  selectDraftNoteId,
  selectDraftNoteTags,
  selectDraftNoteTitle,
  selectDraftNoteUpdatedAt,
  selectFilteredAndOrderedNotes,
  selectIsNoteSelected,
  selectNotes,
  selectSelectedNote,
  selectSelectedNoteArchiveStatus,
  selectSelectedNoteId,
  selectTagsByArchiveStatus,
};
export const {
  addNote,
  updateNote,
  deleteNote,
  toggleArchive,
  setSelectedNote,
  setDraftNote,
  updateDraftField,
} = notesSlice.actions;
export default notesSlice.reducer;
