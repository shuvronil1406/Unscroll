import React, { useState, useEffect } from 'react';
import { Movie } from '../utils/api';
import { getMovieDetail, POSTER_COLORS } from '../utils/movieDetails';
import { fetchMovieDetail, fetchMoviePosterUrl, TMDBMovieDetail } from '../utils/tmdb';
import BorderGlow from './BorderGlow';

interface Props {
  movie: Movie;
  similarity: number;
  isFirst: boolean;
  onYes?: () => void;
  onNo?: () => void;
  onNewRecs?: () => void;
  onAddWatchlist?: () => void;
  animateOut?: boolean;
  animateIn?: boolean;
}

const MovieCard: React.FC<Props> = ({
  movie, similarity, isFirst, onYes, onNo, onNewRecs, onAddWatchlist,
  animateOut = false, animateIn = false
}) => {
  const fallbackDetail = getMovieDetail(movie.movie_id);
  const colorIdx = movie.movie_id % POSTER_COLORS.length;
  const posterBg = POSTER_COLORS[colorIdx];
  const pct = Math.round(similarity * 100);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [tmdbDetail, setTmdbDetail] = useState<TMDBMovieDetail | null>(null);

  const directorName = tmdbDetail?.director || fallbackDetail.director;
  const displayText = tmdbDetail?.tagline || tmdbDetail?.overview || fallbackDetail.overview;
  const displayYear = tmdbDetail?.year || fallbackDetail.year;
  const displayGenres = tmdbDetail?.genres?.length ? tmdbDetail.genres : fallbackDetail.genres;

  useEffect(() => {
    let isActive = true;
    setPosterUrl(null);
    setImageFailed(false);
    setTmdbDetail(null);

    fetchMoviePosterUrl(movie.movie_id, movie.title).then((url) => {
      if (isActive) setPosterUrl(url);
    });

    fetchMovieDetail(movie.movie_id, movie.title).then((detail) => {
      if (isActive) setTmdbDetail(detail);
    });

    return () => {
      isActive = false;
    };
  }, [movie.movie_id, movie.title]);

  const cardStyle: React.CSSProperties = {
    animation: animateOut ? 'fadeOut 0.4s ease forwards'
             : animateIn  ? 'slideInRight 0.5s ease forwards'
             : 'fadeIn 0.5s ease forwards',
    background: 'linear-gradient(135deg, #16162a 0%, #1e1e35 100%)',
    borderRadius: 20,
    overflow: 'hidden',
    maxWidth: 520,
    width: '100%',
    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.07)',
  };

  return (
    <BorderGlow style={cardStyle} borderRadius={20} edgeSensitivity={34} glowRadius={160} glowIntensity={1.1}>
      {/* Poster */}
      <div style={{
        height: 320,
        background: `linear-gradient(135deg, ${posterBg} 0%, #0d0d14 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        {posterUrl && !imageFailed && (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            onError={() => setImageFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)',
          zIndex: 1
        }}/>
        {/* Big title overlay on poster */}
        <div style={{ textAlign: 'center', padding: '0 24px', zIndex: 2 }}>
          <div style={{
            fontSize: 13, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', marginBottom: 12
          }}>Now Showing</div>
          <div style={{
            fontSize: Math.min(36, Math.max(22, 400 / movie.title.length)),
            fontWeight: 900, color: '#fff',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)', lineHeight: 1.2
          }}>{movie.title}</div>
          <div style={{
            marginTop: 16, display: 'inline-block',
            background: 'rgba(108,99,255,0.85)', borderRadius: 20,
            padding: '6px 16px', fontSize: 13, fontWeight: 600,
            backdropFilter: 'blur(10px)'
          }}>
            {pct}% Match
          </div>
        </div>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 180, height: 180, borderRadius: '50%',
          background: 'rgba(108,99,255,0.12)', zIndex: 1
        }}/>
        <div style={{
          position: 'absolute', bottom: -60, left: -30,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', zIndex: 1
        }}/>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 28px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          <span style={tagStyle}>{displayYear}</span>
          {displayGenres.slice(0,3).map(g => (
            <span key={g} style={tagStyle}>{g}</span>
          ))}
        </div>

        {/* Overview */}
        <p style={{
          fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.7)',
          marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{displayText}</p>

        {/* Director */}
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 22 }}>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>Directed by </span>
          {directorName}
        </div>

        {/* Similarity bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase' }}>Match Score</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6c63ff' }}>{pct}%</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
            <div style={{
              height: '100%', borderRadius: 2, width: `${pct}%`,
              background: 'linear-gradient(90deg, #6c63ff, #a78bfa)',
              transition: 'width 1s ease'
            }}/>
          </div>
        </div>

        {/* Buttons */}
        {isFirst ? (
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onYes} style={btnPrimary}>
              ✓ Yes, I'll watch this!
            </button>
            <button onClick={onNo} style={btnSecondary}>
              → Show me another
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={onAddWatchlist} style={btnAccent}>
              + Add to Watchlist
            </button>
            <button onClick={onNewRecs} style={btnSecondary}>
              ↻ New Recommendations
            </button>
          </div>
        )}
      </div>
    </BorderGlow>
  );
};

const tagStyle: React.CSSProperties = {
  fontSize: 11, padding: '4px 10px', borderRadius: 20,
  background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)',
  border: '1px solid rgba(255,255,255,0.08)', letterSpacing: 0.5
};

const btnBase: React.CSSProperties = {
  flex: 1, padding: '13px 20px', borderRadius: 12, border: 'none',
  cursor: 'pointer', fontSize: 14, fontWeight: 600,
  fontFamily: 'inherit', transition: 'all 0.2s ease', letterSpacing: 0.3
};

const btnPrimary: React.CSSProperties = {
  ...btnBase, background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
  color: '#fff', boxShadow: '0 4px 20px rgba(108,99,255,0.35)'
};

const btnSecondary: React.CSSProperties = {
  ...btnBase, background: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)'
};

const btnAccent: React.CSSProperties = {
  ...btnBase, background: 'linear-gradient(135deg, #22c55e, #16a34a)',
  color: '#fff', boxShadow: '0 4px 20px rgba(34,197,94,0.25)'
};

export default MovieCard;