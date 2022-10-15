import React, { useState } from "react";
import { SettingsTabCtx, SettingsTabCtxDefaults } from "../../context";

export const SettingsTabCtxProvider = ({children}: any) => {
    const [settingsTab, setSettingsTab] = useState({...SettingsTabCtxDefaults});
    
    return (
        <SettingsTabCtx.Provider value={{settingsTab, setSettingsTab}}>
            {children}
        </SettingsTabCtx.Provider>
    )
}