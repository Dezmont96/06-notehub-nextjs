import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}