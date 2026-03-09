import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// ОНОВЛЕНО: Імпортуємо серверний варіант API
import { fetchNoteById } from '@/lib/api/serverApi'; 
import NotePreview from './NotePreview.client';

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      const response = await fetchNoteById(id);
      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}