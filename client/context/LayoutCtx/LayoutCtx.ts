import React from "react";

export interface LayoutCtxTypes {
    homepage?: {
        currentTab: "home" | "messages" | "workspace" | "members" | "settings"
    }
    navbar?: {
        isMin?: boolean
    }
}

export interface LayoutCtx_Props {
    layout: LayoutCtxTypes
    setLayout: React.Dispatch<React.SetStateAction<LayoutCtxTypes>>
}

export const LayoutCtxDefaults: LayoutCtxTypes = {
    homepage: {
        currentTab: "home"
    },
    navbar: {
        isMin: false
    }
}

export const LayoutCtx = React.createContext<LayoutCtx_Props | null>({layout: LayoutCtxDefaults, setLayout: ()=>{}});