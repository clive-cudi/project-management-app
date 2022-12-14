import React, { useMemo, useEffect, useState } from "react";
import styles from "../../../styles/views/homePageTabs/hometab.module.scss";
import Image from "next/image";
import { RegularBtn, TaskSummary } from "../../reusable";
import { BsPlay } from "react-icons/bs";
import type { TaskCategory, Priority_ } from "../../../types";
import taskSummary_mock from "../../../mock/taskSummaryData.json";
import { Callendar } from "../../reusable";
import { ProjectsOverview } from "../../layout";
import { useSession } from "next-auth/react";
import { useTime, useTaskStore, useNotificationPlateWidget } from "../../../hooks";
import { TaskQueries } from "../../../utils";
import { NotificationBadge } from "../../reusable";

export const HomeTab = ({}): JSX.Element => {
  const [taskSummaryData, setTaskSummaryData] = useState<
    {
      id: string;
      label: string;
      isChecked: boolean;
      badgeStatus: TaskCategory | Priority_;
    }[]
  >([]);
  const session = useSession();
  const { getDayGreeting } = useTime();
  const { tasks: tasks_Store } = useTaskStore();
  const { enqueueNotification, dequeueNotification, disableAutoRemove } = useNotificationPlateWidget();


  useEffect(() => {
    setTaskSummaryData(
      tasks_Store.map((tsk) => ({
        id: tsk.taskID,
        label: tsk.name,
        isChecked: true,
        badgeStatus: tsk.priority
      }))
    )
  }, [tasks_Store]);

  return (
    <div className={styles.hb_content}>
      <div className={styles.hb_greetings_wrapper}>
        <div className={styles.hb_banner_wrapper}>
          <div className={styles.hb_banner_info}>
            <h2 onClick={() => {dequeueNotification()}}>
              {getDayGreeting("Good")} {session.data?.user.name}
            </h2>
            <RegularBtn
              label="Get Started"
              className={styles.get_started_btn}
              withIcon={{
                status: true,
                icon: <BsPlay />,
                orientation: "start",
              }}
              onClick={() => {
                const id = `ntfn_${Math.random() * 10}`
                enqueueNotification(<NotificationBadge type={"info"} text={`Notification ${id ?? Math.random() * 100}`} isDismissable={{status: true, id: id}} />, id);
              }}
            />
          </div>
          <div className={styles.hb_banner_ill}>
            <div className={styles.hb_ill}>
              <Image src={"/common/Illustration_4.png"} alt="@" layout="fill" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hb_info_wrapper}>
        <div className={styles.hb_tasks_wrapper}>
          <TaskSummary tasks={taskSummaryData} />
        </div>
        <div className={styles.hb_calendar_wrapper}>
          <div className={styles.hb_calendar}>
            <Callendar />
          </div>
        </div>
      </div>
      <div className={styles.hb_projects_wrapper}>
        <ProjectsOverview />
      </div>
    </div>
  );
};
