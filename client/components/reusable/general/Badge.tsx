import styles from "../../../styles/components/reusable/general/badge.module.scss";
import type { TaskCategory, TaskStatus } from "../../../types";

export interface Badge_Props {
    type: TaskCategory | TaskStatus
    mod?: {
        type: string
        label: string
    }
    className?: string
}

export const Badge = ({type}: Badge_Props) => {
    return (
        <span className={`${styles.badge_wrapper} ${styles[`badge_${type}`]}`}>
            {type}
        </span>
    )
}