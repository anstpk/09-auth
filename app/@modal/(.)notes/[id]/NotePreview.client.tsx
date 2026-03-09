'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal'; 
import css from './NotePreview.module.css';
// 1. Імпортуй тип (перевір правильність шляху до свого файлу типів)
import { Note } from '@/types/note'; 

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({ // 2. Вкажи тип тут
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id).then(res => res.data),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (isError || !note) return <div className={css.error}>Note not found</div>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {/* 3. Тепер TypeScript знає, що в note точно є ці поля і не підкреслює їх */}
        <h2 className={css.title}>{note.title}</h2>
        
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <p className={css.content}>{note.content}</p>

        <div className={css.tag}>
          {note.tag && <span className={css.tag}>#{note.tag}</span>}
        </div>
      </div>
    </Modal>
  );
}