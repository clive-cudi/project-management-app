import { useLayout, useTabRenderer } from "../../../hooks";
import styles from "../../../styles/views/homePageTabs/index_.module.scss";

export const HomePageCurrentTab = ({}): JSX.Element => {
    // const { currentTab } = useLayout();
    const { currentTab: tab, switchTab, showCurrentTab} = useTabRenderer();

    // function showCurrentTab(): JSX.Element {
    //     switch (tab.label) {
    //         case "home":
    //             return <HomeTab />;
    //         case "messages":
    //             return <MessagesTab />;
    //         case "workspace":
    //             return <WorkSpaceTab />;
    //         case "members":
    //             return <MembersTab />;
    //         case "settings":
    //             return <SettingsTab />;
    //         default:
    //             return <HomeTab />;
    //     }
    // }

    return (
        <div className={styles.homepage_tab_wrapper}>
            {showCurrentTab().call({})}
        </div>
    )
}

export { HomeTab } from "./Hometab";
export { MembersTab } from "./MembersTab";
export { MessagesTab } from "./MessagesTab";
export { SettingsTab } from "./SettingsTab";
export { TestTab } from "./TestTab";
export { WorkSpaceTab } from "./WorkSpaceTab";