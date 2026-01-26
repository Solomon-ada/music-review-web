'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { requireAdmin } from '../../lib/admin-guard';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    requireAdmin(router);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>
          <a href="/admin/categories">Manage Categories</a>
        </li>
        <li>
          <a href="/admin/music">Manage Music</a>
        </li>
      </ul>
    </div>
  );
}
