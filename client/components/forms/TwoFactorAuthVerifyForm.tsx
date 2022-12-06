import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/components/forms/twofactorsetuptokenform.module.scss";
import { InputDiv, RegularBtn, ErrorModal } from "../reusable";
import { useModal } from "../../hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const TwoFactorAuthVerifyForm = (): JSX.Element => {
    const [tokenData, setTokenData] = useState<string>("");
    const session = useSession();
    const router = useRouter();
    const { openModal, closeModal } = useModal();

    function handleTokenVerifySubmit() {
        if (tokenData !== "") {
            axios.post(`${process.env.BACKEND_API_URL}/auth/validatetoken`, {
                totptoken: tokenData
            }, {
                headers: {
                    Authorization: session.data?.user.token ?? ""
                }
            }).then((res)=>{
                console.log(res.data);
                openModal(<ErrorModal message={res.data.message} type={res.data.success ? "success" : "error"} btn_label={"Dismiss"} />)
                if (res.data.success === true) {
                    // closeModal();
                    router.push('/');
                }
            }).catch((err) => {
                console.log(err);
                openModal(<ErrorModal message={`${err.response.data.message}`} />)
            })
        }
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }} className={styles.tf_token_form}>
            <InputDiv type={`text`} placeholder={"Enter Token from Authenticator app ..."} onChange={(e)=>{
                setTokenData(e.target.value);
            }} variant={"primary"} />
            <RegularBtn type="submit" label="Verify 2FA token" onClick={handleTokenVerifySubmit} variant={"gradient"} />
        </form>
    )
}