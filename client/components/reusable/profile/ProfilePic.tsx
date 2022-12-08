import { useRef } from "react";
import styles from "../../../styles/components/reusable/profilepic.module.scss";
import { FcCameraIdentification } from "react-icons/fc";
import { uploadFile } from "react-s3";

interface ProfilePic_Props {
    imageURL?: string
    alt?: string
    isLoading?: boolean
    upload?: boolean
    onFileLoad?: () => {}
}

export const ProfilePicUpload = ({imageURL, alt, isLoading, upload, onFileLoad}: ProfilePic_Props): JSX.Element => {
    const inputPicRef = useRef<HTMLInputElement>(null);

    function openFilePicker() {
        if (inputPicRef.current) {
            inputPicRef.current.click();
        }
    }

    return (
        <div className={`${styles.profile_pic_wrapper} ${isLoading ? styles.profile_pic_wrapper_loading : "" }`}>
            <button className={styles.profile_pic_upload_btn}><FcCameraIdentification /></button>
            <input type={"file"} onChange={(e) => {
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    let picture = fileReader.result;
                    const file = e.target.files ? e.target.files[0] : null;
                    const metadata = {
                        contentType: file?.type
                    }
                }
            }} />
        </div>
    )
}