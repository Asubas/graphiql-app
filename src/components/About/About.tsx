import Image from 'next/image';
import styles from '@/src/components/About/About.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

function ErrorThrower() {
  throw new Error('Это тестовая ошибка!');
  return null;
}

export default function About() {
  const [showError, setShowError] = useState(false);
  const t = useTranslations('AboutPage');

  return (
    <div className={styles.about}>
      <div className={styles.course}>
        <div className={styles.img}></div>
        <p className={styles.text}>
          {t('text')}{' '}
          <a className={styles.rsLink} href="https://rs.school/courses">
            {t('rsLinkText')}
          </a>
          .
        </p>
      </div>
      <div className={styles.aboutWrap}>
        <article className={styles.description}>
          {t('descriptionBeggining')} <span className={styles.strong}>DreamTeam</span>
          {t('descriptionEnd')}
        </article>
        <h2 className={styles.h2}>{t('team')}</h2>
        <div className={styles.team}>
          <a
            className={styles.member}
            href="https://github.com/Asubas"
            target="_blank"
            data-testid="team-member-link"
          >
            <div className={styles.text}>
              <h3 className={styles.h3}>{t('asubasName')}</h3>
              <p className={styles.disc}>
                {t('asubasRole')}
                <br />
                {t('asubasLocation')}
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
              <h3 className={styles.h3}>{t('lipanName')}</h3>
              <p className={styles.disc}>
                {t('lipanRole')}
                <br />
                {t('lipanLocation')}
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
              <h3 className={styles.h3}>{t('pdasyaName')}</h3>
              <p className={styles.disc}>
                {t('pdasyaRole')}
                <br />
                {t('pdasyaLocation')}
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

      {/* тест выброса ошибки для улова */}
      <button className="btnErrorTest" onClick={() => setShowError(true)}>
        {t('throwError')}
      </button>
      {showError && <ErrorThrower />}
    </div>
  );
}
