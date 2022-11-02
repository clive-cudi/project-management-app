import styles from "../../../styles/components/reusable/widgets/index_.module.scss";

interface ProjectSummaryBoard_Props {
    title: string
    info?: string
    boardData?: {
        component: JSX.Element | React.ReactNode
    }[]
}

export const ProjectsSummaryBoard = ({ title, info, boardData}: ProjectSummaryBoard_Props): JSX.Element => {
    return (
        <div className={styles.psb_wrapper}>
            <div className={styles.psb_header}>
                <div className={styles.psb_header_title}>
                    <h4>{title}</h4>
                </div>
                <div className={styles.psb_header_info}>
                    <span></span>
                    <h5>{info ?? null}</h5>
                </div>
            </div>
            <div className={styles.psb_content}>
                {
                    boardData?.map((widget) => widget.component)
                }
            </div>
        </div>
    )
}