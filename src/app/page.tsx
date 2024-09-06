'use client';

import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import { useAuth } from '../hooks/useAuthRedirect';
import Loader from '../components/Loader/Loader';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className={styles.main}>
        <Loader />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {!user ? <About /> : <p>Welcome back, {user.displayName || 'User'}!</p>}
      <Welcome />
    </main>
  );
}
