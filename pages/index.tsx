import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-yellow-100">
      <h1 className="text-4xl font-bold mb-6">🎪 Spotify Festival Lineup</h1>
      <p className="mb-4 text-lg">Generate your dream festival poster from your top Spotify artists!</p>
      <Link href="/api/login">
        <button className="bg-black text-white px-6 py-2 rounded-full text-lg hover:scale-105 transition">
          Log in with Spotify
        </button>
      </Link>
    </div>
  );
}