import { useRef, useState } from "react";
import styles from "../../../styles/views/homePageTabs/membersTab.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FcOrganization } from "react-icons/fc";
import Image from "next/image";

export const MembersTab = ({}) => {
  const [availableOrganizations, setAvailableOrganizations] = useState([
    {
      name: "Pluxy",
      orgID: "fheufhoe",
      role: "Software Engineer",
      description: "",
      profilePicUrl: "https://source.unsplash.com/random"
    },
    {
      name: "Plug",
      orgID: "cwofher",
      role: "Software Engineer",
      description: "",
      profilePicUrl: "https://source.unsplash.com/random"
    },
  ]);
  const [showInfoStates, setShowInfoStates] = useState<string[]>([]);
//   const expandBtnRef = useRef<HTMLButtonElement>(null);

//   function clickBtnRef() {
//     if (expandBtnRef) {
//         expandBtnRef.current?.click();
//     }
//   }

  function toggleShowInfo(currentStateID: string) {
    if (showInfoStates?.includes(currentStateID)) {
        setShowInfoStates((prevStatesTrue) => {
            return [...prevStatesTrue].filter((state_) => state_ !== currentStateID);
        })

        return false;
    } else {
        setShowInfoStates((prevStatesTrue) => {
            return [...prevStatesTrue, currentStateID]
        })
        return true;
    }
  }

  return (
    <div className={styles.mtb_content}>
      <div className={styles.mtb_row}>
        <div className={styles.mtb_row_header}>
          <span className={styles.mtb_row_header_title}>
            <h3>Organizations</h3>
          </span>
          <span className={styles.mtb_row_header_info}>
            <h4>View Organizations that you are part of:</h4>
          </span>
        </div>
        <div className={styles.mtb_row_content}>
          <ul>
            {availableOrganizations.length > 0 ? (
              availableOrganizations.map((org, index) => {

                return (
                  <li key={index} data-org-id={org.orgID ?? "_"} onClick={() => {toggleShowInfo(org.orgID)}}>
                    {/* div showing basic info about the organization */}
                    <div className={styles.mtb_available_orgs_basic_info}>
                      <div className={styles.mtb_aob_col}>
                        <span className={styles.mtb_aob_info_number}>
                          {/* {index + 1 ?? "_"} */}
                          <FcOrganization style={{filter: "graysscale(100%)"}} />
                        </span>
                        <span className={styles.mtb_aob_info_title}>
                          <h4>{org.name}</h4>
                        </span>
                      </div>
                      <div className={styles.mtb_aob_col}>
                        <span>
                          <button className={styles.view_org_btn}>View Organization</button>
                        </span>
                        <span>
                          <button
                          className={styles.more_info_org_btn}
                            onClick={(e) => {
                                e.stopPropagation()
                              toggleShowInfo(org.orgID);
                            }}
                            // ref={expandBtnRef}
                          >
                            {showInfoStates.includes(org.orgID) ? (
                              <BsChevronUp />
                            ) : (
                              <BsChevronDown />
                            )}
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* div expands showing more info about an organization */}
                    {showInfoStates.includes(org.orgID) ? (
                      <div
                        className={styles.mtb_available_orgs_expand_wrapper}
                      >
                        <div className={styles.mtb_available_orgs_expand_content}>
                            <div className={styles.mtb_aoe_col}>
                                {/* show the profile icon of the organization */}
                                <div className={styles.mtb_aoe_profile_wrapper}>
                                    <div className={styles.mtb_aoe_profile}>
                                        <Image src={org.profilePicUrl} layout={"fill"} />
                                    </div>
                                </div>
                                <div className={styles.mtb_aoe_org_description}>
                                    <h3></h3>
                                </div>
                            </div>
                            <div className={styles.mtb_aoe_col}></div>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })
            ) : (
              <li data-elm-type={"li-no-organizations"}>No Organizations found</li>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.mtb_row}>
        <div className={styles.mtb_row_header}>
          <span className={styles.mtb_row_header_title}>
            <h3>Teams</h3>
          </span>
          <span className={styles.mtb_row_header_info}>
            <h4>View Teams that you are working with:</h4>
          </span>
        </div>
        <div className={styles.mtb_row_content}></div>
      </div>
    </div>
  );
};
