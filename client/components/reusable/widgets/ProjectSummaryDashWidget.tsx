import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { AiOutlineFolder } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconBtn } from "../buttons";

interface ProjectSummaryDashWidget_Props {
    title: string
    summaryData: {
        label: string
        time: string
        progress: number
    }[]
}

export const ProjectSummaryDashWidget = ({ title, summaryData }: ProjectSummaryDashWidget_Props): JSX.Element => {
    return (
        <div className={styles.psd_wrapper}>
            <div className={styles.psd_header}>
                <div className={styles.psd_header_title}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.psd_header_util}>
                    <IconBtn icon={<BsThreeDotsVertical />} variant={"outlined"} onClick={() => {}} />
                </div>
            </div>
            <div className={styles.psd_content}>
                <div className={styles.psd_summary_list}>
                    <ul>
                        {
                            summaryData.map((taskWidget, index) => {
                                return (
                                    <li key={index}>
                                        <div className={`${styles.tw_col} ${styles.tw_col_folder_icon_wrapper}`}>
                                            <span className={styles.tw_col_icon}><AiOutlineFolder /></span>
                                        </div>
                                        <div className={styles.tw_col}>
                                            <h5>{taskWidget.label}</h5>
                                        </div>
                                        <div className={styles.tw_col}>
                                            <span className={styles.tw_timer_wrapper}>
                                                00:40:00
                                            </span>
                                        </div>
                                        <div className={styles.tw_col}>
                                            
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