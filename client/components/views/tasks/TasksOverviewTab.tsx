import { useState } from "react";
import styles from "../../../styles/views/tasks/tasksOverviewTab.module.scss";
import { TaskOverviewSummary, MilestoneWidget, RegularBtn, TaskListStartWidget } from "../../reusable";
import { BsPaperclip, BsAlarm } from "react-icons/bs";
import { BiNote } from "react-icons/bi";

export const TasksOverviewTab = () => {
    interface taskList_ {
        title: string
        comments: number
        progress: number
        reminder: {
            status: boolean
        }
        time: {
            start: string
            dayPeriod: "am" | "pm"
        }
        withAttachment?: {
            status: boolean
        }
        onClickHandler?: () => void
    }
    const [taskListData, setTaskListData] = useState<taskList_[]>([
        {
            title: "Design Web Application",
            comments: 6,
            progress: 54,
            reminder: {
                status: true
            },
            time: {
                start: "9:00",
                dayPeriod: "am"
            },
            withAttachment: {
                status: true
            },
            onClickHandler() {
                
            },
        },
        {
            title: "Web development",
            comments: 1,
            progress: 54,
            reminder: {
                status: true
            },
            time: {
                start: "9:00",
                dayPeriod: "am"
            },
            onClickHandler() {
                
            },
        }
    ]);

    return (
        <div className={styles.tot_content}>
            <div className={styles.tot_header}>
                <div className={styles.tot_header_title}>
                    <h2>Overview</h2>
                </div>
                <div className={styles.tot_header_util}></div>
            </div>
            <div className={styles.tot_mts_wrapper}>
                {/* Milestone Widget */}
                <div className={styles.tot_mts_col}>
                    <span>Milestones</span>
                    <MilestoneWidget />
                </div>
                {/* Task Summary Widget */}
                <div className={styles.tot_mts_col}>
                    <span>Task Summary</span>
                    <TaskOverviewSummary />
                </div>
            </div>
            <div className={styles.tot_task_list_wrapper}>
                <div className={styles.tot_task_list_header}>
                    <div className={styles.tot_tl_title}>
                        <h4>Tasks</h4>
                    </div>
                    <div className={styles.tot_tl_utils}>
                        <RegularBtn label={"View All"} variant={"gradient"} onClick={() => {}} />
                    </div>
                </div>
                <div className={styles.tot_task_list_content}>
                    <ul>
                        {
                            taskListData.map((task, i) => {
                                return (
                                    <li key={i} onClick={() => {task.onClickHandler && task.onClickHandler()}}>
                                        <div className={styles.tot_tlist_col}>
                                            {/* TaskListStartWidget */}
                                            <TaskListStartWidget time={{start: `${task.time.start} ${task.time.dayPeriod}`}} onStartHandler={() => {}} timerConfig={{}} />
                                        </div>
                                        <div className={styles.tot_tlist_col}>
                                            <div className={styles.tot_tlist_row}>
                                                <h4>{task.title}</h4>
                                            </div>
                                            <div className={styles.tot_tlist_row}>
                                                <RegularBtn label={`Attachment`} withIcon={{status: true, icon: <BsPaperclip />, orientation: "start"}} variant={"text"} data-elm-ctx={"tlist_util"} />
                                                <RegularBtn label={`${task.comments} comment${task.comments !== 1 ? "s" : ""}`} withIcon={{status: true, icon: <BiNote />, orientation: "start"}} variant={"text"} data-elm-ctx={"tlist_util"} />
                                            </div>
                                        </div>
                                        <div className={styles.tot_tlist_col}>
                                            <div className={styles.tot_tlist_row}>
                                                <h5>{`${task.progress}% complete`}</h5>
                                            </div>
                                            <div className={styles.tot_tlist_row}>
                                                <div className={styles.tot_tlist_progress_cont}>
                                                    <span className={styles.tot_tlist_progress_juice} style={{width: `${task.progress}px`}}></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.tot_tlist_col}>
                                            <RegularBtn label={"Reminder"} withIcon={{status: true, icon: <BsAlarm style={{marginRight: "4px"}} />, orientation: "start"}} variant={"contained"} data-elm-ctx={"tlist_reminder"} onClick={() => {}} />
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}