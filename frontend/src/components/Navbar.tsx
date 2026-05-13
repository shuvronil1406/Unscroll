import React from 'react';
import BorderGlow from './BorderGlow';

interface Props {
  page: string;
  onNavigate: (p: string) => void;
  username: string;
  watchCount: number;
}

const Navbar: React.FC<Props> = ({ page, onNavigate, username, watchCount }) => (
  <nav style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 32px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(20px)',
    position: 'sticky', top: 0, zIndex: 100
  }}>
    <button onClick={() => onNavigate('home')} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: 'inherit',
      letterSpacing: -0.5
    }}>
      unscroll<span style={{ color: '#6c63ff' }}>.</span>
    </button>

    <div style={{ display: 'flex', gap: 6 }}>
      {['home','individual','group'].map(p => (
        <button key={p} onClick={() => onNavigate(p)} style={{
          padding: '8px 18px', borderRadius: 8, border: 'none',
          background: page === p ? 'rgba(108,99,255,0.2)' : 'transparent',
          color: page === p ? '#a78bfa' : 'rgba(255,255,255,0.45)',
          cursor: 'pointer', fontSize: 13, fontWeight: 500,
          fontFamily: 'inherit', textTransform: 'capitalize',
          transition: 'all 0.2s'
        }}>
          {p === 'individual' ? 'Solo' : p === 'group' ? 'Group' : 'Home'}
        </button>
      ))}
    </div>

    <BorderGlow
      borderRadius={10}
      edgeSensitivity={24}
      glowRadius={30}
      glowIntensity={0.85}
      glowColor={'265 95 72'}
      colors={['#a78bfa', '#f472b6', '#38bdf8']}
      fillOpacity={0.35}
      style={{ background: 'transparent', boxShadow: 'none' }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 14px', borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700
        }}>{username[0]?.toUpperCase()}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{username}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{watchCount} watched</div>
        </div>
      </div>
    </BorderGlow>
  </nav>
);

export default Navbar;