import React from "react";

export interface RoutingCtxTypes {
    currentRoute: string,
    defaultRoute: string,
    allowedRoutes: string[],
}

export interface RoutingCtx_Props {
    routing: RoutingCtxTypes,
    setRouting: React.Dispatch<React.SetStateAction<RoutingCtxTypes>>
}

export const RoutingCtxDefaults: RoutingCtxTypes = {
    currentRoute: "/",
    defaultRoute: "/",
    allowedRoutes: [
        "/"
    ]
}

export const RoutingCtx = React.createContext<RoutingCtx_Props | null>(null);