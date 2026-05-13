import React, { useState } from 'react';
import { RecommendationResult } from '../utils/api';
import MovieCard from './MovieCard';

type Step = 'card1' | 'transitioning' | 'card2' | 'accepted' | 'added';

interface Props {
  result: RecommendationResult;
  onReset: () => void;
}

const RecommendationFlow: React.FC<Props> = ({ result, onReset }) => {
  const [step, setStep] = useState<Step>('card1');
  const [animOut, setAnimOut] = useState(false);

  const handleNo = () => {
    setAnimOut(true);
    setTimeout(() => {
      setStep('card2');
      setAnimOut(false);
    }, 420);
  };

  if (step === 'accepted') {
    return (
      <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease forwards' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎬</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Great choice!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
          Enjoy watching <strong style={{ color: '#fff' }}>{result.movie_1.title}</strong>
        </p>
        <button onClick={onReset} style={resetBtn}>↻ Get More Recommendations</button>
      </div>
    );
  }

  if (step === 'added') {
    return (
      <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease forwards' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Added to Watchlist!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
          <strong style={{ color: '#fff' }}>{result.movie_2.title}</strong> is saved for later.
        </p>
        <button onClick={onReset} style={resetBtn}>↻ Get More Recommendations</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {step === 'transitioning' || step === 'card2' ? (
        <div style={{
          padding: '10px 20px', borderRadius: 20,
          background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
          fontSize: 13, animation: 'fadeIn 0.4s ease'
        }}>
          Alright, here's another option for you...
        </div>
      ) : null}

      {step === 'card1' || step === 'transitioning' ? (
        <MovieCard
          movie={result.movie_1}
          similarity={result.similarity_1}
          isFirst={true}
          animateOut={animOut}
          onYes={() => setStep('accepted')}
          onNo={handleNo}
        />
      ) : (
        <MovieCard
          movie={result.movie_2}
          similarity={result.similarity_2}
          isFirst={false}
          animateIn={true}
          onAddWatchlist={() => setStep('added')}
          onNewRecs={onReset}
        />
      )}
    </div>
  );
};

const resetBtn: React.CSSProperties = {
  padding: '14px 32px', borderRadius: 12, border: 'none',
  background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
  color: '#fff', fontSize: 15, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit'
};

export default RecommendationFlow;