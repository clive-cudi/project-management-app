import styles from "../../../styles/views/tasks/tasksOverviewTab.module.scss";
import { TaskOverviewSummary, MilestoneWidget } from "../../reusable";

export const TasksOverviewTab = () => {
    return (
        <div className={styles.tot_content}>
            <div className={styles.tot_header}>
                <div className={styles.tot_header_title}>
                    <h2>Mobile App</h2>
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
        </div>
    )
}