'use client';

import AuthBtn from '../Buttons/AuthBtn/AuthBtn';
import PrivateBtn from '../Buttons/PrivateBtn/PrivateBtn';
import styles from './Welcome.module.scss';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function Welcome() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const t = useTranslations('Welcome');

  const handleSignInClick = () => {
    if (user) {
      toast.info(t('alreadySignIn'));
    } else {
      router.push('/signIn');
    }
  };

  const handleSignUpClick = () => {
    if (user) {
      toast.info(t('alreadySignUp'));
    } else {
      router.push('/signUp');
    }
  };

  return (
    <div className={styles.welcome}>
      {!user ? (
        <>
          <p className={styles.head}>{t('welcome')}</p>
          <p className={styles.disc}>{t('description')}</p>
          <div className={styles.buttonWrap}>
            <AuthBtn className="btnSignin" label={t('signInLabel')} onClick={handleSignInClick} />
            <AuthBtn className="btnSignup" label={t('signUpLabel')} onClick={handleSignUpClick} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.btnPrivate}>
            <PrivateBtn className="btnPrivate rest-btn" label={t('restLabel')} />
            <PrivateBtn className="btnPrivate graphql-btn" label={t('graphQLLabel')} />
            <PrivateBtn className="btnPrivate history-btn" label={t('history')} />
          </div>
        </>
      )}
    </div>
  );
}
