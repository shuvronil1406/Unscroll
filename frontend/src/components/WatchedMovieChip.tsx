import React from 'react';
import { Movie } from '../utils/api';
import { POSTER_COLORS } from '../utils/movieDetails';
import BorderGlow from './BorderGlow';

interface Props { movie: Movie; onRemove?: () => void; }

const WatchedMovieChip: React.FC<Props> = ({ movie, onRemove }) => {
  const color = POSTER_COLORS[movie.movie_id % POSTER_COLORS.length];
  return (
    <BorderGlow
      borderRadius={10}
      edgeSensitivity={26}
      glowRadius={26}
      glowIntensity={0.8}
      glowColor={'265 95 72'}
      colors={['#a78bfa', '#f472b6', '#38bdf8']}
      fillOpacity={0.38}
      style={{ background: 'transparent', boxShadow: 'none' }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        fontSize: 13, color: 'rgba(255,255,255,0.75)'
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: color, flexShrink: 0
        }}/>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {movie.title}
        </span>
        {onRemove && (
          <button onClick={onRemove} style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)',
            cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0
          }}>✕</button>
        )}
      </div>
    </BorderGlow>
  );
};

export default WatchedMovieChip;