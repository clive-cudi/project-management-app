import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/components/forms/twofactorsetuptokenform.module.scss";
import { InputDiv, RegularBtn, ErrorModal } from "../reusable";
import { FcLock } from "react-icons/fc";
import { useSession, signOut } from "next-auth/react";
import { useModal } from "../../hooks";

interface TwoFactorSetupTokenForm_Props {
    base32Secret: string
}

export const TwoFactorSetupTokenForm = ({ base32Secret }: TwoFactorSetupTokenForm_Props) => {
    const [totptoken, setTotptoken] = useState("");
    const session = useSession();
    const { openModal } = useModal();

    function handleTokenSubmit() {
        if (totptoken !== "") {
            axios.post(`${process.env.BACKEND_API_URL}/auth/enabletwofactorstep2`, {
                base32secret: base32Secret,
                totptoken
            }, {
                headers: {
                    Authorization: session.data?.user.token ?? ""
                }
            }).then((res) => {
                console.log(res);
                if (res.data.success === true) {
                    console.log("Success!!")
                } else {
                    openModal(<ErrorModal message={`${res.data.message}`} />)
                }
            }).catch((err) => {
                console.log(err.response.data);
                openModal(<ErrorModal message={`${err.message}`} />);
            })
        }
    }

    return (
        <form className={styles.tf_token_form} onSubmit={(e)=>{e.preventDefault()}}>
            <InputDiv type={'text'} placeholder={"Enter token"} onChange={(e)=>{
                setTotptoken(e.target.value);
            }} icon={<FcLock fontSize={20} />} />
            <RegularBtn type="submit" label="Enable 2FA" variant="contained" onClick={()=>{
                handleTokenSubmit()
            }} />
        </form>
    )
}