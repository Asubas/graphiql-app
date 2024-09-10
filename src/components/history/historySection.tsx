import pages from '../../app/graphql/graphql.module.scss';
import '../Welcome/Welcome.module.scss';
import { Button, Drawer } from '@mui/material';
import { useRouter } from 'next/navigation';

function HistoryButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/history');
  };

  return (
    <>
      <Button className={pages.queryButton} onClick={handleClick} variant="contained">
        History
      </Button>
    </>
  );
}

export { HistoryButton };
