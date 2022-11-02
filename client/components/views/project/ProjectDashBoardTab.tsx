import styles from "../../../styles/views/project/projectDashboardTab.module.scss";
import { SetTimeTracker, ProjectDeadlineTimer, WeekWorkDuration, GeneralTaskStatsWidget, ProjectSummaryDashWidget } from "../../reusable";

export const ProjectDashBoardTab = () => {
    return (
        <div className={styles.pdt_content}>
            <div className={styles.pdt_header}>
                <div className={styles.pdt_header_title_block}>
                    <h2>Today</h2>
                    <span>
                        <h4>Mon 14, 2022</h4>
                        <h4> | </h4>
                        <h4>10:00AM</h4>
                    </span>
                </div>
                <div className={styles.pdt_time_tracker_wrapper}>
                    <SetTimeTracker label="Set Time Tracker" onClickHandler={() => {}} />
                </div>
            </div>
            <div className={styles.pdt_time}>
                <div className={styles.pdt_deadline_banner_wrapper}>
                    <ProjectDeadlineTimer projectName={"mobile app design"} countDownStart={{
                        days: 3,
                        hours: 24,
                        minutes: 60,
                        seconds: 12
                    }} />
                </div>
                <div className={styles.pdt_time_worked_wrapper}>
                    <WeekWorkDuration />
                </div>
            </div>
            <div className={styles.pdt_summary}>
                <div className={styles.pdt_summary_item_wrapper}>
                    <ProjectSummaryDashWidget title="Todo" summaryData={[
                        {
                            label: "Task 1",
                            progress: 40,
                            time: "40"
                        },
                        {
                            label: "Hello",
                            progress: 20,
                            time: "30"
                        },
                        {
                            label: "Task 1",
                            progress: 40,
                            time: "40"
                        },
                        {
                            label: "Hello",
                            progress: 20,
                            time: "30"
                        },
                        {
                            label: "Task 1",
                            progress: 40,
                            time: "40"
                        },
                        {
                            label: "Hello",
                            progress: 20,
                            time: "30"
                        },
                        {
                            label: "Task 1",
                            progress: 40,
                            time: "40"
                        },
                        {
                            label: "Hello",
                            progress: 20,
                            time: "30"
                        }
                    ]} />
                </div>
                <div className={styles.pdt_summary_item_wrapper}>
                    <ProjectSummaryDashWidget title="Projects" summaryData={[
                        {
                            label: "Project 1",
                            progress: 90,
                            time: "10"
                        },
                        {
                            label: "Project 2",
                            progress: 40,
                            time: "5"
                        }
                    ]} />
                </div>
                <div className={styles.pdt_summary_item_wrapper}>
                    <GeneralTaskStatsWidget title="Tasks" />
                </div>
                <div className={styles.pdt_summary_item_wrapper}></div>
            </div>
        </div>
    )
}