import { useState } from "react";
import type { TaskCategory } from "../../../types";
import styles from "../../../styles/components/reusable/tasks/tasksummary.module.scss";
import { IconBtn } from "../buttons";
import { BsFilter, BsPlus } from "react-icons/bs";
import { TaskInfoRow } from "./TaskInfoRow";
import { useModal, useTaskStore } from "../../../hooks";
import { CreateTaskFormWithAssignees } from "../../forms";
import { Spinner } from "../widgets";

interface TaskSummary_Props {
    tasks: {
        label: string
        isChecked: boolean
        badgeStatus: TaskCategory
    }[]
    period?: string
}

export const TaskSummary = ({tasks, period = "today"}: TaskSummary_Props) => {
    const [newTaskName, setNewTaskName] = useState<string>("");
    const { openModal } = useModal();
    const { isLoading } = useTaskStore();

    function handleCreateTask() {
        openModal(<CreateTaskFormWithAssignees initialValues={{name: newTaskName}} />)
    }

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
                <input type={"text"} placeholder={"Create new task"} onChange={(e) => {setNewTaskName(e.target.value)}}/>
                <IconBtn icon={<BsPlus />} variant={"util"} onClick={() => {handleCreateTask()}} />
            </div>
            <div className={styles.ts_tasks_lists}>
                {
                    tasks.length > 0 ? tasks.map((task, ix)=>{
                        return (
                            <TaskInfoRow key={ix} badge={{type: task.badgeStatus}} label={task.label} />
                        )
                    }) : (isLoading ? <Spinner /> : <h5>No Tasks Found</h5>)
                }
            </div>
        </div>
    )
}