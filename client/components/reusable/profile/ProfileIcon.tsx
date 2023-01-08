import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/components/reusable/profile/profileIcon.module.scss";

export interface ProfileIcon_Props {
  user: {
    uid: string;
    profilePicURL: string;
  };
  showDetailsOnHover?: boolean;
}

type details_widget_orientations_type =
  | "topleft"
  | "topright"
  | "bottomright"
  | "bottomleft";

export const ProfileIcon = ({
  user,
  showDetailsOnHover
}: ProfileIcon_Props): JSX.Element => {
  const imageHoverRef = useRef<HTMLDivElement>(null);
  const [currentOrientation, setCurrentOrientation] = useState<
    details_widget_orientations_type
  >("topleft");
  const [style, setStyle] = useState({});

  function generateCurrentOrientation(
    width: number,
    height: number,
    dimensions?: DOMRect
  ): details_widget_orientations_type {
    if (dimensions) {
      if (height > dimensions.top && width < dimensions.left) {
        console.log(1);
        return "bottomleft";
      }

      if (height > dimensions.top && width > dimensions.left) {
        console.log(2);
        return "bottomright";
      }

      if (height > dimensions.bottom && width < dimensions.left) {
        console.log(3);
        return "topleft";
      }

      if (height > dimensions.bottom && width > dimensions.left) {
        console.log(4);
        return "topright";
      }
    }

    console.log("defaulting coords");
    return "topleft";
  }

  useEffect(() => {
    // calculating the position of the details widget
    const profileDetailsElm = document.getElementById("profile_details");

    if (profileDetailsElm) {
      //
      const elmWidth = profileDetailsElm.clientWidth;
      const elmHeight = profileDetailsElm.clientHeight;
      const currentDimensions = imageHoverRef.current?.getBoundingClientRect();

      console.log(currentDimensions);

      setCurrentOrientation(
        generateCurrentOrientation(elmWidth, elmHeight, currentDimensions)
      );
    }

    //eslint-disable-next-line
  }, [imageHoverRef]);

  useEffect(() => {
    console.log("running logic");
    // Calculate the position of the profile picture element
    const profilePictureRect = imageHoverRef.current?.getBoundingClientRect();
    const profilePictureTop = profilePictureRect?.top;
    const profilePictureLeft = profilePictureRect?.left;
    const profilePictureWidth = profilePictureRect?.width;
    const profilePictureHeight = profilePictureRect?.height;

    // Calculate the available space around the profile picture element
    const profileDetailsElm = document.getElementById("profile_details");
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardWidth = profileDetailsElm?.clientWidth ?? 300; // Width of the contact card
    const cardHeight = profileDetailsElm?.clientHeight ?? 200; // Height of the contact card
    if (
      profilePictureTop &&
      profilePictureLeft &&
      profilePictureWidth &&
      profilePictureHeight
    ) {
      const spaceTop = profilePictureTop - cardHeight;
      const spaceLeft = profilePictureLeft - cardWidth;
      const spaceRight =
        viewportWidth - (profilePictureLeft + profilePictureWidth + cardWidth);
      const spaceBottom =
        viewportHeight -
        (profilePictureTop + profilePictureHeight + cardHeight);

      // Set the position of the contact card based on the available space
      if (spaceTop > 0) {
        setStyle({ top: profilePictureTop - cardHeight });
      } else if (spaceLeft > 0) {
        setStyle({ left: profilePictureLeft - cardWidth });
      } else if (spaceRight > 0) {
        setStyle({ left: profilePictureLeft + profilePictureWidth });
      } else if (spaceBottom > 0) {
        setStyle({ top: profilePictureTop + profilePictureHeight });
      } else {
        setStyle({});
      }
    }
  }, []);

  return (
    <div
      className={styles.profile_icon_wrapper}
      onMouseOver={() => {
        if (imageHoverRef) {
          imageHoverRef.current?.setAttribute("data-elm-isActive", "true");
        }
      }}
      onMouseLeave={() => {
        if (imageHoverRef) {
          imageHoverRef.current?.setAttribute("data-elm-isActive", "false");
        }
      }}
      data-elm-type={"profile-icon"}
    >
      <span>
        <img src={user.profilePicURL ?? ""} alt="@" />
      </span>
      {showDetailsOnHover ? (
        <div
          ref={imageHoverRef}
          className={`${styles.profile_details_wrapper} orientation_${currentOrientation} `}
          id={"profile_details"}
          data-elm-isActive={"false"}
        >
          <div className={styles.profile_details_content}></div>
        </div>
      ) : null}
    </div>
  );
};
