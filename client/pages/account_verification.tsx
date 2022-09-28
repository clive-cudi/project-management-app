import styles from "../styles/pages/account_verification.module.scss";
import { Header, AccountVerificationFormCont } from "../components";

export default function AccountVerificationPage(): JSX.Element {
    return (
        <div className={`app ${styles.av_app}`}>
            <Header title="Account verification" description="Account Verification Page" />
            <div className={`content ${styles.av_content}`}>
                <h2>Account verification.</h2>
                <AccountVerificationFormCont />
            </div>
        </div>
    )
}