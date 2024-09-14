'use client';

import styles from './page.module.scss';
import About from '../../components/About/About';
import Welcome from '../../components/Welcome/Welcome';
import { useAuth } from '../../hooks/useAuthRedirect';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user } = useAuth();
  const tokenExist = typeof window !== 'undefined' && document.cookie.includes('token=');
  const t = useTranslations('HomePage');
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (tokenExist) setToken(tokenExist);
  }, [tokenExist]);

  return (
    <main className={styles.main}>
      {!token ? (
        <About />
      ) : (
        <p>
          {t('title')} {token && user && user.displayName ? user?.displayName : 'User'}!
        </p>
      )}{' '}
      <Welcome />
    </main>
  );
}
