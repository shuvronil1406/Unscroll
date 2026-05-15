import React from 'react';
import { User } from '../utils/api';
import WatchedMovieChip from '../components/WatchedMovieChip';
import BorderGlow from '../components/BorderGlow';

interface Props { user: User | null; onNavigate: (p: string) => void; }

const HomePage: React.FC<Props> = ({ user, onNavigate }) => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
    {/* Hero */}
    <div style={{ textAlign: 'center', marginBottom: 64, animation: 'fadeIn 0.6s ease' }}>
      <div style={{
        display: 'inline-block', marginBottom: 20,
        padding: '6px 18px', borderRadius: 20,
        background: 'rgba(108,99,255,0.1)',
        border: '1px solid rgba(108,99,255,0.25)',
        fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
        color: '#a78bfa'
      }}>ML-Powered Recommendations</div>
      <h1 style={{
        fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900,
        lineHeight: 1.1, marginBottom: 20, letterSpacing: -1
      }}>
        Cut through the noise.<br/>
        <span style={{ color: '#6c63ff' }}>Discover what to watch</span><br/>
        when choices overwhelm.
      </h1>
      <p style={{
        fontSize: 16, color: 'rgba(255,255,255,0.45)',
        maxWidth: 480, margin: '0 auto 40px'
      }}>
        Unscroll uses cosine similarity on your watch history to find your next perfect film.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('individual')} style={btnPrimary}>
          Solo Recommendations →
        </button>
        <button onClick={() => onNavigate('group')} style={btnSecondary}>
          Group Mode 👥
        </button>
      </div>
    </div>

    {/* Mode cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
      {[
        { title: 'Solo Mode', emoji: '🎯', desc: 'Get recommendations based on your personal taste profile using content-based filtering.', page: 'individual', color: '#6c63ff' },
        { title: 'Group Mode', emoji: '👥', desc: 'Select friends and get movies everyone in your group will enjoy watching together.', page: 'group', color: '#22c55e' },
      ].map(m => (
        <BorderGlow
          key={m.page}
          borderRadius={16}
          edgeSensitivity={30}
          glowRadius={130}
          glowColor={m.page === 'group' ? '145 70 55' : '265 95 72'}
        >
          <div onClick={() => onNavigate(m.page)} style={{
            padding: 28, borderRadius: 16, cursor: 'pointer',
            background: 'linear-gradient(135deg, #16162a 0%, #1e1e35 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.4)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = '';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '';
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 14 }}>{m.emoji}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: m.color }}>{m.title}</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{m.desc}</p>
          </div>
        </BorderGlow>
      ))}
    </div>

    {/* Watchlist */}
    {user && (
      <BorderGlow borderRadius={16} edgeSensitivity={26} glowRadius={120}>
        <div style={{
          padding: 28, borderRadius: 16,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Your Watchlist</h2>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{user.watched_movies.length} movies</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {user.watched_movies.map(m => (
              <WatchedMovieChip key={m.movie_id} movie={m} />
            ))}
          </div>
        </div>
      </BorderGlow>
    )}
  </div>
);

const btnPrimary: React.CSSProperties = {
  padding: '14px 28px', borderRadius: 12, border: 'none',
  background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
  color: '#fff', fontSize: 15, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit'
};

const btnSecondary: React.CSSProperties = {
  padding: '14px 28px', borderRadius: 12,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit'
};

export default HomePage;