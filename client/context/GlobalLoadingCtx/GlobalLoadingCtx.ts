import React, { createContext, Dispatch, SetStateAction } from "react";

export interface GlobalLoadingCtxTypes {
    isLoading: boolean,
    iconMod?: JSX.Element | null
}

export interface GlobalLoadingCtx_Props {
    globalLoading: GlobalLoadingCtxTypes,
    setGlobalLoading: Dispatch<SetStateAction<GlobalLoadingCtxTypes>>
}

export const GlobalLoadingCtxDefaults: GlobalLoadingCtxTypes = {
    isLoading: false,
    iconMod: null
}

export const GlobalLoadingCtx = createContext<GlobalLoadingCtx_Props | null>({globalLoading: GlobalLoadingCtxDefaults, setGlobalLoading: () => GlobalLoadingCtxDefaults});