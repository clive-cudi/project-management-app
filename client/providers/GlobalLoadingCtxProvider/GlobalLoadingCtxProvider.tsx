import React, { useContext, useState } from "react";
import { GlobalLoadingCtx, GlobalLoadingCtxDefaults, GlobalLoadingCtxTypes } from "../../context";

export const GlobalLoadingCtxProvider = ({children}: any) => {
    const [globalLoading, setGlobalLoading] = useState<GlobalLoadingCtxTypes>(GlobalLoadingCtxDefaults);

    return (
        <GlobalLoadingCtx.Provider value={{globalLoading, setGlobalLoading}}>
            {children}
        </GlobalLoadingCtx.Provider>
    )
}