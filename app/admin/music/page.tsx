'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';
import { requireAdmin } from '../../../lib/admin-guard';

export default function AdminMusicPage() {
  const router = useRouter();
  const [editing, setEditing] = useState<any | null>(null);

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
    setForm({
      title: '',
      author: '',
      singer: '',
      image: '',
      categoryId: '',
    });
  }

  async function deleteMusic(id: number) {
    if (!confirm('Delete this music?')) return;

    await apiFetch(`/music/${id}`, { method: 'DELETE' });
    setMusic((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold mb-1">
          🎵 Manage Music
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add, review, and remove music from the platform
        </p>
      </div>

      {/* ADD MUSIC FORM */}
      <form
        onSubmit={addMusic}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4 max-w-2xl"
      >
        <h2 className="text-xl font-semibold mb-2">
          ➕ Add New Music
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />
          <Input
            placeholder="Author"
            value={form.author}
            onChange={(v) => setForm({ ...form, author: v })}
          />
          <Input
            placeholder="Singer"
            value={form.singer}
            onChange={(v) => setForm({ ...form, singer: v })}
          />
          <Input
            placeholder="Category ID"
            value={form.categoryId}
            onChange={(v) => setForm({ ...form, categoryId: v })}
          />
        </div>

        <Input
          placeholder="Image URL"
          value={form.image}
          onChange={(v) => setForm({ ...form, image: v })}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Music
        </button>
      </form>

      {/* MUSIC LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          🎶 Existing Music
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {music.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-40 bg-gray-200 dark:bg-gray-700">
                <img
                  src={m.image || '/placeholder-music.jpg'}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">
                  {m.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {m.singer} · {m.author}
                </p>


             <div className="flex justify-between items-center pt-3">
              <a
                href={`/music/${m.id}`}
                target="_blank"
                className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
              >
                View
              </a>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(m)}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMusic(m.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
              {editing && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const updated = await apiFetch(
          `/music/${editing.id}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              title: editing.title,
              author: editing.author,
              singer: editing.singer,
              image: editing.image,
              categoryId: Number(editing.categoryId),
            }),
          },
        );

        setMusic((prev) =>
          prev.map((m) =>
            m.id === updated.id ? updated : m,
          ),
        );

        setEditing(null);
      }}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold">
        ✏️ Edit Music
      </h2>

      <Input
        placeholder="Title"
        value={editing.title || ''}
        onChange={(v) =>
          setEditing({ ...editing, title: v })
        }
      />
      <Input
        placeholder="Author"
        value={editing.author || ''}
        onChange={(v) =>
          setEditing({ ...editing, author: v })
        }
      />
      <Input
        placeholder="Singer"
        value={editing.singer || ''}
        onChange={(v) =>
          setEditing({ ...editing, singer: v })
        }
      />
      <Input
        placeholder="Image URL"
        value={editing.image || ''}
        onChange={(v) =>
          setEditing({ ...editing, image: v })
        }
      />
      <Input
        placeholder="Category ID"
        value={String(editing.categoryId || '')}
        onChange={(v) =>
          setEditing({
            ...editing,
            categoryId: v,
          })
        }
      />

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
)}

            </div>

                 </div>
                   </div>
                 ))}
                 </div>

                    {music.length === 0 && (
                      <p className="text-gray-500 mt-4">
                        No music found.
                      </p>
                    )}
                  </div>
                </div>
              );
            }

/* ---------- SMALL REUSABLE INPUT ---------- */

function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      className="border border-gray-300 dark:border-gray-700 bg-transparent p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}





