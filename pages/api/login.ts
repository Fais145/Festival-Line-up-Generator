import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const redirect_uri = 'https://localhost:3000/api/callback';
  const scope = 'user-top-read';

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  res.redirect(authUrl);
}