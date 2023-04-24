import { ProfileIcon } from "./ProfileIcon";
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
}

export const ProfileIconRibbon = ({ users, maxNumber = 4, wrapperDivStyles, wrapperDivProps }: ProfileIconRibbon_Props): JSX.Element => {
    return (
            <div className={styles.profile_icon_ribbon_wrapper} data-elm-type={"profile-icon-ribbon"} style={wrapperDivStyles} {...wrapperDivProps}>
            {
                users.slice(0, maxNumber ?? 4).map((user, ix) => {
                    return <ProfileIcon key={ix} user={{...user, profilePicURL: user.profilePicURL}} style={{left: `${ix * 20}px`}} />;
                }).concat(users.length > maxNumber ? [<div key={users.length} style={{left: `${(maxNumber) * 20}px`}} data-elm-type={"profile-icon"} className={styles.profile_extra_placeholder} onClick={() => {}}>{`+${users.length - maxNumber}`}</div>] : [<></>])
            }
        </div>
    )
}