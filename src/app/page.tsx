'use client';

import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useEffect, useState } from 'react';

export default function Home() {
  // тестовое изменение состояние на рендер
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  // перед монтированием проверяем лс
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLogined') === 'true';
    const storedUserName = localStorage.getItem('userName');
    setIsLogined(storedLoginState);
    setUserName(storedUserName);
  }, []);

  // временная функция изменения состояния isLogined
  const toggleLoginState = () => {
    const newLoginState = !isLogined;
    setIsLogined(newLoginState);

    if (newLoginState) {
      const name = 'Test User';
      localStorage.setItem('isLogined', 'true');
      localStorage.setItem('userName', name);
      setUserName(name);
    } else {
      localStorage.setItem('isLogined', 'false');
      localStorage.removeItem('userName');
      setUserName(null);
    }
  };

  return (
    <>
      <Header isLogined={isLogined} userName={userName} />
      <main className={styles.main}>
        <About />
        <Welcome isLogined={isLogined} userName={userName} />
        {/* кнопка для тестов состояния логина */}
        <button className="btnTest" onClick={toggleLoginState}>
          Toggle Login
        </button>
      </main>
      <Footer />
    </>
  );
}
