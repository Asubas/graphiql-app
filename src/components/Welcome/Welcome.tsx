'use client';

import AuthBtn from '../Buttons/AuthBtn/AuthBtn';
import PrivateBtn from '../Buttons/PrivateBtn/PrivateBtn';
import styles from './Welcome.module.scss';

export default function Welcome() {
  // временно, для проверки кнопок
  const handleClick = () => {
    console.log('btn click');
  };

  return (
    <>
      <div className={styles.welcome}>
        <p className={styles.head}>Welcome!!</p>
        <p className={styles.disc}>If you want to try playground, please sign in or sign up</p>
        <div className={styles.buttonWrap}>
          <AuthBtn className="btnSignin" label="Sign In" onClick={handleClick} />
          <AuthBtn className="btnSignup" label="Sign Up" onClick={handleClick} />
        </div>
      </div>
      <div className={styles.welcome}>
        <p className={styles.head}>Welcome back, {'< USERNAME >'}!</p>
        <div className={styles.buttonWrap}>
          <PrivateBtn className="btnPrivate rest-btn" label="REST Client" />
          <PrivateBtn className="btnPrivate graphql-btn" label="GraphQL Client" />
          <PrivateBtn className="btnPrivate history-btn" label="History" />
        </div>
      </div>
    </>
  );
}
