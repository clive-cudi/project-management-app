import styles from "../../../styles/pages/login.module.scss";
import { InputDiv } from "../../reusable";

export const LoginForm = (): JSX.Element => {
    const icon_img_styling: React.CSSProperties = {
        height: "30px",
        width: "30px",
        objectFit: "contain"
    }

    return (
        <form>
            <InputDiv type={`text`} placeholder={`Enter UserName`} onChange={(e)=>{}} icon={<img src="/auth/user_icon.png" placeholder="U" style={{...icon_img_styling}} />} />
            <InputDiv type={`text`} placeholder={`Enter Email`} onChange={(e)=>{}} icon={<img src="/auth/email_icon.png" placeholder="U" style={{...icon_img_styling}} />} />
            <InputDiv type={`password`} placeholder={`Enter Password`} onChange={(e)=>{}} icon={<img src="/auth/lock_icon.png" placeholder="U" style={{...icon_img_styling}} />} />
        </form>
    )
}