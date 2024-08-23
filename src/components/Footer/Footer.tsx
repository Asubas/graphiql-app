import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrap}>
        <div className={styles.links}>
          <Image
            className={styles.gitLogo}
            src="/github-logo.svg"
            alt="github logo"
            width={56}
            height={56}
          />
          <div className={styles.linksWrap}>
            <a className={styles.link} href="https://github.com/Asubas" target="_blank">
              Asubas
            </a>
            <a className={styles.link} href="https://github.com/lipan4836" target="_blank">
              lipan4836
            </a>
            <a className={styles.link} href="https://github.com/pdasya" target="_blank">
              pdasya
            </a>
          </div>
        </div>
        <time className={styles.created} dateTime="2024">
          2024
        </time>
        <a href="https://rs.school/courses" target="_blank">
          <Image
            className={styles.rsLogo}
            src="/rs-logo.svg"
            alt="RSSchool logo"
            width={56}
            height={56}
          />
        </a>
      </div>
    </footer>
  );
}
