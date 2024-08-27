'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import HeaderAuthBtn from '../Buttons/HeaderAuthBtn/HeaderAuthBtn';

interface HeaderProps {
  isLogined: boolean;
  userName: string | null;
}

export default function Header({ isLogined, userName }: HeaderProps) {
  const [shrink, setShrink] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    if (!menuOpen) {
      document.body.classList.add(styles.bodyLock);
      document.documentElement.classList.add(styles.bodyLock);
    } else {
      document.body.classList.remove(styles.bodyLock);
      document.documentElement.classList.remove(styles.bodyLock);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove(styles.bodyLock);
    document.documentElement.classList.remove(styles.bodyLock);
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
        <svg
          id="burger-icon"
          className={`${styles.burgerIcon} ${menuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          viewBox="0 0 100 100"
          width="40"
          height="40"
          data-testid="burger-icon"
        >
          <rect className={`${styles.line} ${styles.top}`} x="10" y="25" width="80" height="10" />
          <rect
            className={`${styles.line} ${styles.middle}`}
            x="10"
            y="45"
            width="80"
            height="10"
          />
          <rect
            className={`${styles.line} ${styles.bottom}`}
            x="10"
            y="65"
            width="80"
            height="10"
          />
        </svg>
        <nav
          className={`${styles.nav} ${menuOpen ? styles.active : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.buttonsLang}>
            <input type="radio" id="option-one" name="selector" />
            <label htmlFor="option-one">EN</label>
            <input type="radio" id="option-two" name="selector" />
            <label htmlFor="option-two">RU</label>
          </div>
          <div className={`buttonWrap ${styles.headerBtn}`}>
            {!isLogined && (
              <>
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
              </>
            )}
            {isLogined && (
              <>
                <span className={styles.userName}>{userName}</span>
                <HeaderAuthBtn
                  className="btnHeadLogout"
                  onClick={handleClick}
                  data-testid="logout-btn"
                />
              </>
            )}
          </div>
        </nav>
      </div>

      {menuOpen && <div onClick={closeMenu} className={styles.overlay} data-testid="overlay"></div>}
    </header>
  );
}
