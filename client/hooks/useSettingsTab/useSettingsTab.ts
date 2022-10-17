import { useContext } from "react";
import { SettingsTabCtx, SettingsTabCtx_Props, SettingsTabTypes } from "../../context";
import { SettingsTabs_ } from "../../types";

export function useSettingsTab() {
    const { settingsTab, setSettingsTab} = useContext(SettingsTabCtx) as SettingsTabCtx_Props;

    function switchTab(tab: SettingsTabs_) {
        if (settingsTab.currentNavOption !== tab) {
            setSettingsTab({
                currentNavOption: tab
            })
        }

        return tab;
    }
    
    return {
        switchTab,
        settingsTab
    }
}