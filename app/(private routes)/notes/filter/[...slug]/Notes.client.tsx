'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
// ОНОВЛЕНО: Імпортуємо з clientApi
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import css from './NotesPage.module.css';

export default function NotesClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const [debouncedSearch] = useDebounce(search, 300);

  // Скидаємо сторінку на першу, якщо змінився тег фільтрації або пошук
  useEffect(() => {
    setPage(1);
  }, [tag, debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: async () => {
      // ОНОВЛЕНО: axios повертає об'єкт з полем data
      const response = await fetchNotes(page, 12, debouncedSearch, tag);
      return response.data; 
    },
    placeholderData: keepPreviousData,
  });

  if (error) return <p className={css.error}>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <SearchBox 
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }} 
        />
        
        <Link href="/notes/action/create" className={css.addBtn}>
          Create note +
        </Link>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : (
        <>
          {/* data?.notes — масив нотаток з нового бекенда */}
          <NoteList notes={data?.notes || []} />
          
          {/* data?.totalPages — кількість сторінок */}
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination 
              pageCount={data.totalPages} 
              onPageChange={(selectedPage: number) => setPage(selectedPage)} 
              currentPage={page} 
            />
          )}
        </>
      )}
    </div>
  );
}