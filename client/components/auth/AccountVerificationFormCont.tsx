import styles from "../../styles/pages/account_verification.module.scss";
import { ProfilePicUpload } from "../reusable";
import { AccountVerificationForm } from "./forms";

export const AccountVerificationFormCont = ({}): JSX.Element => {
    return (
        <div className={styles.av_form_cont}>
            <div className={styles.av_form_profile_wrapper}>
                <ProfilePicUpload />
                <h4>Upload your profile photo.</h4>
            </div>
            <AccountVerificationForm />
        </div>
    )
}