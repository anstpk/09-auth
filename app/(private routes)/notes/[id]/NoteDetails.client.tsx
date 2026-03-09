'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Link from 'next/link';
import { Note } from '@/types/note'; // Додай цей імпорт
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    // 1. Додаємо .then(res => res.data), щоб отримати чистий об'єкт нотатки
    queryFn: () => fetchNoteById(id).then(res => res.data as Note), 
    refetchOnMount: false,
    enabled: !!id,
  });

  if (isLoading) return <div className={css.loader}>Loading note details...</div>;
  
  if (error || !note) return (
    <div className={css.error}>
      <p>Note not found or deleted.</p>
      <Link href="/notes">Back to list</Link>
    </div>
  );

  return (
    <article className={css.noteDetails}>
      <Link href="/notes" className={css.backLink}>← Back to all notes</Link>
      
      <header className={css.header}>
        {/* Тепер TypeScript бачить ці поля! */}
        <h1 className={css.title}>{note.title}</h1>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </header>

      <div className={css.content}>
        {note.content}
      </div>

      <footer className={css.footer}>
        <p>Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
      </footer>
    </article>
  );
}