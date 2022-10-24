import React, { useState } from "react";
import { RoutingCtx, RoutingCtxDefaults, RoutingCtxTypes } from "../../context";

export const RoutingCtxProvider = ({children}: any) => {
    const [routing, setRouting] = useState<RoutingCtxTypes>(RoutingCtxDefaults);

    return (
        <RoutingCtx.Provider value={{routing, setRouting}}>
            {children}
        </RoutingCtx.Provider>
    )
}