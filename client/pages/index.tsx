import React, { useState, useMemo } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import { Header, SideNav, TopNav, HomePageCurrentTab, Modal, SideNavBtn } from "../components";
import type { PageAuth, HomeTabLabels_Type } from "../types";
import { useLayout, useModal } from "../hooks";
import { AiOutlineAppstore } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { BsCardChecklist } from "react-icons/bs";
import { FiUsers, FiSettings } from "react-icons/fi";
import { upperCaseFirstLetter } from "../utils";

const Home: NextPage & PageAuth = () => {
  const { currentTab, switchHomeTab } = useLayout();
  const [navMin, setNavMin] = useState<boolean>(false);

  const navBtns = useMemo<
    Array<{ label: HomeTabLabels_Type; icon: React.ReactNode }>
  >(
    () => [
      {
        label: "home",
        icon: <AiOutlineAppstore />,
      },
      {
        label: "messages",
        icon: <TbMessageDots />,
      },
      {
        label: "workspace",
        icon: <BsCardChecklist />,
      },
      {
        label: "members",
        icon: <FiUsers />,
      },
      {
        label: "settings",
        icon: <FiSettings />,
      },
    ],
    []
  );
  const { modal } = useModal();

  const navSwitchBtns: { btnComponent: JSX.Element | React.ReactNode }[] =
    useMemo<{ btnComponent: JSX.Element | React.ReactNode }[]>(() => {
      return navBtns.map((btn, ix) => {
        return {
          btnComponent: (
            <SideNavBtn
              key={ix}
              onClick={(): void => {
                switchHomeTab(btn.label);
              }}
              isActive={
                btn.label.toLowerCase() === currentTab?.toLowerCase()
              }
              disabled={btn.label.toLowerCase() === currentTab?.toLowerCase()}
              variant={"primary"}
            >
              <span>{btn.icon}</span>
              {/* {navMin
                ? ""
                : btn.label
                    .split("")
                    .map((char, i) =>
                      i == 0 ? char.toUpperCase() : char.toLowerCase()
                    )
                    .join("")} */}
              {navMin ? "" : upperCaseFirstLetter(btn.label)}
            </SideNavBtn>
          ),
        };
      });
    }, [navBtns, switchHomeTab, currentTab, navMin]);

  return (
    <div className={`app ${styles.app}`}>
      <Header title="Home" description="Project management app. Home" />
      <div className={`content ${styles.content}`}>
        <SideNav
          switchBtns={[...navSwitchBtns]}
          isMinNav={(isMinVal) => {
            setNavMin(isMinVal);
          }}
        />
        <div className={styles.content_view}>
          <TopNav />
          <HomePageCurrentTab />
        </div>
      </div>
      {modal.open == true && <Modal data={modal.data} />}
    </div>
  );
};

export default Home;

Home.requireAuth = {
  auth: true,
  userType: "individual",
  multipleUserTypes: {
    status: true,
    supported: ["individual", "organization"],
  },
};
