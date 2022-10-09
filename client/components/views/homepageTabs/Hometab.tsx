import { useMemo } from "react";
import styles from "../../../styles/views/homePageTabs/hometab.module.scss";
import Image from "next/image";
import { RegularBtn, TaskSummary } from "../../reusable";
import { BsPlay } from "react-icons/bs";
import type { TaskCategory } from "../../../types";
import taskSummary_mock from "../../../mock/taskSummaryData.json";
import { Callendar } from "../../reusable";

export const HomeTab = ({}): JSX.Element => {
    type taskSummaryMock_type = typeof taskSummary_mock;
    const taskSummaryData = useMemo<
    {
        label: string
        isChecked: boolean
        badgeStatus: TaskCategory
    }[]>(()=>{
        return taskSummary_mock.map((task)=> ({label: task.label, isChecked: task.isChecked, badgeStatus: task.badgeStatus as TaskCategory}))
    },[])


    return (
        <div className={styles.hb_content}>
            <div className={styles.hb_greetings_wrapper}>
                <div className={styles.hb_banner_wrapper}>
                    <div className={styles.hb_banner_info}>
                        <h2>Good Morning Madaline</h2>
                        <RegularBtn label="Get Started" className={styles.get_started_btn} withIcon={{status: true, icon: <BsPlay />, orientation: "start"}} />
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

            </div>
        </div>
    )
}