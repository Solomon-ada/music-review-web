'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';
import { Music } from '../../../types/music';
import { Review } from '../../../types/review';

export default function MusicDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [music, setMusic] = useState<Music | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`/music/${id}`).then(setMusic);
    apiFetch(`/music/${id}/reviews`).then(setReviews);
  }, [id]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const review = await apiFetch(`/music/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ rating, comment }),
      });

      setReviews((prev) => [review, ...prev]);
      setComment('');
      setRating(5);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (!music) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>{music.title}</h1>
      <p>
        <strong>{music.singer}</strong> · {music.author}
      </p>

      <hr />

      <h2>Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      <ul>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.user.name}</strong> — ⭐ {r.rating}
            <br />
            {r.comment}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Add a review</h3>

      <form onSubmit={submitReview}>
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <br /><br />

        <button type="submit">Submit review</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
