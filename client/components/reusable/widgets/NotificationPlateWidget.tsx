import { useState } from "react";
import styles from "../../../styles/components/reusable/widgets/index_.module.scss";
import { useNotificationPlateWidget } from "../../../hooks";

interface NotificationPlateWidget_Props {
    components?: JSX.Element[]
    timeoutMod?: number
}

export const NotificationPlateWidget = ({ components, timeoutMod }: NotificationPlateWidget_Props): JSX.Element => {
    const { notificationPlate, isEmpty } = useNotificationPlateWidget();

    return (
        <div className={`${styles.npw_wrapper} status_${isEmpty() ? "empty" : "engaged"}`}>
            <ul>
                {/* map components here as list and store them in state  */}
                {
                    notificationPlate.componentList.map((cmpnt) => <li key={cmpnt.id}>{cmpnt.component}</li>)
                }
            </ul>
        </div>
    )
}