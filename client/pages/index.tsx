import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { Header } from '../components';
import type { PageAuth } from "../types";

const Home: NextPage & PageAuth = () => {
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

Home.requireAuth = {
  auth: true,
  userType: "individual",
  multipleUserTypes: {
    status: true,
    supported: ["individual", "organization"]
  }
}