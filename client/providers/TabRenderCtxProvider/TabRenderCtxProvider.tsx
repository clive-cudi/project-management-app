import React, { useState } from "react";
import { TabRenderCtx, TabRenderCtxDefaults, TabRenderCtxTypes } from "../../context";

export const TabRenderCtxProvider = ({children}: any) => {
    const [tabRender, setTabRender] = useState<TabRenderCtxTypes>(TabRenderCtxDefaults);
    
    return (
        <TabRenderCtx.Provider value={{tabRender, setTabRender}}>
            {children}
        </TabRenderCtx.Provider>
    )
}