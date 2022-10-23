import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "../../../styles/views/settings/securityTab.module.scss";
import { RegularBtn, InputModal, ErrorModal } from "../../reusable";
import { useModal } from "../../../hooks";
import { useSession } from "next-auth/react";
import jwt from "next-auth/jwt";

export const SecurityTab = (): JSX.Element => {
    const { openModal, closeModal } = useModal();
    const [resetEmail, setResetEmail] = useState<string>("");
    const session = useSession();

    function handlePasswordReset(email: string) {
        console.log(email)
        if (email !== "") {
            // submit email data to backend the display info
            openModal(<ErrorModal type="success" message="Check your inbox for the password reset link!!..." />)
        }
    }

    useEffect(()=>{console.log(session)}, []);

    function handle2FAquery() {
        axios.post(`${process.env.BACKEND_API_URL}/auth/enabletwofactorstep1`, {}, {
            headers: {
                Authorization : session.data?.user.token ?? ""
            }
        }).then((res) => {
            console.log(res.data);
        })
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
                            <RegularBtn label={`Enable 2FA`} className={styles.st_reset_psswd_btn} onClick={() => {
                                handle2FAquery();
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}