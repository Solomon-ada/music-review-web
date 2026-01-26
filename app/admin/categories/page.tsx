'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';
import { requireAdmin } from '../../../lib/admin-guard';

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    requireAdmin(router);
    apiFetch('/categories').then(setCategories);
  }, []);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();

    const newCategory = await apiFetch('/categories', {
      method: 'POST',
      body: JSON.stringify({ category }),
    });

    setCategories((prev) => [...prev, newCategory]);
    setCategory('');
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Categories</h2>

      <form onSubmit={addCategory}>
        <input
          placeholder="Category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>{c.category}</li>
        ))}
      </ul>
    </div>
  );
}
