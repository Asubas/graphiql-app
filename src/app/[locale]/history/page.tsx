'use client';
import styles from './history.module.scss';
import { FormDataHistory } from '@/src/components/interfaces/graphQlInterface';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function HistorySection() {
  const [history, setHistory] = useState<FormDataHistory[] | null>([]);

  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.getAttribute('data-type');
    if (target === 'restFull') {
      router.push('/');
    } else {
      router.push('http://localhost:3000/graphql');
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('history');
    setHistory([]);
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
                  <Link href={`${element.encodedHistoryUrl}`}>{element.endpointUrl}</Link>
                </div>
              );
            })}
            <div className={styles.buttonsContainer}>
              <Button variant="contained" type="button" onClick={clearHistory}>
                Clear History
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyHistory}>
          <p>
            You haven&apos;t executed any requests yet <br />
            Try those options:
          </p>
          <div className={styles.buttonsContainer}>
            <Button variant="contained" type="button" onClick={handleClick}>
              GraphiQl
            </Button>
            <Button data-type="restFull" variant="contained" type="button" onClick={handleClick}>
              RestFullApi
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default HistorySection;
