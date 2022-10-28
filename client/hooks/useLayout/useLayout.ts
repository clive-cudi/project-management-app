import React, { useContext } from "react";
import { LayoutCtx, LayoutCtx_Props } from "../../context";
import { useTabRenderer } from "../useTabRenderer/useTabRenderer";

export function useLayout() {
    const { layout, setLayout } = useContext(LayoutCtx) as LayoutCtx_Props;
    const { currentTab, switchTab } = useTabRenderer();

    function switchHomeTab(tab: "home" | "messages" | "workspace" | "members" | "settings") {
        if (layout.homepage?.currentTab !== tab) {
            setLayout({
                homepage: {
                    currentTab: tab
                }
            })
        }

        return layout.homepage?.currentTab;
    }

    return {
        switchHomeTab,
        currentTab: layout.homepage?.currentTab
    }
}