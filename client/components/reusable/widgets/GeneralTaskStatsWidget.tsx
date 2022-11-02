import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconBtn } from "../buttons";

interface GeneralTaskStatsWidget_Props {
    title: string
}

export const GeneralTaskStatsWidget = ({ title }: GeneralTaskStatsWidget_Props): JSX.Element => {
    return (
        <div className={styles.gtsw_wrapper}>
            <div className={styles.gtsw_header}>
                <div className={styles.gtsw_header_title}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.gtsw_header_util}>
                    <IconBtn icon={<BsThreeDotsVertical />} variant={"outlined"} onClick={() => {}} />
                </div>
            </div>
            <div className={styles.gtsw_content}>
                <div className={styles.gtsw_col}>
                    <ul className={styles.gtsw_col_list_labels}>
                        <li>
                            <span className={`${styles.gtsw_indicator} ${styles._blue}`}></span>
                            <h5>Completed</h5>
                        </li>
                        <li>
                            <span className={`${styles.gtsw_indicator} ${styles._dark}`}></span>
                            <h5>In - Progress</h5>
                        </li>
                        <li>
                            <span className={`${styles.gtsw_indicator} ${styles._yellow}`}></span>
                            <h5>Behind</h5>
                        </li>
                    </ul>
                </div>
                <div className={styles.gtsw_col}>

                </div>
            </div>
        </div>
    )
}