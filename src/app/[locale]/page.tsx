'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.scss';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import About from '@/src/components/About/About';
import Welcome from '@/src/components/Welcome/Welcome';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const { user } = useAuth();

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
