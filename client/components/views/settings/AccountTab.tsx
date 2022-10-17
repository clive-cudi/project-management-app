import styles from "../../../styles/views/settings/accountTab.module.scss";
import { IconBtn, RegularBtn } from "../../reusable";
import { VscBell } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";

export const AccountTab = ():JSX.Element => {
    return (
        <div className={styles.account_tab_content}>
            <nav className={styles.at_nav_wrapper}>
                <div className={styles.at_nav_content}>
                    <div className={styles.at_nav_col}>
                        <span>
                            <h4>Account Settings 🤓</h4>
                        </span>
                    </div>
                    <div className={styles.at_nav_col}>
                        <span>
                            <IconBtn icon={<MdOutlineSecurity />} variant={"outlined"} data-elm-btn-cluster={"account-tab-nav-btn"} />
                        </span>
                        <span>
                            <IconBtn icon={<VscBell />} variant={"outlined"} data-elm-btn-cluster={"account-tab-nav-btn"} />
                        </span>
                        <span>
                            <RegularBtn label="Confirm" variant="contained" className={styles.at_nav_col_confirm_btn} />
                        </span>
                    </div>
                </div>
            </nav>
            <div className={styles.at_content_view_wrapper}>

            </div>
        </div>
    )
}