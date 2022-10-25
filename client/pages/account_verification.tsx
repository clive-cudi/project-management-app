import styles from "../styles/pages/account_verification.module.scss";
import { Header, AccountVerificationFormCont } from "../components";
// import { useCountStore } from "../hooks";

export default function AccountVerificationPage(): JSX.Element {
    // const { count, inc, dec} = useCountStore();

    return (
        <div className={`app ${styles.av_app}`}>
            <Header title="Account verification" description="Account Verification Page" />
            <div className={`content ${styles.av_content}`}>
                <h2>Account verification.</h2>
                <AccountVerificationFormCont />
                {/* <button onClick={()=>{inc()}}>Increment</button>
                <button onClick={()=>{dec()}}>Decrement</button>
                <p>
                    {count}
                </p> */}
            </div>
        </div>
    )
}