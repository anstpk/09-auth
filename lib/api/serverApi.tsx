import { cookies } from 'next/headers';
import { api } from './api';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const fetchNoteByIdServer = async (id: string) => {
  const headers = await getAuthHeaders();
  return api.get(`/notes/${id}`, headers);
};

export const fetchNotesServer = async (page = 1, perPage = 12, search = '', tag = '') => {
  const headers = await getAuthHeaders();
  return api.get('/notes', { 
    params: { page, perPage, search, tag },
    ...headers 
  });
};

export const getMeServer = async () => {
  const headers = await getAuthHeaders();
  return api.get('/users/me', headers);
};