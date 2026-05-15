import React, { useEffect, useState } from 'react';
import {
  User,
  Movie,
  RecommendationResult,
  getIndividualRecommendations,
  getLastRecommendations,
  submitRecommendationFeedback,
  getUser,
} from '../utils/api';
import WatchedMovieChip from '../components/WatchedMovieChip';
import RecommendationFlow from '../components/RecommendationFlow';
import BorderGlow from '../components/BorderGlow';

interface Props { user: User | null; }

const IndividualPage: React.FC<Props> = ({ user }) => {
  const [displayUser, setDisplayUser] = useState<User | null>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [result, setResult]   = useState<RecommendationResult | null>(null);
  const [pendingRecommendations, setPendingRecommendations] = useState<Movie[]>([]);
  const [watchedFromPending, setWatchedFromPending] = useState<number[]>([]);

  useEffect(() => {
    setDisplayUser(user);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    getLastRecommendations()
      .then((data) => setPendingRecommendations(data.pending_recommendations || []))
      .catch(() => {});
  }, [user]);

  const toggleWatched = (movieId: number) => {
    setWatchedFromPending((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      await submitRecommendationFeedback(watchedFromPending);
      const refreshedUser = await getUser();
      setDisplayUser(refreshedUser);
      setPendingRecommendations([]);
      setWatchedFromPending([]);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to save your feedback.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecs = async () => {
    if (!displayUser) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const data = await getIndividualRecommendations();
      if ('requires_feedback' in data && data.requires_feedback) {
        setPendingRecommendations(data.pending_recommendations || []);
        setError('Before new recommendations, please tell us which of your last recommendations you watched.');
      } else {
        setResult(data);
      }
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to get recommendations. Is the backend running?');
    } finally { setLoading(false); }
  };

  if (!displayUser) return <LoadingState />;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
      {!result ? (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Solo Recommendations</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              Based on your {displayUser.watched_movies.length} watched movies, we'll find your next perfect watch.
            </p>
          </div>

          {pendingRecommendations.length > 0 && (
            <BorderGlow borderRadius={14} edgeSensitivity={28} glowRadius={120}>
              <div style={{ ...sectionCard, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 700 }}>Last Recommendations Check</h2>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                    {pendingRecommendations.length} movies
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
                  Did you watch any of these last recommendations?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                  {pendingRecommendations.map((movie) => {
                    const selected = watchedFromPending.includes(movie.movie_id);
                    return (
                      <div key={movie.movie_id} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', borderRadius: 10,
                        background: selected ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${selected ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.08)'}`
                      }}>
                        <span style={{ fontSize: 13, color: '#fff' }}>{movie.title}</span>
                        <button
                          onClick={() => toggleWatched(movie.movie_id)}
                          style={{
                            border: 'none', borderRadius: 8, padding: '6px 10px',
                            cursor: 'pointer', fontSize: 12, fontWeight: 600,
                            background: selected ? 'rgba(34,197,94,0.9)' : 'rgba(255,255,255,0.1)',
                            color: selected ? '#03110a' : 'rgba(255,255,255,0.75)'
                          }}
                        >
                          {selected ? 'Watched' : 'Mark as Watched'}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={handleSubmitFeedback}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10,
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                    color: '#fff', fontWeight: 700, fontSize: 14
                  }}
                >
                  {loading ? 'Saving your feedback...' : 'Continue with New Recommendations'}
                </button>
              </div>
            </BorderGlow>
          )}

          {/* Watchlist */}
          <BorderGlow borderRadius={14} edgeSensitivity={28} glowRadius={120}>
            <div style={sectionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Your Watch History</h2>
                <span style={{ fontSize: 12, color: '#6c63ff', fontWeight: 600 }}>
                  {displayUser.watched_movies.length} movies
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {displayUser.watched_movies.map(m => <WatchedMovieChip key={m.movie_id} movie={m} />)}
              </div>
            </div>
          </BorderGlow>

          {/* How it works */}
          <BorderGlow borderRadius={14} edgeSensitivity={28} glowRadius={120}>
            <div style={{ ...sectionCard, marginBottom: 32 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>How it works</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                {[
                  { n:'1', label:'Vectorize', desc:'Your history is converted to a 5000-feature vector using CountVectorizer' },
                  { n:'2', label:'Similarity', desc:'Cosine similarity is computed against all 4800+ TMDB movies' },
                  { n:'3', label:'Filter', desc:'Already-watched movies are excluded from results' },
                  { n:'4', label:'Reveal', desc:'Top 2 matches are shown sequentially for you to choose' },
                ].map(s => (
                  <div key={s.n} style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.12)' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: '#6c63ff', marginBottom: 4 }}>{s.n}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>

          {error && (
            <BorderGlow borderRadius={10} edgeSensitivity={28} glowRadius={90} glowColor={'5 78 62'}>
              <div style={{ padding: '14px 18px', borderRadius: 10, marginBottom: 20,
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                color: '#fca5a5', fontSize: 13 }}>{error}</div>
            </BorderGlow>
          )}

          <button onClick={handleGetRecs} disabled={loading} style={{
            width: '100%', padding: '16px', borderRadius: 12, border: 'none',
            background: loading ? 'rgba(108,99,255,0.4)' : 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
            color: '#fff', fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', transition: 'opacity 0.2s'
          }}>
            {loading ? '🔍 Finding your next watch...' : '✨ Get My Recommendations'}
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Your Top Picks</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              Curated from {displayUser.watched_movies.length} movies in your history
            </p>
          </div>
          <RecommendationFlow result={result} onReset={() => setResult(null)} />
        </div>
      )}
    </div>
  );
};

const LoadingState = () => (
  <div style={{ textAlign: 'center', padding: '80px 24px' }}>
    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', animation: 'pulse 1.5s ease infinite' }}>
      Loading your profile...
    </div>
  </div>
);

const sectionCard: React.CSSProperties = {
  padding: 24, borderRadius: 14, marginBottom: 20,
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)'
};

export default IndividualPage;