import styles from "../../../styles/views/settings/accountTab.module.scss";
import { IconBtn, RegularBtn } from "../../reusable";
import { VscBell } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";
import { InputDiv, InputSelect, ProfilePicUpload, InputCheck } from "../../reusable";

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
                <div className={styles.at_user_info_wrapper}>
                    <div className={styles.user_info_strip}>
                        <div className={styles.user_info_strip_title}>
                            <h3>User Information</h3>
                        </div>
                        <div className={`${styles.user_info_strip_content} ${styles.user_info_strip_grid_cols_0}`}>
                            <p>
                                Enter the required information below to register. You can change it anytime you want.
                            </p>
                        </div>
                    </div>
                    <div className={styles.user_info_strip}>
                        <div className={styles.user_info_strip_title}>
                            <h4>Email address</h4>
                        </div>
                        <div className={`${styles.user_info_strip_content} ${styles.user_info_strip_grid_cols_0}`}>
                            <span>
                                <InputDiv type={`email`} placeholder={`username@domain.com`} onChange={()=>{}} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_info_strip}>
                        <div className={styles.user_info_strip_title}>
                            <h4>Full Name</h4>
                        </div>
                        <div className={`${styles.user_info_strip_content} ${styles.user_info_strip_grid_cols_2}`}>
                            <span>
                                <InputDiv type={`text`} placeholder={"First Name"} onChange={()=>{}} />
                            </span>
                            <span>
                                <InputDiv type={`text`} placeholder={"Second Name"} onChange={()=>{}} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_info_strip}>
                        <div className={styles.user_info_strip_title}>
                            <h4>Address</h4>
                        </div>
                        <div className={`${styles.user_info_strip_content} ${styles.user_info_strip_grid_cols_3}`}>
                            <span>
                                <InputSelect options={[]} />
                            </span>
                            <span>
                                <InputSelect options={[]} />
                            </span>
                            <span>
                                <InputDiv type={`number`} placeholder={`254`} onChange={()=>{}} />
                            </span>
                            <span data-span={"full"}>
                                <InputDiv type={`text`} placeholder={`Street`} onChange={()=>{}} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_info_strip}>
                        <div className={styles.user_info_strip_title}>
                            <h4>Role</h4>
                        </div>
                        <div className={`${styles.user_info_strip_content} ${styles.user_info_strip_grid_cols_0}`}>
                            <span>
                                <InputDiv type={`text`} placeholder={`Role`} onChange={()=>{}} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_info_strip}>
                        <div className={styles.user_info_strip_title}>
                            <h4>Choose your skills</h4>
                        </div>
                        <div className={`${styles.user_info_strip_content} ${styles.user_info_strip_grid_cols_0}`}>
                            
                        </div>
                    </div>
                </div>
                <div className={styles.at_user_profile_wrapper}>
                    <div className={styles.user_profile_info_strip}>
                        <div className={styles.user_profile_info_strip_title}>
                            <h4>Profile Photo</h4>
                        </div>
                        <div className={styles.profile_info_strip_content} data-elm-exception={"profile-wrapper"}>
                            <ProfilePicUpload />
                        </div>
                    </div>
                    <div className={styles.user_profile_info_strip}>
                        <div className={styles.user_profile_info_strip_title}>
                            <h4>Choose your main interest</h4>
                        </div>
                        <div className={styles.profile_info_strip_content}>
                            <InputSelect options={[]} />
                        </div>
                    </div>
                    <div className={styles.user_profile_info_strip}>
                        <div className={styles.user_profile_info_strip_title}>
                            <h4>Select your gender</h4>
                        </div>
                        <div className={styles.profile_info_strip_content}>
                            <div className={styles.radio_grp}>
                                <InputCheck />
                                <InputCheck />
                                <InputCheck />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}