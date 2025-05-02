import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code || null;

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
    },
    data: new URLSearchParams({
      code: code as string,
      redirect_uri: 'https://localhost:3000/api/callback',
      grant_type: 'authorization_code',
    }),
  };

  try {
    const response = await axios(authOptions);
    const { access_token } = response.data;
    res.redirect(`/poster?token=${access_token}`);
  } catch (err) {
    res.status(400).json({ error: 'Invalid token exchange' });
  }
}
