'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import HeaderAuthBtn from '../Buttons/HeaderAuthBtn/HeaderAuthBtn';

export default function Header() {
  const [shrink, setShrink] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShrink(true);
      else setShrink(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    console.log('header click');
  };

  return (
    <header className={`${styles.header} ${shrink ? styles.shrink : ''}`}>
      <div className={styles.headerWrap}>
        <Link className={styles.logo} href="/">
          <Image
            className={styles.img}
            src="/header-logo.svg"
            alt="Client logo"
            width={56}
            height={56}
          />
          <h1 className={styles.heading}>API Client</h1>
        </Link>
        <nav className={styles.nav}>
          <div className={styles.buttonsLang}>
            <input type="radio" id="option-one" name="selector" />
            <label htmlFor="option-one">EN</label>
            <input type="radio" id="option-two" name="selector" />
            <label htmlFor="option-two">RU</label>
          </div>
          <div className={`buttonWrap ${styles.headerBtn}`}>
            <HeaderAuthBtn
              className="btnHeadSignin"
              onClick={handleClick}
              data-testid="signin-btn"
            />
            <HeaderAuthBtn
              className="btnHeadSignup"
              onClick={handleClick}
              data-testid="signup-btn"
            />
            <HeaderAuthBtn
              className="btnHeadLogout"
              onClick={handleClick}
              data-testid="logout-btn"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
