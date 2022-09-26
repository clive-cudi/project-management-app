import React, {useState} from "react";
import styles from "../../../styles/pages/login.module.scss";
import { InputDiv, RegularBtn, ErrorModal } from "../../reusable";
import { useModal } from "../../../hooks";

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
            console.log(data);
        }
    }

    return (
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {/* eslint-disable-next-line */}
            <InputDiv type={`text`} placeholder={`Enter UserName`} inputArgs={{name: "username"}} onChange={handleChange} icon={<img src="/auth/user_icon.png" alt="U" style={{...icon_img_styling}} />} />
            {/* eslint-disable-next-line */}
            <InputDiv type={`text`} placeholder={`Enter Email *`} inputArgs={{name: "email"}} onChange={handleChange} icon={<img src="/auth/email_icon.png" alt="U" style={{...icon_img_styling}} />} />
            {/* eslint-disable-next-line */}
            <InputDiv type={`password`} placeholder={`Enter Password *`} inputArgs={{name: "password"}} onChange={handleChange} icon={<img src="/auth/lock_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <RegularBtn type={"submit"} label="Login" variant="contained" onClick={submit} />
        </form>
    )
}