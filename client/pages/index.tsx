import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { Header } from '../components';

const Home: NextPage = () => {
  return (
    <div className={`app ${styles.app}`}>
      <Header title="Home" description="Project management app. Home" />
      <div className={`content ${styles.content}`}>
        <h1>Home</h1>
      </div>
    </div>
  )
}

export default Home;
