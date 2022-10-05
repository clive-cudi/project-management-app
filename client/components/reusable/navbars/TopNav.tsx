import styles from "../../../styles/components/reusable/navbars/topnav.module.scss";
import { SearchInput } from "../inputs";

export const TopNav = ({}): JSX.Element => {
    return (
        <nav className={styles.tn_main_wrapper}>
            <div className={styles.tn_content}>
                <div className={styles.tn_col}>
                    <SearchInput />
                </div>
                <div className={styles.tn_col}>

                </div>
            </div>
        </nav>
    )
}