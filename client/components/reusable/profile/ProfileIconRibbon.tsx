import { ProfileIcon, ProfileIcon_Props } from "./ProfileIcon";
import styles from "../../../styles/components/reusable/profile/profileIcon.module.scss";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
interface ProfileIconRibbon_Props {
    users: {
        uid: string,
        profilePicURL: string
    }[],
    maxNumber?: number
    wrapperDivProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    wrapperDivStyles?: CSSProperties
    profileIconProps?: Omit<ProfileIcon_Props, "user">
}

export const ProfileIconRibbon = ({ users, maxNumber = 4, wrapperDivStyles, wrapperDivProps, profileIconProps }: ProfileIconRibbon_Props): JSX.Element => {
    return (
            <div className={styles.profile_icon_ribbon_wrapper} data-elm-type={"profile-icon-ribbon"} style={wrapperDivStyles} {...wrapperDivProps}>
            {
                users.slice(0, maxNumber ?? 4).map((user, ix) => {
                    return <ProfileIcon key={user.uid} user={{...user, profilePicURL: user.profilePicURL}} style={{left: `${ix * 20}px`}} {...profileIconProps} />;
                }).concat(users.length > maxNumber ? [<div key={users.length} style={{left: `${(maxNumber) * 20}px`}} data-elm-type={"profile-icon"} className={styles.profile_extra_placeholder} onClick={() => {}}>{`+${users.length - maxNumber}`}</div>] : [<></>])
            }
        </div>
    )
}