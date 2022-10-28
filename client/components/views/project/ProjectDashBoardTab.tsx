import styles from "../../../styles/views/project/projectDashboardTab.module.scss";
import { SetTimeTracker, ProjectDeadlineTimer } from "../../reusable";

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
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    }} />
                </div>
                <div className={styles.pdt_time_worked_wrapper}>

                </div>
            </div>
            <div className={styles.pdt_summary}>
                <div className={styles.pdt_summary_item_wrapper}></div>
                <div className={styles.pdt_summary_item_wrapper}></div>
                <div className={styles.pdt_summary_item_wrapper}></div>
                <div className={styles.pdt_summary_item_wrapper}></div>
            </div>
        </div>
    )
}