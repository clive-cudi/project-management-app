import React from "react";

export interface SettingsTabTypes {
    currentNavOption: "account" | "connections" | "preferences" | "security"
}

export interface SettingsTabCtx_Props {
    settingsTab: SettingsTabTypes,
    setSettingsTab: React.Dispatch<React.SetStateAction<SettingsTabTypes>>
}

export const SettingsTabCtxDefaults: SettingsTabTypes = {
    currentNavOption: "account"
}

export const SettingsTabCtx = React.createContext<SettingsTabCtx_Props | null>({settingsTab: {...SettingsTabCtxDefaults}, setSettingsTab: ()=> {}});