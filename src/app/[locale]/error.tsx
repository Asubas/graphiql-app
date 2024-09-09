'use client'; // Error boundaries must be Client Components

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ErrorUI({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const t = useTranslations('ErrorPage');

  useEffect(() => {
    console.error(error);
  }, [error]);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <section className="error">
      <div className="error_img"></div>
      <h2 className="error_h2">{t('title')}</h2>
      <p className="error_msg">
        <span className="error_msg__title">{t('errorMessage')}</span> {error.message}
      </p>
      <button className="error_btn" onClick={toggleDetails}>
        {showDetails ? t('hideDetails') : t('showDetails')}
      </button>
      {showDetails && <pre className="error_details">{error.stack}</pre>}
      <a href="/" className="error_btn">
        {t('tryAgain')}
      </a>
    </section>
  );
}
