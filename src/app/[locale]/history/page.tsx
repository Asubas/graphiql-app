'use client';
import styles from './history.module.scss';
import Link from 'next/link';
import { FormDataHistory } from '@/src/interfaces/graphQlInterface';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function HistorySection() {
  const [history, setHistory] = useState<FormDataHistory[] | null>([]);
  const t = useTranslations('History');

  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.getAttribute('data-type');
    if (target === 'restFull') {
      router.push('http://localhost:3000/rest');
    } else {
      router.push('http://localhost:3000/graphql');
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('history');
    setHistory([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return date.toLocaleString('ru-RU', options).replace(',', '');
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <section className={styles.container}>
      {history && history.length > 0 ? (
        <>
          <div className={styles.historyList}>
            {history.map((element, index) => {
              return (
                <div className={styles.historyElement} key={index}>
                  {/* {element.methods && <span>{element.methods}</span>} */}
                  <span>{formatDate(element.timestamp)}</span>
                  <Link href={`${element.encodedHistoryUrl}`}>{element.endpointUrl}</Link>
                </div>
              );
            })}
            <div className={styles.buttonsContainer}>
              <Button variant="contained" type="button" onClick={clearHistory}>
                {t('clearButton')}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyHistory}>
          <p>{t('historyDescription')}</p>
          <div className={styles.buttonsContainer}>
            <Button variant="contained" type="button" onClick={handleClick}>
              {t('graphiQLButton')}
            </Button>
            <Button data-type="restFull" variant="contained" type="button" onClick={handleClick}>
              {t('restFullApi')}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default HistorySection;
