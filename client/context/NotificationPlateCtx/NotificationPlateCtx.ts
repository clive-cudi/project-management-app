import React, { createContext, Dispatch, JSXElementConstructor, SetStateAction } from "react";

export interface NotificationPlateCtxTypes {
    componentList: {
        id: string
        component: JSX.Element
    }[]
    timeoutMod?: number
    autoRemove?: boolean
}

export interface NotificationPlateCtx_Props {
    notificationPlate: NotificationPlateCtxTypes,
    setNotificationPlate: Dispatch<SetStateAction<NotificationPlateCtxTypes>>
}

export const NotificationPlateCtxDefaults: NotificationPlateCtxTypes = {
    componentList: [],
    timeoutMod: 3000,
    autoRemove: true
}

export const NotificationPlateCtx = createContext<NotificationPlateCtx_Props | null>({notificationPlate: NotificationPlateCtxDefaults, setNotificationPlate: () => {}});