


'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function AdminPage() {
  const [stats, setStats] = useState({
    music: 0,
    users: 0,
    categories: 0,
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [music, users, categories] = await Promise.all([
          apiFetch('/music'),
          apiFetch('/users'),
          apiFetch('/categories'),
        ]);

        if (!mounted) return;

        setStats({
          music: Array.isArray(music) ? music.length : 0,
          users: Array.isArray(users) ? users.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
        });
      } catch (err) {
        // avoid crashing the UI; log for debugging
        // likely causes: API down or network/CORS issue
        // keep stats at zero
        // eslint-disable-next-line no-console
        console.error('Failed to load admin stats', err);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-extrabold mb-2">
          👋 Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage content and users from one place
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Music"
          count={stats.music}
          href="/admin/music"
          color="indigo"
        />
        <StatCard
          title="Users"
          count={stats.users}
          href="/admin/users"
          color="emerald"
        />
        <StatCard
          title="Categories"
          count={stats.categories}
          href="/admin/categories"
          color="pink"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <QuickLink href="/admin/music">
            🎵 Manage Music
          </QuickLink>
          <QuickLink href="/admin/users">
            👤 Manage Users
          </QuickLink>
          <QuickLink href="/admin/categories">
            🗂️ Manage Categories
          </QuickLink>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({
  title,
  count,
  href,
  color,
}: {
  title: string;
  count: number;
  href: string;
  color: 'indigo' | 'emerald' | 'pink';
}) {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
    pink: 'bg-pink-600',
  };

  return (
    <Link
      href={href}
      className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-4xl font-bold mt-1">
            {count}
          </p>
        </div>

        <div
          className={`w-12 h-12 rounded-xl text-white flex items-center justify-center ${colors[color]}`}
        >
          ➜
        </div>
      </div>
    </Link>
  );
}

function QuickLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow hover:shadow-lg transition font-medium"
    >
      {children}
    </Link>
  );
}



