import supabase from "./supabase.ts";

import type { Note } from "../types/note.ts";

async function getNotesApi() {
  const { data, error } = await supabase
    .from("notes")
    .select("id, title, tags, content, is_archived, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Note[];
}

async function createNoteApi({ note }: { note: Omit<Note, "id"> }) {
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title: note.title,
        tags: note.tags,
        content: note.content,
        is_archived: note.is_archived,
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Note;
}

async function updateNoteApi({
  noteId,
  updates,
}: {
  noteId: string;
  updates: Partial<Pick<Note, "title" | "tags" | "content" | "is_archived">>;
}) {
  const { data, error } = await supabase
    .from("notes")
    .update({
      ...("title" in updates && { title: updates.title }),
      ...("tags" in updates && { tags: updates.tags }),
      ...("content" in updates && { content: updates.content }),
      ...("is_archived" in updates && { is_archived: updates.is_archived }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Note;
}

async function deleteNoteApi({ noteId }: { noteId: string }) {
  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    throw new Error(error.message);
  }
}

export { createNoteApi, deleteNoteApi, getNotesApi, updateNoteApi };
