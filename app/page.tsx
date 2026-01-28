import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Discover. Review. <span className="text-indigo-600">Feel</span> the Music.
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          A modern platform where music lovers share honest reviews,
          rate songs, and discover new sounds.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/music"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Explore Music
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8">
        <Feature
          title="Honest Reviews"
          desc="Read real opinions from verified users and share your own experience."
          icon="⭐"
        />
        <Feature
          title="Discover New Music"
          desc="Explore tracks by genre and popularity curated by the community."
          icon="🎧"
        />
        <Feature
          title="Admin Curated"
          desc="Quality-controlled content managed by platform administrators."
          icon="🛠️"
        />
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to share your taste in music?
        </h2>
        <p className="mb-6 text-indigo-100">
          Create an account and start reviewing your favorite tracks today.
        </p>
        <Link
          href="/register"
          className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

function Feature({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

