import { useState, useContext, useEffect } from "react";
import { NotificationPlateCtx, NotificationPlateCtx_Props } from "../../context";

export function useNotificationPlateWidget() {
    // const [componentsToRender, setComponentsToRender] = useState<{id: string, component: JSX.Element}[]>([]);
    const { notificationPlate, setNotificationPlate } = useContext(NotificationPlateCtx) as NotificationPlateCtx_Props;

    // useEffect(() => {
    //     // interval for removing notifications
    //     // check if the notification list is empty

    //     if (!isEmpty() && notificationPlate.autoRemove !== false) {
    //         const notificationInterval = setInterval(() => {
    //             dequeueNotification();
    //             console.log("Interval")
    //         }, notificationPlate.timeoutMod);

    //         return () => clearInterval(notificationInterval);
    //     }
    // }, [])

    function enqueueNotification(cmpnt: JSX.Element, id?: string) {
        setNotificationPlate((prev) => ({
            ...prev,
            componentList: [...prev.componentList, {id: id ?? String(prev.componentList.length + 1), component: cmpnt}]
        }))
        return notificationPlate.componentList;
    }

    function removeFromNotificationStack(id: string) {
        const { id: targetNotificationId, component } = [...notificationPlate.componentList].find((notification) => notification.id === id) || {id: null, component: null};

        console.log(`Removing Notification: \nid => ${id}\ntarget: ${targetNotificationId}`)

        console.log(notificationPlate.componentList)
        

        if (targetNotificationId !== null) {
            const filteredNotificationList = [...notificationPlate.componentList].filter((notif) => notif.id !== targetNotificationId);

            setNotificationPlate((prevNotifications) => ({
                ...prevNotifications,
                componentList: filteredNotificationList
            }))
            return {
                id: targetNotificationId,
                component: component
            }
        }

        return {
            id: null,
            component: null
        }
    }

    function isEmpty(): boolean {
        return notificationPlate.componentList.length < 1;
    }

    function dequeueNotification() {
        console.log(`Dequeue notification`)
        if (!isEmpty()) {
            const updatedNotificationStack = [...notificationPlate.componentList].slice(0, -1);

            setNotificationPlate((prev) => ({
                ...prev,
                componentList: updatedNotificationStack
            }));
        }

        return notificationPlate.componentList;
    };

    function changeDefaultTimeout(timeout: number) {
        setNotificationPlate((prevConfig) => ({
            ...prevConfig,
            timeoutMod: timeout ?? 3000
        }))
    }

    function disableAutoRemove() {
        setNotificationPlate((prevN) => ({
            ...prevN,
            autoRemove: false
        }));

        return notificationPlate.autoRemove;
    }

    function enableAutoRemove() {
        setNotificationPlate((prevN) => ({
            ...prevN,
            autoRemove: true
        }));

        return notificationPlate.autoRemove;
    }

    return {
        notificationPlate,
        enqueueNotification,
        dequeueNotification,
        removeFromNotificationStack,
        changeDefaultTimeout,
        disableAutoRemove,
        enableAutoRemove,
        isEmpty
    }
}