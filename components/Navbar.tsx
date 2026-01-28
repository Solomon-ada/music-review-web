'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface JwtPayload {
  userId: number;
  role: string;
}

// Lightweight JWT parser to avoid depending on ESM/Default export issues from `jwt-decode`.
function parseJwt<T = any>(token: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload) as T;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);

      const decoded = parseJwt<JwtPayload>(token);
      if (decoded && decoded.role) {
        const roleStr = String(decoded.role).toLowerCase();
        setIsAdmin(roleStr === 'admin');
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }

    // initialize dark mode from localStorage
    const storedDark = localStorage.getItem('dark');
    if (storedDark !== null) setDark(storedDark === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-extrabold">
          🎵 <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            MusicReview
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/music">Music</Link>

          {/* ADMIN ONLY */}
          {isAdmin && (
            <Link
              href="/admin"
              className="font-medium text-indigo-600"
            >
              Admin
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-red-500"
            >
              Logout
            </button>
          )}

          <button onClick={() => setDark(!dark)}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* MOBILE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 bg-white dark:bg-gray-900 border-t">
          <Link href="/music">Music</Link>

          {isAdmin && <Link href="/admin">Admin</Link>}

          {!isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Sign up</Link>
            </>
          ) : (
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          )}

          <button onClick={() => setDark(!dark)}>
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      )}
    </header>
  );
}




// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
   
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem('token'));
//   }, []);

//   function logout() {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   }

//   return (
//     <nav className="bg-white border-b shadow-sm">
//       <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between">
//         <Link href="/music" className="font-bold text-lg">
//           🎵 Music Review
//         </Link>

//         <div className="space-x-4">
//           <Link href="/music">Music</Link>

//           {isLoggedIn ? (
//             <>
//               <Link href="/admin">Admin</Link>
//               <button
//                 onClick={logout}
//                 className="text-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login">Login</Link>
//               <Link href="/register">Register</Link>
//             </>
//           )}
        

//         </div>
//       </div>
//     </nav>
//   );
// }
