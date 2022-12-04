import React, {useState} from "react";
import styles from "../../../styles/pages/login.module.scss";
import { InputDiv, RegularBtn, ErrorModal } from "../../reusable";
import { useModal } from "../../../hooks";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

export const LoginForm = (): JSX.Element => {
    const icon_img_styling: React.CSSProperties = {
        height: "30px",
        width: "30px",
        objectFit: "contain"
    }

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const { openModal } = useModal();
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
    const router = useRouter();
    const session = useSession();

    // make username optional

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;

        const name = e.target.name;

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        });
    }

    function checkInputs(): boolean {
        const {username, ...otherData} = data;
        if ([...Object.values(otherData)].every(Boolean)) {
            return true;
        } else {
            openModal(<ErrorModal message="Please enter all required input fields *" />);
            return false;
        }
    }

    function submit(): void {
        if (checkInputs()) {
            setIsAuthLoading(true);
            signIn("credentials_email", {...data, redirect: false}).then((res) => {
                setIsAuthLoading(false);
                console.log(res);
                if (res?.ok) {
                    //check is the user has 2FA enabled and redirect
                    // if the twoFA field doesn't exist on the session object, query the backend to check if a user has twoFA enabled

                    router.push("/auth/twofactorauth");

                    // console.log(session);
                    // router.push("/auth/twofactorauth");
                    // if (session.data?.user.twoFA == true) {
                    //     router.push("/auth/twofactorauth");
                    // } else {
                        // axios.get(`${process.env.BACKEND_API_URL}/auth/tfa-enabled`, {
                        //     headers: {
                        //         Authorization: session.data?.user.token ?? ""
                        //     }
                        // }).then((res)=>{
                        //     console.log(res);
                        //     if (res.data.success == true) {
                        //         if (res.data.isTwoFA == true) {
                        //             router.push("/auth/twofactorauth");
                        //         } else {
                        //             router.push("/");
                        //         }
                        //     } else {
                        //         router.push("/");
                        //     }
                        // }).catch((err) => {
                        //     console.log(err);
                        //     // recheck if the session has the 2FA field
                        //     if (session.data?.user.twoFA == true) {
                        //         router.push("/auth/twofactorauth");
                        //     } else {
                        //         router.push("/");
                        //     }
                        // })
                    // }
                    console.log(session.status)
                } else {
                    openModal(<ErrorModal message={JSON.parse(res?.error as string).message} />)
                }
            }).catch((signInErr) => {
                console.log(signInErr);
                openModal(<ErrorModal message={signInErr.message} />)
                setIsAuthLoading(false);
            })
        }
    }

    return (
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {/* eslint-disable-next-line */}
            {/* <InputDiv type={`text`} placeholder={`Enter UserName`} inputArgs={{name: "username"}} onChange={handleChange} icon={<img src="/auth/user_icon.png" alt="U" style={{...icon_img_styling}} />} /> */}
            {/* eslint-disable-next-line */}
            <InputDiv type={`text`} placeholder={`Enter Email *`} inputArgs={{name: "email"}} onChange={handleChange} icon={<img src="/auth/email_icon.png" alt="U" style={{...icon_img_styling}} />} />
            {/* eslint-disable-next-line */}
            <InputDiv type={`password`} placeholder={`Enter Password *`} inputArgs={{name: "password"}} onChange={handleChange} icon={<img src="/auth/lock_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <RegularBtn type={"submit"} label="Login" variant="contained" onClick={submit} isLoading={{status: isAuthLoading}} />
        </form>
    )
}