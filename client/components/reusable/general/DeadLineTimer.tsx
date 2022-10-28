import styles from "../../../styles/components/reusable/general/deadLineTimer.module.scss";

export interface DeadLineTimer_Props {
    countDownStart: {
        days: number,
        hours: number,
        minutes: number,
        seconds: number
    }
}

export const DeadLineTimer = ({countDownStart}: DeadLineTimer_Props): JSX.Element => {
    return (
        <div className={styles.timer_wrapper}>
        </div>
    )
}