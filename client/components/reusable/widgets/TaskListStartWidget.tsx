import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { IconBtn } from "../buttons";
import { BsFillPlayFill } from "react-icons/bs";
import { FcClock } from "react-icons/fc";

interface TaskListStartWidget_Props {
    time: {
        start: string
    }
    onStartHandler: () => void
    timerConfig: {}
}

export const TaskListStartWidget = ({ time, onStartHandler, timerConfig }: TaskListStartWidget_Props): JSX.Element => {
    return (
        <div className={styles.tlsw_wrapper}>
            <div className={styles.tlsw_play_btn_wrapper}>
                <IconBtn icon={<BsFillPlayFill />} />
            </div>
            <div className={styles.tlsw_content_info}>
                <div className={styles.tlsw_content_row}>
                    <h4>Start</h4>
                </div>
                <div className={styles.tlsw_content_row}>
                    <FcClock fontSize={20} style={{marginRight: "4px"}} />
                    <h5>{time?.start}</h5>
                </div>
            </div>
        </div>
    )
}