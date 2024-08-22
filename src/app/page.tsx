import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';

export default function Home() {
  return (
    <main className={styles.main}>
      <About />
      <Welcome />
    </main>
  );
}
