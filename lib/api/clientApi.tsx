import { api } from './api';
import { User } from '@/types/user';

// Auth
export const register = (data: any) => api.post('/auth/register', data);
export const login = (data: any) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');
export const checkSession = () => api.get('/auth/session');

// User
export const getMe = () => api.get<User>('/users/me');
export const updateMe = (data: Partial<User>) => api.patch<User>('/users/me', data);

// Notes
export const fetchNotes = (page = 1, perPage = 12, search = '', tag = '') => 
  api.get('/notes', { params: { page, perPage, search, tag } });
export const fetchNoteById = (id: string) => api.get(`/notes/${id}`);
export const createNote = (data: any) => api.post('/notes', data);
export const deleteNote = (id: string) => api.delete(`/notes/${id}`);