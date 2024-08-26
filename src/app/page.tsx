import styles from './page.module.scss';
import About from '../components/About/About';
import Welcome from '../components/Welcome/Welcome';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <About />
        <Welcome />
      </main>
      <Footer />
    </>
  );
}
