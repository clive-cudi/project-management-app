import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { IconBtn } from "../buttons";
import { BsThreeDotsVertical, BsAlarm } from "react-icons/bs";

export const WeekWorkDuration = ({}): JSX.Element => {
    return (
        <div className={styles.wwd_wrapper}>
            <div className={styles.wwd_header}>
                <div className={styles.wwd_header_title}>
                    <h4>Worked This Week</h4>
                </div>
                <div className={styles.wwd_header_util}>
                    <IconBtn icon={<BsThreeDotsVertical />} variant={"text"} />
                </div>
            </div>
            <div className={styles.wwd_content}>
                <div className={styles.wwd_content_timer}>
                    <span>40:00:05</span>
                </div>
                <div className={styles.wwd_content_util}>
                    <IconBtn icon={<BsAlarm />} />
                </div>
            </div>
        </div>
    )
}