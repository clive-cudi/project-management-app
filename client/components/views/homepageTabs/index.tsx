import { useLayout } from "../../../hooks";
import { HomeTab } from "./Hometab";
import { MessagesTab } from "./MessagesTab";
import { WorkSpaceTab } from "./WorkSpaceTab";
import { MembersTab } from "./MembersTab";
import { SettingsTab } from "./SettingsTab";
import styles from "../../../styles/views/homePageTabs/index_.module.scss";

export const HomePageCurrentTab = ({}): JSX.Element => {
    const { currentTab } = useLayout();

    function showCurrentTab(): JSX.Element {
        switch (currentTab) {
            case "home":
                return <HomeTab />;
            case "messages":
                return <MessagesTab />;
            case "workspace":
                return <WorkSpaceTab />;
            case "members":
                return <MembersTab />;
            case "settings":
                return <SettingsTab />;
            default:
                return <HomeTab />;
        }
    }

    return (
        <div className={styles.homepage_tab_wrapper}>
            {showCurrentTab()}
        </div>
    )
}