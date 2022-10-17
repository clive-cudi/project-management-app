import React from "react";
import styles from "../../../styles/views/settings/index_settings.module.scss";
import { useSettingsTab } from "../../../hooks";
import { AccountTab } from "./AccountTab";
import { ConnectionsTab } from "./ConnectionsTab";
import { PreferencesTab } from "./PreferencesTab";
import { SecurityTab } from "./SecurityTab";

export const SettingsTabView = (): JSX.Element => {
    const { settingsTab } = useSettingsTab();

    function showCurrentSettingsTab(): JSX.Element {
        switch (settingsTab.currentNavOption) {
            case "account":
                return <AccountTab />
            case "connections":
                return <ConnectionsTab />
            case "preferences":
                return <PreferencesTab />
            case "security":
                return <SecurityTab />
            default:
                return <AccountTab />
        }
    }

    return (
        <div className={styles.settings_view_tab_wrapper}>
            {showCurrentSettingsTab()}
        </div>
    )
}