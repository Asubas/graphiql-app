import AuthBtn from '../Buttons/AuthBtn/AuthBtn';
import PrivateBtn from '../Buttons/PrivateBtn/PrivateBtn';
import styles from './Welcome.module.scss';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/src/utils/cookies';

export default function Welcome() {
  const router = useRouter();
  const token = document.cookie.includes('token=');
  const locale = getLocale();
  const t = useTranslations('Welcome');

  const handleSignInClick = () => {
    if (token) {
      toast.info(t('alreadySignIn'));
    } else {
      router.push(`/${locale}/signIn`);
    }
  };

  const handleSignUpClick = () => {
    if (token) {
      toast.info(t('alreadySignUp'));
    } else {
      router.push(`/${locale}/signUp`);
    }
  };

  return (
    <div className={styles.welcome}>
      {!token ? (
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
            <PrivateBtn
              className="btnPrivate graphql-btn"
              label={t('graphQLLabel')}
              path="graphql"
            />
            <PrivateBtn className="btnPrivate history-btn" label={t('history')} path="history" />
          </div>
        </>
      )}
    </div>
  );
}
