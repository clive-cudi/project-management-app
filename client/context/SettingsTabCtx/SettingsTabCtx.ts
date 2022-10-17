import React from "react";
import { SettingsTabs_ } from "../../types";

export interface SettingsTabTypes {
    currentNavOption: SettingsTabs_
}

export interface SettingsTabCtx_Props {
    settingsTab: SettingsTabTypes,
    setSettingsTab: React.Dispatch<React.SetStateAction<SettingsTabTypes>>
}

export const SettingsTabCtxDefaults: SettingsTabTypes = {
    currentNavOption: "account"
}

export const SettingsTabCtx = React.createContext<SettingsTabCtx_Props | null>({settingsTab: {...SettingsTabCtxDefaults}, setSettingsTab: ()=> {}});