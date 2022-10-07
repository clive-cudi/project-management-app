import type { TaskCategory } from "../../../types";
import styles from "../../../styles/components/reusable/tasks/tasksummary.module.scss";
import { IconBtn } from "../buttons";
import { BsFilter, BsPlus } from "react-icons/bs";
import { TaskInfoRow } from "./TaskInfoRow";

interface TaskSummary_Props {
    tasks: {
        label: string
        isChecked: boolean
        badgeStatus: TaskCategory
    }[]
    period?: string
}

export const TaskSummary = ({tasks, period = "today"}: TaskSummary_Props) => {
    return (
        <div className={styles.task_summary_wrapper}>
            <div className={styles.ts_nav_wrapper}>
                <div className={styles.ts_nav_title}>
                    <h4>Tasks</h4>
                    <span>{period}</span>
                </div>
                <div className={styles.ts_nav_utils}>
                    <span>View All</span>
                    <IconBtn icon={<BsFilter />} variant={"outlined"} />
                </div>
            </div>
            <div className={styles.ts_new_task_wrapper}>
                <input type={"text"} placeholder={"Create new task"} />
                <IconBtn icon={<BsPlus />} variant={"util"} />
            </div>
            <div className={styles.ts_tasks_lists}>
                {
                    tasks.map((task, ix)=>{
                        return (
                            <TaskInfoRow key={ix} badge={{type: task.badgeStatus}} label={task.label} />
                        )
                    })
                }
            </div>
        </div>
    )
}