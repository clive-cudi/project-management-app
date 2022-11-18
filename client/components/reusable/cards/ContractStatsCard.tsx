import styles from "../../../styles/components/reusable/cards/index_cards.module.scss";

interface ContractStatsCard_Props {
    title: string,
    stats: number
}

export const ContractStatsCard = ({ title, stats }: ContractStatsCard_Props): JSX.Element => {
    return (
        <div className={styles.csc_wrapper}>
            <div className={styles.csc_title}>
                <h4>{title}</h4>
            </div>
            <div className={styles.csc_stat}>
                <span>{stats}</span>
            </div>
        </div>
    )
}