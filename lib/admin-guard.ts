import { getCurrentUser } from './auth';

export async function requireAdmin(router: any) {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    router.push('/music');
  }
}
