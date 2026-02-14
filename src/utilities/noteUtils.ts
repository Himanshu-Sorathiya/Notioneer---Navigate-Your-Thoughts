import type { Note } from "../types/note.ts";

const createEmptyNote = (): Note => ({
  id: crypto.randomUUID(),
  title: "",
  tags: [],
  content: "",
  updated_at: "",
  is_archived: false,
});

export { createEmptyNote };
