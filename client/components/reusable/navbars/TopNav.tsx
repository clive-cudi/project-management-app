import styles from "../../../styles/components/reusable/navbars/topnav.module.scss";
import { SearchInput } from "../inputs";
import { IconBtn } from "../buttons";
import { BsCalendar4Week } from "react-icons/bs";
import { VscBell } from "react-icons/vsc";
import { MdOutlineLiveHelp } from "react-icons/md";
import { ProfileWidget } from "../profile/ProfileWidget";
import { signOut } from "next-auth/react";

export const TopNav = ({}): JSX.Element => {
    return (
        <nav className={styles.tn_main_wrapper}>
            <div className={styles.tn_content}>
                <div className={styles.tn_col}>
                    <SearchInput />
                </div>
                <div className={styles.tn_col}>
                    <div className={styles.tn_notifications_wrapper}>
                        <ul>
                            <li><IconBtn icon={<BsCalendar4Week />} variant={"text"} /></li>
                            <li>
                                {/* eslint-disable */}
                                {/* <IconBtn icon={<img src={"/common/message-question.png"} alt={"?"} />} variant={"contained"} /> */}
                                <IconBtn icon={<MdOutlineLiveHelp />} variant={"text"} />
                            </li>
                            <li>
                                <IconBtn icon={<VscBell />} variant={"text"} />
                            </li>
                        </ul>
                    </div>
                    <div className={styles.tn_profile_wrapper}>
                        <ProfileWidget includeInfo={{username: "clive flav", location: "nairobi"}} onClick={(e)=> {
                            signOut({callbackUrl: "/login"});
                        }} orientation={"normal"} />
                    </div>
                </div>
            </div>
        </nav>
    )
}