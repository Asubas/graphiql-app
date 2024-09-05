'use client';

import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import { useAuth } from '../hooks/useAuthRedirect';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className={styles.main}>
      {!user ? (
        <About />
      ) : (
        <>
          <About />
          <p>Welcome back, {user.displayName || 'User'}!</p>
        </>
      )}{' '}
      <Welcome />
    </main>
  );
}
