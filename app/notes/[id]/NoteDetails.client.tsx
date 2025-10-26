'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NoteDetails.module.css';


const NoteDetailsClient = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
  data: note,
  isLoading,
  isError,
} = useQuery({
  queryKey: ['notes', id],
  queryFn: () => fetchNoteById(id!),
  enabled: !!id,
  refetchOnMount: false,
});


  if (isLoading) {
    return <Loader />;
  }


  if (isError || !note) {
    return <ErrorMessage>Something went wrong. Could not find the note.</ErrorMessage>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;