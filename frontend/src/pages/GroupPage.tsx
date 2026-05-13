import React, { useState } from 'react';
import { User, Friend, RecommendationResult, getGroupRecommendations } from '../utils/api';
import WatchedMovieChip from '../components/WatchedMovieChip';
import RecommendationFlow from '../components/RecommendationFlow';
import { POSTER_COLORS } from '../utils/movieDetails';
import BorderGlow from '../components/BorderGlow';

interface Props { user: User | null; friends: Friend[]; }

const GroupPage: React.FC<Props> = ({ user, friends }) => {
  const [selected, setSelected]  = useState<string[]>([]);
  const [loading, setLoading]    = useState(false);
  const [error, setError]        = useState('');
  const [result, setResult]      = useState<RecommendationResult | null>(null);
  const [expanded, setExpanded]  = useState<string | null>(null);

  const toggle = (fid: string) =>
    setSelected(s => s.includes(fid) ? s.filter(x => x !== fid) : [...s, fid]);

  const combinedCount = () => {
    if (!user) return 0;
    const ids = new Set(user.watched_movies.map(m => m.movie_id));
    selected.forEach(fid => {
      const f = friends.find(x => x.friend_id === fid);
      f?.watched_movies.forEach(m => ids.add(m.movie_id));
    });
    return ids.size;
  };

  const handleGetRecs = async () => {
    if (selected.length === 0) { setError('Select at least one friend.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const data = await getGroupRecommendations(selected);
      setResult(data);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to get recommendations. Is the backend running?');
    } finally { setLoading(false); }
  };

  if (!user) return <div style={{ padding: '60px 24px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>;

  if (result) return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Group Picks</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          Based on {combinedCount()} combined movies from {selected.length + 1} people
        </p>
      </div>
      <RecommendationFlow result={result} onReset={() => setResult(null)} />
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Group Mode</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
          Select friends and find movies your whole crew will enjoy.
        </p>
      </div>

      {/* Friends grid */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700 }}>Select Friends</h2>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            {selected.length} selected
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {friends.map((f, i) => {
            const isSelected = selected.includes(f.friend_id);
            const color = POSTER_COLORS[i % POSTER_COLORS.length];
            const isExpanded = expanded === f.friend_id;
            return (
              <div key={f.friend_id}>
                <BorderGlow
                  borderRadius={12}
                  edgeSensitivity={30}
                  glowRadius={110}
                  glowColor={isSelected ? '265 95 72' : '235 28 70'}
                  glowIntensity={isSelected ? 1.1 : 0.85}
                >
                  <div onClick={() => toggle(f.friend_id)} style={{
                    padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                    background: isSelected ? 'rgba(108,99,255,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'rgba(108,99,255,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 12
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${color}, #0d0d14)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: '#fff'
                    }}>{f.friend_name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: isSelected ? '#a78bfa' : '#fff' }}>
                        {f.friend_name}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                        {f.watched_movies.length} movies
                      </div>
                    </div>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                      background: isSelected ? '#6c63ff' : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10
                    }}>{isSelected ? '✓' : ''}</div>
                  </div>
                </BorderGlow>
                {/* Expand to see watch history */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : f.friend_id)}
                  style={{
                    width: '100%', marginTop: 4, background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.2)', fontSize: 11, cursor: 'pointer',
                    padding: '4px 8px', textAlign: 'left', fontFamily: 'inherit'
                  }}
                >{isExpanded ? '▲ hide' : '▼ see watchlist'}</button>
                {isExpanded && (
                  <BorderGlow borderRadius={10} edgeSensitivity={24} glowRadius={54} glowIntensity={0.78} style={{ background: 'transparent', boxShadow: 'none' }}>
                    <div style={{
                      padding: '10px 12px', borderRadius: 10, marginTop: 4,
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex', flexDirection: 'column', gap: 4
                    }}>
                      {f.watched_movies.map(m => (
                        <div key={m.movie_id} style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                          · {m.title}
                        </div>
                      ))}
                    </div>
                  </BorderGlow>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {selected.length > 0 && (
        <BorderGlow borderRadius={12} edgeSensitivity={28} glowRadius={100} glowColor={'145 70 55'}>
          <div style={{
            padding: '16px 20px', borderRadius: 12, marginBottom: 20,
            background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)'
          }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>
                {selected.length} friend{selected.length > 1 ? 's' : ''}
              </span>
              {' '}selected · Combined watch history:{' '}
              <span style={{ color: '#4ade80', fontWeight: 600 }}>{combinedCount()} movies</span>
            </div>
          </div>
        </BorderGlow>
      )}

      {error && (
        <BorderGlow borderRadius={10} edgeSensitivity={28} glowRadius={90} glowColor={'5 78 62'}>
          <div style={{
            padding: '12px 16px', borderRadius: 10, marginBottom: 16,
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            color: '#fca5a5', fontSize: 13
          }}>{error}</div>
        </BorderGlow>
      )}

      <button onClick={handleGetRecs} disabled={loading || selected.length === 0} style={{
        width: '100%', padding: '16px', borderRadius: 12, border: 'none',
        background: (loading || selected.length === 0)
          ? 'rgba(108,99,255,0.25)'
          : 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
        color: (loading || selected.length === 0) ? 'rgba(255,255,255,0.3)' : '#fff',
        fontSize: 16, fontWeight: 700, cursor: (loading || selected.length === 0) ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit', transition: 'all 0.2s'
      }}>
        {loading ? '🔍 Finding movies for everyone...' : '✨ Get Group Recommendations'}
      </button>
    </div>
  );
};

export default GroupPage;