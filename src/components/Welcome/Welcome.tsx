'use client';

import AuthBtn from '../Buttons/AuthBtn/AuthBtn';
import PrivateBtn from '../Buttons/PrivateBtn/PrivateBtn';
import styles from './Welcome.module.scss';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Welcome() {
  const router = useRouter();
  const token = document.cookie.includes('token=');

  const handleSignInClick = () => {
    if (token) {
      toast.info('You are already logged in!');
    } else {
      router.push('/signIn');
    }
  };

  const handleSignUpClick = () => {
    if (token) {
      toast.info('You are already registered!');
    } else {
      router.push('/signUp');
    }
  };

  return (
    <div className={styles.welcome}>
      {!token ? (
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
          <div className={styles.btnPrivate}>
            <PrivateBtn className="btnPrivate rest-btn" label="REST Client" />
            <PrivateBtn className="btnPrivate graphql-btn" label="GraphQL Client" path="graphql" />
            <PrivateBtn className="btnPrivate history-btn" label="History" path="history" />
          </div>
        </>
      )}
    </div>
  );
}
