import axios from 'axios';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

const posterCache = new Map<number, string | null>();
const detailCache = new Map<number, TMDBMovieDetail | null>();

export interface TMDBMovieDetail {
  overview: string;
  tagline: string;
  director: string;
  genres: string[];
  year: string;
}

export const getTMDBPosterUrl = (path: string | null): string => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE}${path}`;
};

export const fetchMoviePosterUrl = async (movieId: number, title: string): Promise<string | null> => {
  if (posterCache.has(movieId)) {
    return posterCache.get(movieId) ?? null;
  }

  if (!TMDB_API_KEY) {
    posterCache.set(movieId, null);
    return null;
  }

  try {
    const movieRes = await axios.get(`${TMDB_API_BASE}/movie/${movieId}`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' }
    });

    const byIdPath = movieRes.data?.poster_path as string | undefined;
    if (byIdPath) {
      const byIdUrl = getTMDBPosterUrl(byIdPath);
      posterCache.set(movieId, byIdUrl);
      return byIdUrl;
    }
  } catch {
    // Fall through to title search.
  }

  try {
    const searchRes = await axios.get(`${TMDB_API_BASE}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query: title, include_adult: false }
    });

    const first = (searchRes.data?.results ?? [])[0];
    const byTitlePath = first?.poster_path as string | undefined;
    const byTitleUrl = byTitlePath ? getTMDBPosterUrl(byTitlePath) : null;
    posterCache.set(movieId, byTitleUrl);
    return byTitleUrl;
  } catch {
    posterCache.set(movieId, null);
    return null;
  }
};

const mapMovieDetail = (data: any): TMDBMovieDetail => {
  const crew = Array.isArray(data?.credits?.crew) ? data.credits.crew : [];
  const director = crew.find((member: any) => member?.job === 'Director')?.name;
  const genres = Array.isArray(data?.genres)
    ? data.genres.map((genre: any) => genre?.name).filter(Boolean)
    : [];

  return {
    overview: (data?.overview ?? '').trim(),
    tagline: (data?.tagline ?? '').trim(),
    director: director || 'Unknown Director',
    genres,
    year: (data?.release_date ?? '').slice(0, 4) || 'N/A'
  };
};

const fetchMovieDetailByTmdbId = async (tmdbId: number): Promise<TMDBMovieDetail | null> => {
  const res = await axios.get(`${TMDB_API_BASE}/movie/${tmdbId}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      append_to_response: 'credits'
    }
  });

  return mapMovieDetail(res.data);
};

export const fetchMovieDetail = async (movieId: number, title: string): Promise<TMDBMovieDetail | null> => {
  if (detailCache.has(movieId)) {
    return detailCache.get(movieId) ?? null;
  }

  if (!TMDB_API_KEY) {
    detailCache.set(movieId, null);
    return null;
  }

  try {
    const byId = await fetchMovieDetailByTmdbId(movieId);
    detailCache.set(movieId, byId);
    return byId;
  } catch {
    // Fall through to title search.
  }

  try {
    const searchRes = await axios.get(`${TMDB_API_BASE}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
        include_adult: false,
        language: 'en-US'
      }
    });

    const first = (searchRes.data?.results ?? [])[0];
    if (!first?.id) {
      detailCache.set(movieId, null);
      return null;
    }

    const byTitle = await fetchMovieDetailByTmdbId(first.id);
    detailCache.set(movieId, byTitle);
    return byTitle;
  } catch {
    detailCache.set(movieId, null);
    return null;
  }
};