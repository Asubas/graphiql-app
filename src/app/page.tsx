'use client';

import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import { useUser } from '../context/UserContext';

export default function Home() {
  const { isLogined, userName, toggleLoginState } = useUser();

  return (
    <>
      <main className={styles.main}>
        <About />
        <Welcome isLogined={isLogined} userName={userName} />
        {/* кнопка для тестов состояния логина */}
        <button className="btnTest" onClick={toggleLoginState}>
          Toggle Login
        </button>
      </main>
    </>
  );
}
