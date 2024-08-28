'use client';

import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/auth';
import AuthBtn from '../components/Buttons/AuthBtn/AuthBtn';
import { toast } from 'react-toastify';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      toast.success('You have successfully logged out.');
      setIsAuthenticated(false);
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setDisplayName(user.displayName);
      } else {
        setIsAuthenticated(false);
        setDisplayName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return !isAuthenticated ? (
    <main className={styles.main}>
      <About />
      <Welcome />
    </main>
  ) : (
    <main className={styles.main}>
      <p>Welcome back, {displayName}</p>
      <AuthBtn className="btnLogout" label="Logout" onClick={handleLogoutClick} />
    </main>
  );
}
