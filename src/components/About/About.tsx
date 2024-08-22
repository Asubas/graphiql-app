import Image from 'next/image';
import styles from '@/src/components/About/About.module.scss';

export default function About() {
  return (
    <div className={styles.about}>
      <article className={styles.description}>
        Welcome to the home of DreamTeam! We are a team of budding developers, unafraid of
        challenges and always moving forward. Our application is built to assist others by enabling
        requests to any open APIs. Whether you&apos;re making RESTful requests or diving into
        GraphQL, our platform is designed to empower your projects.
      </article>
      <div className={styles.team}>
        <a className={styles.member} href="https://github.com/Asubas" target="_blank">
          <h3>Alex (Asubas)</h3>
          <p className={styles.disc}>
            Team lead, developer
            <br />
            Russia, Yaroslavl
          </p>
          <Image
            className={styles.photo}
            src="/photo-alexey.jpg"
            width={170}
            height={170}
            alt="Photo of developer Anton"
          />
        </a>
        <a className={styles.member} href="https://github.com/lipan4836" target="_blank">
          <h3>Anton (lipan4836)</h3>
          <p className={styles.disc}>
            developer
            <br />
            Russia, Voronezh
          </p>
          <Image
            className={styles.photo}
            src="/photo-anton.jpeg"
            width={170}
            height={170}
            alt="Photo of developer Anton"
          />
        </a>
        <a className={styles.member} href="https://github.com/pdasya" target="_blank">
          <h3>Daria (pdasya)</h3>
          <p className={styles.disc}>
            developer
            <br />
            Japan, Tsukuba
          </p>
          <Image
            className={styles.photo}
            src="/photo-anton.jpeg"
            width={170}
            height={170}
            alt="Photo of developer Anton"
          />
        </a>
      </div>
    </div>
  );
}
