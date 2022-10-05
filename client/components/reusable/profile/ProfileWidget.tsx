import styles from "../../../styles/components/reusable/profilepic.module.scss";
import Image from "next/image";
interface ProfileWidget_Props {
    imageURL: string
    alt?: string
    isLoading?: boolean
}

export const ProfileWidget = ({imageURL, alt, isLoading}: ProfileWidget_Props) => {
    return (
        <div className={`${styles.profile_widget_wrapper} ${isLoading ? styles.profile_widget_wrapper_loading : "" }`}>
            <Image src={imageURL} alt={alt} layout={"fill"} />
        </div>
    )
}