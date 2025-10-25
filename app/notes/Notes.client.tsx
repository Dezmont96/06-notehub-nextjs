'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NotesPage.module.css';

const NotesClient = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({ page: currentPage, search: debouncedSearchTerm }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
   const closeModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = data?.totalPages ?? 0;
  const showLoader = isLoading || isPlaceholderData;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <div className={css.content}>
        {showLoader && <Loader />}
        {isError && !showLoader && <ErrorMessage />}

        {data && data.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}

        {data &&
          data.notes &&
          data.notes.length === 0 &&
          !showLoader &&
          !isError && <p style={{ textAlign: 'center' }}>No notes found.</p>}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
