import { apiFetch } from './api';
import { User } from '../types/user';

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await apiFetch('/auth/me');
  } catch {
    return null;
  }
}
