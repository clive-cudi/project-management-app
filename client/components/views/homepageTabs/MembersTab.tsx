import { useState, useMemo } from "react";
import styles from "../../../styles/views/homePageTabs/membersTab.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FcOrganization } from "react-icons/fc";
import Image from "next/image";
import MockUsers from "../../../mock/users.json";
import { ProfileIconRibbon } from "../../reusable";
import { useTeamsStore, useTeams } from "../../../hooks";
import { AiOutlineTeam } from "react-icons/ai";

export const MembersTab = ({}) => {
  const [availableOrganizations, setAvailableOrganizations] = useState([
    {
      name: "Pluxy",
      orgID: "fheufhoe",
      role: "Software Engineer",
      description: "Decentralized cloud computing an storage",
      profilePicUrl: "https://source.unsplash.com/random"
    },
    {
      name: "Plug",
      orgID: "cwofher",
      role: "Software Engineer",
      description: "IT solutions",
      profilePicUrl: "https://source.unsplash.com/random"
    },
  ]);
  const [ sampleTeams, setSampleTeams ] = useState([])
  const [showInfoStates, setShowInfoStates] = useState<string[]>([]);
  const userMockData = useMemo(() => [...MockUsers], []);
  // teams that the user is a member of
  const { getMemberTeamsByOrganization, teams } = useTeams();

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
                  <>
                    <li key={index} data-org-id={org.orgID ?? "_"}>
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
                            <button className={styles.view_org_btn} onClick={(e) => {e.stopPropagation()}}>View Organization</button>
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
                    </li>
                    {/* div expands showing more info about an organization */}
                    {showInfoStates.includes(org.orgID) ? (
                      <li
                        className={styles.mtb_available_orgs_expand_wrapper}
                        onClick={(e) => {e.stopPropagation()}}
                      >
                        <div className={styles.mtb_available_orgs_expand_content}>
                            <div className={styles.mtb_aoe_col}>
                                {/* show the profile icon of the organization */}
                                <div className={styles.mtb_aoe_profile_wrapper}>
                                    <div className={styles.mtb_aoe_profile}>
                                        <Image src={org.profilePicUrl} alt={`@${org.name}`} layout={"fill"} />
                                    </div>
                                </div>
                                <div className={styles.mtb_aoe_org_description}>
                                  <div className={styles.mtb_aoe_org_desc_strip}>
                                    <h4>Organization Name:</h4>
                                    <h3>{org.name}</h3>
                                  </div>
                                  <div className={styles.mtb_aoe_org_desc_strip}>
                                    <h4>Description:</h4>
                                    <p>{`${org.description}`}</p>
                                  </div>
                                </div>
                            </div>
                            <div className={styles.mtb_aoe_col}>
                              <div className={styles.mtb_aoe_info_strip}>
                                <div className={styles.mtb_aoe_info_strip_header}>
                                  <h4>Members:</h4>
                                  <span data-elm-type={"aoe-view-all-span"}>View all members</span>
                                </div>
                                <div className={styles.mtb_aoe_members}>
                                  {/* Have an option to view all members [i.e: in a modal list] */}
                                  <ProfileIconRibbon key={29} users={MockUsers} maxNumber={6} />
                                </div>
                              </div>
                              <div className={styles.mtb_aoe_info_strip}>
                                <div className={styles.mtb_aoe_info_strip_header}>
                                  <h4>Teams:</h4>
                                  <span data-elm-type={"aoe-view-all-span"}>View all teams</span>
                                </div>
                              </div>
                            </div>
                        </div>
                      </li>
                    ) : null}
                  </>
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
        <div className={styles.mtb_row_content}>
          <ul>
            {teams.length > 0 ? (
              teams.map((tm, ix) => {

                return (
                  <>
                    <li key={ix} data-team-id={tm.tid ?? "_"}>
                      <div className={styles.mtb_available_orgs_basic_info}>
                        <div className={styles.mtb_aob_col}>
                          <span className={styles.mtb_aob_info_number}>
                            <AiOutlineTeam />
                          </span>
                          <span className={styles.mtb_aob_info_title}>
                            <h4>{tm.name}</h4>
                          </span>
                        </div>
                        <div className={styles.mtb_aob_col}>
                          <span>
                            <button className={styles.view_org_btn}>View team</button>
                          </span>
                          <span>
                            <button className={styles.more_info_org_btn} onClick={(e) => {
                              e.stopPropagation();
                              toggleShowInfo(tm.tid);
                            }}>
                              {showInfoStates.includes(tm.tid) ? (
                                <BsChevronUp />
                              ): (
                                <BsChevronDown />
                              )}
                            </button>
                          </span>
                        </div>
                      </div>
                    </li>
                    {showInfoStates.includes(tm.tid) ? (
                      <li className={styles.mtb_available_orgs_expand_wrapper} onClick={(e) => {e.stopPropagation()}}></li>
                    ) : (null)}
                  </>
                )
              })
            ) : (null)}
          </ul>
        </div>
      </div>
    </div>
  );
};
