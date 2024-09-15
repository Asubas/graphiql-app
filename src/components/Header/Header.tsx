'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import HeaderAuthBtn from '@/src/components/Buttons/HeaderAuthBtn/HeaderAuthBtn';
import PrivateBtn from '@/src/components/Buttons/PrivateBtn/PrivateBtn';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getLocale, setLocale } from '@/src/utils/cookies';

export default function Header() {
  const router = useRouter();
  const { loading, user, signOut } = useAuth();
  const token = document.cookie.includes('token=');
  const [shrink, setShrink] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const locale = getLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleSignInClick = () => {
    router.push(`/${locale}/signIn`);
  };

  const handleSignUpClick = () => {
    router.push(`/${locale}/signUp`);
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

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    const newPathname = pathname.replace(`/${locale}`, '') || '/';
    router.push(
      `/${newLocale}${newPathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`,
    );
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
            <input
              type="radio"
              id="option-one"
              name="selector"
              checked={locale === 'en'}
              readOnly
              onClick={() => handleLocaleChange('en')}
            />
            <label htmlFor="option-one">EN</label>

            <input
              type="radio"
              id="option-two"
              name="selector"
              checked={locale === 'ru'}
              readOnly
              onClick={() => handleLocaleChange('ru')}
            />
            <label htmlFor="option-two">RU</label>
          </div>
          <div className={`buttonWrap ${styles.headerBtn}`}>
            {!loading && !token && (
              <>
                <HeaderAuthBtn
                  className="btnHeadSignin"
                  onClick={handleSignInClick}
                  data-testid="signin-btn"
                />
                <HeaderAuthBtn
                  className="btnHeadSignup"
                  onClick={handleSignUpClick}
                  data-testid="signup-btn"
                />
              </>
            )}
            {user && token && (
              <>
                <span className={styles.userName}>{user.displayName || 'User'}</span>
                <HeaderAuthBtn
                  className="btnHeadLogout"
                  onClick={signOut}
                  data-testid="logout-btn"
                />
              </>
            )}
          </div>
          {token && (
            <div className={styles.btnsPrivateBurger}>
              <PrivateBtn
                className={`btnPrivate rest-btn ${styles.btnBurgerRest}`}
                label="REST Client"
              />
              <PrivateBtn
                className={`btnPrivate graphql-btn ${styles.btnBurgerGraphql}`}
                label="GraphQL Client"
              />
              <PrivateBtn
                className={`btnPrivate history-btn ${styles.btnBurgerHistory}`}
                label="History"
              />
            </div>
          )}
        </nav>
      </div>

      {menuOpen && <div onClick={closeMenu} className={styles.overlay} data-testid="overlay"></div>}
    </header>
  );
}
