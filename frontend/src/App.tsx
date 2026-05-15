import React, { useState, useEffect } from 'react';
import { User, Friend, getUser, getFriends } from './utils/api';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IndividualPage from './pages/IndividualPage';
import GroupPage from './pages/GroupPage';

type Page = 'home' | 'individual' | 'group';

const App: React.FC = () => {
  const [page, setPage]       = useState<Page>('home');
  const [user, setUser]       = useState<User | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [backendUp, setBackendUp] = useState(true);

  useEffect(() => {
    Promise.all([getUser(), getFriends()])
      .then(([u, f]) => { setUser(u); setFriends(f); })
      .catch(() => setBackendUp(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d14' }}>
      <Navbar
        page={page}
        onNavigate={p => setPage(p as Page)}
        username={user?.username ?? '...'}
        watchCount={user?.watched_movies.length ?? 0}
      />

      {!backendUp && (
        <div style={{
          margin: '0 auto', maxWidth: 600, marginTop: 24, padding: '14px 20px',
          borderRadius: 10, background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          color: '#fca5a5', fontSize: 13, textAlign: 'center'
        }}>
          ⚠ Backend not reachable at <code>http://localhost:5000</code> — start it with <code>python app.py</code>
        </div>
      )}

      <main>
        {page === 'home'       && <HomePage user={user} onNavigate={p => setPage(p as Page)} />}
        {page === 'individual' && <IndividualPage user={user} />}
        {page === 'group'      && <GroupPage user={user} friends={friends} />}
      </main>
    </div>
  );
};

export default App;