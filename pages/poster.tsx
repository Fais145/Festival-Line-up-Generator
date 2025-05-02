import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Artist {
  name: string;
  genres: string[];
}

const genreMap: { [key: string]: string[] } = {
  Indie: ['indie', 'bedroom pop', 'lo-fi', 'shoegaze'],
  Rock: ['rock', 'punk', 'alternative'],
  Pop: ['pop', 'dance pop', 'synthpop'],
  HipHop: ['hip hop', 'rap', 'trap'],
  EDM: ['edm', 'house', 'electronic', 'techno'],
  RnB: ['r&b', 'soul', 'neo soul'],
  Metal: ['metal', 'screamo', 'deathcore'],
};

function getGenreTent(genres: string[]): string {
  for (const [tent, keywords] of Object.entries(genreMap)) {
    if (genres.some((g) => keywords.some((k) => g.toLowerCase().includes(k)))) {
      return tent;
    }
  }
  return 'Misc';
}

export default function Poster() {
  const router = useRouter();
  const { token } = router.query;
  const [groupedArtists, setGroupedArtists] = useState<{ [genre: string]: string[] }>({});

  useEffect(() => {
    if (token) {
      fetch('https://api.spotify.com/v1/me/top/artists?limit=20', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const groups: { [genre: string]: string[] } = {};
          data.items.forEach((artist: Artist) => {
            const tent = getGenreTent(artist.genres);
            if (!groups[tent]) groups[tent] = [];
            groups[tent].push(artist.name);
          });
          setGroupedArtists(groups);
        });
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">🎤 Your 2025 Festival Lineup</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(groupedArtists).map(([genre, artists]) => (
          <div key={genre} className="bg-white shadow-md p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">{genre} Stage</h2>
            <ul className="space-y-1 text-lg">
              {artists.map((artist, i) => (
                <li key={i}>• {artist}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}