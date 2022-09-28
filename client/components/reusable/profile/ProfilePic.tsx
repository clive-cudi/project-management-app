import styles from "../../../styles/components/reusable/profilepic.module.scss";
import { FcCameraIdentification } from "react-icons/fc";

interface ProfilePic_Props {
    imageURL?: string
    alt?: string
    isLoading?: boolean
}

export const ProfilePic = ({imageURL, alt, isLoading}: ProfilePic_Props): JSX.Element => {
    return (
        <div className={`${styles.profile_pic_wrapper} ${isLoading ? styles.profile_pic_wrapper_loading : "" }`}>
            <button className={styles.profile_pic_upload_btn}><FcCameraIdentification /></button>
        </div>
    )
}