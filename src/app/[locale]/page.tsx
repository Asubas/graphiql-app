'use client';

import styles from './page.module.scss';
import About from '../../components/About/About';
import Welcome from '../../components/Welcome/Welcome';
import { useAuth } from '../../hooks/useAuthRedirect';
import { useTranslations } from 'next-intl';

export default function Home() {
  const { user } = useAuth();
  const token = typeof window !== 'undefined' && document.cookie.includes('token=');
  const t = useTranslations('HomePage');

  return (
    <main className={styles.main}>
      <About />
      {token && (
        <p className={styles.user}>
          {t('title')} {token && user && user.displayName ? user?.displayName : 'User'}!
        </p>
      )}{' '}
      <Welcome />
    </main>
  );
}
