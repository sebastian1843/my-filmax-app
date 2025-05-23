import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await serverAuth(req);

    const { movieId } = req.query;

    if (!movieId || typeof movieId !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing movie ID' });
    }

    const movie = await prismadb.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error('[MOVIE_FETCH_ERROR]', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
