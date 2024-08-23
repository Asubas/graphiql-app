import Image from 'next/image';
import styles from '@/src/components/About/About.module.scss';

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.course}>
        <div className={styles.img}></div>
        <p className={styles.text}>
          This application was created as part of the React course by RSSchool. If you also want to
          dive into the world of IT and specifically into the world of frontend development,{' '}
          <a className={styles.rsLink} href="https://rs.school/courses">
            enroll in the frontend development course
          </a>
          .
        </p>
      </div>
      <div className={styles.aboutWrap}>
        <article className={styles.description}>
          Welcome to the home of <span className={styles.strong}>DreamTeam</span>! We are a team of
          budding developers, unafraid of challenges and always moving forward. Our application is
          built to assist others by enabling requests to any open APIs. Whether you&apos;re making
          RESTful requests or diving into GraphQL, our platform is designed to empower your
          projects.
        </article>
        <h2 className={styles.h2}>Our Team</h2>
        <div className={styles.team}>
          <a
            className={styles.member}
            href="https://github.com/Asubas"
            target="_blank"
            data-testid="team-member-link"
          >
            <div className={styles.text}>
              <h3 className={styles.h3}>Alex (Asubas)</h3>
              <p className={styles.disc}>
                Team lead, developer
                <br />
                Russia, Yaroslavl
              </p>
            </div>
            <Image
              className={styles.photo}
              src="/photo-alexey.jpg"
              width={80}
              height={80}
              alt="Photo of developer Alex"
            />
          </a>
          <a
            className={styles.member}
            href="https://github.com/lipan4836"
            target="_blank"
            data-testid="team-member-link"
          >
            <div className={styles.text}>
              <h3 className={styles.h3}>Anton (lipan4836)</h3>
              <p className={styles.disc}>
                developer
                <br />
                Russia, Voronezh
              </p>
            </div>
            <Image
              className={styles.photo}
              src="/photo-anton.jpeg"
              width={80}
              height={80}
              alt="Photo of developer Anton"
            />
          </a>
          <a
            className={styles.member}
            href="https://github.com/pdasya"
            target="_blank"
            data-testid="team-member-link"
          >
            <div className={styles.text}>
              <h3 className={styles.h3}>Daria (pdasya)</h3>
              <p className={styles.disc}>
                developer
                <br />
                Japan, Tsukuba
              </p>
            </div>
            <Image
              className={styles.photo}
              src="/photo-daria.jpg"
              width={80}
              height={80}
              alt="Photo of developer Daria"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
