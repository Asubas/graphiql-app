'use client';

import styles from './page.module.scss';
import About from '../../components/About/About';
import Welcome from '../../components/Welcome/Welcome';
import { useAuth } from '../../hooks/useAuthRedirect';
import { useTranslations } from 'next-intl';

export default function Home() {
  const { user } = useAuth();
  const t = useTranslations('HomePage');

  return (
    <main className={styles.main}>
      {!user ? (
        <About />
      ) : (
        <p>
          {t('title')} {user.displayName || 'User'}!
        </p>
      )}{' '}
      <Welcome />
    </main>
  );
}
