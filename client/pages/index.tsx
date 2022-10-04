import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { Header, SideNav, TopNav, HomePageCurrentTab } from '../components';
import type { PageAuth, HomeTabLabels_Type } from "../types";
import { useLayout } from '../hooks';

const Home: NextPage & PageAuth = () => {
  const { switchHomeTab } = useLayout();

  const navBtns = useMemo<Array<{label: HomeTabLabels_Type, icon: React.ReactNode}>>(()=> [
    {
      label: "home",
      icon: <></>
    },
    {
      label: "messages",
      icon: <></>
    },
    {
      label: "workspace",
      icon: <></>
    },
    {
      label: "members",
      icon: <></>
    },
    {
      label: "settings",
      icon: <></>
    }
  ], []);

  const navSwitchBtns: {btnComponent: JSX.Element | React.ReactNode}[] = useMemo<{btnComponent: JSX.Element | React.ReactNode}[]>(()=>{
    return navBtns.map((btn, ix)=>{
      return {btnComponent: <button key={ix} onClick={(): void => { switchHomeTab(btn.label) }}><span>{btn.icon}</span>{btn.label}</button>}
    })
  }, [navBtns, switchHomeTab]);

  return (
    <div className={`app ${styles.app}`}>
      <Header title="Home" description="Project management app. Home" />
      <div className={`content ${styles.content}`}>
        <SideNav switchBtns={[...navSwitchBtns]} />
        <div className={styles.content_view}>
          <TopNav />
          <HomePageCurrentTab />
        </div>
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