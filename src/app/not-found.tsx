import React from 'react';
import styles from './not-found.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const PageNotFound: React.FC = () => {
  const t = useTranslations('NotFoundPage');
  return (
    <main className={styles.notFound}>
      <section className={styles.notFoundWrap}>
        <p className={styles.head}>
          4
          <span>
            <Image src={'/error.svg'} alt="page not found" width={170} height={200} />
          </span>
          4
        </p>
        <h2 className={styles.h2head}>{t('title')}</h2>
        <p className={styles.message}>{t('message')}</p>
        <Link className={styles.linkToHome} href="/">
          {t('link')}
        </Link>
      </section>
    </main>
  );
};

export default PageNotFound;
