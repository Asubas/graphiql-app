import { useTranslations } from 'next-intl';
import pages from '../../app/[locale]/graphql/graphql.module.scss';
import '../Welcome/Welcome.module.scss';
import { Button, Drawer } from '@mui/material';
import { useRouter } from 'next/navigation';

function HistoryButton() {
  const router = useRouter();
  const t = useTranslations('HistoryButton');

  const handleClick = () => {
    router.push('/history');
  };

  return (
    <>
      <Button className={pages.queryButton} onClick={handleClick} variant="contained">
        {t('historyButton')}
      </Button>
    </>
  );
}

export { HistoryButton };
