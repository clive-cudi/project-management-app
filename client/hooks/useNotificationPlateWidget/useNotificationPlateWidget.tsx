import { useState, useContext, useEffect } from "react";
import { NotificationPlateCtx, NotificationPlateCtx_Props } from "../../context";
import { NotificationBadge_Props, NotificationBadge } from "../../components";

export function useNotificationPlateWidget() {
    // const [componentsToRender, setComponentsToRender] = useState<{id: string, component: JSX.Element}[]>([]);
    const { notificationPlate, setNotificationPlate } = useContext(NotificationPlateCtx) as NotificationPlateCtx_Props;

    useEffect(() => {
        // interval for removing notifications
        // check if the notification list is empty
        const notificationInterval = setInterval(() => {
            if (!isEmpty() && notificationPlate.autoRemove !== false){
                dequeueNotification();
                // console.log("Interval");
            }
        }, notificationPlate.timeoutMod);

        return () => clearInterval(notificationInterval);
    }, [notificationPlate.componentList])

    function enqueueNotification(cmpnt: JSX.Element, id?: string) {
        setNotificationPlate((prev) => ({
            ...prev,
            componentList: [...prev.componentList, {id: id ?? String(prev.componentList.length + 1), component: cmpnt}]
        }))
        return notificationPlate.componentList;
    }

    function removeFromNotificationStack(id: string) {
        const { id: targetNotificationId, component } = [...notificationPlate.componentList].find((notification) => notification.id === id) || {id: null, component: null};

        // console.log(`Removing Notification: \nid => ${id}\ntarget: ${targetNotificationId}`)

        // console.log(notificationPlate.componentList)
        

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
        // console.log(`Dequeue notification`)
        if (!isEmpty()) {
            const updatedNotificationStack = [...notificationPlate.componentList].slice(1, notificationPlate.componentList.length);

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

    interface addNotificationWithBadge_Props extends NotificationBadge_Props {
        notification_id?: string
    }

    function addNotificationWithBadge({notification_id, ...badgeProps}: addNotificationWithBadge_Props): string {
        const nfID = notification_id ?? crypto.randomUUID();

        enqueueNotification(<NotificationBadge {...badgeProps} />, nfID)

        return nfID;
    }

    return {
        notificationPlate,
        enqueueNotification,
        dequeueNotification,
        removeFromNotificationStack,
        changeDefaultTimeout,
        disableAutoRemove,
        enableAutoRemove,
        isEmpty,
        addNotificationWithBadge
    }
}