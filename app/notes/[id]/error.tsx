'use client';

import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NoteDetailsErrorProps {
  error: Error;
}

export default function NoteDetailsError({ error }: NoteDetailsErrorProps) {
  return (
    <ErrorMessage>
      Could not fetch note details. <br />
      <em>{error.message}</em>
    </ErrorMessage>
  );
}