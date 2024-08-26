'use client';

import { useEffect, useState } from 'react';
import AuthBtn from '../Buttons/AuthBtn/AuthBtn';
import PrivateBtn from '../Buttons/PrivateBtn/PrivateBtn';
import styles from './Welcome.module.scss';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/src/utils/auth';
import { toast } from 'react-toastify';

export default function Welcome() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInClick = () => {
    if (isAuthenticated) {
      toast.info('You are already logged in!');
    } else {
      router.push('/signIn');
    }
  };

  const handleSignUpClick = () => {
    if (isAuthenticated) {
      toast.info('You are already registered!');
    } else {
      router.push('/signUp');
    }
  };

  //Кнопка logout, только чтобы протестировать
  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      toast.success('You have successfully logged out.');
      setIsAuthenticated(false);
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      <div className={styles.welcome}>
        <p className={styles.head}>Welcome!!</p>
        <p className={styles.disc}>If you want to try playground, please sign in or sign up</p>
        <div className={styles.buttonWrap}>
          <AuthBtn className="btnSignin" label="Sign In" onClick={handleSignInClick} />
          <AuthBtn className="btnSignup" label="Sign Up" onClick={handleSignUpClick} />
          <AuthBtn className="btnLogout" label="Logout" onClick={handleLogoutClick} />
        </div>
      </div>
      <div className={styles.welcome}>
        <p className={styles.head}>Welcome back, {'< USERNAME >'}!</p>
        <div className={styles.btnPrivate}>
          <PrivateBtn className="btnPrivate rest-btn" label="REST Client" />
          <PrivateBtn className="btnPrivate graphql-btn" label="GraphQL Client" />
          <PrivateBtn className="btnPrivate history-btn" label="History" />
        </div>
      </div>
    </>
  );
}
