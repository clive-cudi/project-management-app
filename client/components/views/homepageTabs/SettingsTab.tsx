import { useMemo } from "react";
import styles from "../../../styles/views/homePageTabs/settingsTab.module.scss";
import { SearchInput, SideNavBtn } from "../../reusable";
import { BiHomeAlt } from "react-icons/bi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";

export const SettingsTab = ({}): JSX.Element => {
    const settingsNavOptions = useMemo(()=> [
        {
            label: "Account",
            icon: <BiHomeAlt />,
        },
        {
            label: "Connections",
            icon: <IoAnalyticsOutline />
        },
        {
            label: "Preferences",
            icon: <FiShoppingBag />
        },
        {
            label: "Security",
            icon: <MdOutlineSecurity />
        }
    ], [])

    return (
        <div className={styles.st_content}>
            <div className={styles.st_nav}>
                <div className={styles.st_nav_content}>
                    <div className={styles.st_nav_profile}>

                    </div>
                    <div className={styles.st_nav_search}>
                        <SearchInput placeholder="Search ..." />
                    </div>
                    <div className={styles.st_nav_options}>
                        <ul>
                            {
                                settingsNavOptions.map((option, i) => {
                                    return (
                                        <li key={i}>
                                            <SideNavBtn isActive={false} variant={"secondary"} withIcon={{status: true, icon: option.icon}}>{option.label}</SideNavBtn>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.st_nav_footer}>

                    </div>
                </div>
            </div>
            <div className={styles.st_view}>

            </div>
        </div>
    )
}