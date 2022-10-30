import React, { useEffect, useState } from "react";
import { useCountDown } from "../../../hooks";
import styles from "../../../styles/components/reusable/general/deadLineTimer.module.scss";

export interface DeadLineTimer_Props {
    countDownStart: {
        days: number,
        hours: number,
        minutes: number,
        seconds: number
    }
    withLabels?: boolean,
    onDeadLine?: () => void
}

export const DeadLineTimer = ({countDownStart}: DeadLineTimer_Props): JSX.Element => {
    const [timerValues, setTimerValues] = useState({
        days: countDownStart.days,
        hours: countDownStart.hours,
        minutes: countDownStart.minutes,
        seconds: countDownStart.seconds
    });
    const now_ms = new Date().getTime();
    const dateTimeAfterCountDown = now_ms + (timerValues.days * timerValues.hours * timerValues.minutes * timerValues.seconds * 1000);

    const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    const { days, hours, minutes, seconds } = useCountDown(dateTimeAfterCountDown);

    return (
        <div className={styles.timer_wrapper}>
            <div className={styles.timer_widget_wrapper}>
                <span className={styles.timer_label_wrapper}>
                    <h5>Days</h5>
                </span>
                <span className={styles.timer_countdown_wrapper} data-elm-type={"timer-counter"}>
                    {days}
                </span>
            </div>
            <span className={styles.timer_countdown_separator}>:</span>
            <div className={styles.timer_widget_wrapper}>
                <span className={styles.timer_label_wrapper}>
                    <h5>Hours</h5>
                </span>
                <span className={styles.timer_countdown_wrapper} data-elm-type={"timer-counter"}>
                    {hours}
                </span>
            </div>
            <span className={styles.timer_countdown_separator}>:</span>
            <div className={styles.timer_widget_wrapper}>
                <span className={styles.timer_label_wrapper}>
                    <h5>Minutes</h5>
                </span>
                <span className={styles.timer_countdown_wrapper} data-elm-type={"timer-counter"}>
                    {minutes}
                </span>
            </div>
            <span className={styles.timer_countdown_separator}>:</span>
            <div className={styles.timer_widget_wrapper}>
                <span className={styles.timer_label_wrapper}>
                    <h5>Seconds</h5>
                </span>
                <span className={styles.timer_countdown_wrapper} data-elm-type={"timer-counter"}>
                    {seconds}
                </span>
            </div>
        </div>
    )
}