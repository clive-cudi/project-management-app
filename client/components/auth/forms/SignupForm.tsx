import React, {useState} from "react";
import styles from "../../../styles/pages/login.module.scss";
import { InputDiv, RegularBtn, InputSelect, ErrorModal } from "../../reusable";
import { FiUser } from "react-icons/fi";
import { useModal } from "../../../hooks";

export const Signupform = (): JSX.Element => {
    const icon_img_styling: React.CSSProperties = {
        height: "30px",
        width: "30px",
        objectFit: "contain"
    };

    const selectOptions: {label: string, value: string}[] = [
        {label: "Select a role", value: ""},
        {label: "Individual", value: "individual"},
        {label: "Organization", value: "organization"}
    ];

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
        usertype: ""
    });
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const { openModal } = useModal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const type = e.target.type;

        const name = e.target.name;

        const value = type == "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;


        setData((prevData)=> {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function checkInputs(): boolean {
        // check if all values are present
        if ([...Object.values(data)].every(Boolean)){
            // check if the passwords match
            if (data.password === data.confirm) {
                return true;
            } else {
                openModal(<ErrorModal message="Please enter matching passwords" />);
                return false;
            }
        } else {
            openModal(<ErrorModal message="Please fill in all input fields" />)
            return false;
        }
    }

    function submit(): void {
        if (checkInputs()) {
            console.log(data);
        }
    }

    return (
        <form onSubmit={(e)=>{e.preventDefault()}} autoComplete={"off"}>
            {/* eslint-disable-next-line */}
            <InputDiv type={`text`} placeholder={`Enter UserName`} inputArgs={{name: "username", autoComplete: "off"}} onChange={(e)=>{handleChange(e)}} icon={<img src="/auth/user_icon.png" alt="U" style={{...icon_img_styling}} />} />
            {/* eslint-disable-next-line */}
            <InputDiv type={`email`} placeholder={`Enter Email`} inputArgs={{name: "email"}} onChange={(e)=>{handleChange(e)}} icon={<img src="/auth/email_icon.png" alt="U" style={{...icon_img_styling}} />} />
            {/* eslint-disable-next-line */}
            <InputDiv type={`password`} placeholder={`Enter Password`} inputArgs={{name: "password"}} onChange={(e)=>{handleChange(e)}} icon={<img src="/auth/lock_icon.png" alt="U" style={{...icon_img_styling}} />} />
            {/* eslint-disable-next-line */}
            <InputDiv type={`password`} placeholder={`Confirm Password`} inputArgs={{name: "confirm"}} onChange={(e)=>{handleChange(e)}} icon={<img src="/auth/lock_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <InputSelect options={selectOptions} withIcon={{status: true, icon: <FiUser fontSize={20} />}} name={"usertype"} onChange={(e)=>{handleChange(e)}} />
            <RegularBtn type={"submit"} label="Sign Up" variant="contained" onClick={submit} />
        </form>
    )
}