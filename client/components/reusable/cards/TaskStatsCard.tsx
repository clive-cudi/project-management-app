import styles from "../../../styles/components/reusable/cards/index_cards.module.scss";
import { BsListCheck } from "react-icons/bs";

interface TaskStatsCard_Props {
    label: string
    stat: number
    mod?: {
        icon?: JSX.Element
        background?: string
        className?: string
    }
}

export const TaskStatsCard = ({ label, stat, mod }: TaskStatsCard_Props): JSX.Element => {
    return (
        <div className={`${styles.tsc_wrapper} ${styles[`tsc_wrapper_${mod?.background ?? ""}`]} ${mod?.className ?? ""}`}>
            <div className={styles.tsc_icon_wrapper}>
                <BsListCheck />
            </div>
            <h4>{label}</h4>
            <span>{stat}</span>
        </div>
    )
}