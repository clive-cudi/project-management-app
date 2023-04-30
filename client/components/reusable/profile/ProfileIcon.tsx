import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/components/reusable/profile/profileIcon.module.scss";
import { HiUser } from "react-icons/hi";
import { useLazyQuery } from "../../../hooks";
import { UserQueries } from "../../../utils";
import { useSession } from "next-auth/react";
import { UserProfile } from "../../../types";
import { OnlineStatus } from "../../../types";
import { MdEmail } from "react-icons/md";
import { FcVoicemail, FcVideoCall, FcPhone } from "react-icons/fc";
import { IconBtn } from "../buttons";
import { BsChatLeftText } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";


export interface ProfileIcon_Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  user: {
    uid: string;
    profilePicURL: string;
  };
  showDetailsOnHover?: boolean;
  // fetchDetails?: boolean
}

type details_widget_orientations_type =
  | "topleft"
  | "topright"
  | "bottomright"
  | "bottomleft";

export const ProfileIcon = ({
  user,
  showDetailsOnHover,
  // fetchDetails,
  ...utilProps
}: ProfileIcon_Props): JSX.Element => {
  const imageHoverRef = useRef<HTMLDivElement>(null);
  const [currentOrientation, setCurrentOrientation] = useState<
    details_widget_orientations_type
  >("topleft");
  const [style, setStyle] = useState({});
  const session = useSession();
  const { getProfile } = UserQueries(session);
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    email: "",
    isVerified: false,
    about: ""
  });
  const [fetchUserProfile, {data: user_profile, error: user_profile_error, isLoading: user_profile_loading}] = useLazyQuery([`user_profile`], () => getProfile(user.uid));
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>("away")

  // function generateCurrentOrientation(
  //   width: number,
  //   height: number,
  //   dimensions?: DOMRect
  // ): details_widget_orientations_type {
  //   if (dimensions) {
  //     if (height > dimensions.top && width < dimensions.left) {
  //       console.log(1);
  //       return "bottomleft";
  //     }

  //     if (height > dimensions.top && width > dimensions.left) {
  //       console.log(2);
  //       return "bottomright";
  //     }

  //     if (height > dimensions.bottom && width < dimensions.left) {
  //       console.log(3);
  //       return "topleft";
  //     }

  //     if (height > dimensions.bottom && width > dimensions.left) {
  //       console.log(4);
  //       return "topright";
  //     }
  //   }

  //   console.log("defaulting coords");
  //   return "topleft";
  // }

  // useEffect(() => {
  //   // calculating the position of the details widget
  //   const profileDetailsElm = document.getElementById("profile_details");

  //   if (profileDetailsElm) {
  //     //
  //     const elmWidth = profileDetailsElm.clientWidth;
  //     const elmHeight = profileDetailsElm.clientHeight;
  //     const currentDimensions = imageHoverRef.current?.getBoundingClientRect();

  //     console.log(currentDimensions);

  //     setCurrentOrientation(
  //       generateCurrentOrientation(elmWidth, elmHeight, currentDimensions)
  //     );
  //   }

  //   //eslint-disable-next-line
  // }, [imageHoverRef]);

  // useEffect(() => {
  //   // console.log("running logic");
  //   // Calculate the position of the profile picture element
  //   const profilePictureRect = imageHoverRef.current?.getBoundingClientRect();
  //   const profilePictureTop = profilePictureRect?.top;
  //   const profilePictureLeft = profilePictureRect?.left;
  //   const profilePictureWidth = profilePictureRect?.width;
  //   const profilePictureHeight = profilePictureRect?.height;

  //   // Calculate the available space around the profile picture element
  //   const profileDetailsElm = document.getElementById("profile_details");
  //   const viewportWidth = window.innerWidth;
  //   const viewportHeight = window.innerHeight;
  //   const cardWidth = profileDetailsElm?.clientWidth ?? 300; // Width of the contact card
  //   const cardHeight = profileDetailsElm?.clientHeight ?? 200; // Height of the contact card
  //   if (
  //     profilePictureTop &&
  //     profilePictureLeft &&
  //     profilePictureWidth &&
  //     profilePictureHeight
  //   ) {
  //     const spaceTop = profilePictureTop - cardHeight;
  //     const spaceLeft = profilePictureLeft - cardWidth;
  //     const spaceRight =
  //       viewportWidth - (profilePictureLeft + profilePictureWidth + cardWidth);
  //     const spaceBottom =
  //       viewportHeight -
  //       (profilePictureTop + profilePictureHeight + cardHeight);

  //     // Set the position of the contact card based on the available space
  //     if (spaceTop > 0) {
  //       setStyle({ top: profilePictureTop - cardHeight });
  //     } else if (spaceLeft > 0) {
  //       setStyle({ left: profilePictureLeft - cardWidth });
  //     } else if (spaceRight > 0) {
  //       setStyle({ left: profilePictureLeft + profilePictureWidth });
  //     } else if (spaceBottom > 0) {
  //       setStyle({ top: profilePictureTop + profilePictureHeight });
  //     } else {
  //       setStyle({});
  //     }
  //   }
  // }, []);


  useEffect(() => {
    setProfile((prev) => {
      return({
        ...prev,
        ...user_profile?.user
      })
    })
  }, [user_profile]);

  function getTargetUserProfile() {
    fetchUserProfile();
  }

  function renderOnlineStatusBadge(status: OnlineStatus) {
    switch (status) {
      case "online":
        return <span data-elm={"online-status-indicator"}>
        </span>
      case "offline":
      case "away":
    }
  }

  return (
    <div
      className={styles.profile_icon_wrapper}
      // onMouseOver={() => {
      //   if (imageHoverRef) {
      //     imageHoverRef.current?.setAttribute("data-elm-isActive", "true");
      //   }
      // }}
      // onMouseLeave={() => {
      //   if (imageHoverRef) {
      //     imageHoverRef.current?.setAttribute("data-elm-isActive", "false");
      //   }
      // }}
      data-elm-type={"profile-icon"}
      {...utilProps}
      onClick={getTargetUserProfile}
    >
      <span data-elm-type="profile">
        {/* eslint-disable-next-line */}
        {
          user.profilePicURL ? 
          // eslint-disable-next-line
            <img src={user.profilePicURL ?? ""} alt="@" />
          :
            <span data-elm-type={"user-profile-img-placeholder"}><HiUser /></span>
        }
      </span>
      {showDetailsOnHover ? (
        <div
          ref={imageHoverRef}
          className={`${styles.profile_details_wrapper} orientation_${currentOrientation} `}
          id={"profile_details"}
          data-elm-isActive={true}
        >
          <div className={styles.profile_details_content}>
              {/* status */}
              <div className={styles.pdc_status}>
                <span className={styles.pdc_status_indicator}>
                  <span className={`${styles.pdc_light} ${styles[`pdc_light_${onlineStatus}`]}`}></span>
                </span>
                <span className={styles.pdc_status_label}>{onlineStatus}</span>
              </div>
            <div className={`${styles.pdc_strip} ${styles.pdc_strip_centered}`}>
              <div className={styles.pdc_profile_pic}>
                <span data-elm-type="profile">
                  {/* eslint-disable-next-line */}
                  {
                    user.profilePicURL ? 
                    // eslint-disable-next-line
                      <img src={user.profilePicURL ?? ""} alt="@" />
                    :
                      <span data-elm-type={"user-profile-img-placeholder"}><HiUser /></span>
                  }
                </span>
              </div>
            </div>
            <div className={styles.pdc_strip}>
              <div className={styles.pdc_strip_info}>
                <span data-elm-type={"info-icon"}><AiOutlineUser /></span>
                <h3>{user_profile?.user.username}</h3>
              </div>
            </div>
            <div className={styles.pdc_strip}>
              <div className={styles.pdc_strip_info}>
                <span data-elm-type={"info-icon"}><MdEmail /></span>
                <h4>{user_profile?.user.email}</h4>
              </div>
            </div>
            <div className={styles.pdc_strip}>
              <div className={styles.pdc_strip_info}>
                <span data-elm-type={"info-icon"}><FcVoicemail /></span>
                <h4>{user_profile?.user.info?.phone ?? "_"}</h4>
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
      ) : null}
    </div>
  );
};
