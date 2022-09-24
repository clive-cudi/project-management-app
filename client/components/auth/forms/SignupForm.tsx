import styles from "../../../styles/pages/login.module.scss";
import { InputDiv, RegularBtn } from "../../reusable";

export const Signupform = (): JSX.Element => {
    const icon_img_styling: React.CSSProperties = {
        height: "30px",
        width: "30px",
        objectFit: "contain"
    }

    return (
        <form onSubmit={(e)=>{e.preventDefault()}}>
            <InputDiv type={`text`} placeholder={`Enter UserName`} onChange={(e)=>{}} icon={<img src="/auth/user_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <InputDiv type={`email`} placeholder={`Enter Email`} onChange={(e)=>{}} icon={<img src="/auth/email_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <InputDiv type={`password`} placeholder={`Enter Password`} onChange={(e)=>{}} icon={<img src="/auth/lock_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <InputDiv type={`password`} placeholder={`Confirm Password`} onChange={(e)=>{}} icon={<img src="/auth/lock_icon.png" alt="U" style={{...icon_img_styling}} />} />
            <RegularBtn type={"submit"} label="Signup" variant="contained" />
        </form>
    )
}