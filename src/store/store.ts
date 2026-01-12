import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./filterSlice.ts";
import notesReducer from "./notesSlice.ts";
import uiReducer from "./uiSlice.ts";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    filter: filterReducer,
    ui: uiReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { AppDispatch, RootState };
