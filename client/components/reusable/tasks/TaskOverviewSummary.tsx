import { useMemo } from "react";
import { FaUserPlus } from "react-icons/fa";
import styles from "../../../styles/components/reusable/tasks/tasksummary.module.scss";
import { TaskStatsCard } from "../cards";

export const TaskOverviewSummary = (): JSX.Element => {
    const taskSummaryStatsData = useMemo(() => [
        {
            label: "All Tasks",
            stats: 20
        },
        {
            label: "Assigned",
            stats: 10
        },
        {
            label: "Completed",
            stats: 5
        }
    ], [])

    return (
        <div className={styles.tos_wrapper}>
            <div className={styles.tos_content}>
                <div className={styles.tos_content_col}>
                    {
                        taskSummaryStatsData.map((taskStat, ix) => {
                            return (
                                <TaskStatsCard key={ix} label={taskStat.label} stat={taskStat.stats} />
                            )
                        })
                    }
                </div>
                <div className={styles.tos_content_col}>
                    <span className={styles.tos_teammates}>
                        <span>< FaUserPlus /></span>
                        Teammates
                    </span>
                    <div className={styles.tos_total_hours_wrapper}>
                        <h5>Total Hours</h5>
                        {/* percentage widget */}
                    </div>
                </div>
            </div>
            <div className={styles.tos_footer}>
                <h4>Total Completion Rate: {"90%"}</h4>
            </div>
        </div>
    )
}