'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';
import { requireAdmin } from '../../../lib/admin-guard';

export default function AdminMusicPage() {
  const router = useRouter();
  const [music, setMusic] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    singer: '',
    image: '',
    categoryId: '',
  });

  useEffect(() => {
    requireAdmin(router);
    apiFetch('/music').then(setMusic);
  }, []);

  async function addMusic(e: React.FormEvent) {
    e.preventDefault();

    const newMusic = await apiFetch('/music', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        categoryId: Number(form.categoryId),
      }),
    });

    setMusic((prev) => [...prev, newMusic]);
  }

  async function deleteMusic(id: number) {
    await apiFetch(`/music/${id}`, { method: 'DELETE' });
    setMusic((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Music</h2>

      <form onSubmit={addMusic}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}
        <button>Add music</button>
      </form>

      <ul>
        {music.map((m) => (
          <li key={m.id}>
            {m.title}
            <button onClick={() => deleteMusic(m.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
