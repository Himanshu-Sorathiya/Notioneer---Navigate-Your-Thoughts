import { Store } from "@tanstack/react-store";

import type { Note } from "../types/note.ts";

interface NoteState {
  selectedNote: Note | null;
  draftNote: Note | null;
}

const initialState: NoteState = {
  selectedNote: null,
  draftNote: null,
};

const notesStore = new Store<NoteState>(initialState);

function setSelectedNote({ selectedNote }: { selectedNote: Note | null }) {
  notesStore.setState((state) => {
    return {
      ...state,
      selectedNote: selectedNote,
    };
  });
}

function setDraftNote({ draftNote }: { draftNote: Note | null }) {
  notesStore.setState((state) => {
    return {
      ...state,
      draftNote: draftNote,
    };
  });
}

function updateDraftField({ field, value }: { field: keyof Note; value: any }) {
  notesStore.setState((state) => {
    if (!state.draftNote) return state;

    return {
      ...state,
      draftNote: {
        ...state.draftNote,
        [field]: value,
      },
    };
  });
}

export { notesStore, setDraftNote, setSelectedNote, updateDraftField };
