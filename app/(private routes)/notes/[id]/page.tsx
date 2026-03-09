import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // Отримуємо відповідь і дістаємо .data
    const response = await fetchNoteById(id);
    const note = response.data;

    const title = note ? `NoteHub - ${note.title}` : "Note Details";
    return {
      title,
      description: note ? note.content.substring(0, 150) : "View details of your note.",
      openGraph: {
        title,
        description: note?.content,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch (error) {
    return { title: "Note Details" };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    // ТУТ ВАЖЛИВО: додаємо .then(res => res.data), 
    // щоб дані в кеші на сервері і на клієнті мали однаковий формат
    queryFn: () => fetchNoteById(id).then(res => res.data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}