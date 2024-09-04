import pages from '../../app/graphql/graphql.module.scss';
import styles from './history.module.scss';
import { useEffect, useState } from 'react';
import { Button, Drawer } from '@mui/material';
import { useRouter } from 'next/navigation';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function HistorySection() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[] | null>([]);
  const anchor: Anchor = 'left';

  const router = useRouter();
  const toggleDrawer = (newOpen: boolean) => () => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    } else {
      setHistory([]);
    }
    setOpen(newOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.getAttribute('data-type');
    if (target === 'restFull') {
      router.push('/');
    } else {
      router.push('http://localhost:3000/graphql');
    }
  };

  const DrawerList = (
    <div className={styles.container}>
      {history ? (
        <p> History </p>
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
    </div>
  );

  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div>
      <Button className={`${pages.queryButton} `} onClick={toggleDrawer(true)} variant="contained">
        History
      </Button>
      <Drawer
        open={open}
        anchor={anchor}
        onClose={toggleDrawer(false)}
        classes={{ paper: styles.historySection }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

export { HistorySection };
