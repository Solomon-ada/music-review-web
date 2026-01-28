'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('token', res.access_token);
      router.push('/music');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>

      <form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded shadow space-y-4 max-w-md"
>
  <input
    className="border p-2 w-full rounded"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    className="border p-2 w-full rounded"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button className="bg-black text-white px-4 py-2 rounded">
    Login
  </button>
</form>


      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
