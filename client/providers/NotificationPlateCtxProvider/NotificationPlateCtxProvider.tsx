import React, { useState } from "react";
import { NotificationPlateCtx, NotificationPlateCtxDefaults, NotificationPlateCtxTypes } from "../../context";

export const NotificationPlateCtxProvider = ({children}: any) => {
    const [notificationPlate, setNotificationPlate] = useState<NotificationPlateCtxTypes>(NotificationPlateCtxDefaults);

    return (
        <NotificationPlateCtx.Provider value={{notificationPlate, setNotificationPlate}}>
            {children}
        </NotificationPlateCtx.Provider>
    )
}