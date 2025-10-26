import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  Note,
  CreateNotePayload,
} from '@/types/note';

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const apiClient = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

apiClient.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await apiClient.get(
    '/notes',
    {
      params: {
        page: params.page || 1,
        search: params.search || '',
        perPage: params.perPage || 12,
      },
    }
  );
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.get(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.delete(
    `/notes/${noteId}`
  );
  return response.data;
};