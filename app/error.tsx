'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NotesErrorProps {
  error: Error;
}

export default function NotesError({ error }: NotesErrorProps) {
  return (
    <ErrorMessage>
      Could not fetch the list of notes. <br />
      <em>{error.message}</em>
    </ErrorMessage>
  );
}