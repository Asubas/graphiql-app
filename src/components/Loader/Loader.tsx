import { FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles.overlay}>
      <span className={styles.loader}>
        <span className={styles.loaderInner}></span>
      </span>
    </div>
  );
};

export default Loader;
