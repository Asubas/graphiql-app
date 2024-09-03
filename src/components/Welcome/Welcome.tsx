'use client';

import AuthBtn from '../Buttons/AuthBtn/AuthBtn';
import PrivateBtn from '../Buttons/PrivateBtn/PrivateBtn';
import styles from './Welcome.module.scss';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { toast } from 'react-toastify';

export default function Welcome() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignInClick = () => {
    if (user) {
      toast.info('You are already logged in!');
    } else {
      router.push('/signIn');
    }
  };

  const handleSignUpClick = () => {
    if (user) {
      toast.info('You are already registered!');
    } else {
      router.push('/signUp');
    }
  };

  const handleLogoutClick = async () => {
    try {
      await signOut();
      toast.success('You have successfully logged out.');
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <div className={styles.welcome}>
      {!user ? (
        <>
          <p className={styles.head}>Welcome!!</p>
          <p className={styles.disc}>If you want to try playground, please sign in or sign up</p>
          <div className={styles.buttonWrap}>
            <AuthBtn className="btnSignin" label="Sign In" onClick={handleSignInClick} />
            <AuthBtn className="btnSignup" label="Sign Up" onClick={handleSignUpClick} />
          </div>
        </>
      ) : (
        <>
          <p className={styles.head}>Welcome back, {user.displayName || 'User'}!</p>
          <div className={styles.btnPrivate}>
            <PrivateBtn className="btnPrivate rest-btn" label="REST Client" />
            <PrivateBtn className="btnPrivate graphql-btn" label="GraphQL Client" />
            <PrivateBtn className="btnPrivate history-btn" label="History" />
            <AuthBtn className="btnLogout" label="Logout" onClick={handleLogoutClick} />
          </div>
        </>
      )}
    </div>
  );
}
