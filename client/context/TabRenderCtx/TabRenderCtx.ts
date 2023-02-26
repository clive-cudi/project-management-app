import React from "react";

export interface TabRenderCtxTypes {
    label: string,
    component?: () => JSX.Element | React.ReactNode | null
    parentRoute?: string
}

export interface TabRenderCtx_Props {
    tabRender: TabRenderCtxTypes,
    setTabRender: React.Dispatch<React.SetStateAction<TabRenderCtxTypes>>
}

export const TabRenderCtxDefaults: TabRenderCtxTypes = {
    label: "none",
    component: () => null
}

export const TabRenderCtx = React.createContext<TabRenderCtx_Props | null>(null);