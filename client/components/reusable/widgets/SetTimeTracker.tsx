import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { BsFillPlayFill } from "react-icons/bs";

interface SetTimeTracker_Props {
    label?: string
    onClickHandler?: () => void
}

export const SetTimeTracker = ({label, onClickHandler}: SetTimeTracker_Props): JSX.Element => {
    return (
        <div className={styles.sttracker_wrapper}>
            <div className={styles.stt_label}>
                <h4>{label ?? "Set Time Tracker"}</h4>
            </div>
            <div className={styles.stt_starter}>
                <button className={styles.stt_starter_btn} onClick={onClickHandler}><BsFillPlayFill /></button>
            </div>
        </div>
    )
}