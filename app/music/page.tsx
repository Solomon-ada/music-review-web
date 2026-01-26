'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';
import { Music } from '../../types/music';
import Link from 'next/dist/client/link';

export default function MusicPage() {
  const router = useRouter();
  const [music, setMusic] = useState<Music[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    apiFetch('/music')
      .then(setMusic)
      .catch(() => router.push('/login'));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Music</h1>

      <ul>
        {music.map((m) => (
            <li key={m.id}>
                <Link href={`/music/${m.id}`}>
                    <strong>{m.title}</strong> — {m.singer}
                </Link>
                </li>
        //   <li key={m.id}>
        //     <strong>{m.title}</strong> — {m.singer}
        //   </li>
        ))}
      </ul>
    </div>
  );
}
