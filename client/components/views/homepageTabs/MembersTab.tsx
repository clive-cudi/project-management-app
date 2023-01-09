import styles from "../../../styles/views/homePageTabs/membersTab.module.scss";

export const MembersTab = ({}) => {
    return (
        <div className={styles.mtb_content}>
            <div className={styles.mtb_row}>
                <div className={styles.mtb_row_header}>
                    <span className={styles.mtb_row_header_title}>
                        <h3>Organizations</h3>
                    </span>
                    <span className={styles.mtb_row_header_info}>
                        <h4>View Organizations that you are part of:</h4>
                    </span>
                </div>
                <div className={styles.mtb_row_content}>
                    
                </div>
            </div>
            <div className={styles.mtb_row}>
                <div className={styles.mtb_row_header}>
                    <span className={styles.mtb_row_header_title}>
                        <h3>Teams</h3>
                    </span>
                    <span className={styles.mtb_row_header_info}>
                        <h4>View Teams that you are working with:</h4>
                    </span>
                </div>
                <div className={styles.mtb_row_content}>
                    
                </div>
            </div>
        </div>
    )
}
