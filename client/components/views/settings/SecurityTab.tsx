import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "../../../styles/views/settings/securityTab.module.scss";
import { RegularBtn, InputModal, ErrorModal } from "../../reusable";
import { useModal } from "../../../hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const SecurityTab = (): JSX.Element => {
    const { openModal, closeModal } = useModal();
    const [resetEmail, setResetEmail] = useState<string>("");
    const session = useSession();
    const router = useRouter();
    const [disable2fatoken, setDisable2fatoken] = useState<string>("");
    const [disable2faStatus, setDisable2faStatus] = useState<boolean>(session.data?.user.twoFA ?? false);

    function handlePasswordReset(email: string) {
        console.log(email)
        if (email !== "") {
            // submit email data to backend the display info
            openModal(<ErrorModal type="success" message="Check your inbox for the password reset link!!..." />)
        }
    }

    // useEffect(()=>{console.log(session)}, []);

    function handle2FAquery() {
        if (session.data?.user.twoFA == false && session.status === "authenticated") {
            router.push("/auth/twofactorsetup");
        }
    }


    function handle2FADisable(token: string) {
        axios.post(`${process.env.BACKEND_API_URL}/auth/tfa-disable`, {
            totptoken: token
        }, {
            headers: {
                Authorization: session.data?.user.token ?? ""
            }
        }).then((res) => {
            if (res.data.success == true) {
                setDisable2faStatus(false);
                openModal(<ErrorModal message={`${res.data.message}`} type={"success"} />);
            }
        }).catch((err) => {
            console.log(err);
            openModal(<ErrorModal message={`${err.response.data.message}`} type={"error"} />);
        })
    }

    function handle2FAdisableQuery() {
        console.log("2fa disable")
        openModal(<InputModal inputType={"text"} placeholder={"Enter token"} submitOnClick={(e, value) => {
            handle2FADisable(value ?? "");
        }} /> )
    }

    return (
        <div className={styles.security_tab_content}>
            <div className={styles.st_nav_wrapper}>
                <div className={styles.st_nav_content}>
                    <div className={styles.st_nav_col}>
                        <span>
                            <h4>Security Settings</h4>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.st_content_view_wrapper}>
                <div className={styles.st_info_wrapper}>
                    <div className={styles.st_info_strip}>
                        <div className={styles.st_info_strip_title}>
                            <h3>Change Password</h3>
                        </div>
                        <div className={`${styles.st_info_strip_content}`}>
                            <p>
                                A password reset link will be sent to the given email.
                            </p>
                            <RegularBtn label={`Reset Password`} className={styles.st_reset_psswd_btn} onClick={(e)=>{
                                openModal(<InputModal inputType={`email`} submitOnClick={(e, value)=>{handlePasswordReset(value ?? "")}} onChangeHandler={(e)=> {}} />) }} />
                        </div>
                    </div>
                </div>
                <div className={styles.st_info_wrapper}>
                    <div className={styles.st_info_strip}>
                        <div className={styles.st_info_strip_title}>
                            <h3>Enable Two Factor Authentication</h3>
                        </div>
                        <div className={`${styles.st_info_strip_content}`}>
                            <p>
                                A password reset link will be sent to the given email.
                            </p>
                            <RegularBtn label={session.data?.user.twoFA === true ? `Disable 2FA` :`Enable 2FA`} className={styles.st_reset_psswd_btn} onClick={() => {
                                session.data?.user.twoFA === true ? handle2FAdisableQuery() : handle2FAquery()
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}