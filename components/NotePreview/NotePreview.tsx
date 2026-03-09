'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi'; // Виправляємо шлях імпорту
import css from './NotePreview.module.css';
import { Note } from '@/types/note';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
  queryKey: ['note', id],
  // 2. Додай .then(res => res.data)
  queryFn: () => fetchNoteById(id).then(res => res.data),
  enabled: !!id,
});

  if (isLoading) {
    return <div className={css.loader}>Loading note details...</div>;
  }

  if (isError) {
    return <div className={css.error}>Failed to load note details.</div>;
  }

  if (!note) {
    return null;
  }

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.tag}>#{note.tag && note.tag}</span>
      </header>
      <hr className={css.divider} />
      <div className={css.content}>
        {note.content}
      </div>
    </div>
  );
}