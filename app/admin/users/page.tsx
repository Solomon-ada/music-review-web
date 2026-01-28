'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';
import { requireAdmin } from '../../../lib/admin-guard';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    requireAdmin(router);

    apiFetch('/users').then(setUsers);
  }, []);

  // Delete user
  async function deleteUser(id: number) {
    if (!confirm('Delete this user?')) return;

    await apiFetch(`/users/${id}`, { method: 'DELETE' });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // Change role
  async function toggleRole(id: number, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';

    await apiFetch(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role: newRole }),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, role: { ...u.role, name: newRole } }
          : u
      )
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold mb-1">
          👥 Manage Users
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Promote, demote, or remove users from the platform
        </p>
      </div>

      {/* USER GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Role:{' '}
                <span className="font-medium">
                  {user.role?.name ?? 'user'}
                </span>
              </p>

              <div className="flex justify-between items-center pt-3">
                {/* Role toggle */}
                <button
                  onClick={() => toggleRole(user.id, user.role?.name)}
                  className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
                >
                  {user.role?.name === 'admin' ? 'Demote' : 'Promote'}
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Delete
                </button>

                {/* Contact */}
                <a
                  href={`mailto:${user.email}`}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-gray-500 mt-4">No users found.</p>
      )}
    </div>
  );
}
