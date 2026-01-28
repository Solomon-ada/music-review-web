'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '../../lib/api';
import { Music } from '../../types/music';

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
    <div>
      <h1 className="text-3xl font-extrabold mb-8">
        🎶 Discover Music
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {music.map((m) => (
          <div
            key={m.id}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img
                src={m.image || '/placeholder-music.jpg'}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">
                {m.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {m.category?.category ?? 'Uncategorized'}
              </p>

              <Link
                href={`/music/${m.id}`}
                className="inline-block mt-3 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                View details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { apiFetch } from '../../lib/api';
// import { Music } from '../../types/music';
// import Link from 'next/dist/client/link';

// export default function MusicPage() {
//   const router = useRouter();
//   const [music, setMusic] = useState<Music[]>([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     apiFetch('/music')
//       .then(setMusic)
//       .catch(() => router.push('/login'));
//   }, []);

//   return (
//     <div style={{ padding: 24 }}>
//      <h1 className="text-2xl font-bold mb-4">Music</h1>

// <ul className="space-y-4">
//   {music.map((m) => (
//     <li
//       key={m.id}
//       className="bg-white p-4 rounded shadow"
//     >
//       <Link href={`/music/${m.id}`}>
//         <h2 className="font-semibold">{m.title}</h2>
//         <p className="text-sm text-gray-600">
//          {m.category?.category ?? 'Uncategorized'}

//         </p>
//       </Link>
//     </li>
//   ))}
// </ul>

//     </div>
//   );
// }
