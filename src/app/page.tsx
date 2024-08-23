import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <About />
        <Welcome />
      </main>
      <Footer />
    </>
  );
}
