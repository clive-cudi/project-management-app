import { useLayout, useTabRenderer } from "../../../hooks";
import styles from "../../../styles/views/homePageTabs/index_.module.scss";

export const ContractPageCurrentTab = ({}): JSX.Element => {
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

export { MyContractsTab } from "./MyContractsTab";
export { AddContractTab } from "./AddContractTab";
export { SearchContractsTab } from "./SearchContractsTab";
export { ContractsBoardTab } from "./ContractsBoardTab";