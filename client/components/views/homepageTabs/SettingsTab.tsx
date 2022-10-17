import React, { useMemo, useState, useRef } from "react";
import styles from "../../../styles/views/homePageTabs/settingsTab.module.scss";
import { SearchInput, SideNavBtn, ProfileWidget, IconBtn } from "../../reusable";
import { BiHomeAlt } from "react-icons/bi";
import { IoAnalyticsOutline, IoSettingsOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { useSettingsTab } from "../../../hooks/useSettingsTab/useSettingsTab";
import { SettingsTabs_ } from "../../../types";
import { upperCaseFirstLetter } from "../../../utils";
import { SettingsTabView } from "../settings";

export const SettingsTab = ({}): JSX.Element => {
  const settingsNavOptions = useMemo<
    { label: SettingsTabs_; icon: React.ReactNode }[]
  >(
    () => [
      {
        label: "account",
        icon: <BiHomeAlt />,
      },
      {
        label: "connections",
        icon: <IoAnalyticsOutline />,
      },
      {
        label: "preferences",
        icon: <FiShoppingBag />,
      },
      {
        label: "security",
        icon: <MdOutlineSecurity />,
      },
    ],
    []
  );
  const { settingsTab, switchTab } = useSettingsTab();
  const [isNavMin, setIsNavMin] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function toggleIsNavMinSettings(){
    if (isNavMin === true) {
      setIsNavMin(false);
    } else {
      setIsNavMin(true);
    }
  }

  return (
    <div className={`${styles.st_content}`}>
      <div className={`${styles.st_nav} ${isNavMin === true ? styles.st_nav_min : ""}`}>
        <div className={styles.st_nav_content}>
          <div className={styles.st_nav_profile}>
            <ProfileWidget imageURL="https://source.unsplash.com/random" />
            <div className={`${styles.st_nav_profile_details} ${styles[`st_nav_profile_details_isMin_${isNavMin}`]}`}>
              <span>
                <h4>Welcome back.</h4>
              </span>
              <span>
                <h3>Sarah Smith</h3>
              </span>
            </div>
            <IconBtn icon={<IoSettingsOutline />} variant={`outlined`} onClick={(): void => {toggleIsNavMinSettings()}} />
          </div>
          <div className={styles.st_nav_search}>
            <SearchInput placeholder="Search ..." wrapperOnClick={()=>{
              if (isNavMin === true){
                setIsNavMin(false);
              }
              if (inputRef) {
                inputRef.current?.focus()
              }
            }} className={`${styles[`search_input_isNavMin_${isNavMin}`]}`} inputRef={inputRef} />
          </div>
          <div className={styles.st_nav_options}>
            <ul>
              {settingsNavOptions.map((option, i) => {
                return (
                  <li key={i}>
                    <SideNavBtn
                      isActive={settingsTab.currentNavOption === option.label}
                      variant={"secondary"}
                      withIcon={{ status: true, icon: option.icon }}
                      onClick={(): void => {
                        switchTab(option.label.toLowerCase() as SettingsTabs_);
                      }}
                      className={styles[`isNavMin_${isNavMin}`]}
                    >
                      {isNavMin === false ? upperCaseFirstLetter(option.label) : null}
                    </SideNavBtn>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.st_nav_footer}></div>
        </div>
      </div>
      <div className={styles.st_view}>
        <SettingsTabView />
      </div>
    </div>
  );
};
