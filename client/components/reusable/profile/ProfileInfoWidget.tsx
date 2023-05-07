import React, { useRef } from "react";
import styles from "../../../styles/components/reusable/profile/profileIcon.module.scss";
import { details_widget_orientations_type } from "./ProfileIcon";
import { OnlineStatus, UserProfile } from "../../../types";
import { MdEmail } from "react-icons/md";
import { FcVoicemail, FcVideoCall, FcPhone } from "react-icons/fc";
import { IconBtn } from "../buttons";
import { HiUser } from "react-icons/hi";
import { BsChatLeftText } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface ProfileInfoWidget_Props {
    currentOrientation?: details_widget_orientations_type;
    onlineStatus?: OnlineStatus;
    profile?: UserProfile;
    imageHoverRef?: React.RefObject<HTMLDivElement>;
    isProfileLoading?: boolean
}

export const ProfileInfoWidget = ({ currentOrientation, onlineStatus, profile, imageHoverRef, isProfileLoading = false }: ProfileInfoWidget_Props): JSX.Element => {

    return (
        <SkeletonTheme>
            <div
            ref={imageHoverRef}
            className={`${styles.profile_details_wrapper} orientation_${currentOrientation} `}
            id={"profile_details"}
            data-elm-isActive={false}
            >
            <div className={styles.profile_details_content}>
                <div className={`${styles.pdc_strip}`} style={{justifyContent: "space-between"}}>
                    <span data-elm-type={"pdc-view-full-profile-span"}>View full profile</span>
                    {/* status */}
                    <div className={`${styles.pdc_status}`}>
                        <span className={styles.pdc_status_indicator}>
                        <span className={`${styles.pdc_light} ${styles[`pdc_light_${onlineStatus}`]}`}></span>
                        </span>
                        <span className={styles.pdc_status_label}>{onlineStatus}</span>
                    </div>
                    </div>
                    <div className={`${styles.pdc_strip} ${styles.pdc_strip_centered}`}>
                    <div className={styles.pdc_profile_pic}>
                        <span data-elm-type="profile">
                        {/* eslint-disable-next-line */}
                        {
                            profile?.profilePicUrl ? 
                            // eslint-disable-next-line
                            <img src={profile.profilePicUrl ?? ""} alt="@" />
                            :
                            <span data-elm-type={"user-profile-img-placeholder"}><HiUser /></span>
                        }
                        </span>
                    </div>
                    </div>
                    <div className={styles.pdc_strip}>
                        <div className={styles.pdc_strip_info}>
                            <span data-elm-type={"info-icon"}><AiOutlineUser /></span>
                            {isProfileLoading ? <Skeleton containerClassName="skeleton-flex" />: <h3>{profile?.username ?? "__"}</h3>}
                        </div>
                    </div>
                    <div className={styles.pdc_strip}>
                        <div className={styles.pdc_strip_info}>
                            <span data-elm-type={"info-icon"}><MdEmail /></span>
                            {isProfileLoading ? <Skeleton containerClassName="skeleton-flex" /> : <h4>{profile?.email ?? "__"}</h4>}
                        </div>
                    </div>
                    <div className={styles.pdc_strip}>
                        <div className={styles.pdc_strip_info}>
                            <span data-elm-type={"info-icon"}><FcVoicemail /></span>
                            {isProfileLoading ? <Skeleton containerClassName="skeleton-flex" /> : <h4>{profile?.info?.phone ?? "_"}</h4>}
                        </div>
                    </div>
                    <div className={styles.pdc_strip}>
                        <div className={styles.pdc_util_tray}>
                            <IconBtn icon={<BsChatLeftText />} variant={"secondary"} />
                            <IconBtn icon={<BsFillMicFill />} variant={"secondary"} />
                            <IconBtn icon={<FcVideoCall />} variant={"secondary"} />
                            <IconBtn icon={<FcPhone />} variant={"secondary"} />
                        </div>
                    </div>
                </div>
            </div>
            </SkeletonTheme>
    )
}