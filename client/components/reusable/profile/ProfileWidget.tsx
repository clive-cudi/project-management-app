import styles from "../../../styles/components/reusable/profilepic.module.scss";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { FaUserAlt } from "react-icons/fa";
import { upperCaseFirstSentence } from "../../../utils";

interface ProfileWidget_Props {
    imageURL?: string
    alt?: string
    isLoading?: boolean
    includeInfo?: {
        username: string
        location: string
    }
    onClick?: MouseEventHandler<HTMLSpanElement>
    orientation?: "normal" | "reversed"
}

export const ProfileWidget = ({imageURL, alt, isLoading, includeInfo, onClick, orientation}: ProfileWidget_Props) => {
    return (
        <div className={`${styles.profile_widget_wrapper} ${isLoading ? styles.profile_widget_wrapper_loading : "" } ${styles[`pw_orientation_${orientation ?? "normal"}`]} ${includeInfo ? styles.pw_hasInfo : ""}`}>
            {
                includeInfo &&
                <div className={styles.pw_info_wrapper}>
                    <span className={styles.pw_username_wrapper}>
                        {/* <h4>{includeInfo.username.split(" ").map((word, i)=> {
                            // if the char is a space and the index is less than the length, capitalize the next char.
                            // if the char index == 0, capitalize
                            // return char == " " || i == 0 ? (i == 0 ? char.toUpperCase() : (i < includeInfo.username.length - 1 ? " " + includeInfo.username[i+1].toUpperCase() : "")) : char.toLowerCase();
                            return word.charAt(0).toUpperCase() + word.slice(1);
                        }).join(" ")}</h4> */}
                        <h4>{upperCaseFirstSentence(includeInfo.username)}</h4>
                    </span>
                    <span className={styles.pw_location_wrapper}>
                        <h5>{includeInfo.location}</h5>
                    </span>
                </div>
            }
            {/* profile pic here */}
            <div className={styles.pw_pic_wrapper} >
                <span className={styles.pw_pic} onClick={onClick}>
                    {
                        imageURL ? <Image src={imageURL} alt={alt ?? "@"} layout={"fill"} /> : <FaUserAlt />
                    }
                </span>
            </div>
        </div>
    )
}