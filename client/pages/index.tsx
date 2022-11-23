import React, { useState, useMemo, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import { Header, SideNav, TopNav, HomePageCurrentTab, Modal, SideNavBtn, ContextMenuWrapper } from "../components";
import type { PageAuth, HomeTabLabels_Type } from "../types";
import { useLayout, useModal, useTabRenderer, useContextMenu, useTaskStore } from "../hooks";
import { AiOutlineAppstore } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { BsCardChecklist } from "react-icons/bs";
import { FiUsers, FiSettings } from "react-icons/fi";
import { upperCaseFirstLetter, TaskQueries } from "../utils";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";

const Home: NextPage & PageAuth = () => {
  // const { currentTab, switchHomeTab } = useLayout();
  const [navMin, setNavMin] = useState<boolean>(false);

  const navBtns = useMemo<
    Array<{ label: HomeTabLabels_Type | "test"; icon: React.ReactNode }>
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
      {
        label: "test",
        icon: <></>
      }
    ],
    []
  );
  const { modal } = useModal();
  const { currentTab, switchTab } = useTabRenderer();
  const { ctxMenu, openAtCursor } = useContextMenu();
  const session = useSession();
  const { addMultiple, tasks, setLoading } = useTaskStore();
  const { getAllTasks, getMultipleTasksByID } = TaskQueries(session);
  // fetch tasks
  const { data: taskIDs_data} = useQuery("tasks_ids", getAllTasks);
  const {data: fetchedTasks, isLoading, isError} = useQuery("tasks", () => getMultipleTasksByID(taskIDs_data?.tasks as string[]), {enabled: !!taskIDs_data?.tasks, onSuccess: (res) => {}});

  useEffect(() => {
    if (fetchedTasks && !isError) {
      addMultiple(fetchedTasks.tasks);
    }
  }, [fetchedTasks]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading])

  const navSwitchBtns: { btnComponent: JSX.Element | React.ReactNode }[] =
    useMemo<{ btnComponent: JSX.Element | React.ReactNode }[]>(() => {
      return navBtns.map((btn, ix) => {
        return {
          btnComponent: (
            <SideNavBtn
              key={ix}
              onClick={(): void => {
                // switchHomeTab(btn.label);
                switchTab({
                  label: btn.label,
                  component: btn.label == "test" ? <h1>Test worked</h1> : null
                });
                console.log(btn.label)
              }}
              isActive={
                btn.label.toLowerCase() === currentTab.label.toLowerCase()
              }
              disabled={btn.label.toLowerCase() === currentTab.label.toLowerCase()}
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
    }, [navBtns, switchTab, currentTab, navMin]);

  return (
    <div className={`app ${styles.app}`}>
      {/*onContextMenu={(e) => {e.preventDefault(); openAtCursor(e, [<button>Hey</button>, <button>Close</button>, <button>Hey</button>, <button>Close</button>])}}*/}
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
      {ctxMenu.open === true && <ContextMenuWrapper elmList={ctxMenu.elements} />}
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
