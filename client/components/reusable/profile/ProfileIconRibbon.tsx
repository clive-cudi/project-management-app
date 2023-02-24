import { ProfileIcon } from "./ProfileIcon";
import styles from "../../../styles/components/reusable/profile/profileIcon.module.scss";
interface ProfileIconRibbon_Props {
    users: {
        uid: string,
        profilePicURL: string
    }[],
    maxNumber?: number
}

export const ProfileIconRibbon = ({ users, maxNumber = 4 }: ProfileIconRibbon_Props): JSX.Element => {
    console.log(users);
    return (
            <div className={styles.profile_icon_ribbon_wrapper} data-elm-type={"profile-icon-ribbon"}>
            {
                users.slice(0, maxNumber ?? 4).map((user, ix) => {
                    return <ProfileIcon key={ix} user={{...user, profilePicURL: ix == 2 ? "" : user.profilePicURL}} style={{left: `${ix * 20}px`}} />;
                }).concat(users.length > maxNumber ? [<div key={users.length} style={{left: `${(maxNumber) * 20}px`}} data-elm-type={"profile-icon"} className={styles.profile_extra_placeholder} onClick={() => {}}>{`+${users.length - maxNumber}`}</div>] : [<></>])
            }
        </div>
    )
}