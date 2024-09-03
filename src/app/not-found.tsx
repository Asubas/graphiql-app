import React from 'react';
import styles from './not-found.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const PageNotFound: React.FC = () => {
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
        <h2 className={styles.h2head}>Error: 404 page not found</h2>
        <p className={styles.message}>Sorry, the page you&apos;re looking for cannot be accessed</p>
        <Link className={styles.linkToHome} href="/">
          Go Home
        </Link>
      </section>
    </main>
  );
};

export default PageNotFound;
