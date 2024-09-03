'use client';

import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import { useAuth } from '../hooks/useAuthRedirect';

export default function Home() {
  const { user } = useAuth();

  return !user ? (
    <main className={styles.main}>
      <About />
      <Welcome />
    </main>
  ) : (
    <main className={styles.main}>
      <p>Welcome back, {user.displayName || 'User'}!</p>
      <Welcome />
    </main>
  );
}
